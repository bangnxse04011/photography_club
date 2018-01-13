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
	$stm = $con->prepare("SELECT count(*) FROM albums WHERE name=? AND status=1");
	$stm->bind_param('s', $name);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($rs->fetch_row()[0]) {
			die('Tên album đã tồn tại.');
		}
		else {
			$now = date('Y-m-d H:i:s');

			$stm = $con->prepare(
				"INSERT INTO albums (name, date, location, date_created, date_last_upload, user_id, status)
				VALUES (?, ?, ?, ?, ?, ?, 1)"
			);
			$stm->bind_param('sssssi', $name, $date, $location, $now, $now, $meId);

			if (!$stm->execute()) {
				die('Thêm album thất bại.');
			}
			else {
				echo $con->insert_id;
			}
		}
	}
}

$con->close();
