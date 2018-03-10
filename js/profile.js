function loadProfile() {
	let
		$form = $(".profile .__form"),
		$dateCreated = $(".profile .__dateCreated"),
		$btnSubmit = $(".profile .__btnSubmit"),
		oldFormData = $form.serialize();

	$dateCreated.val(dateStr($dateCreated.val()));

	$btnSubmit.prop("disabled", true);

	$form
		.submit(function(event) {
			event.preventDefault();

			Modal.wait("Đang cập nhật...", $0 => {
				$.post(
					"php/updateProfile.php",
					$form.serialize(),
					result => {
						location.href = `?view=profile&isUpdateSuccess=${result}`;
					}
				);
			});
		})
		.find("[name]")
			.on("input", function(event) {
				$btnSubmit.prop("disabled", $form.serialize() === oldFormData);
			});
}

loadProfile();
