<section class="w3-section w3-container w3-padding-top w3-white profile">
	<h6 class="w3-margin">
		<b>Thông tin tài khoản</b>
	</h6>
	<div class="w3-cell-row">
		<div class="w3-cell" style="width:60%">
			<form class="w3-row-padding w3-margin-right __form">
				<div class="w3-col m6 w3-margin-top">
					<label class="w3-text-teal">Họ <span class="w3-text-red">*</span></label>
					<input type="text" name="first_name" class="w3-input w3-border" value="<?php echo $me['first_name'] ?>" required>
				</div>
				<div class="w3-col m6 w3-margin-top">
					<label class="w3-text-teal">Tên <span class="w3-text-red">*</span></label>
					<input type="text" name="last_name" class="w3-input w3-border" value="<?php echo $me['last_name'] ?>" required>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label class="w3-text-teal">Tên tài khoản </label>
					<input type="text" class="w3-input w3-border" value="<?php echo $me['name'] ?>" readonly>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label class="w3-text-teal">Email <span class="w3-text-red">*</span></label>
					<input type="email" name="email" class="w3-input w3-border" value="<?php echo $me['email'] ?>">
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label class="w3-text-teal">Tiền </label>
					<input type="text" class="w3-input w3-border" value="<?php echo $me['money'] ?> VND" readonly>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<label class="w3-text-teal">Ngày tạo </label>
					<input type="text" class="w3-input w3-border __dateCreated" value="<?php echo $me['date_created'] ?>" readonly>
				</div>
				<div class="w3-col m12 w3-margin-top">
					<input type="submit" value="Cập nhật" class="w3-button w3-teal __btnSubmit">
				</div>
			</form>
		</div>
		<div class="w3-cell w3-section w3-container w3-leftbar" style="width:40%">
			<div class="w3-margin">
				<p class="w3-text-gray w3-padding-top">
					Những mục đánh dấu <span class="w3-text-red">*</span> là những mục bạn có thể chỉnh sửa.
				</p>
				<?php if (isset($_GET['isUpdateSuccess'])) { ?>
					<?php if ($_GET['isUpdateSuccess']) { ?>
						<div class="w3-panel w3-pale-green">
							<p>Cập nhật tài khoản thành công!</p>
						</div>
					<?php } else { ?>
						<div class="w3-panel w3-pale-red">
							<p>Cập nhật tài khoản thất bại!</p>
						</div>
					<?php } ?>
				<?php } ?>
			</div>
		</div>
	</div>
</section>
