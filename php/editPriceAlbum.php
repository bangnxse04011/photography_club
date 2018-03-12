<?php
require 'util.php';

$price = +$_POST['price'];
$album_id = +$_POST['album_id'];

if (
	$meId &&
	$price >= 0 && $price <= 1e7 &&
	$album_id > 0
) {
	$stm = $con->prepare("
		UPDATE albums
		SET price=?
		WHERE id=? AND user_id=? AND status=1
	");
	$stm->bind_param('iii', $price, $album_id, $meId);
	$stm->execute();

	if (!$con->affected_rows) {
		die('Sửa giá tiền album thất bại.');
	}
}

$con->close();
