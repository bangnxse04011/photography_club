let Modal = {
	alert(msg = "", okFn) {
		return modal("Thông báo", 300, `
			<div class="w3-padding w3-center">
				<p class="w3-left-align">${text(msg)}</p>
				<button class="w3-button __close">OK</button>
			</div>
		`, $0 => {
			$0.close.click(okFn);
		});
	},

	register() {
		return modal("Đăng ký", 400, `
			<div class="w3-container">
				<h6>Đăng ký bằng mạng xã hội</h6>
				<div class="w3-row">
					<div class="w3-col s6 w3-button w3-text-white w3-hover-red __google" style="background:#dd4e41">
						<img src="https://png.icons8.com/ios-glyphs/24/ffffff/google-plus.png"> Google
					</div>
					<div class="w3-col s6 w3-button w3-text-white w3-hover-indigo __facebook" style="background:#3b5998">
						<img src="https://png.icons8.com/ios-glyphs/24/ffffff/facebook.png"> Facebook
					</div>
				</div>
				<p class="separator">
					<span>hoặc</span>
				</p>
				<form class="__form" action="php/register.php" method="post">
					<div class="w3-row">
						<span class="w3-col m6">
							<label>Họ</label>
							<input type="text" name="first_name" class="w3-input w3-border w3-round" autofocus required>
						</span>
						<span class="w3-col m6" style="padding-left:16px">
							<label>Tên</label>
							<input type="text" name="last_name" class="w3-input w3-border w3-round" required>
						</span>
					</div>
					<div class="w3-padding-top">
						<label>Tên tài khoản</label>
						<input type="text" name="name" class="w3-input w3-border w3-round" minlength="6" maxlength="50" pattern="[a-zA-Z0-9_\\-]+" placeholder="chữ cái, số, dấu gạch dưới và gạch ngang" required>
					</div>
					<div class="w3-padding-top">
						<label>Mật khẩu</label>
						<input type="password" name="pass" class="w3-input w3-border w3-round" minlength="6" maxlength="50" required>
					</div>
					<div class="w3-padding-top">
						<label>Nhập lại mật khẩu</label>
						<input type="password" class="w3-input w3-border w3-round __repass" minlength="6" maxlength="50" required>
					</div>
					<div class="w3-padding-top">
						<label>Email</label>
						<input type="email" name="email" class="w3-input w3-border w3-round __email" maxlength="100" placeholder="không bắt buộc, dùng để lấy lại mật khẩu">
					</div>
					<div class="w3-margin w3-center">
						<input type="submit" class="w3-button" value="Đăng ký">
					</div>
				</form>
			</div>
		`, $0 => {
			googleSignin($0.google[0], gUser => {
				$.post("php/registerGoogle.php", {
					id_token: gUser.getAuthResponse().id_token
				}, err => {
					if (err) {
						Modal.alert(err);
					}
					else {
						// location.href = "";
					}
				});
			});

			$0.form.submit(function(event) {
				event.preventDefault();

				if (this.pass.value !== $0.repass.val()) {
					Modal.alert("Mật khẩu nhập lại không khớp!", () => {
						$0.repass.focus();
					});
				}
				else {
					$.post("php/register.php", $(this).serialize(), err => {
						if (err) {
							Modal.alert(err);
						}
						else {
							location.href = "";
						}
					});
				}
			});
		});
	},

	login() {
		return modal("Đăng nhập", 400, `
			<form class="w3-container __form" action="php/login.php" method="post">
				<p>
					<label>Tên tài khoản</label>
					<input type="text" name="name" class="w3-input w3-border w3-round" minlength="6" maxlength="50" pattern="[a-zA-Z0-9_\\-]+" autofocus required>
				</p>
				<p>
					<label>Mật khẩu</label>
					<input type="password" name="pass" class="w3-input w3-border w3-round" minlength="6" maxlength="50" required>
				</p>
				<p class="w3-center">
					<input type="submit" class="w3-button" value="Đăng nhập">
				</p>
			</form>
		`, $0 => {
			$0.form.submit(function(event) {
				event.preventDefault();

				$.post("php/login.php", $(this).serialize(), err => {
					if (err) {
						Modal.alert(err);
					}
					else {
						location.href = "";
					}
				});
			});
		});
	},

	upload({album_id = "", album_name = ""} = {}) {
		return modal("Upload ảnh", 900, `
			<div class="w3-row">
				<div class="w3-col m1">&nbsp;</div>
				<form action="?view=upload" method="post" class="w3-col m10 w3-padding __form" enctype="multipart/form-data">
					<h2>Tải lên ảnh của bạn</h2>
					<div class="w3-cell-row">
						<div class="w3-cell w3-padding-right">
							<h6>Tải lên các tập tin hình ảnh</h6>
							<input type="file" name="files[]" class="w3-input __files" accept=".png, .jpg, .gif" multiple required>
							<small class="w3-text-gray">
								- Chỉ cho phép ảnh png, jpg, jpeg, gif.<br>
								- Kích thước mỗi tập tin tối đa 25 MB.<br>
								- Có thể chọn tối đa 20 tập tin (giữ phím Ctrl để chọn).
							</small>
						</div>
						<div class="w3-cell w3-leftbar w3-padding-left">
							<h6>Tải lên tập tin nén</h6>
							<input type="file" name="filezip" class="w3-input __filezip" accept=".zip">
							<small class="w3-text-gray">
								- Chỉ cho phép tập tin zip.<br>
								- Tập tin nén sau khi tải lên sẽ tự động được giải nén.<br>
								- Kích thước tập tin tối đa 500 MB.
							</small>
						</div>
					</div>
					<br>
					<div class="w3-row">
						<input type="text" class="w3-col m7 l8 w3-input w3-border-0 __album_name">
						<div class="w3-col m5 l4 w3-button __selectAlbum">Chọn album ảnh</div>
						<input type="hidden" name="album_id">
					</div>
					<p>
						<br>
						<input type="submit" class="w3-button" value="Tải lên">
					</p>
				</form>
				<div class="w3-col m1">&nbsp;</div>
			</div>
		`, $0 => {
			let form = $0.form[0];

			$0.album_name.val(album_name);
			form.album_id.value = album_id;

			$0.files.change(function() {
				this.required = true;
				$0.filezip.prop({
					required: false,
					value: ""
				});
			});

			$0.filezip.change(function() {
				this.required = true;
				$0.files.prop({
					required: false,
					value: ""
				});
			});

			$0.selectAlbum.click(event => {
				Modal.selectAlbum(undefined, album => {
					form.album_id.value = album.id;
					$0.album_name.val(album.name);
				});
			});

			$0.form.submit(function(event) {
				event.preventDefault();

				if (!this.album_id.value) {
					Modal.alert("Bạn chưa chọn album ảnh.", () => {
						$0.selectAlbum.click();
					});
				}
				else {
					this.submit();
				}
			});
		});
	},

	selectAlbum(selectedId, callback) {
		return modal("Chọn một album ảnh", 850, `
			<div class="w3-padding">
				<div class="w3-row-padding __list" style="padding-bottom:8px;overflow:overlay"></div>
				<div class="w3-border-top" style="padding-top:8px">
					<button class="w3-button w3-disabled __ok" disabled>OK</button>
					<button class="w3-button __close">Hủy</button>
					<button class="w3-button w3-right __create">Tạo album mới</button>
				</div>
			</div>
		`, $0 => {
			let start = 0, len = 20, selected;

			load();

			function load(selectedId) {
				getAlbums({
					start,
					len,
					elm: $0.list,
					click(album) {
						selected = album;

						$0.ok.prop("disabled", false).removeClass("w3-disabled");
					},
					dblclick: okFn,
					mode: "select",
					selectedId
				})
			}

			$0.list.css({
				maxHeight: window.innerHeight - 300
			})

			$0.ok.click(okFn);

			$0.create.click(event => {
				Modal.createAlbum(albumId => {
					load(albumId);
				});
			});

			function okFn() {
				callback && callback(selected);

				$0.fn.close();
			}
		});
	},

	createAlbum(callback) {
		return modal("Tạo một album mới", 300, `
			<form class="w3-padding __form">
				<div class="w3-padding-top">
					<img src="https://png.icons8.com/material/20/333333/autograph.png">&nbsp;
					<label>Tên album</label>
					<input type="text" name="name" class="w3-input w3-border w3-round __name" minlength="1" maxlength="200" data-err-blank="Tên album phải chứa ít nhất một ký tự không phải khoảng trắng." required>
				</div>
				<div class="w3-padding-top">
					<img src="https://png.icons8.com/material/20/333333/calendar.png">&nbsp;
					<label>Ngày chụp</label>
					<input type="date" name="date" class="w3-input w3-border w3-round __date" data-err-future="Ngày chụp không thể là một ngày trong tương lai.">
				</div>
				<div class="w3-padding-top">
					<img src="https://png.icons8.com/material/20/333333/marker.png">&nbsp;
					<label>Địa điểm</label>
					<input type="text" name="location" class="w3-input w3-border w3-round __location">
				</div>
				<div class="w3-center w3-margin-top">
					<input type="submit" class="w3-button" value="OK">
				</div>
			</form>
		`, $0 => {
			$0.name
				.on("input", function() {
					this.setCustomValidity("");

					if (!this.value.trim()) {
						this.title = this.dataset.errBlank;
					}
					else {
						this.title = "";
					}
				});

			$0.date
				.on("input", function() {
					this.setCustomValidity("");

					if (this.valueAsNumber > Date.now()) {
						this.title = this.dataset.errFuture;
					}
					else {
						this.title = "";
					}
				})
				.get(0)
				.valueAsNumber = Date.now();

			$0.form.submit(function(event) {
				event.preventDefault();

				this.name.value = this.name.value.trim();

				if (!this.name.value) {
					this.name.title = this.name.dataset.errBlank;
					this.name.setCustomValidity(this.name.title);
					this.name.reportValidity();
				}
				else if (this.date.valueAsNumber > Date.now()) {
					this.date.title = this.date.dataset.errFuture;
					this.date.setCustomValidity(this.date.title);
					this.date.reportValidity();
				}
				else {
					$.post("php/createAlbum.php", $0.form.serialize(), res => {
						if (+res) {
							callback && callback(+res);

							$0.fn.close();
						}
						else {
							Modal.alert(res);
						}
					});
				}
			});
		});
	},

	renameAlbum(album, callback) {
		return modal("Đổi tên album", 320, `
			<form class="w3-padding __form">
				<div class="w3-section">
					<label>Nhập tên mới: </label>
					<input type="text" name="name" class="w3-input w3-border __name" value="${text(album.name)}" minlength="1" maxlength="200" data-err-blank="Tên album phải chứa ít nhất một ký tự không phải khoảng trắng." autofocus required>
				</div>
				<input type="submit" value="OK" class="w3-button">
				<div class="w3-button __close">Hủy</div>
			</form>
		`, $0 => {
			$0.name
				.on("input", function() {
					this.setCustomValidity("");

					if (!this.value.trim()) {
						this.title = this.dataset.errBlank;
					}
					else {
						this.title = "";
					}
				})
				.select();

			$0.form.submit(function(event) {
				event.preventDefault();

				this.name.value = this.name.value.trim();

				if (!this.name.value) {
					this.name.title = this.name.dataset.errBlank;
					this.name.setCustomValidity(this.name.title);
					this.name.reportValidity();
				}
				else if (this.name.value !== album.name) {
					$.post("php/renameAlbum.php", {
						name: this.name.value,
						album_id: album.id
					}, err => {
						if (err) {
							Modal.alert(err);
						}
						else {
							callback(this.name.value);

							$0.fn.close();
						}
					});
				}
				else {
					$0.fn.close();
				}
			});
		});
	},

	editDateAlbum(album, callback) {
		return modal("Sửa ngày chụp album", 320, `
			<form class="w3-padding __form">
				<div class="w3-section">
					<label>Chọn ngày: </label>
					<input type="date" name="date" class="w3-input w3-border __date" value="${album.date}" data-err-future="Ngày chụp không thể là một ngày trong tương lai." autofocus>
				</div>
				<input type="submit" value="OK" class="w3-button">
				<div class="w3-button __close">Hủy</div>
			</form>
		`, $0 => {
			$0.date
				.on("input", function() {
					this.setCustomValidity("");

					if (this.valueAsNumber > Date.now()) {
						this.title = this.dataset.errFuture;
					}
					else {
						this.title = "";
					}
				});

			$0.form.submit(function(event) {
				event.preventDefault();

				if (this.date.valueAsNumber > Date.now()) {
					this.date.title = this.date.dataset.errFuture;
					this.date.setCustomValidity(this.date.title);
					this.date.reportValidity();
				}
				else if (this.name.value !== album.name) {
					$.post("php/editDateAlbum.php", {
						date: this.date.value,
						album_id: album.id
					}, err => {
						if (err) {
							Modal.alert(err);
						}
						else {
							callback(this.date.value);

							$0.fn.close();
						}
					});
				}
				else {
					$0.fn.close();
				}
			});
		});
	},

	editLocationAlbum(album, callback) {
		return modal("Sửa địa điểm album", 320, `
			<form class="w3-padding __form">
				<div class="w3-section">
					<label>Nhập địa điểm: </label>
					<input type="text" name="location" class="w3-input w3-border __location" value="${text(album.location)}" autofocus>
				</div>
				<input type="submit" value="OK" class="w3-button">
				<div class="w3-button __close">Hủy</div>
			</form>
		`, $0 => {
			$0.location.select();

			$0.form.submit(function(event) {
				event.preventDefault();

				$.post("php/editLocationAlbum.php", {
					location: this.location.value,
					album_id: album.id
				}, err => {
					if (err) {
						Modal.alert(err);
					}
					else {
						callback(this.location.value);

						$0.fn.close();
					}
				});
			});
		});
	},

	viewImg(img, album, len) {
		return modal("", {
			position: "fixed",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%"
		}, `
			<div class="w3-display-container w3-black" style="position:fixed;width:100%;height:100%">
				<img class="w3-display-topleft __img __img2" alt="image">
				<img class="w3-display-topleft __img __img1" alt="image" style="display:none">
				<button class="w3-display-left w3-button w3-transparent w3-hover-dark-gray __prev" style="padding:32px 16px">
					<img src="https://png.icons8.com/material/48/ffffff/back.png" class="w3-noevent">
				</button>
				<button class="w3-display-right w3-button w3-transparent w3-hover-dark-gray __next" style="padding:32px 16px">
					<img src="https://png.icons8.com/material/48/ffffff/forward.png" class="w3-noevent">
				</button>
				<div class="w3-display-topmiddle w3-bar" style="background:#0008">
					<div class="w3-col s8">
						<span class="w3-padding w3-xlarge __name"></span>
					</div>
					<div class="w3-col s4">
						<button class="w3-bar-item w3-button w3-right w3-hover-red __close">
							<img src="https://png.icons8.com/material/24/ffffff/delete-sign.png" class="w3-noevent">
						</button>
					</div>
				</div>
			</div>
		`, $0 => {
			$0.modalContent.css({
				borderRadius: 0
			});

			$0.modalHeader.hide();

			$0.img
				.css({
					width: "100%",
					height: "100%",
					objectFit: "scale-down"
				});

			load(img);

			function load(img, nav) {
				let prev, next, findIndex;

				findIndex = album.imgs.findIndex(v => v.id === img.id);
				prev = album.imgs[findIndex - 1];
				next = album.imgs[findIndex + 1];

				if (album.num_img < len || (next && prev)) {
					render(nav, prev, img, next);
				}
				else {
					$.getJSON("php/getImg.php", {
						id: img.id,
						album_id: album.id
					}, args => {
						if (args) {
							render(nav, ...args);
						}
					});
				}
			}

			function render(nav, prev, img, next) {
				$0.prev
					.add($0.next)
					.off("click")
					.prop("disabled", true)
					.addClass("w3-disabled");

				$0.img2
					.prop("src", `img/upload/${img.id}.${img.type}`)
					.finish()
					.velocity({
						left: [0, nav * 100 + "%"]
					}, 400, e => {
						$(e)
							.removeProp("src")
							.css("left", nav * 100 + "%");
					});

				$0.img1
					.finish()
					.velocity({
						left: [nav * -100 + "%", 0]
					}, 400, e => {
						$(e)
							.show()
							.prop("src", `img/upload/${img.id}.${img.type}`)
							.css("left", 0);
					});

				$0.name.text(img.name + "." + img.type);

				if (prev) {
					$0.prev
						.click(event => {
							load(prev, -1);
						})
						.prop("disabled", false)
						.removeClass("w3-disabled");
				}

				if (next) {
					$0.next
						.click(event => {
							load(next, 1);
						})
						.prop("disabled", false)
						.removeClass("w3-disabled");
				}
			}
		});
	},

	setting() {
		return modal("Cài đặt", 800, `
			<form class="w3-row w3-section __form">
				<div class="w3-col m6">
					<label class="w3-col s8 w3-padding">Tối ưu hóa độ tương phản</label>
					<div class="w3-col s4 w3-center">
						<input type="checkbox" name="optimize_contrast" class="w3-switch">
					</div>
				</div>
				<div class="w3-col m6">
					<label class="w3-col s8 w3-padding">Hiệu ứng chuyển động</label>
					<div class="w3-col s4 w3-center">
						<input type="checkbox" name="motion_effect" class="w3-switch">
					</div>
				</div>
			</form>
		`, $0 => {
			let form;

			form = $0.form[0];

			for (let elm of form.elements) {
				switch (elm.type) {
					case "checkbox":
						elm.checked = +sett[elm.name];
						break;

					case "text":
					case "date":
					case "email":
					case "tel":
					case "color":
						elm.value = sett[elm.name];
						break;
				}
			}
		});
	}
};
