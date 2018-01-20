if (meId) {
	loadMyAlbums();

	function loadMyAlbums() {
		getAlbums({
			start: 0,
			len: 20,
			elm: $(".myAlbums")
		});
	}
}
