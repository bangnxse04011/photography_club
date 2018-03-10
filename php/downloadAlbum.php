<?php
require 'util.php';

if ($meId) {
	$id = +$_GET['id'];
	$token = $_GET['token'];

	if ($id > 0 && $token === $meToken) {
		$count = 0;

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

				$stm = $con->prepare("
					SELECT count(0)
					FROM histories_download_album
					WHERE user_id=? AND album_id=?
				");
				$stm->bind_param('ii', $meId, $id);
				$stm->execute();

				if ($rs = $stm->get_result()) {
					$count = $stm->fetch_row()[0];

					if ($count > 0) {
						if ($me['money'] >= $album_price && $album['user_id'] != $meId) {
							$stm = $con->prepare("
								UPDATE users
								SET money=money-?
								WHERE id=?
							");
							$stm->bind_param('ii', $album_price, $meId);

							if ($stm->execute()) {
								compressAlbum($con, $album);
							}
						}
						else {
							compressAlbum($con, $album);
						}
					}
					else {
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
							$album_price,
							$date,
							$time
						);

						if ($stm->execute()) {
							compressAlbum($con, $album);
						}
					}
				}
			}
		}

		function compressAlbum(&$con, $album) {
			// $con->commit();
			// exit;
		}

		$con->rollback();
		die;
	}
}

$con->close();
