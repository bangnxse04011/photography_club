<?php
require 'util.php';
require_once 'lib/google-api-php-client/vendor/autoload.php';

$id_token = $_POST['id_token'];

if ($id_token) {
	$client = new Google_Client(['client_id' => GOOGLE_CLIENT_ID]);
	$payload = $client->verifyIdToken($id_token);

	if ($payload) {
		$name = $payload['sub'];
		var_dump($payload);
	}
	else {
		die('ID Token không hợp lệ.');
	}
}

$con->close();
