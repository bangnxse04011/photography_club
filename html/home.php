<div class="w3-row w3-padding">
	<?php
	$_start = isset($_GET['start']) ? $_GET['start'] : 0;

	$albums = getAllAlbum($_start);

	foreach ($albums as $album) {
		?>
		<div class="w3-col s12 m4 l3">
			
		</div>
		<?php
	}
	?>
</div>
