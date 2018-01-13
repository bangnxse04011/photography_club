let auth2, googleUser = {};

gapi.load("auth2", function() {
	auth2 = gapi.auth2.init({
		client_id: GOOGLE_CLIENT_ID,
		cookiepolicy: "single_host_origin"
	});
});

function googleSignin(elm, success = () => {}, failure = () => {}) {
	auth2.attachClickHandler(elm, {}, success, failure);
}
