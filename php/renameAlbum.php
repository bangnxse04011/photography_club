<?php
require 'util.php';

$name = trim($_POST['name']);
$album_id = $_POST['album_id'];

$con->begin_transaction();

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
			$con->rollback();
			die('Tên album đã tồn tại.');
		}
		else {
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
						UPDATE albums
						SET name=?
						WHERE id=? AND user_id=? AND status=1
					");
					$stm->bind_param('sii', $name, $album_id, $meId);
					$stm->execute();

					if ($con->affected_rows) {
						$date = date('Y-m-d');
						$time = date('H:i:s');

						$stm = $con->prepare("
							INSERT INTO histories_rename_album (
								user_id,
								album_id,
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
							$album_id,
							$album_name,
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
		}
	}

	$stm->close();
}

$con->rollback();
die('Đổi tên album thất bại.');

$con->close();
