loadSuggestAlbums();

function loadSuggestAlbums() {
	getAlbums({
		start: 0,
		len: 20,
		elm: $(".suggestAlbums"),
		rand: true,
		user_id: -1
	});
}
