<?php
if ($_SERVER['SERVER_NAME'] === 'localhost') {
	define('SERVER', 'localhost');
	define('USERNAME', 'root');
	define('PASSWORD', '');
	define('DATABASE', 'photography_club');
}
else {
	define('SERVER', '');
	define('USERNAME', '');
	define('PASSWORD', '');
	define('DATABASE', '');
}

define('TIMEZONE', 'Asia/Ho_Chi_Minh');

define('SALT', "\x23\x31\x33\x70\x68\xd4\x74\x30\x67\x52\x40\x46\x59\x2e象た\x3f\x22");

define('GOOGLE_CLIENT_ID', '281131699200-bo7hdfc1i2fqdt43sdavok8n23g5cigt.apps.googleusercontent.com');
