<?php
require 'util.php';

$id = +$_POST['id'];

if ($meId && $id > 0) {
	$con->begin_transaction();

	$stm = $con->prepare("
		UPDATE albums
		SET status=0
		WHERE id=? AND user_id=? AND status=1
	");
	$stm->bind_param('ii', $id, $meId);

	if ($stm->execute()) {
		$stm = $con->prepare("
			UPDATE imgs
			SET status=0
			WHERE album_id=? AND status=1
		");
		$stm->bind_param('i', $id);

		if ($stm->execute()) {
			$con->commit();
		}
		else {
			$con->rollback();
			die('Xóa album thất bại.');
		}
	}
	else {
		$con->rollback();
		die('Xóa album thất bại.');
	}

	$stm->close();
}

$con->close();
