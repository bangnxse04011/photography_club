<?php
require 'util.php';

$start = isset($_GET['start']) ? +$_GET['start'] : 0;
$len = isset($_GET['len']) ? +$_GET['len'] : 20;
$rand = isset($_GET['rand']) ? +$_GET['rand'] : 0;
$user_id = isset($_GET['user_id']) ? +$_GET['user_id'] : $meId;
$search = isset($_GET['search']) ? $_GET['search'] : '';

$albums = [];
$num = 0;

$order_by = $rand ? 'ORDER BY rand()' : '';

if ($user_id === -1) {
	$where_user_id = "albums.user_id!=$meId";
}
else if ($user_id === 0) {
	$where_user_id = '1=1';
}
else {
	$where_user_id = "albums.user_id=$user_id";
}

$search = "%$search%";

$tmp = $start * $len;

$stm = $con->prepare("
	SELECT albums.*, users.name user_name
	FROM albums
	JOIN users
	ON albums.user_id=users.id
	WHERE $where_user_id AND albums.name LIKE ? AND albums.status=1
	$order_by
	LIMIT ?, ?
");
$stm->bind_param('sii', $search, $tmp, $len);
$stm->execute();

if ($rs = $stm->get_result()) {
	while ($album = $rs->fetch_assoc()) {
		$album['num_img'] = 0;
		$album['imgs'] = [];

		$stm = $con->prepare("
			SELECT count(*) FROM imgs
			WHERE album_id=? AND status=1
		");
		$stm->bind_param('i', $album['id']);
		$stm->execute();

		if ($rs2 = $stm->get_result()) {
			$album['num_img'] = +$rs2->fetch_row()[0];
		}

		if ($album['num_img'] > 0) {
			$stm = $con->prepare("
				SELECT imgs.* FROM imgs
				WHERE album_id=? AND status=1
				ORDER BY date_upload DESC
				LIMIT 5
			");
			$stm->bind_param('i', $album['id']);
			$stm->execute();

			if ($rs2 = $stm->get_result()) {
				while ($img = $rs2->fetch_assoc()) {
					$album['imgs'][] = $img;
				}
			}
		}

		$albums[] = $album;
	}
}

$query = "SELECT count(*) FROM albums WHERE $where_user_id AND status=1";

if ($rs = $con->query($query)) {
	$num = $rs->fetch_row()[0];
}

echo json_encode([$albums, $num]);

$stm->close();
$con->close();
