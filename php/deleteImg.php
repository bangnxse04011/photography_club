<?php
require 'util.php';

$id = +$_POST['id'];

$con->begin_transaction();

if ($meId && $id > 0) {
	$stm = $con->prepare("
		SELECT i.*
		FROM imgs i
		JOIN albums a
		ON i.album_id=a.id
		WHERE i.id=? AND a.user_id=? AND i.status=1 AND a.status=1
	");
	$stm->bind_param('ii', $id, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($img = $rs->fetch_assoc()) {
			$img_name = $img['name'];

			$stm = $con->prepare("
				UPDATE imgs i
				JOIN albums a
				ON i.album_id=a.id
				SET i.status=0
				WHERE i.id=?
			");
			$stm->bind_param('i', $id);
			$stm->execute()

			if ($con->affected_rows) {
				$date = date('Y-m-d');
				$time = date('H:i:s');

				$stm = $con->prepare("
					INSERT INTO histories_delete_img (
						user_id,
						img_id,
						img_name,
						date,
						time
					)
				");
				$stm->bind_param(
					'iisss',
					$meId,
					$id,
					$img_name,
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
die('Xóa ảnh thất bại.');

$con->close();
