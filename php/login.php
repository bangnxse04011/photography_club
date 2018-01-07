<?php
include 'util.php';

if (!$meId) {
	$name = $_POST['name'];
	$pass = $_POST['pass'];

	if (
		preg_match('/^[a-zA-Z\d_\-]{6,50}$/', $name) &&
		preg_match('/^.{6,50}$/', $pass)
	) {
		$query = sprintf("SELECT id, pass FROM users WHERE name='%s'", $name);

		if ($rs = $con->query($query)) {
			if ($rs->num_rows) {
				$me = $rs->fetch_assoc();
				$pass = md5($pass);

				if ($pass === $me['pass']) {
					$_SESSION['id'] = $me['id'];
				}
				else {
					die('Wrong username or password.');
				}
			}
			else {
				die('Username does not exit, try again.');
			}
		} else {
			die('Error, try again.');
		}
	}
}

$con->close();
