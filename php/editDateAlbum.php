<?php
require 'util.php';

$date = $_POST['date'];
$album_id = $_POST['album_id'];

if (
	$meId &&
	(preg_match('/^\d{4,6}-[01]\d-[0-3]\d$/', $date) || !$date) &&
	$album_id > 0
) {
	$stm = $con->prepare("
		UPDATE albums
		SET date=?
		WHERE id=? AND user_id=? AND status=1
	");
	$stm->bind_param('sii', $date, $album_id, $meId);

	if (!$stm->execute()) {
		die('Sửa ngày chụp album thất bại.');
	}
}

$con->close();
