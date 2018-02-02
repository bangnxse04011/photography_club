<?php
$id = $_GET['id'];
$type = $_GET['type'];
$s = isset($_GET['s']) ? $_GET['s'] : 256;

header ("Content-Type: image/$type");

if ($type === "png") {
	$dest = @imagecreatefrompng("img/upload/$id.$type");
}
else if ($type === "gif") {
	$dest = @imagecreatefromgif("img/upload/$id.$type");
}
else {
	$dest = @imagecreatefromjpeg("img/upload/$id.$type");
}

$dw = imagesx($dest);
$dh = imagesy($dest);

if ($dw > $dh) {
	$h = $s;
	$w = floor($dw / $dh * $s);
}
else {
	$w = $s;
	$h = floor($dh / $dw * $s);
}

$img = imagecreatetruecolor($w, $h);

imagecopyresized($img, $dest, 0, 0, 0, 0, $w, $h, $dw, $dh);

if ($type === "png") {
	imagepng($img);
}
else if ($type === "gif") {
	imagegif($img);
}
else {
	imagejpeg($img);
}

imagedestroy($img);
