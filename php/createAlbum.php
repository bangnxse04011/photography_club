<?php
require 'util.php';

$name = trim($_POST['name']);
$date = $_POST['date'];
$location = $_POST['location'];

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
			$now = date('Y-m-d H:i:s');

			$stm = $con->prepare("
				INSERT INTO albums (name, date, location, date_created,
					date_last_upload, user_id, status)
				VALUES (?, ?, ?, ?, ?, ?, 1)
			");
			$stm->bind_param('sssssi', $name, $date, $location, $now, $now, $meId);

			if ($stm->execute()) {
				$insert_id = $con->insert_id;

				echo $insert_id;
			}
			else {
				die('Thêm album thất bại.');
			}
		}
	}
	else {
		die('Đã xảy ra lỗi, hãy thử lại.');
	}
}

$con->close();
