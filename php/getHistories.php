<?php
require 'util.php';

$date = isset($_GET['date']) ? $_GET['date'] : '';

if ($meId && (!$date || preg_match('/^\d{4,6}-[01]\d-[0-3]\d$/', $date))) {
	$result = [
		'list' => null,
		'current' => null,
		'next' => null
	];
	$histories = [];

	$acts = [
		'copy_img',
		'create_album',
		'delete_album',
		'delete_img',
		'move_img',
		'rename_img',
		'rename_album',
		'upload'
	];

	foreach ($acts as $v) {
		$rs = $con->query("
			SELECT * FROM histories_{$v}
			WHERE user_id=$meId
		");

		while ($history = $rs->fetch_assoc()) {
			$history['act'] = $v;

			if (array_key_exists('img_id', $history)) {
				$rs2 = $con->query("
					SELECT
						i.type img_type,
						i.status img_status,
						a.id img_album_id,
						(SELECT count(0) FROM imgs ii WHERE ii.album_id=a.id AND ii.status=1) album_num_img
					FROM imgs i
					JOIN albums a
					ON i.album_id=a.id
					WHERE i.id=$history[img_id]
				");

				if ($row = $rs2->fetch_assoc()) {
					foreach ($row as $k2 => $v2) {
						$history[$k2] = $v2;
					}
				}
			}

			$histories[$history['date']][$history['time']][] = $history;
		}
	}

	if (count($histories)) {
		foreach ($histories as $k => $v) {
			uksort($histories[$k], function($a, $b) {
				return strtotime($b) - strtotime($a);
			});
		}

		uksort($histories, function($a, $b) {
			return strtotime($b) - strtotime($a);
		});
		if ($date) {
			foreach ($histories as $k => $v) {
				if ($k === $date) {
					$result['list'] = $v;
					$result['current'] = $k;
				}
				else if ($result['list']) {
					$result['next'] = $k;
					break;
				}
			}
		}
		else {
			$result['list'] = current($histories);
			$result['current'] = current($result['list'])[0]['date'];

			$next = next($histories);

			$result['next'] = $next ? current($next)[0]['date'] : null;
		}
	}

	echo json_encode($result);
}

$con->close();
