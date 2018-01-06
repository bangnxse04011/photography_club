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
			<form class="w3-container __form" action="php/register.php" method="post">
				<p class="w3-row">
					<span class="w3-col m6">
						<label>Họ</label>
						<input type="text" name="first_name" class="w3-input w3-border w3-round" autofocus required>
					</span>
					<span class="w3-col m6" style="padding-left:16px">
						<label>Tên</label>
						<input type="text" name="last_name" class="w3-input w3-border w3-round" required>
					</span>
				</p>
				<p>
					<label>Tên tài khoản</label>
					<input type="text" name="name" class="w3-input w3-border w3-round" minlength="6" maxlength="50" pattern="[a-zA-Z0-9_\\-]+" placeholder="chữ cái, số, dấu gạch dưới và gạch ngang" required>
				</p>
				<p>
					<label>Mật khẩu</label>
					<input type="password" name="pass" class="w3-input w3-border w3-round" minlength="6" maxlength="50" required>
				</p>
				<p>
					<label>Nhập lại mật khẩu</label>
					<input type="password" class="w3-input w3-border w3-round __repass" minlength="6" maxlength="50" required>
				</p>
				<p class="w3-center">
					<input type="submit" class="w3-button w3-teal" value="Đăng ký">
				</p>
			</form>
		`, $0 => {
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
							location.reload();
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
					<input type="text" name="name" class="w3-input w3-border w3-round" minlength="6" maxlength="50" pattern="[a-zA-Z0-9_\\-]+" required>
				</p>
				<p>
					<label>Mật khẩu</label>
					<input type="password" name="pass" class="w3-input w3-border w3-round" minlength="6" maxlength="50" required>
				</p>
				<p class="w3-center">
					<input type="submit" class="w3-button w3-teal" value="Đăng nhập">
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
						location.reload();
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
								- Có thể chọn nhiều ảnh (giữ phím Ctrl để chọn).<br>
								- Kích thước mỗi tập tin tối đa 10 MB.
							</small>
						</div>
						<div class="w3-cell w3-leftbar w3-padding-left">
							<h6>Tải lên tập tin nén</h6>
							<input type="file" name="filezip" class="w3-input __filezip" accept=".zip">
							<small class="w3-text-gray">
								- Tập tin zip sau khi tải lên sẽ tự động được giải nén.<br>
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
						<input type="submit" class="w3-button w3-teal" value="Tải lên">
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
				form.filezip.required = false;
				form.filezip.value = "";
			});

			$0.filezip.change(function() {
				this.required = true;
				form.files.required = false;
				form.files.value = "";
			});

			$0.selectAlbum.click(event => {
				Modal.selectAlbum(album => {
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

	selectAlbum(callback) {
		return modal("Chọn một album ảnh", 800, `
			<div class="w3-padding">
				<div class="w3-row-padding __list" style="max-height:300px;padding-bottom:8px;overflow:auto"></div>
				<div class="w3-border-top" style="padding-top:8px">
					<button class="w3-button w3-disabled __ok" disabled>OK</button>
					<button class="w3-button __close">Hủy</button>
					<button class="w3-button w3-right __create">Tạo album mới</button>
				</div>
			</div>
		`, $0 => {
			let select;

			function init() {
				$.getJSON("php/getAllAlbum.php", data => {
					if (data.length) {
						$0.list.empty();

						for (let album of data) {
							let $album = $(`
								<div class="w3-col s12 m3 w3-padding-top w3-padding-bottom w3-hover-border w3-pointer">
									<div class="w3-display-container">
										<img class="w3-border w3-white img">
										<span class="w3-display-bottomright w3-padding-small">
											${album.num_img} ảnh
										</span>
									</div>
									<div class="w3-ellipsis" title="${text(album.name)}">${text(album.name)}</div>
									<div class="w3-small w3-text-gray">
										<div>
											Ngày chụp: ${
												isFinite(Date.parse(album.date)) ?
												new Date(album.date).toLocaleDateString() :
												""
											}
										</div>
										<div class="w3-ellipsis" title="${text(album.location)}">
											Địa điểm: ${text(album.location)}
										</div>
									</div>
								</div>
							`);
							$0.list.append($album);

							$album
								.click(function() {
									select = album;

									this.scrollIntoViewIfNeeded();
									active(this, "w3-light-blue");
									$0.ok.prop("disabled", false).removeClass("w3-disabled");
								})
								.find(".img")
								.css({
									width: "100%",
									height() {
										return $(this).width() * 0.6
									},
									objectFit() {
										return album.imgs ? "cover" : "none"
									}
								})
								.prop("src",
									album.imgs ?
									`img/upload/${album.imgs[0].id}.${album.imgs[0].type}` :
									"https://png.icons8.com/office/80/picture.png"
								);
						}
					}
					else {
						$0.list.append(`
							<p class="w3-text-gray">
								Chưa có album ảnh nào, hãy tạo một album mới!
							</p>
						`);
					}
				});
			}

			init();

			$0.ok.click(event => {
				callback(select);

				$0.fn.close();
			});

			$0.create.click(event => {
				Modal.createAlbum(() => {
					init();
				});
			});
		});
	},

	createAlbum(callback) {
		return modal("Tạo một album mới", 400, `
			<form class="w3-padding __form">
				<div class="w3-padding-top">
					<label>Tên album</label>
					<input type="text" name="name" class="w3-input w3-border w3-round" minlength="1" maxlength="200" required>
				</div>
				<div class="w3-padding-top">
					<label>Ngày chụp</label>
					<input type="date" name="date" class="w3-input w3-border w3-round">
				</div>
				<div class="w3-padding-top">
					<label>Địa điểm</label>
					<input type="text" name="location" class="w3-input w3-border w3-round">
				</div>
				<div class="w3-center w3-margin-top">
					<input type="submit" class="w3-button" value="OK">
				</div>
			</form>
		`, $0 => {
			$0.form.submit(function(event) {
				event.preventDefault();

				$.post("php/createAlbum.php", $0.form.serialize(), err => {
					if (err) {
						Modal.alert(err);
					}
					else {
						callback(this.name.value);

						$0.fn.close();
					}
				});
			});
		});
	}
};
