<?php
require 'util.php';

$name = trim($_POST['name']);
$date = isset($_POST['date']) ? $_POST['date'] : '';
$location = isset($_POST['location']) ? $_POST['location'] : '';

$con->begin_transaction();

if (
	$meId &&
	preg_match('/^.{1,200}$/', $name) &&
	(preg_match('/^\d{4,6}-[01]\d-[0-3]\d$/', $date) || !$date) &&
	preg_match('/^.{0,200}$/', $location)
) {
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
			$date = date("Y-m-d");
			$time = date("H:i:s");
			$datetime = "$date $time";

			$stm = $con->prepare("
				INSERT INTO albums (
					name,
					date,
					location,
					date_created,
					date_last_upload,
					user_id,
					status
				)
				VALUES (?, ?, ?, ?, ?, ?, 1)
			");
			$stm->bind_param(
				'sssssi',
				$name,
				$date,
				$location,
				$datetime,
				$datetime,
				$meId
			);

			if ($stm->execute()) {
				$insert_id = $con->insert_id;

				$stm = $con->prepare("
					INSERT INTO histories_create_album (
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
					$insert_id,
					$name,
					$date,
					$time
				);

				if ($stm->execute()) {
					$con->commit();
					echo $insert_id;
					exit;
				}
			}
		}
	}

	$stm->close();
}

$con->rollback();
die('Thêm album thất bại.');

$con->close();
