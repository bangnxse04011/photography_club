<?php
include 'util.php';

$name = $_POST['name'];
$date = $_POST['date'];
$location = $_POST['location'];

if (
	preg_match('/^.{1,200}$/', $name) &&
	(preg_match('/^\d{4,6}-[01]\d-[0-3]\d$/', $date) || !$date)
) {
	$query = sprintf("SELECT id FROM albums WHERE name='%s'", $name);

	if ($rs = $con->query($query)) {
		if ($rs->num_rows) {
			die('Tên album đã tồn tại.');
		}
		else {
			$now = date('Y-m-d H:i:s');

			$query = sprintf(
				"INSERT INTO albums (name, date, location, date_created, date_last_upload, user_id)
				VALUES ('%s', '%s', '%s', '%s', '%s', %d)",
				$name, $date, $location, $now, $now, $meId
			);

			if (!$con->query($query)) {
				die('Đã xảy ra lỗi, không thể thêm album.');
			}
		}
	}
}

$con->close();
