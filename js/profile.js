function loadProfile() {
	let $date_created;

	$date_created = $(".formProfile__date_created");

	$date_created.val(dateStr($date_created.val()));
}

loadProfile();
