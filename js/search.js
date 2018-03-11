loadSuggestAlbums();

function loadSuggestAlbums() {
	let params = new URLSearchParams(location.search);

	getAlbums({
		start: 0,
		len: 20,
		elm: $(".search"),
		user_id: 0,
		search: params.get("search"),
		isSearch: true
	});
}
