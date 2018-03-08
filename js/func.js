function getAlbum({
	id,
	start = 0,
	len = 20,
	elm,
	imgId,
	col = 3
} = {}) {
	elm = $(elm);

	function load(imgId) {
		return $.getJSON("php/getAlbum.php", {id, start, len}, album => {
			if (album) {
				elm
					.find(".name")
						.text(album.name)
						.end()
					.find(".date")
						.text(dateStr(album.date) || "--")
						.end()
					.find(".location")
						.text(album.location || "--")
						.end()
					.find(".user_name")
						.text(album.user_name)
						.end()
					.find(".date_last_upload")
						.text(dateStr(album.date_last_upload, true));

				if (album.user_id === meId) {
					elm
						.find(".addImg")
							.click(() => {
								Modal.upload({
									album: album,
									canSelectAlbum: false
								});
							})
							.show();
				}

				if (album.imgs.length) {
					let $imgs = elm.find(".imgs"), height;

					$imgs.empty();

					for (let img of album.imgs) {
						let $img, colm, imgElm;

						$img = $(`
							<div class="w3-col s12 m${col < 6 ? col + 1 : col} l${col} w3-margin-bottom">
								<div class="w3-display-container w3-card w3-white w3-hover-shadow w3-pointer w3-animate-opacity">
									<div class="img"></div>
									<div class="w3-display-bottommiddle w3-display-hover w3-block w3-text-white w3-noevent" style="padding:64px 8px 12px;background:linear-gradient(#2220, #2227, #222a)">
										<div class="w3-ellipsis name"></div>
									</div>
									<div class="w3-display-topright w3-dropdown-click w3-display-hover w3-border w3-white w3-noselect editBtn" style="margin:4px;padding:2px">
										<img src="https://png.icons8.com/material/20/000000/pencil.png" class="w3-noevent">
										<div class="w3-dropdown-content w3-bar-block w3-border w3-card" style="transform:translate(-80%)">
											<div class="w3-bar-item w3-button editBtn renameImg">Đổi tên</div>
											<div class="w3-bar-item w3-button editBtn copyImg">Sao chép</div>
											<div class="w3-bar-item w3-button editBtn moveImg">Di chuyển</div>
											<div class="w3-bar-item w3-button editBtn downloadImg">Tải xuống</div>
											<div class="w3-bar-item w3-button editBtn deleteImg">Xóa</div>
										</div>
									</div>
								</div>
							</div>
						`);
						$imgs.append($img);

						$img
							.hide()
							.children()
								.click(function(event) {
									if (!event.target.classList.contains("editBtn")) {
										$viewImg = Modal.viewImg(img, album, len);
									}
								})
								.hover(function() {

								}, function() {
									$img.find(".w3-dropdown-content").hide();
								})
								.end()
							.find(".w3-dropdown-click")
								.click(function() {
									$(this)
										.find("> .w3-dropdown-content")
										.toggle();
								})
								.end()
							.find(".name")
								.text(img.name);

						imgElm = new Image;
						imgElm.src = `thumb.php?id=${img.id}&type=${img.type}`;

						imgElm.onload = event => {
							$img
								.show()
								.find(".img")
									.css({
										width: "100%",
										height: height || (height = $img.children().width() * 0.8),
										background: `url(${imgElm.src}) center/cover no-repeat`
									});
						};

						$img
							.find(".renameImg")
								.click(() => {
									Modal.renameImg(img, name => {
										img.name = name;
										$img.find(".name").text(name);
									});
								})
								.end()
							.find(".copyImg")
								.click(() => {
									Modal.copyImg(img, newImg => {
										if (newImg) {
											load(newImg.id);
										}
									});
								})
								.end()
							.find(".moveImg")
								.click(() => {
									Modal.moveImg(img, err => {
										if (err) {
											Modal.alert(err);
										}
										else {
											$img.remove();
											album.imgs.splice(album.imgs.indexOf(img), 1);
										}
									});
								})
								.end()
							.find(".downloadImg")
								.click(() => {
									Modal.downloadImg(img);
								})
								.end()
							.find(".deleteImg")
								.click(() => {
									Modal.deleteImg(img, () => {
										$img.remove();
										album.imgs.splice(album.imgs.indexOf(img), 1);
									});
								});

						if (album.user_id !== meId) {
							$(".downloadImg").siblings().remove();
						}
					}
				}
				else {

				}
			}
		});
	}

	return load(imgId);
}

function getAlbums({
	start = 0,
	len = 20,
	elm,
	click = () => {},
	dblclick = () => {},
	/* view, select */
	mode = "view",
	selectedId,
	removeId,
	removeEditBtn = "",
	pages = true,
	rand,
	search,
	/*
		user_id = 0: Tất cả user
		user_id = -1: Tất cả user trừ tôi
	*/
	user_id = meId
} = {}) {
	elm = $(elm);

	function load(selectedId) {
		return $.getJSON("php/getAlbums.php", {
			start,
			len,
			rand,
			search,
			user_id
		}, ([albums, num]) => {
			if (albums.length) {
				let isSelected, height;

				albums = albums.filter(v => v.id !== removeId);

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
									<div class="w3-ellipsis location"></div>
								</div>
								<div class="w3-dropdown-click w3-display-topright w3-display-hover w3-border w3-white editBtn" style="margin:4px;padding:2px">
									<img src="https://png.icons8.com/material/20/000000/pencil.png" class="w3-noevent">
									<ul class="w3-dropdown-content w3-bar-block w3-border w3-card" style="transform:translate(-80%)">
										<li class="w3-bar-item w3-button editBtn addImgAlbum">Thêm ảnh</li>
										<li class="w3-bar-item w3-button editBtn renameAlbum">Đổi tên</li>
										<li class="w3-bar-item w3-button editBtn editDateAlbum">Sửa ngày chụp</li>
										<li class="w3-bar-item w3-button editBtn editLocationAlbum">Sửa địa điểm</li>
										<li class="w3-bar-item w3-button editBtn deleteAlbum">Xóa</li>
									</ul>
								</div>
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
											if (event.originalEvent && event.originalEvent.isTrusted) {
												location.href = `?view=album&id=${album.id}`;
											}
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
												.prop("src", `thumb.php?id=${album.imgs[hoverImg].id}&type=${album.imgs[hoverImg].type}`)
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
											.attr("src", `thumb.php?id=${album.imgs[hoverImg].id}&type=${album.imgs[hoverImg].type}`)
											.velocity("finish");
								}

								$album.find(".w3-dropdown-content").hide();
							})
						.find(".img")
							.prop("src",
								album.imgs.length ?
								`thumb.php?id=${album.imgs[0].id}&type=${album.imgs[0].type}` :
								"img/img.png"
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
							.click(function(event) {
								$(this)
									.find(".w3-dropdown-content")
									.toggle();
							});

					if (album.user_id === meId) {
						$album
							.find(".addImgAlbum")
								.click(event => {
									Modal.upload({
										album,
										canSelectAlbum: false
									});
								})
								.end()
							.find(".renameAlbum")
								.click(event => {
									Modal.renameAlbum(album, name => {
										album.name = name;
										fillName(name);
									});
								})
								.end()
							.find(".editDateAlbum")
								.click(event => {
									Modal.editDateAlbum(album, date => {
										album.date = date;
										fillDate(date);
									});
								})
								.end()
							.find(".editLocationAlbum")
								.click(event => {
									Modal.editLocationAlbum(album, location => {
										album.location = location;
										fillLocation(location);
									});
								})
								.end()
							.find(".deleteAlbum")
								.click(event => {
									Modal.deleteAlbum(album, () => {
										$album.remove();
										albums.splice(albums.indexOf(album), 1);
									});
								});

						[
							"addImgAlbum",
							"renameAlbum",
							"editDateAlbum",
							"editLocationAlbum",
							"deleteAlbum"
						].map(v => {
							if (removeEditBtn.includes(v)) {
								$album.find("." + v).remove();
							}
						});
					}
					else {
						$album.find(".editBtn").remove();
					}

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
							.text("Ngày chụp: " + (dateStr(date) || "--"));
					}

					function fillLocation(location) {
						$album
							.find(".location")
							.prop("title", location)
							.text("Địa điểm: " + (location || "--"));
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
					<p class="w3-padding-small w3-text-gray">
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

	return load(selectedId);
}

function text(html) {
	return (html + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function modal(title = "", css = "auto", html = "", js) {
	let $modal, $n, clsRand, fn, $$;

	title = text(title);

	if (/^(string|number)$/.test(typeof css)) {
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
			<div class="w3-modal-content w3-card w3-margin-bottom anim-show-modal __modalContent" style="border-radius:16px;overflow:hidden">
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
	hasClass = hasClass ? "." + hasClass.replace(/\s(.)/g, " .$1") : "";

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

function dateStr(date, isDatetime) {
	let now, str = "";

	date = new Date(new Date(date)[isDatetime ? "toString" : "toDateString"]());
	now = new Date(new Date()[isDatetime ? "toString" : "toDateString"]());

	if (isFinite(+date)) {
		let d = (date.getDate() + "").padStart(2, 0),
			m = (date.getMonth() + 1 + "").padStart(2, 0),
			Y = date.getFullYear(),
			H = (date.getHours() + "").padStart(2, 0),
			i = (date.getMinutes() + "").padStart(2, 0);

		if (isDatetime) {
			str = `${d}/${m}/${Y} ${H}:${i}`;
		}
		else {
			str = `${d}/${m}/${Y}`;
		}

		if (date + "" === now + "") {
			str = "Hôm nay";
		}
		else if (+now - +date === 86400000) {
			str = "Hôm qua";
		}
	}

	return str;
}
