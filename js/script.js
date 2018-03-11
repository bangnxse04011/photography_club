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

		$("#main").css({
			height: `calc(100% - ${header.clientHeight}px)`
		});
	})
	.resize();

$(document)
	.keydown(event => {
		key = event.key;

		switch (key) {
			case "ArrowLeft":
				if ($viewImg) {
					$viewImg.prev.click();
				}
				break;

			case "ArrowRight":
				if ($viewImg) {
					$viewImg.next.click();
				}
				break;

			case "Escape":
				if (modals.childElementCount && keydownOnce) {
					$(modals.lastElementChild).data("$")().fn.close();
				}
				break;
		}

		if (keydownOnce) {
			keydownOnce = false;
		}
	})
	.keyup(event => {
		key = "";
		keydownOnce = true;
	});

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
else {
	$(".btnPayIn").click(event => {
		Modal.payIn();
	});

	$(".btnChangePass").click(event => {
		Modal.changePass();
	});
}

active($(`#sidebar> [data-view=${view}]`), 0, "", "w3-light-gray");

$("#btnSidebar")
	.click((event) => {
		$("#sidebar").toggle();
		$("#main").css({
			width: `calc(100% - ${sidebar.clientWidth}px)`
		});

		sessionStorage.sidebar = sidebar.clientWidth ? "show" : "hide";
	});

if (sessionStorage.sidebar === "hide") {
	$("#sidebar").hide();
}

$("#main").css({
	width: `calc(100% - ${sidebar.clientWidth}px)`
});

frmSearch.onsubmit = function(event) {
	event.preventDefault();

	location.assign("?view=search&search=" + encodeURIComponent(search.value));
};

$(search)
	.on("input", function(event) {
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
									<img src="thumb.php?id=${album.imgs[0].id}&type=${album.imgs[0].type}&s=24" style="width:24px;height:24px;object-fit:cover">
								</div>
								<div class="w3-col s6 w3-ellipsis">${text(album.name)}</div>
								<div class="w3-col s4 w3-small w3-text-gray w3-ellipsis" style="padding-top:3px">${album.location}</div>
							</li>
						`);
						$searchSuggest.append($album);

						$album
							.mousedown(function(event) {
								location.href = `?view=album&id=${album.id}`;
							});
					}
				}
			});
		}
		else {
			$searchSuggest.empty();
		}
	})
	.focus(event => {
		$searchSuggest.show();
	})
	.blur(event => {
		$searchSuggest.hide();
	});

$(".history").click(event => {
	if (!meId) {
		Modal.login();
		return false;
	}
});

$(".setting").click(event => {
	Modal.setting();
});

$(".upload").click(event => {
	Modal[meId ? "upload" : "login"]();
});

setTimeout(() => {
	section.style.visibility = "visible";
});
