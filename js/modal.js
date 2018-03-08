let Modal = {
	alert(msg = "", callback) {
		return modal("Thông báo", 300, `
			<div class="w3-padding w3-center">
				<p class="w3-left-align">${text(msg).replace(/\n/g, "<br>")}</p>
				<button class="w3-button w3-light-gray __close">OK</button>
			</div>
		`, $0 => {
			$0.close.click(callback);
		});
	},

	confirm(msg = "", okFn, cancelFn) {
		return modal("Xác nhận", 300, `
			<div class="w3-padding w3-center">
				<p class="w3-left-align">${text(msg).replace(/\n/g, "<br>")}</p>
				<button class="w3-button w3-light-gray __close __ok">OK</button>&nbsp;
				<button class="w3-button w3-light-gray __close">Hủy</button>
			</div>
		`, $0 => {
			$0.ok.click(okFn);
			$0.close.click(cancelFn);
		});
	},

	wait(name = "Xin chờ...", fn = () => {}) {
		return modal("", {
			position: "fixed",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%"
		}, `
			<div class="w3-display-container w3-noselect" style="position:fixed;width:100%;height:100%">
				<div class="w3-display-middle w3-center">
					<h3 class="w3-text-outline"><b>${text(name)}</b></h3><br>
					<div class="w3-spin __loader"></div>
				</div>
			</div>
		`, $0 => {
			$0.modalContent
				.removeClass("w3-light-gray")
				.css({
					borderRadius: 0,
					background: "#0004"
				});

			$0.modalHeader.hide();

			$0.loader.css({
				width: 72,
				height: 72,
				border: "solid 11px #ccc",
				borderTopColor: "#03a9f4",
				borderRadius: "50%",
				display: "inline-block"
			});

			fn($0);
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
						<div class="w3-col m6 w3-padding-top">
							<label>Họ</label>
							<input type="text" name="first_name" class="w3-input w3-border w3-round" autofocus required>
						</div>
						<div class="w3-col m1 w3-hide-small">&nbsp;</div>
						<div class="w3-col m5 w3-padding-top">
							<label>Tên</label>
							<input type="text" name="last_name" class="w3-input w3-border w3-round" required>
						</div>
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
						<input type="submit" class="w3-button w3-light-gray" value="Đăng ký">
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
		return modal("Đăng nhập", 320, `
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
					<input type="submit" class="w3-button w3-light-gray" value="Đăng nhập">
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

	payIn() {
		return modal("Nạp tiền vào tài khoản", 400, `
			<div class="w3-padding __payInMethod">
				<p><b>Vui lòng chọn phương thức nạp tiền: </b></p>
				<div class="w3-row w3-center w3-margin-bottom">
					<div class="w3-col s6 w3-padding-small">
						<button type="button" class="w3-button w3-block w3-light-gray __btnBankCard">Thẻ ngân hàng</button>
					</div>
					<div class="w3-col s6 w3-padding-small">
						<button type="button" class="w3-button w3-block w3-light-gray __btnPhoneCard">Thẻ điện thoại</button>
					</div>
				</div>
				<div class="w3-text-dark-gray __payInMethodInfo" style="padding:0 8px"></div>
			</div>
			<div class="__bankCard">
				<div class="w3-light-gray">
					<button type="button" class="w3-button __btnBack">&larr; Quay lại</button>
				</div>
			</div>
			<div class="__phoneCard">
				<div class="w3-light-gray">
					<button type="button" class="w3-button __btnBack">&larr; Quay lại</button>
				</div>
				<form class="w3-padding __formPhoneCard">
					<div class="w3-section">
						<label class="w3-text-teal">Nhập mã thẻ cào điện thoại: </label>
						<input type="text" name="code" class="w3-input w3-border" required>
					</div>
					<input type="submit" class="w3-button w3-light-gray" value="OK">
					<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
				</form>
			</div>
		`, $0 => {
			$0.bankCard.hide();
			$0.phoneCard.hide();
			$0.payInMethodInfo.hide();

			$0.btnBankCard
				.click(() => {
					$0.payInMethod.hide();
					$0.bankCard.show();
					$0.phoneCard.hide();
				})
				.hover(() => {
					$0.payInMethodInfo.finish().text("Vietcombank, Agribank").show(200);
				}, () => {
					$0.payInMethodInfo.finish().hide(200).empty();
				});

			$0.btnPhoneCard
				.click(() => {
					$0.payInMethod.hide();
					$0.bankCard.hide();
					$0.phoneCard.show();
				})
				.hover(() => {
					$0.payInMethodInfo.finish().text("Viettel, MobiFone, VinaPhone").show(200);
				}, () => {
					$0.payInMethodInfo.finish().hide(200).empty();
				});

			$0.btnBack.click(() => {
				$0.payInMethod.show();
				$0.bankCard.hide();
				$0.phoneCard.hide();
			});

			$0.formPhoneCard.submit(function(event) {
				event.preventDefault();

				Modal.wait(undefined, $0 => {
					// Code here...
				});
			});
		});
	},

	changePass() {
		return modal("Đổi mật khẩu", 300, `
			<form class="w3-padding __form">
				<div class="w3-padding-top">
					<label for="310118175954">Mật khẩu hiện tại</label><br>
					<input type="password" name="pass" id="310118175954" class="w3-input w3-border" minlength="6" maxlength="50" required>
				</div">
				<div class="w3-padding-top">
					<label for="310118180330">Mật khẩu mới</label><br>
					<input type="password" name="newpass" id="310118180330" class="w3-input w3-border" minlength="6" maxlength="50" required>
				</div>
				<div class="w3-padding-top">
					<label for="310118180507">Nhập lại mật khẩu mới</label><br>
					<input type="password" name="renewpass" id="310118180507" class="w3-input w3-border" minlength="6" maxlength="50" required>
				</div>
				<div class="w3-margin-top">
					<input type="submit" class="w3-button w3-light-gray" value="OK">
					<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
				</div>
			</form>
		`, $0 => {
			$0.form.submit(function(event) {
				event.preventDefault();

				if (this.newpass.value !== this.renewpass.value) {
					Modal.alert("Mật khẩu nhập lại không khớp", () => {
						this.renewpass.focus();
					});
				}
				else {
					Modal.wait(undefined, $1 => {
						$.post("php/changePass.php", {
							pass: this.pass.value,
							newpass: this.newpass.value
						}, err => {
							$1.fn.close();

							if (err) {
								Modal.alert(err);
							}
							else {
								Modal.alert("Đổi mật khẩu thành công.", () => {
									$0.fn.close();
								})
							}
						});
					});
				}
			});
		});
	},

	upload({
		album,
		canSelectAlbum = true
	} = {}) {
		return modal("Upload ảnh", 900, `
			<div class="w3-row">
				<div class="w3-col m1">&nbsp;</div>
				<form action="?view=upload" method="post" class="w3-col m10 w3-padding __form" enctype="multipart/form-data">
					<h2 class="w3-padding-top w3-padding-bottom w3-margin-bottom w3-border-bottom w3-border-light-gray w3-ellipsis __title"></h2>
					<div class="w3-cell-row">
						<div class="w3-cell w3-padding-right" style="border-right:solid 3px #ddd">
							<h6>Tải lên các tập tin hình ảnh</h6>
							<input type="file" name="files[]" class="w3-input __files" accept=".png, .jpg, .gif" multiple required>
							<small class="w3-text-gray">
								- Chỉ cho phép ảnh png, jpg, jpeg, gif.<br>
								- Kích thước mỗi tập tin tối đa 25 MB.<br>
								- Có thể chọn tối đa 20 tập tin (giữ phím Ctrl để chọn).
							</small>
						</div>
						<div class="w3-cell w3-padding-left" style="border-left:solid 3px #ddd">
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
						<input type="text" class="w3-col m7 l8 w3-input w3-border w3-border-light-gray __album_name">
						<input type="button" class="w3-col m5 l4 w3-button w3-border w3-border-light-gray w3-light-gray __selectAlbum" value="Chọn album ảnh">
						<input type="hidden" name="album_id">
					</div>
					<p class="w3-margin-top w3-padding-top">
						<input type="submit" class="w3-button w3-light-gray" value="Tải lên">
					</p>
				</form>
				<div class="w3-col m1">&nbsp;</div>
			</div>
		`, $0 => {
			let form = $0.form[0];

			if (album) {
				$0.title.html(`Tải lên ảnh vào album: <span class="w3-text-teal w3-margin-left">${text(album.name)}</span>`);
				$0.album_name.val(album.name);
				form.album_id.value = album.id;
			}
			else {
				$0.title.text("Tải lên ảnh của bạn");
			}

			$0.files
				.click(function() {
					this.value = "";
				})
				.change(function() {
					this.required = true;
					$0.filezip.prop({
						required: false,
						value: ""
					});
				});

			$0.filezip
				.click(function() {
					this.value = "";
				})
				.change(function() {
					this.required = true;
					$0.files.prop({
						required: false,
						value: ""
					});
				});

			if (canSelectAlbum) {
				$0.selectAlbum.click(event => {
					Modal.selectAlbum({
						removeEditBtn: "addImgBtn"
					}, album => {
						form.album_id.value = album.id;
						$0.album_name.val(album.name);
					});
				});
			}
			else {
				$0.selectAlbum
					.prop("disabled", true)
					.addClass("w3-disabled");
			}

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

	selectAlbum({
		selectedId,
		removeId,
		removeEditBtn
	} = {}, callback) {
		return modal("Chọn một album ảnh", 850, `
			<div class="w3-padding">
				<div class="w3-row-padding __list" style="padding-bottom:8px;overflow:overlay"></div>
				<div class="w3-border-top" style="padding-top:8px">
					<button class="w3-button w3-light-gray w3-disabled __ok" disabled>OK</button>
					<button class="w3-button w3-light-gray __close">Hủy</button>
					<button class="w3-button w3-light-gray w3-right __create">Tạo album mới</button>
				</div>
			</div>
		`, $0 => {
			let start = 0, len = 20, selected;

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
					selectedId,
					removeId,
					removeEditBtn
				});
			}

			load();

			$0.list.css({
				maxHeight: window.innerHeight - 300
			});

			$0.ok.click(okFn);

			$0.create.click(event => {
				Modal.createAlbum(albumId => {
					load(albumId);
				});
			});

			function okFn() {
				if (!callback || callback && callback(selected) !== false) {
					$0.fn.close();
				}
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
					<input type="submit" class="w3-button w3-light-gray" value="OK">
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

			try {
				new google.maps.places.Autocomplete($0.location[0]);
			}
			catch(e) {}

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
				<input type="submit" value="OK" class="w3-button w3-light-gray">
				<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
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
				<input type="submit" value="OK" class="w3-button w3-light-gray">
				<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
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
				<input type="submit" value="OK" class="w3-button w3-light-gray">
				<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
			</form>
		`, $0 => {
			$0.location.select();

			new google.maps.places.Autocomplete($0.location[0]);

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

	deleteAlbum(album, callback) {
		Modal.confirm(`Bạn chắc chắn muốn xóa album "${text(album.name)}"? Tất cả ảnh trong album cũng sẽ bị xóa.`, () => {
			Modal.wait(undefined, $1 => {
				$.post("php/deleteAlbum.php", {
					id: album.id
				}, err => {
					$1.fn.close();

					if (err) {
						Modal.alert(err);
					}
					else {
						callback(album);
					}
				});
			});
		});
	},

	renameImg(img, callback) {
		return modal("Đổi tên hình ảnh", 320, `
			<form class="w3-padding __form">
				<div class="w3-section w3-row">
					<label class="w3-col s12">Nhập tên mới: </label>
					<input type="text" name="name" class="w3-col s10 w3-input w3-border __name" value="${text(img.name)}" minlength="1" maxlength="500" pattern="^[^\\\\/:*?&quot;&lt;&gt;|]+$" data-err-blank="Tên hình ảnh phải chứa ít nhất một ký tự không phải khoảng trắng." autofocus required>
					<span class="w3-col s2 w3-padding">.${img.type}</span>
				</div>
				<input type="submit" value="OK" class="w3-button w3-light-gray">
				<input type="button" class="w3-button w3-light-gray __close" value="Hủy">
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
				else if (this.name.value !== img.name) {
					$.post("php/renameImg.php", {
						name: this.name.value,
						id: img.id
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

	copyImg(img, callback) {
		Modal.selectAlbum({}, album => {
			$.post("php/copyImg.php", {
				id: img.id,
				album_id: album.id,
				is_same_album: +(img.album_id === album.id)
			},
			res => {
				if (res) {
					let [err, newImg] = JSON.parse(res);

					if (err) {
						Modal.alert(err);
					}

					callback && callback(newImg);
				}
			});
		});
	},

	moveImg(img, callback) {
		Modal.selectAlbum({
			removeId: img.album_id
		}, album => {
			$.post("php/moveImg.php", {
				id: img.id,
				album_id: album.id
			},
			res => {
				callback(res);
			});
		});
	},

	downloadImg(img, callback) {
		if (meId) {
			let a;

			a = document.createElement("a");
			a.href = `img/upload/${img.id}.${img.type}`;
			a.download = `${img.name}_${img.id}.${img.type}`;

			a.click();
		}
		else {
			Modal.login();
		}
	},

	deleteImg(img, callback) {
		Modal.confirm("Bạn chắc chắn muốn xóa?", () => {
			Modal.wait(undefined, $1 => {
				$.post("php/deleteImg.php", {
					id: img.id
				}, err => {
					$1.fn.close();

					if (err) {
						Modal.alert(err);
					}
					else {
						callback(img);
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
			<div class="w3-display-container w3-text-white __view" style="position:fixed;width:100%;height:100%;background:#0e0e0e">
				<img class="w3-display-topleft w3-noselect __img __img2" alt="image">
				<img class="w3-display-topleft w3-noselect __img __img1" alt="image" style="display:none">
				<div class="__tools">
					<button class="w3-display-left w3-button w3-transparent w3-hover-dark-gray __prev" style="padding:32px 16px">
						<img src="https://png.icons8.com/material/48/ffffff/back.png" class="w3-text-outline-black w3-noevent">
					</button>
					<button class="w3-display-right w3-button w3-transparent w3-hover-dark-gray __next" style="padding:32px 16px">
						<img src="https://png.icons8.com/material/48/ffffff/forward.png" class="w3-text-outline-black w3-noevent">
					</button>
					<div class="w3-display-topleft w3-row w3-bar w3-large" style="background:#0008">
						<div class="w3-col s5">
							<span class="w3-padding w3-ellipsis __name"></span>
						</div>
						<div class="w3-col s2 w3-center">
							<span class="w3-padding w3-ellipsis __imgIndex"></span>
						</div>
						<div class="w3-col s5">
							<div class="w3-right">
								<img class="w3-bar-item w3-button w3-hover-dark-gray __download" src="https://png.icons8.com/material/24/ffffff/download.png" title="Tải xuống">
								<img class="w3-bar-item w3-button w3-hover-dark-gray w3-hide-fullscreen __fullscreen" src="https://png.icons8.com/material/24/ffffff/fit-to-width.png" title="Bật/tắt toàn màn hình">
								<img class="w3-bar-item w3-button w3-hover-red __close" src="https://png.icons8.com/material/24/ffffff/delete-sign.png" title="Đóng">
							</div>
						</div>
					</div>
				</div>
			</div>
		`, $0 => {
			let fitX, fitY, fitX0, fitY0;

			$0.modalContent.css({
				borderRadius: 0
			});

			$0.modalHeader.hide();

			if (img.status == 1) {
				$0.img
					.css({
						width: "100%",
						height: "100%",
						objectFit: "scale-down"
					});

				$0.img1
					.css({
						cursor: "zoom-in"
					})
					.hammer()
					.on("tap", function(event) {
						if (this.naturalWidth > this.width || this.naturalHeight > this.height) {
							if ($0.img1.css("objectFit") === "none") {
								$0.img1.css({
									objectFit: "scale-down",
									objectPosition: "initial",
									cursor: "zoom-in"
								});
							}
							else {
								fitX = Math.round(this.naturalWidth / 2 - this.width / 2);
								fitY = Math.round(this.naturalHeight / 2 - this.height / 2);

								$0.img1.css({
									objectFit: "none",
									objectPosition: `${-fitX}px ${-fitY}px`,
									cursor: "zoom-out"
								});
							}
						}
					});

				$0.view
					.mousemove(function(event) {
						if (event.target === $0.view[0] || event.target === $0.img[1]) {
							if ($0.tools.css("display") === "none") {
								if (
									Math.max(
										Math.abs(event.originalEvent.movementX),
										Math.abs(event.originalEvent.movementY)
									) > 5
								) {
									$0.tools
										.finish()
										.show()
										.delay(1000)
										.fadeOut(200);
								}
							}
							else {
								if (
									Math.max(
										Math.abs(event.originalEvent.movementX),
										Math.abs(event.originalEvent.movementY)
									) > 5
								) {
									$0.tools
										.finish()
										.show()
										.delay(1000)
										.fadeOut(200);
								}
								else {
									if ($0.tools.data("hoverTools")) {
										$0.tools
											.finish()
											.show()
											.delay(1000)
											.fadeOut(200)
											.removeData("hoverTools");
									}
								}
							}
						}
						else {
							$0.tools
								.finish()
								.show()
								.data("hoverTools", true);
						}
					})
					.hammer()
					.on("panstart", event => {
						fitX0 = fitX;
						fitY0 = fitY;

						$0.img1.css({
							cursor: "-webkit-grab"
						});
					})
					.on("pan", event => {
						if ($0.img1.css("objectFit") === "none") {
							let img1 = $0.img1[0];

							fitX = fitX0;
							fitY = fitY0;

							if (img1.naturalWidth > img1.width) {
								fitX -= event.gesture.deltaX;

								if (fitX < 0) {
									fitX = 0;
								}
								else if (fitX > img1.naturalWidth - img1.width) {
									fitX = img1.naturalWidth - img1.width;
								}
							}
							if (img1.naturalHeight > img1.height) {
								fitY -= event.gesture.deltaY;

								if (fitY < 0) {
									fitY = 0;
								}
								else if (fitY > img1.naturalHeight - img1.height) {
									fitY = img1.naturalHeight - img1.height;
								}
							}

							$0.img1.css({
								objectPosition: `${-fitX}px ${-fitY}px`,
								cursor: "-webkit-grabbing"
							});
						}
					})
					.on("panend", event => {
						$0.img1.css({
							cursor: $0.img1.css("objectFit") === "none" ? "zoom-out" : "zoom-in"
						});
					});

				$0.tools
					.delay(1000)
					.fadeOut(200);

				$0.fullscreen
					.click(event => {
						if (document.webkitIsFullScreen) {
							document.webkitExitFullscreen();
						}
						else {
							$0.view[0].webkitRequestFullscreen();

							$0.img1.css({
								objectFit: "scale-down",
								objectPosition: "initial",
								cursor: "zoom-in"
							});
						}
					});

				load(img);

				function load(img, nav) {
					let prev, next, findIndex;

					findIndex = album.imgs.findIndex(v => v.id === img.id);
					prev = album.imgs[findIndex - 1];
					next = album.imgs[findIndex + 1];

					if (album.num_img < len || (next && prev)) {
						render(nav, prev, img, next, findIndex);
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

				function render(nav, prev, img, next, index) {
					let imgUrl;

					imgUrl = `img/upload/${img.id}.${img.type}`;

					$0.name
						.text(img.name)
						.prop("title", img.name);

					$0.imgIndex.text((index + 1) + " / " + album.num_img);

					$0.download
						.off("click")
						.click(() => {
							Modal.downloadImg(img);
						});

					$0.prev
						.add($0.next)
						.off("click")
						.prop("disabled", true)
						.addClass("w3-disabled");

					$0.img2
						.prop("src", imgUrl)
						.velocity("finish")
						.velocity({
							left: [0, nav * 100 + "%"]
						}, 400, e => {
							$(e)
								.removeProp("src")
								.css("left", nav * 100 + "%");
						});

					$0.img1
						.velocity("finish")
						.velocity({
							left: [nav * -100 + "%", 0]
						}, 400, e => {
							$(e)
								.show()
								.prop("src", imgUrl)
								.css({
									left: 0,
									objectFit: "scale-down",
									objectPosition: "initial",
									cursor: "zoom-in"
								});
						});

					if (prev) {
						$0.prev
							.click(event => {
								load(prev, -1);

								$0.tools
									.finish()
									.show()
									.delay(1000)
									.fadeOut(200);
							})
							.prop("disabled", false)
							.removeClass("w3-disabled");
					}

					if (next) {
						$0.next
							.click(event => {
								load(next, 1);

								$0.tools
									.finish()
									.show()
									.delay(1000)
									.fadeOut(200);
							})
							.prop("disabled", false)
							.removeClass("w3-disabled");
					}
				}
			}
			else {
				$0.img.hide();

				$0.view.append(`
					<div class="w3-display-middle w3-text-gray w3-large">Ảnh này hiện đã bị xóa</div>
				`);
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
