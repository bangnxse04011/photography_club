<?php
require 'util.php';

if (!$meId) {
	$name = $_POST['name'];
	$pass = $_POST['pass'];
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];
	$email = $_POST['email'];

	if (
		preg_match('/^[a-zA-Z\d_\-]{6,50}$/', $name) &&
		preg_match('/^.{6,50}$/', $pass) &&
		preg_match('/^.{1,50}$/', $first_name) &&
		preg_match('/^.{1,50}$/', $last_name) &&
		(preg_match($regex['email'], $email) || !$email)
	) {
		$stm = $con->prepare("SELECT id FROM users WHERE name=?");
		$stm->bind_param('s', $name);
		$stm->execute();

		if ($rs = $stm->get_result()) {
			if ($rs->num_rows) {
				die('Tên tài khoản đã tồn tại.');
			}
			else {
				$pass = md5(sha1($pass.SALT.$name));
				$date_created = date('Y-m-d');

				$con->begin_transaction();

				$stm = $con->prepare("
					INSERT INTO users (name, pass, first_name, last_name,
						email, date_created, status)
					VALUES (?, ?, ?, ?, ?, ?, 1)
				");
				$stm->bind_param(
					'ssssss',
					$name, $pass, $first_name, $last_name, $email, $date_created
				);

				if ($stm->execute()) {
					$stm = $con->prepare("
						INSERT INTO users_setting ()
						VALUES ()
					");

					if ($stm->execute()) {
						$_SESSION['id'] = $con->insert_id;

						$con->commit();
					}
					else {
						$con->rollback();

						die('Đã xảy ra lỗi, hãy thử lại.');
					}
				}
				else {
					$con->rollback();

					die('Đã xảy ra lỗi, hãy thử lại.');
				}
			}
		}
		else {
			die('Đã xảy ra lỗi, hãy thử lại.');
		}

		$stm->close();
	}
}

$con->close();
