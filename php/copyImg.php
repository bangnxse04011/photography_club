<?php
require 'util.php';

$id = +$_POST['id'];
$album_id = +$_POST['album_id'];
$is_same_album = +$_POST['is_same_album'];

$fail = json_encode(['Sao chép thất bại.', '']);

$con->begin_transaction();

if ($meId && $id > 0 && $album_id > 0) {
	$img = '';

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
					AND a.status=1
					AND i.status=1
			");
			$stm->bind_param('ii', $id, $meId);
			$stm->execute();

			if ($rs = $stm->get_result()) {
				if ($img = $rs->fetch_assoc()) {
					$id = $img['id'];
					$name = $img['name'];
					$date_upload = $img['date_upload'];
					$type = $img['type'];

					$stm = $con->prepare("
						INSERT INTO imgs (
							name,
							album_id,
							date_upload,
							type,
							status
						)
						VALUES (?, ?, ?, ?, 1)
					");
					$stm->bind_param('siss', $name, $album_id, $date_upload, $type);

					if ($stm->execute()) {
						$insert_id = $con->insert_id;

						$img_album_id = $img['album_id'];
						$img_album_name = $img['album_name'];
						$date = date('Y-m-d');
						$time = date('H:i:s');

						$stm = $con->prepare("
							INSERT INTO histories_copy_img (
								user_id,
								img_id,
								insert_img_id,
								img_name,
								from_album_id,
								from_album_name,
								to_album_id,
								to_album_name,
								date,
								time
							)
							VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
						");
						$stm->bind_param(
							'iiisisisss',
							$meId,
							$id,
							$insert_id,
							$name,
							$img_album_id,
							$img_album_name,
							$album_id,
							$album_name,
							$date,
							$time
						);
						if ($stm->execute()) {
							$img['id'] = $insert_id;

							if (copy(
								"../img/upload/$id.$type",
								"../img/upload/$img[id].$type"
							)) {
								$con->commit();
								exit(json_encode(['', $is_same_album ? $img : '']));
							}
						}
					}
				}
			}
		}
	}

	$stm->close();
}

$con->rollback();
die($fail);

$con->close();
