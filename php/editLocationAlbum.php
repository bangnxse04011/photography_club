<?php
require 'util.php';

$location = $_POST['location'];
$album_id = $_POST['album_id'];

if (
	$meId &&
	preg_match('/^.{0,200}$/', $location) &&
	$album_id > 0
) {
	$stm = $con->prepare("
		UPDATE albums
		SET location=?
		WHERE id=? AND user_id=? AND status=1
	");
	$stm->bind_param('sii', $location, $album_id, $meId);
	$stm->execute();

	if (!$con->affected_rows) {
		die('Sửa địa điểm album thất bại.');
	}
}

$con->close();
