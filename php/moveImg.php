<?php
require 'util.php';

$id = +$_POST['id'];
$album_id = +$_POST['album_id'];

$con->begin_transaction();

if ($meId && $id > 0 && $album_id > 0) {
	$stm = $con->prepare("
		SELECT *
		FROM albums
		WHERE id=? AND user_id=?
	");
	$stm->bind_param('ii', $album_id, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($album = $rs->fetch_assoc()) {
			$album_name = $album['name'];

			$stm = $con->prepare("
				SELECT
					i.*,
					a.name album_name
				FROM imgs i
				JOIN albums a
				ON i.album_id=a.id
				WHERE i.id=?
					AND a.user_id=?
					AND i.status=1
					AND a.status=1
			");
			$stm->bind_param('ii', $id, $meId);
			$stm->execute();

			if ($rs = $stm->get_result()) {
				if ($img = $rs->fetch_assoc()) {
					$id = $img['id'];
					$name = $img['name'];
					$type = $img['type'];

					$stm = $con->prepare("
						UPDATE imgs i
						JOIN albums a
						ON i.album_id=a.id
						SET i.album_id=?
						WHERE i.id=?
							AND i.status=1
							AND a.id!=?
							AND a.user_id=?
							AND a.status=1
					");
					$stm->bind_param('iiii', $album_id, $id, $album_id, $meId);
					$stm->execute();

					if ($con->affected_rows) {
						$img_album_id = $img['album_id'];
						$img_album_name = $img['album_name'];
						$date = date('Y-m-d');
						$time = date('H:i:s');

						$stm = $con->prepare("
							INSERT INTO histories_move_img (
								user_id,
								img_id,
								img_name,
								from_album_id,
								from_album_name,
								to_album_id,
								to_album_name,
								date,
								time
							)
							VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
						");
						$stm->bind_param(
							'iisisisss',
							$meId,
							$id,
							$name,
							$img_album_id,
							$img_album_name,
							$album_id,
							$album_name,
							$date,
							$time
						);

						if ($stm->execute()) {
							$con->commit();
							exit;
						}
					}
				}
			}
		}
	}

	$stm->close();
}

$con->rollback();
die('Di chuyển thất bại.');

$con->close();
