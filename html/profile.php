<section class="w3-section w3-container w3-padding-top w3-white">
	<h6 class="w3-margin">
		<b>Thông tin tài khoản</b>
	</h6>
	<div class="w3-row">
		<div class="w3-col m6">
			<form id="formProfile" class="w3-row-padding">
				<div class="w3-col m6 w3-margin-top">
					<label>Họ: </label>
					<input type="text" name="first_name" class="w3-input w3-border" value="<?php echo $me['first_name'] ?>">
				</div>
				<div class="w3-col m6 w3-margin-top">
					<label>Tên: </label>
					<input type="text" name="last_name" class="w3-input w3-border" value="<?php echo $me['last_name'] ?>">
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label>Tên tài khoản: </label>
					<input type="text" class="w3-input w3-border" value="<?php echo $me['name'] ?>" readonly>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label>Email: </label>
					<input type="text" class="w3-input w3-border" value="<?php echo $me['email'] ?>">
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label>Tiền: </label>
					<input type="text" class="w3-input w3-border" value="<?php echo $me['money'] ?> VND" readonly>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label>Ngày tạo: </label>
					<input type="text" class="w3-input w3-border formProfile__date_created" value="<?php echo $me['date_created'] ?>" readonly>
				</div>
			</form>
		</div>
	</div>
</section>
