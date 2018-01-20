<?php
require 'util.php';

$id = +$_POST['id'];

if ($meId && $id > 0) {
	$stm = $con->prepare("
		UPDATE imgs
		JOIN albums
		ON imgs.album_id=albums.id
		SET imgs.status=0
		WHERE imgs.id=? AND albums.user_id=? AND imgs.status=1
	");
	$stm->bind_param('ii', $id, $meId);

	if (!$stm->execute()) {
		die('Xóa ảnh thất bại.');
	}
}

$con->close();
