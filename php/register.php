<?php
include 'util.php';

if (!$meId) {
	$name = $_POST['name'];
	$pass = $_POST['pass'];
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];

	if (
		preg_match('/^[a-zA-Z\d_\-]{6,50}$/', $name) &&
		preg_match('/^.{6,50}$/', $pass) &&
		preg_match('/^.{1,50}$/', $first_name) &&
		preg_match('/^.{1,50}$/', $last_name)
	) {
		$query = sprintf("SELECT id FROM users WHERE name='%s'", $name);

		if ($rs = $con->query($query)) {
			if ($rs->num_rows) {
				die('Tên tài khoản đã tồn tại.');
			}
			else {
				$pass = md5($pass);

				$query = sprintf(
					"INSERT INTO users (name, pass, first_name, last_name)
					VALUES ('%s', '%s', '%s', '%s')",
					$name, $pass, $first_name, $last_name
				);

				if ($con->query($query)) {
					$_SESSION['id'] = $con->insert_id;
				}
			}
		}
	}
}

$con->close();
