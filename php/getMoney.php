<?php
require 'util.php';

if ($meId) {
	$result = $con->query("
		SELECT money
		FROM users
		WHERE id=$meId
	");

	$money = +$result->fetch_assoc()['money'];

	echo $money;
}

$con->close();
