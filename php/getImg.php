<?php
require 'util.php';

$id = $_GET['id'];
$album_id = $_GET['album_id'];

$prev = null;
$img = null;
$next = null;
$index = -1;

if ($id > 0) {
	$stm = $con->prepare("SELECT * FROM imgs WHERE album_id=?");
	$stm->bind_param('i', $album_id);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		while ($img = $rs->fetch_assoc()) {
			$index++;

			if ($img['id'] == $id) {
				$next = $rs->fetch_assoc();

				break;
			}

			$prev = $img;
		}
	}

	echo json_encode([$prev, $img, $next, $index]);
}

$con->close();
