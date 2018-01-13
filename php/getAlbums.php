<?php
require 'util.php';

$start = isset($_GET['start']) ? $_GET['start'] : 0;
$len = isset($_GET['len']) ? $_GET['len'] : 20;
$rand = isset($_GET['rand']) ? $_GET['rand'] : false;

$albums = [];
$num = 0;

if ($rand) {
	$stm = $con->prepare(
		"SELECT * FROM albums
		WHERE user_id=? AND status=1
		ORDER BY rand()
		LIMIT ?, ?"
	);
}
else {
	$stm = $con->prepare(
		"SELECT * FROM albums
		WHERE user_id=? AND status=1
		LIMIT ?, ?"
	);
}
$stm->bind_param('iii', $meId, $tmp = $start * $len, $len);
$stm->execute();

if ($rs = $stm->get_result()) {
	while ($album = $rs->fetch_assoc()) {
		$album['num_img'] = 0;
		$album['imgs'] = [];

		$stm = $con->prepare(
			"SELECT count(*) FROM imgs
			JOIN albums
			ON imgs.album_id=albums.id
			WHERE albums.user_id=? AND imgs.album_id=? AND imgs.status=1"
		);
		$stm->bind_param('ii', $meId, $album['id']);
		$stm->execute();

		if ($rs2 = $stm->get_result()) {
			$album['num_img'] = +$rs2->fetch_row()[0];
		}

		if ($album['num_img'] > 0) {
			$stm = $con->prepare(
				"SELECT imgs.* FROM imgs
				JOIN albums
				ON imgs.album_id=albums.id
				WHERE albums.user_id=? AND imgs.album_id=? AND imgs.status=1
				ORDER BY imgs.date_upload DESC
				LIMIT 5"
			);
			$stm->bind_param('ii', $meId, $album['id']);
			$stm->execute();

			if ($rs2 = $stm->get_result()) {
				while ($img = $rs2->fetch_assoc()) {
					$album['imgs'][] = $img;
				}
			}
		}

		$albums[] = $album;
	}
}

$query = "SELECT count(*) FROM albums WHERE user_id=$meId AND status=1";

if ($rs = $con->query($query)) {
	$num = $rs->fetch_row()[0];
}

echo json_encode([$albums, $num]);

$stm->close();
$con->close();
