if (meId) {
	let $myAlbums = $('.myAlbums');

	loadMyAlbums();

	function loadMyAlbums(selectedId) {
		getAlbums({
			start: 0,
			len: 20,
			elm: $myAlbums.find(".list"),
			selectedId
		});
	}

	$myAlbums
		.find(".btnCreateAlbum")
			.click(event => {
				Modal.createAlbum(albumId => {
					loadMyAlbums(albumId);
				});
			});
}
