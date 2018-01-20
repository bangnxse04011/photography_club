<?php
require 'util.php';

$name = trim($_POST['name']);
$id = +$_POST['id'];

if ($meId && preg_match('/^[^\\/:*?"<>|]{1,500}$/', $name) && $id > 0) {
	$stm = $con->prepare("
		SELECT * FROM imgs
		WHERE id=? AND status=1
	");
	$stm->bind_param('i', $id);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		$img = $rs->fetch_assoc();

		$stm = $con->prepare("
			UPDATE imgs
			JOIN albums
			ON imgs.album_id=albums.id
			SET imgs.name=?
			WHERE imgs.id=? AND albums.user_id=?
		");
		$stm->bind_param('sii', $name, $id, $meId);

		if (!$stm->execute()) {
			die('Đổi tên ảnh thất bại.');
		}
	}
	else {
		die('Đổi tên ảnh thất bại.');
	}

	$stm->close();
}

$con->close();
