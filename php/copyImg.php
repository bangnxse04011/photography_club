<?php
require 'util.php';

$id = +$_POST['id'];
$album_id = +$_POST['album_id'];
$is_same_album = +$_POST['is_same_album'];

$fail = json_encode(['Sao chép thất bại.', '']);

if ($meId && $id > 0 && $album_id > 0) {
	$img = '';

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
			$con->begin_transaction();

			$id = $img['id'];
			$name = $img['name'];
			$date_upload = $img['date_upload'];
			$type = $img['type'];

			$stm = $con->prepare("
				INSERT INTO imgs (name, album_id, date_upload, type, status)
				VALUES (?, ?, ?, ?, 1)
			");
			$stm->bind_param('siss', $name, $album_id, $date_upload, $type);

			if ($stm->execute()) {
				$img['id'] = $con->insert_id;

				if (copy(
					"../img/upload/$id.$type",
					"../img/upload/$img[id].$type"
				)) {
					echo json_encode(['', $is_same_album ? $img : '']);
					$con->commit();
				}
				else {
					$con->rollback();
					die($fail);
				}
			}
			else {
				$con->rollback();
				die($fail);
			}
		}
		else {
			die($fail);
		}
	}
	else {
		die($fail);
	}

	$stm->close();
}

$con->close();
