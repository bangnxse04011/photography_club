<?php
require 'util.php';

$name = trim($_POST['name']);
$album_id = $_POST['album_id'];

if ($meId && preg_match('/^.{1,200}$/', $name) && $album_id > 0) {
	$stm = $con->prepare("
		SELECT count(0)
		FROM albums
		WHERE name=? AND user_id=? AND status=1
	");
	$stm->bind_param('si', $name, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($rs->fetch_row()[0]) {
			die('Tên album đã tồn tại.');
		}
		else {
			$stm = $con->prepare("
				UPDATE albums
				SET name=?
				WHERE id=? AND user_id=? AND status=1
			");
			$stm->bind_param('sii', $name, $album_id, $meId);

			if (!$stm->execute()) {
				die('Đổi tên album thất bại.');
			}
		}
	}

	$stm->close();
}

$con->close();
