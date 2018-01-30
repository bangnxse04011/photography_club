<?php
require 'util.php';

$date = isset($_GET['date']) ? $_GET['date'] : "";

$result = [
	'list' => null,
	'next' => null
];
$histories = [];

$stm = $con ->prepare("
	SELECT
		h.*,
		a.name album_name,
		i.name img_name,
		i.type img_type
	FROM histories h
	JOIN albums a
	ON h.album_id=a.id
	JOIN imgs i
	ON h.img_id=i.id
	WHERE
		h.user_id=?
	ORDER BY
		h.date DESC
");
$stm->bind_param('i', $meId);
$stm->execute();

if ($rs = $stm->get_result()) {
	while ($history = $rs->fetch_assoc()) {
		$histories[$history['date']][] = $history;
	}

	if ($date) {
		foreach ($histories as $k => $v) {
			if ($k === $date) {
				$result['list'] = $v;
			}
			else if ($result['list']) {
				$result['next'] = $k;
				break;
			}
		}
	}
	else {
		$result['list'] = current($histories);
		$next = next($histories);
		$result['next'] = $next ? $next[0]['date'] : null;
	}
}

echo json_encode($result);

$con->close();
