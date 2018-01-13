<?php
ob_start();
session_start();

require_once 'config.php';

$regex = [
	'email' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
];

$meId = isset($_SESSION['id']) ? +$_SESSION['id'] : 0;
$me = [];
$sett = [];
$view = "home";

$con = new mysqli(SERVER, USERNAME, PASSWORD, DATABASE);

if ($con->connect_errno) {
	die('Kết nối dữ liệu thất bại: '.$con->connect_error);
}

$con->set_charset('utf8');
date_default_timezone_set(TIMEZONE);

if (isset($_GET['view'])) {
	$view = $_GET['view'];
}

if ($meId) {
	$query = "SELECT * FROM users WHERE id=$meId";

	if ($rs = $con->query($query)) {
		$me = $rs->fetch_assoc();
	}

	$query = "SELECT * FROM users_setting WHERE user_id=$meId";

	if ($rs = $con->query($query)) {
		$sett = $rs->fetch_assoc();

		foreach ($sett as $k => $v) {
			$sett[$k] = is_numeric($v) ? +$v : $v;
		}
	}
}
