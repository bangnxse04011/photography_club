$(".userBtnSm").html($(".userBtnMdLg").html());

$(window)
	.resize(function(event) {
		$("#searchSuggest")
			.css({
				width: $("#search").outerWidth(),
				marginTop: $("#search").outerHeight()
			});

		$("#section").css({
			paddingTop: $("#header").innerHeight()
		});

		if (window.innerWidth < 601) {
			$("#sidebar").hide();
		}
		else {
			$("#sidebar").show();
		}
	})
	.resize();

$(".w3-dropdown-click").click(function() {
	$(this)
		.find("> .w3-dropdown-content")
		.toggle();
});

if (!meId) {
	$(".btnRegister").click(event => {
		Modal.register();
	});

	$(".btnLogin").click(event => {
		Modal.login();
	});
}

$("#btnSidebar").click(event => {
	$("#sidebar").toggle();
});

$("#search")
	.on("input", function(event) {
		let $searchSuggest = $("#searchSuggest");

		if (xhrSearchSuggest) {
			xhrSearchSuggest.abort();
		}

		if (this.value) {
			xhrSearchSuggest = $.getJSON("php/getAlbums.php", {
				len: 8,
				user_id: 0,
				search: this.value
			}, ([albums, num]) => {
				$searchSuggest.empty();

				if (albums.length) {
					let $head = $(`
						<li class="w3-row w3-light-gray">Album</li>
					`);
					$searchSuggest.append($head);

					for (let album of albums) {
						let $album;

						$album = $(`
							<li class="w3-row w3-pointer w3-hover-light-gray">
									<div class="w3-col s2">
										<img src="img/upload/${album.imgs[0].id}.${album.imgs[0].type}" style="width:28px;height:28px;object-fit:cover">
									</div>
									<div class="w3-col s10 w3-ellipsis">${text(album.name)}</div>
							</li>
						`);
						$searchSuggest.append($album);

						$album
							.click(function(event) {
								location.href = `?view=album&id=${album.id}`;
							});
					}
				}
			});
		}
		else {
			$searchSuggest.empty();
		}
	});

$(".upload").click(event => {
	Modal[meId ? "upload" : "login"]();
});

$(".setting").click(event => {
	Modal.setting();
});
