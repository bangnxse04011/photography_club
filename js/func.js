function text(html) {
	return (html + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function modal(title = "", width = "auto", html = "", js) {
	let $modal, $n, clsRand, fn, $$;

	title = text(title);

	do {
		clsRand = "modal" + Math.floor(Math.random() * 1e9);
	}
	while (modals.querySelector("." + clsRand));

	$modal = `
		<div class="w3-modal __modal ${clsRand}">
			<div class="w3-modal-content w3-card anim-show-modal __modalContent" style="width:${width}px;border-radius:16px;overflow:hidden">
				<header class="w3-container w3-teal __modalHeader">
					<span class="w3-button w3-transparent w3-text-white w3-display-topright w3-hover-red __close">&#x2716;</span>
					<h6 class="${title ? "" : "w3-hide"} __modalTitle">${title}</h6>
				</header>
				<div class="w3-light-gray __modalBody">${html}</div>
			</div>
		</div>
	`;

	$$ = html => {
		let $html = $("<div>" + html + "</div>");

		$html
			.find(".__close")
			.click(function(event) {
				if (event.target === this) {
					$n.modalContent.addClass("anim-hide-modal");

					setTimeout(() => {
						$modal.remove();
					}, 200);
				}
			})
			.end()
			.find(".active> *")
			.click(function() {
				active(this, "w3-light-blue");
			});

		return $html.children();
	};

	$modal = $$($modal);
	$("#modals").append($modal);

	document.activeElement.blur();

	fn = {
		close() {
			$n.close[0].click();
		},
		append(parent, elm) {
			parent.append($$(elm));
		}
	};

	$n = new Proxy(selector => $("." + clsRand + " .__" + selector), {
		get: (target, prop) => prop === "modal" ? $modal : prop === "fn" ? fn : prop === "$" ? $$ : target(prop)
	});

	setTimeout(() => {
		$n.modalContent.removeClass("anim-show-modal");

		let findAutofocus = $modal.find("[autofocus]")[0];

		if (findAutofocus) {
			findAutofocus.focus();
		}
	}, 200);

	$modal.show();

	js && js($n);

	return $n;
}

function active(elm, cls) {
	$(elm)
		.addClass(cls)
		.siblings()
		.removeClass(cls);
}
