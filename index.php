<?php
require 'php/util.php';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
	<meta charset="utf-8">
	<title>Photography Club</title>

	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&amp;subset=latin-ext,vietnamese" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	<?php if (file_exists("css/$view.css")) { ?>
	<link rel="stylesheet" href="css/<?php echo $view ?>.css">
	<?php } ?>

	<link rel="prefetch" href="https://png.icons8.com/office/80/picture.png">

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
<body class="w3-light-gray">
	<?php require 'html/header.php' ?>

	<div id="section">
		<?php require 'html/sidebar.php' ?>

		<div id="main">
			<?php require "html/$view.php" ?>
		</div>
	</div>

	<?php
	require 'html/footer.php';
	?>
</body>
</html>
