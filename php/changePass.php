<?php
require 'util.php';

$pass = $_POST['pass'];
$newpass = $_POST['newpass'];

if ($meId && $pass && $newpass) {
	$name = $me['name'];
	$pass = md5(sha1($pass.SALT.$name));

	$stm = $con->prepare("
		SELECT count(0) FROM users
		WHERE pass=? AND id=?
	");
	$stm->bind_param('si', $pass, $meId);
	$stm->execute();

	if ($rs = $stm->get_result()) {
		if ($rs->fetch_row()[0]) {
			$newpass = md5(sha1($newpass.SALT.$name));

			$stm = $con->prepare("
				UPDATE users
				SET pass=?
				WHERE id=?
			");
			$stm->bind_param('si', $newpass, $meId);
			$stm->execute();

			if (!$con->affected_rows) {
				die('Đổi mật khẩu thất bại.');
			}
		}
		else {
			die('Mật khẩu hiện tại không đúng.');
		}
	}
}

$con->close();
