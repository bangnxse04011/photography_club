loadHistory();

function loadHistory() {
	let index = 0,
		$myHistory = $(".myHistory"),
		$list = $myHistory.find(".list");

	load();

	function load(date) {
		$.getJSON("php/getHistories.php", {
			date: date
		}, data => {
			let $ul, date;

			if (data.list && data.list[0]) {
				date = data.list[0].date;
			}

			$list.append(`
				<h6><b>Ngày ${dateStr(date)}</b></h6>
			`);

			$ul = $(`
				<ul class="w3-ul"></ul>
			`);
			$list.append($ul);

			for (let v of data.list) {
				let $li;

				if (v.act === "upload") {
					$li = $(`
						<li>
							Bạn đã tải lên ảnh <span class="w3-text-teal">${text(v.img_name)}.${text(v.img_type)}</span> vào album <span class="w3-text-teal">${text(v.album_name)}</span>
						</li>
					`);
				}
				$ul.append($li);
			}
		});
	}
}
