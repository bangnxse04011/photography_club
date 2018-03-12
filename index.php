<?php require 'php/util.php' ?>

<!DOCTYPE html>
<html lang="vi">
<head>
	<title>Photography Club</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="icon" href="favicon.ico">

	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&amp;subset=latin-ext,vietnamese" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	<?php if (file_exists("css/$view.css")) { ?>
	<link rel="stylesheet" href="css/<?php echo $view ?>.css">
	<?php } ?>

	<link rel="prefetch" href="img/img.png">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.rawgit.com/julianshapiro/velocity/master/velocity.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
	<script src="https://cdn.rawgit.com/hammerjs/jquery.hammer.js/90c2f3bb/jquery.hammer.js"></script>
	<script src="https://apis.google.com/js/api:client.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCBJLRR00S6HS7aChSNHHce-rpiylOcsU&libraries=places"></script>

	<script>
		$(function() {
			"use strict";

			<?php
			require 'js/init.php';
			require 'js/social.js';
			require 'js/func.js';
			require 'js/modal.js';
			require 'js/script.js';
			?>

			(function() {
				<?php if (file_exists("js/$view.js")) require "js/$view.js" ?>
			})();
		});
	</script>
</head>
<body>
	<?php require 'html/header.php' ?>

	<div id="section" style="visibility:hidden">
		<?php require 'html/sidebar.php' ?>

		<div id="main">
			<?php require file_exists("html/$view.php") ? "html/$view.php" : "html/404.php" ?>
		</div>
	</div>

	<?php
	require 'html/footer.php';
	?>
</body>
</html>
