<?php
require 'util.php';

$id = +$_POST['id'];

$con->begin_transaction();

if ($meId && $id > 0) {
	$stm = $con->prepare("
		SELECT *
		FROM albums
		WHERE id=? AND user_id=? AND status=1
	");
	$stm->bind_param('ii', $id, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($album = $rs->fetch_assoc()) {
			$album_name = $album['name'];

			$stm = $con->prepare("
				UPDATE albums
				SET status=0
				WHERE id=?
			");
			$stm->bind_param('i', $id);
			$stm->execute();

			if ($con->affected_rows) {
				$stm = $con->prepare("
					UPDATE imgs
					SET status=0
					WHERE album_id=? AND status=1
				");
				$stm->bind_param('i', $id);
				$stm->execute();

				if ($con->affected_rows) {
					$date = date('Y-m-d');
					$time = date('H:i:s');

					$stm = $con->prepare("
						INSERT INTO histories_delete_album (
							user_id,
							album_id,
							album_name,
							date,
							time
						)
						VALUES (?, ?, ?, ?, ?)
					");
					$stm->bind_param(
						'iisss',
						$meId,
						$id,
						$album_name,
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
	}

	$stm->close();
}

$con->rollback();
die('Xóa album thất bại.');

$con->close();
