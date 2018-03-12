<?php
require 'util.php';

$name = trim($_POST['name']);
$id = +$_POST['id'];

$con->begin_transaction();

if ($meId && preg_match('/^[^\\/:*?"<>|]{1,500}$/', $name) && $id > 0) {
	$stm = $con->prepare("
		SELECT * FROM imgs
		WHERE id=? AND status=1
	");
	$stm->bind_param('i', $id);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($img = $rs->fetch_assoc()) {
			$img_name = $img['name'];

			$stm = $con->prepare("
				UPDATE imgs
				JOIN albums
				ON imgs.album_id=albums.id
				SET imgs.name=?
				WHERE imgs.id=? AND albums.user_id=?
			");
			$stm->bind_param('sii', $name, $id, $meId);
			$stm->execute();

			if ($con->affected_rows) {
				$date = date('Y-m-d');
				$time = date('H:i:s');

				$stm = $con->prepare("
					INSERT INTO histories_rename_img (
						user_id,
						img_id,
						old_name,
						new_name,
						date,
						time
					)
					VALUES (?, ?, ?, ?, ?, ?)
				");
				$stm->bind_param(
					'iissss',
					$meId,
					$id,
					$img_name,
					$name,
					$date,
					$time
				);
				$stm->execute();

				if ($con->affected_rows) {
					$con->commit();
					exit;
				}
			}
		}
	}

	$stm->close();
}

$con->rollback();
die('Đổi tên ảnh thất bại.');

$con->close();
