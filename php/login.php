<?php
require 'util.php';

if (!$meId) {
	$name = $_POST['name'];
	$pass = $_POST['pass'];

	if (
		preg_match('/^[a-zA-Z\d_\-]{6,50}$/', $name) &&
		preg_match('/^.{6,50}$/', $pass)
	) {
		$stm = $con->prepare("SELECT id, pass FROM users WHERE name=?");
		$stm->bind_param('s', $name);
		$stm->execute();

		if ($rs = $stm->get_result()) {
			if ($rs->num_rows) {
				$me = $rs->fetch_assoc();
				$pass = md5(sha1($pass.SALT.$name));

				if ($pass === $me['pass']) {
					$_SESSION['id'] = $me['id'];
				}
				else {
					die('Mật khẩu không đúng.');
				}
			}
			else {
				die('Tên tài khoản không tồn tại.');
			}
		}

		$stm->close();
	}
}

$con->close();
