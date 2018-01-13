$(window)
	.resize(function(event) {
		$("#section").css({
			paddingTop: $("#header").innerHeight()
		});
	})
	.resize();

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
