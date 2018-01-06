<?php
include 'php/util.php';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
	<meta charset="utf-8">
	<title>Photography Club</title>

	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&amp;subset=latin-ext,vietnamese" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<script>
		$(function() {
			"use strict";

			let view, meId, me;

			view = new URLSearchParams(location.search).get("view");
			meId = <?php echo $meId ?>;
			me = <?php
				$tmp = $me;
				unset($tmp['pass']);
				echo json_encode($tmp);
			?>;

			<?php
			include 'js/func.js';
			include 'js/modal.js';
			include 'js/script.js';
			?>
		});
	</script>
</head>
<body class="w3-light-gray">
	<?php
	include 'html/header.php';
	include 'html/sidebar.php';
	?>

	<div id="main">
		<?php
		if (isset($_GET['view'])) {
			include 'html/'.$_GET['view'].'.php';
		}
		else {
			include 'html/home.php';
		}
		?>
	</div>

	<?php
	include 'html/footer.php';
	?>
</body>
</html>
