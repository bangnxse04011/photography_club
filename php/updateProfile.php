<?php
require 'util.php';

if ($meId) {
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];
	$email = $_POST['email'];

	if (
		$first_name &&
		$last_name &&
		preg_match('/.+@.+\..+/', $email)
	) {
		$stm = $con->prepare("
			UPDATE users
			SET
				first_name=?,
				last_name=?,
				email=?
			WHERE id=?
		");
		$stm->bind_param(
			"sssi",
			$first_name,
			$last_name,
			$email,
			$meId
		);

		if ($stm->execute()) {
			echo '1';
		}
		else {
			echo '';
		}
	}
}

$con->close();
