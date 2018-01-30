const GOOGLE_CLIENT_ID = "<?php echo GOOGLE_CLIENT_ID ?>";

let view,
	meId,
	me,
	sett,
	xhrSearchSuggest,
	$viewImg,
	$searchSuggest = $(searchSuggest);

view = new URLSearchParams(location.search).get("view");
meId = <?php echo $meId ?>;
me = <?php
	$tmp = $me;
	unset($tmp['pass']);
	echo json_encode($tmp);
?>;
sett = <?php
	$tmp = $sett;
	unset($tmp['user_id']);
	echo json_encode($sett);
?>;
