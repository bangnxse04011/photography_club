loadHomeMyAlbum();

function loadHomeMyAlbum() {
	getAlbums({
		start: 0,
		len: 8,
		elm: homeMyAlbum,
		pages: false,
		rand: true
	});
}
