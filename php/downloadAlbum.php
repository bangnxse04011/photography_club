<?php
require 'util.php';

if ($meId) {
	$id = +$_GET['id'];
	$token = $_GET['token'];

	if ($id > 0 && $token === $meToken) {
		$count = 0;
		$price = 0;

		function compressAlbum(&$con, $album) {
			global $meId, $count, $price;

			if ($count == 0) {
				$album_id = $album['id'];
				$album_name = $album['name'];
				$date = date('Y-m-d');
				$time = date('H:i:s');

				$stm = $con->prepare("
					INSERT INTO histories_download_album (
						user_id,
						album_id,
						album_name,
						price,
						date,
						time
					)
					VALUES (?, ?, ?, ?, ?, ?)
				");
				$stm->bind_param(
					'iisiss',
					$meId,
					$album_id,
					$album_name,
					$price,
					$date,
					$time
				);
				$stm->execute();

				if ($con->affected_rows <= 0) {
					$con->rollback();
					die;
				}
			}

			if (class_exists("ZipArchive")) {
				$zip = new ZipArchive();
				$path = "../img/download/$album[id]-$meId.zip";

				if ($zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
					$stm = $con->prepare("
						SELECT *
						FROM imgs
						WHERE album_id=?
					");
					$stm->bind_param('i', $album['id']);
					$stm->execute();

					if ($rs = $stm->get_result()) {
						while ($img = $rs->fetch_assoc()) {
							$old_path = "../img/upload/$img[id].$img[type]";
							$new_path = "$img[id].$img[type]";

							if (!$zip->addFile($old_path, $new_path)) {
								$con->rollback();
								die;
							}
						}
					}

					$zip->close();

					header('Content-Type: application/zip');
					header('Content-Disposition: attachment; filename="'.basename($path).'"');
					header('Content-Length: '.filesize($path));
					header("Location: $path");

					$con->commit();
					exit;
				}
			}
		}

		$con->begin_transaction();

		$stm = $con->prepare("
			SELECT *
			FROM albums
			WHERE id=?
		");
		$stm->bind_param('i', $id);
		$stm->execute();

		if ($rs = $stm->get_result()) {
			if ($album = $rs->fetch_assoc()) {
				$album_price = +$album['price'];
				$price = $album_price;

				$stm = $con->prepare("
					SELECT count(0)
					FROM histories_download_album
					WHERE user_id=? AND album_id=?
				");
				$stm->bind_param('ii', $meId, $id);
				$stm->execute();

				if ($rs = $stm->get_result()) {
					$count = $rs->fetch_row()[0];

					if ($count == 0) {
						if ($me['money'] >= $album_price) {
							if ($album['user_id'] != $meId) {
								$stm = $con->prepare("
									UPDATE users
									SET money=money-?
									WHERE id=?
								");
								$stm->bind_param('ii', $price, $meId);
								$stm->execute();

								if ($con->affected_rows > -1) {
									compressAlbum($con, $album);
								}
							}
							else {
								$price = 0;
								compressAlbum($con, $album);
							}
						}
						else {
							if ($album['user_id'] == $meId) {
								$price = 0;
								compressAlbum($con, $album);
							}
						}
					}
					else {
						compressAlbum($con, $album);
					}
				}
			}
		}

		$con->rollback();
		die;
	}
}

$con->close();
