<div id="header" class="w3-row w3-bar w3-card w3-white">
	<div class="w3-col s9 m3">
		<img id="btnSidebar" class="w3-button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA2SURBVEhL7dGxDQAwDAJB9l/aGYDvSGHJnPQdHapb5nOGRkm1EB2VZGiUVAvRUUmGRkl1g/QA8+53if5aVp8AAAAASUVORK5CYII=">
		<a href="." class="w3-button w3-hover-none"><b>Photography Club</b></a>
	</div>
	<div class="w3-col s3 w3-padding-bottom w3-hide-medium w3-hide-large userBtnSm">asd</div>
	<form method="get" id="frmSearch" class="w3-col m5">
		<input type="text" id="search" name="search" class="w3-col s10 w3-input w3-border" placeholder="Tìm kiếm" autocomplete="off" required>
		<button id="btnSearch" class="w3-col s2 w3-button w3-light-gray w3-border" style="padding-top:6px;padding-bottom:7px">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFjSURBVEhLxdVNKwVRHMfxCSspiZdAkaLIzkuQKJGdsGFhwRJJWLBSFgpl61WwpjyEHS9AHsrO88P392+mrumOc841Xb/6dOd/7nmYmXtmbvTfacIElmM6bsSf04UDfGXYRydKyhheoImusIqR2Bquoe/UZxRB6cMnXjGFKqSjtmmoj/r2wit1eIAG9avBkQGo7z1q1eDKPHTpO1b5ZRcaM2eVI6dQ51ar/NIGjTm26pdU4A23VoXlDvo9NEdmdP91JhdWheUSGqs5MlOJd9xYFRZd9QeK7bgfOYfOpNkqv7RAY86scmQR6rxplV+2oTGzVjnSgEfoVvWowRE9YOqrZ6deDT4Zhh6eJ4yj2M5Qm156z9DZ7yEok9CZabB2yAIGMRQfJ7um0BKC0o1DpCdKHGEr1Ra8iNIOvdjWsYEZdCDJCgoX0X9G7kkvojr3lH2RE1Qj92gRTe79XJSSmvizHImib16pa7OPH/CXAAAAAElFTkSuQmCC">
		</button>
		<ul id="searchSuggest" class="w3-ul w3-white w3-card w3-round"></ul>
	</form>
	<div class="w3-col m4 w3-right-align w3-hide-small userBtnMdLg">
		<?php if ($meId) { ?>
			<div class="w3-dropdown-click w3-transparent w3-right w3-margin-right">
				<img class="w3-circle userIcon" src="https://png.icons8.com/windows/48/000000/user.png">
				<div class="w3-dropdown-content w3-bar-block w3-card-4 w3-dropdown-right" style="width:250px;transform:translateX(-78%)">
					<div class="w3-bar-item w3-row w3-light-gray" style="margin-bottom:8px">
						<div class="w3-col s3">
							<img class="w3-circle userIcon" src="https://png.icons8.com/windows/48/000000/user.png">
						</div>
						<div class="w3-col s9">
							<div><?php echo "$me[first_name] $me[last_name]"?></div>
							<div class="w3-small w3-text-gray"><?php echo "$me[name]"?></div>
						</div>
					</div>
					<a href="?view=profile" class="w3-bar-item w3-button w3-hover-light-gray">
						<img src="https://png.icons8.com/windows/24/stack-of-photos.png">
						<span class="w3-margin-left">Thông tin tài khoản</span>
					</a>
					<a href="?view=myAlbums" class="w3-bar-item w3-button w3-hover-light-gray">
						<img src="https://png.icons8.com/windows/24/stack-of-photos.png">
						<span class="w3-margin-left">Album ảnh</span>
					</a>
					<a href="javascript:" class="w3-bar-item w3-button w3-hover-light-gray btnPayIn">
						<img src="https://png.icons8.com/windows/24/money.png">
						<span class="w3-margin-left">Nạp tiền</span>
					</a>
					<a href="javascript:" class="w3-bar-item w3-button w3-hover-light-gray btnChangePass">
						<img src="https://png.icons8.com/windows/24/password.png">
						<span class="w3-margin-left">Đổi mật khẩu</span>
					</a>
					<a href="php/logout.php" class="w3-bar-item w3-button w3-hover-light-gray">
						<img src="https://png.icons8.com/windows/24/exit.png">
						<span class="w3-margin-left">Đăng xuất</span>
					</a>
				</div>
			</div>
		<?php } else { ?>
			<button class="w3-button w3-round w3-hover-light-gray w3-hide-small btnRegister">
				Đăng ký
			</button>
			<button class="w3-button w3-round w3-hover-light-gray w3-hide-small btnLogin">
				Đăng nhập
			</button>
			<div class="w3-dropdown-click w3-button w3-right w3-hide-medium w3-hide-large">
				<span>&#9660;</span>
				<div class="w3-dropdown-content w3-bar-block w3-card" style="transform:translate(-80%)">
					<button class="w3-bar-item w3-button w3-round w3-hover-light-gray btnRegister">
						Đăng ký
					</button>
					<button class="w3-bar-item w3-button w3-round w3-hover-light-gray btnLogin">
						Đăng nhập
					</button>
				</div>
			</div>
		<?php } ?>
	</div>
</div>
