<?php
ob_start();
session_start();

function nul($val) {
	return empty($val) ? NULL : $val;
}

$meId = 0;
$me = [];

if (isset($_SESSION['id'])) {
	$meId = $_SESSION['id'];
}

$con = new mysqli("localhost", "root", "", "photography_club");

if ($con->connect_errno) {
	die('Kết nối dữ liệu thất bại: '.$con->connect_error);
}

$con->set_charset("utf8");
date_default_timezone_set("Asia/Ho_Chi_Minh");

if ($meId) {
	$query = sprintf("SELECT * FROM users WHERE id=%d", $meId);

	if ($rs = $con->query($query)) {
		$me = $rs->fetch_assoc();
	}
}

function getAllAlbum($start = 0, $len = 12) {
	global $con, $meId;

	$albums = [];

	$query = sprintf(
		"SELECT * FROM albums
		WHERE user_id=%d
		LIMIT %d, %d",
		$meId, $start, $len
	);

	if ($rs = $con->query($query)) {
		while ($album = $rs->fetch_assoc()) {
			$query = sprintf(
				"SELECT count(*) num_img FROM imgs
				JOIN albums
				ON imgs.album_id=albums.id
				WHERE albums.user_id=%d AND imgs.album_id=%d",
				$meId, $album['id']
			);

			if ($rs2 = $con->query($query)) {
				$num_img = $rs2->fetch_assoc()['num_img'];

				$album['num_img'] = +$num_img;
			}

			if ($album['num_img'] > 0) {
				if ($album)
				$query = sprintf(
					"SELECT imgs.* FROM imgs
					JOIN albums
					ON imgs.album_id=albums.id
					WHERE albums.user_id=%d AND imgs.album_id=%d
					ORDER BY imgs.date_upload DESC
					LIMIT 5",
					$meId, $album['id']
				);

				if ($rs2 = $con->query($query)) {
					while ($img = $rs2->fetch_assoc()) {
						$album['imgs'][] = $img;
					}
				}
			}

			$albums[] = $album;
		}
	}

	return $albums;
}
