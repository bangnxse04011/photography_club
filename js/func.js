function getAlbum({
	id,
	start = 0,
	len = 20,
	elm,
	imgId
} = {}) {
	elm = $(elm);

	load(imgId);

	function load(imgId) {
		$.getJSON("php/getAlbum.php", {id, start, len}, album => {
			if (album) {
				elm.find(".name").text(album.name);

				if (album.imgs.length) {
					let $imgs = elm.find(".imgs"),
						height;

					$imgs.empty();

					for (let img of album.imgs) {
						let $img;

						$img = $(`
							<div class="w3-col s12 m4 l3 w3-margin-bottom">
								<div class="w3-card w3-padding w3-white w3-hover-shadow w3-pointer w3-animate-opacity">
									<img src="img/upload/${img.id}.${img.type}" class="w3-img-contrast img" alt="image">
								</div>
							</div>
						`);
						$imgs.append($img);

						$img
							.hide()
							.find(".img")
							.on("load", function() {
								$img
									.show()
									.children()
									.click(function() {
										Modal.viewImg(img, album, len);
									});

								$(this).css({
									width: "100%",
									height: height || (height = $img.children().width()),
									objectFit: "cover"
								});
							});
					}
				}
				else {

				}
			}
		})
	}
}

function getAlbums({
	start = 0,
	len = 20,
	elm,
	click = () => {},
	dblclick = () => {},
	mode = "view",
	selectedId,
	pages = true,
	rand
} = {}) {
	elm = $(elm);

	load(selectedId);

	function load(selectedId) {
		$.getJSON("php/getAlbums.php", {start, len, rand}, ([albums, num]) => {
			if (albums.length) {
				let isSelected, height;

				elm.empty();

				for (let album of albums) {
					let $album, hoverImg = 0, timeout;

					$album = $(`
						<div class="w3-col s12 m4 l3 w3-padding-top w3-padding-bottom album">
							<div class="w3-card w3-padding w3-white w3-hover-shadow w3-display-container w3-pointer w3-noselect">
								<div class="w3-display-container">
									<img class="w3-white w3-img-contrast w3-animate-opacity img">
									<span class="w3-display-bottomright w3-padding-small w3-text-outline">
										${album.num_img} ảnh
									</span>
								</div>
								<b class="w3-ellipsis name"></b>
								<div class="w3-text-gray" style="font-size:13px">
									<div class="date"></div>
									<div class="w3-ellipsis location" title="${text(album.location)}"></div>
								</div>
								<div class="w3-dropdown-click w3-display-topright w3-display-hover w3-border w3-white editBtn" style="margin:4px;padding:2px">
									<img src="https://png.icons8.com/material/20/000000/pencil.png" class="w3-noevent" title="Chỉnh sửa hoặc xóa">
									<ul class="w3-dropdown-content w3-bar-block w3-border w3-card" style="transform:translate(-80%)">
										<li class="w3-bar-item w3-button editBtn">Thêm ảnh</li>
										<li class="w3-bar-item w3-button editBtn renameAlbum">Đổi tên</li>
										<li class="w3-bar-item w3-button editBtn editDateAlbum">Sửa ngày chụp</li>
										<li class="w3-bar-item w3-button editBtn editLocationAlbum">Sửa địa điểm</li>
										<li class="w3-bar-item w3-button editBtn deleteAlbum">Xóa</li>
									</ul>
							</div>
						</div>
					`);
					elm.append($album);

					$album
						.hide()
						.children()
						.click(function(event) {
							if (!event.target.classList.contains("editBtn")) {
								switch (mode) {

									case "view":
										location.href = `?view=album&id=${album.id}`;
										break;

									case "select":
										this.parentElement.scrollIntoViewIfNeeded();
										active(this, 1, "album", "w3-light-blue", "w3-white");
										break;
								}

								click.call(this, album);
							}
						})
						.dblclick(dblclick)
						.hover(function() {
							if (album.imgs.length > 1) {
								hoverImg = 0;

								let hover = () => {
									hoverImg++;

									if (hoverImg >= album.imgs.length) {
										hoverImg = 0;
									}

									$(this)
										.find(".img")
										.prop("src", `img/upload/${album.imgs[hoverImg].id}.${album.imgs[hoverImg].type}`)
										.one("load", function(event) {
											$(this)
												.removeClass("w3-animate-opacity")
												.show()
												.addClass("w3-animate-opacity");

											timeout = setTimeout(hover, 2000);
										});

									clearTimeout(timeout);
								};

								timeout = setTimeout(hover, 500);
							}
						}, function() {
							clearTimeout(timeout);
							hoverImg = 0;

							if (album.imgs.length > 1) {
								$(this)
									.find(".img")
									.attr("src", `img/upload/${album.imgs[hoverImg].id}.${album.imgs[hoverImg].type}`)
									.velocity("finish");
							}

							$album.find(".w3-dropdown-content").hide();
						})
						.find(".img")
						.prop("src",
							album.imgs.length ?
							`img/upload/${album.imgs[0].id}.${album.imgs[0].type}` :
							"https://png.icons8.com/office/80/picture.png"
						)
						.on("load", function() {
							$album.show();

							$(this)
								.css({
									width: "100%",
									height: height || (height = $album.children().width() * 0.6),
									objectFit() {
										return album.imgs.length ? "cover" : "none"
									}
								});
						})
						.end()
						.find(".w3-dropdown-click")
						.click(function() {
							$(this)
								.find(".w3-dropdown-content")
								.toggle();
						});

					$album
						.find(".renameAlbum")
						.click(() => {
							Modal.renameAlbum(album, name => {
								album.name = name;
								fillName(name);
							});
						})
						.end()
						.find(".editDateAlbum")
						.click(() => {
							Modal.editDateAlbum(album, date => {
								album.date = date;
								fillDate(date);
							});
						})
						.end()
						.find(".editLocationAlbum")
						.click(() => {
							Modal.editLocationAlbum(album, location => {
								album.location = location;
								fillLocation(location);
							});
						});

					if (selectedId == album.id) {
						isSelected = true;

						$album.children().click();
					}

					fillName(album.name);
					fillDate(album.date);
					fillLocation(album.location);

					function fillName(name) {
						$album
							.find(".name")
							.prop("title", name)
							.text(name);
					}

					function fillDate(date) {
						$album
							.find(".date")
							.text("Ngày chụp: " + dateStr(date));
					}

					function fillLocation(location) {
						$album
							.find(".location")
							.prop("title", location)
							.text("Địa điểm: " + location);
					}
				}

				if (selectedId && !isSelected) {
					start++;
					load(selectedId);
				}
				else {
					if (pages) {
						let pages, $pages, $page;

						pages = Math.ceil(num / len);

						$pages = $(`<div class="w3-col s12 w3-center w3-padding-top"></div>`);
						elm.append($pages);

						$page = $(`<button class="w3-button">&laquo;</button>`);
						$pages.append($page);

						$page.click(function() {
							start--;
							load();
						});

						if (start === 0) {
							$page.prop("disabled", true).addClass("w3-disabled");
						}

						for (let i = 0; i < pages; i++) {
							$page = $(`<button class="w3-button page">${i + 1}</button>`);
							$pages.append($page);

							$page.click(function() {
								start = i;
								load();
							});
						}

						$page = $(`<button class="w3-button">&raquo;</button>`);
						$pages.append($page);

						$page.click(function() {
							start++;
							load();
						});

						if (start === pages - 1) {
							$page.prop("disabled", true).addClass("w3-disabled");
						}

						active(
							$pages.children().eq(start + 1).off("click"),
							0,
							"page",
							"w3-red w3-hover-red"
						);
					}
				}
			}
			else {
				let $content = $(`
					<p class="w3-text-gray">
						Chưa có album ảnh nào, hãy <a href="javascript:" class="createAlbum">tạo một album mới</a>!
					</p>
				`);

				elm.append($content);

				$content
					.find(".createAlbum")
					.click(function() {
						Modal.createAlbum(albumId => {
							load();
						});
					});
			}
		});
	}
}

function text(html) {
	return (html + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function modal(title = "", css = "auto", html = "", js) {
	let $modal, $n, clsRand, fn, $$;

	title = text(title);

	if (/string|number/.test(typeof css)) {
		css = {
			width: css
		};
	}
	else if (Array.isArray(css)) {
		css = {
			width: css[0],
			height: css[1]
		};
	}

	do {
		clsRand = "modal" + Math.floor(Math.random() * 1e9);
	}
	while (modals.querySelector("." + clsRand));

	$modal = `
		<div class="w3-modal __modal ${clsRand}">
			<div class="w3-modal-content w3-card w3-light-gray anim-show-modal __modalContent" style="border-radius:16px;overflow:hidden">
				<header class="w3-container w3-red w3-card __modalHeader" style="position:relative">
					<span class="w3-button w3-transparent w3-text-white w3-display-topright w3-hover- __close">&#x2716;</span>
					<h6 class="${title ? "" : "w3-hide"} __modalTitle">${title}</h6>
				</header>
				<div class="__modalBody">${html}</div>
			</div>
		</div>
	`;

	$$ = html => {
		let $html = $("<div>" + html + "</div>");

		$html
			.find(".__close")
			.click(function(event) {
				if (event.target === this) {
					$n.modalContent.addClass("anim-hide-modal");

					setTimeout(() => {
						$modal.remove();
					}, 200);
				}
			});

		return $html.children();
	};

	$modal = $$($modal);
	$("#modals").append($modal);

	document.activeElement.blur();

	fn = {
		close() {
			$n.close[0].click();
		},
		append(parent, elm) {
			parent.append($$(elm));
		}
	};

	$n = new Proxy(selector => $("." + clsRand + " .__" + selector), {
		get: (target, prop) => prop === "modal" ? $modal : prop === "fn" ? fn : prop === "$" ? $$ : target(prop)
	});

	$n.modalContent.css(css);

	setTimeout(() => {
		$n.modalContent.removeClass("anim-show-modal");

		let findAutofocus = $modal.find("[autofocus]")[0];

		if (findAutofocus) {
			findAutofocus.focus();
		}
	}, 200);

	$modal.show();

	js && js($n);

	return $n;
}

function active(elm, lv, hasClass, addClass, removeClass) {
	elm["@removeClass"] = removeClass;
	hasClass = "." + hasClass.replace(/\s(.)/g, " .$1");

	if (lv) {
		$(elm)
			.addClass(addClass)
			.removeClass(removeClass)
			.parent()
			.siblings(hasClass)
			.children()
			.removeClass(addClass)
			.addClass(removeClass);
	}
	else {
		$(elm)
			.addClass(addClass)
			.removeClass(removeClass)
			.siblings(hasClass)
			.removeClass(addClass)
			.addClass(removeClass);
	}
}

function dateStr(date) {
	let now, str = "";

	date = new Date(new Date(date).toDateString());
	now = new Date(new Date().toDateString());

	if (isFinite(+date)) {
		str = date.toLocaleDateString();

		if (date + "" === now + "") {
			str = "Hôm nay";
		}
		else if (+now - +date === 86400000) {
			str = "Hôm qua";
		}
	}

	return str;
}
