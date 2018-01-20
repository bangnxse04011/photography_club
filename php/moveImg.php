<?php
require 'util.php';

$id = +$_POST['id'];
$album_id = +$_POST['album_id'];
$err = 'Di chuyển thất bại.';

if ($meId && $id > 0 && $album_id > 0) {
	$stm = $con->prepare("
		SELECT imgs.*
		FROM imgs
		JOIN albums
		ON imgs.album_id=albums.id
		WHERE imgs.id=? AND imgs.status=1 AND albums.user_id=? AND albums.status=1
	");
	$stm->bind_param('ii', $id, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($img = $rs->fetch_assoc()) {
			$id = $img['id'];
			$name = $img['name'];
			$type = $img['type'];

			$stm = $con->prepare("
				UPDATE imgs
				JOIN albums
				ON imgs.album_id=albums.id
				SET imgs.album_id=?
				WHERE imgs.id=? AND imgs.status=1 AND albums.id!=? AND albums.user_id=? AND albums.status=1
			");
			$stm->bind_param('iiii', $album_id, $id, $album_id, $meId);

			if (!$stm->execute()) {
				die($err);
			}
		}
		else {
			die($err);
		}
	}
	else {
		die($err);
	}

	$stm->close();
}

$con->close();
