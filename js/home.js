loadHome();

function loadHome() {
	getAlbums({
		start: 0,
		len: 8,
		elm: $(".homeSuggestAlbum"),
		pages: false,
		rand: true,
		user_id: -1,
		isNotHasCreateAlbum: true
	});

	if (meId) {
		getAlbums({
			start: 0,
			len: 8,
			elm: $(".homeMyAlbum"),
			pages: false
		});
	}
}
