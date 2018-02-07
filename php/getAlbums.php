<?php
require 'util.php';

$start = isset($_GET['start']) ? +$_GET['start'] : 0;
$len = isset($_GET['len']) ? +$_GET['len'] : 20;
$rand = isset($_GET['rand']) ? ($_GET['rand'] == 'true' ? 1 : 0) : 0;
$user_id = isset($_GET['user_id']) ? +$_GET['user_id'] : $meId;
$search = isset($_GET['search']) ? $_GET['search'] : '';

$albums = [];
$num = 0;

$order_by = $rand ? 'ORDER BY rand()' : '';

if ($user_id === -1) {
	$where_user_id = "a.user_id!=$meId";
}
else if ($user_id === 0) {
	$where_user_id = '1=1';
}
else {
	$where_user_id = "a.user_id=$user_id";
}

$tmp = $start * $len;

if ($search) {
	$search =  strtolatin(mb_strtolower($search));

	$stm = $con->prepare("
		SELECT
			a.*,
			u.name user_name,
			0 is_like
		FROM albums a
		JOIN users u
		ON a.user_id=u.id
		WHERE $where_user_id
			AND a.status=1
	");
}
else {
	$stm = $con->prepare("
		SELECT
			a.*,
			u.name user_name
		FROM albums a
		JOIN users u
		ON a.user_id=u.id
		WHERE $where_user_id AND a.status=1
		$order_by
		LIMIT ?, ?
	");
	$stm->bind_param('ii', $tmp, $len);
}

$stm->execute();

if ($rs = $stm->get_result()) {
	while ($album = $rs->fetch_assoc()) {
		$album['num_img'] = 0;
		$album['imgs'] = [];

		$stm = $con->prepare("
			SELECT count(*) FROM imgs
			WHERE album_id=? AND status=1
		");
		$stm->bind_param('i', $album['id']);
		$stm->execute();

		if ($rs2 = $stm->get_result()) {
			$album['num_img'] = +$rs2->fetch_row()[0];
		}

		if ($album['num_img'] > 0) {
			$stm = $con->prepare("
				SELECT imgs.* FROM imgs
				WHERE album_id=? AND status=1
				ORDER BY date_upload DESC
				LIMIT 5
			");
			$stm->bind_param('i', $album['id']);
			$stm->execute();

			if ($rs2 = $stm->get_result()) {
				while ($img = $rs2->fetch_assoc()) {
					$album['imgs'][] = $img;
				}
			}
		}

		if ($search) {
			$album['distance'] = similar_text(strtolatin(mb_strtolower($album['name'])), $search);
		}

		$albums[] = $album;
	}
}

if ($search) {
	$fltLike = [];
	$fltDistance = [];

	foreach ($albums as $k => $v) {
		if (preg_match("/\b$search\b/", strtolatin(mb_strtolower($v['name'])))) {
			$fltLike[] = $v;
		}
		else {
			$fltDistance[] = $v;
		}
	}

	$fltDistance = array_filter($fltDistance, function($album) {
		return $album['distance'] > 0;
	});

	$albums = array_merge($fltLike, $fltDistance);

	uasort($albums, function($a, $b) {
		global $search;

		if (
			$a['is_like'] > $a['is_like'] ||
			$a['distance'] < $b['distance']
		) {
			return 1;
		}
		return -1;
	});

	$albums = array_slice($albums, $start, $len);

	$num = count($albums);
}
else {
	$query = "SELECT count(*) FROM albums WHERE $where_user_id AND status=1";

	if ($rs = $con->query($query)) {
		$num = $rs->fetch_row()[0];
	}
}

echo json_encode([$albums, $num]);

$stm->close();
$con->close();
