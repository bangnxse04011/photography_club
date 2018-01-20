$(".userBtnSm").html($(".userBtnMdLg").html());

$(window)
	.resize(function(event) {
		$("#section").css({
			paddingTop: $("#header").innerHeight()
		});

		if (window.innerWidth < 601) {
			$("#sidebar").hide();
		}
		else {
			$("#sidebar").show();
		}
	})
	.resize();

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

$("#btnSidebar").click(event => {
	$("#sidebar").toggle();
});

$(".upload").click(event => {
	Modal[meId ? "upload" : "login"]();
});

$(".setting").click(event => {
	Modal.setting();
});
