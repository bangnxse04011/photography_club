loadMyAlbum();

function loadMyAlbum() {
	let param;

	param = new URLSearchParams(location.search);

	getAlbum({
		id: +param.get("id"),
		start: 0,
		len: 20,
		elm: $(".myAlbum")
	});
}
