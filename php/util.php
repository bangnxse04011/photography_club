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
$view = 'home';
$meToken = '';

$con = @new mysqli(SERVER, USERNAME, PASSWORD, DATABASE);

if ($con->connect_errno) {
	die('Kết nối dữ liệu thất bại: '.$con->connect_error);
}

$con->set_charset('utf8');
date_default_timezone_set(TIMEZONE);

if (isset($_GET['view'])) {
	$view = $_GET['view'];
}

if ($meId) {
	function getMe() {
		global $meId, $con, $me, $sett, $meToken;

		$query = "SELECT * FROM users WHERE id=$meId";

		if ($rs = $con->query($query)) {
			$me = $rs->fetch_assoc();
			$meToken = sha1(
				sha1(
					$me['last_name'].
					md5($me['name']).
					'@sAlt:#493'
				).
				$me['id'].
				$me['name'].
				md5(
					$me['date_created'].
					$me['first_name']
				)
			);
		}

		$query = "SELECT * FROM users_setting WHERE user_id=$meId";

		if ($rs = $con->query($query)) {
			$sett = $rs->fetch_assoc();

			foreach ($sett as $k => $v) {
				$sett[$k] = is_numeric($v) ? +$v : $v;
			}
		}
	}

	getMe();
}

function strtolatin($str) {
	$map = [
		'a' => '/à|á|ả|ã|ạ|ă|ằ|ắ|ẳ|ẵ|ặ|â|ầ|ấ|ẩ|ẫ|ậ/',
		'e' => '/ê|ề|ế|ể|ễ|ệ/',
		'i' => '/ì|í|ỉ|ĩ|ị/',
		'o' => '/ò|ó|ỏ|õ|ọ|ô|ồ|ố|ổ|ỗ|ộ|ơ|ờ|ớ|ở|ỡ|ợ/',
		'u' => '/ù|ú|ủ|ũ|ụ|ư|ừ|ứ|ử|ữ|ự/',
		'y' => '/ỳ|ý|ỷ|ỹ|ỵ/',
		'd' => '/đ/',
		'A' => '/À|Á|Ả|Ã|Ạ|Ă|Ằ|Ắ|Ẳ|Ẵ|Ặ|Â|Ầ|Ấ|Ẩ|Ẫ|Ậ/',
		'E' => '/Ê|Ề|Ế|Ể|Ễ|Ệ/',
		'I' => '/Ì|Í|Ỉ|Ĩ|Ị/',
		'O' => '/Ò|Ó|Ỏ|Õ|Ọ|Ô|Ồ|Ố|Ổ|Ỗ|Ộ|Ơ|Ờ|Ớ|Ở|Ỡ|Ợ/',
		'U' => '/Ù|Ú|Ủ|Ũ|Ụ|Ư|Ừ|Ứ|Ử|Ữ|Ự/',
		'Y' => '/Ỳ|Ý|Ỷ|Ỹ|Ỵ/',
		'D' => '/Đ/'
	];

	foreach ($map as $replacement => $pattern) {
		$str = mb_ereg_replace($pattern, $replacement, $str);
	}

	return $str;
}
