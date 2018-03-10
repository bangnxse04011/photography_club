<?php
require 'util.php';

$id = +$_GET['id'];
$start = isset($_GET['start']) ? +$_GET['start'] : 0;
$len = isset($_GET['len']) ? +$_GET['len'] : 20;

$album = null;

if ($id > 0 && $start >= 0 && $len > 0) {
	$stm = $con->prepare("
		SELECT
			albums.*,
			users.name user_name,
			users.first_name user_first_name,
			users.last_name user_last_name
		FROM albums
		JOIN users
		ON albums.user_id=users.id
		WHERE albums.id=?
			AND albums.status=1
	");
	$stm->bind_param('i', $id);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		$album = $rs->fetch_assoc();

		$album['num_img'] = 0;
		$album['imgs'] = [];

		$stm = $con->prepare("SELECT count(*) FROM imgs WHERE album_id=? AND status=1");
		$stm->bind_param('i', $id);
		$stm->execute();

		if ($rs = $stm->get_result()) {
			$album['num_img'] = $rs->fetch_row()[0];

			$stm = $con->prepare("
				SELECT * FROM imgs
				WHERE album_id=? AND status=1
				LIMIT ?, ?
			");
			$stm->bind_param('iii', $id, $start, $len);
			$stm->execute();

			if ($rs = $stm->get_result()) {
				while ($img = $rs->fetch_assoc()) {
					$album['imgs'][] = $img;
				}
			}
		}
	}

	$stm->close();
}

echo json_encode($album);

$con->close();
