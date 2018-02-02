loadHistory();

function loadHistory() {
	let index = 0,
		lockLoad,
		next = "",
		$myHistory = $(".myHistory"),
		$list = $myHistory.find(".list");

	load();

	main.onscroll = function(event) {
		if (
			!lockLoad &&
			next !== undefined &&
			this.scrollTop >= this.scrollHeight - this.clientHeight
		) {
			load(next);
		}
	};

	function load(date) {
		lockLoad = true;

		$myHistory.find(".loader").show();

		$.getJSON("php/getHistories.php", {
			date: date
		}, data => {
			let $ul, date;

			if (data.list) {
				date = data.current;

				$list.append(`
					<h6 class="w3-margin-top w3-bottombar w3-border-light-gray" style="margin-bottom:0;font-weight:500">${dateStr(date)}</h6>
				`);

				$ul = $(`
					<ul class="w3-ul date-list" style="font-size:small"></ul>
				`);
				$list.append($ul);

				for (let k in data.list) {
					let v = data.list[k],
						$li;

					switch (v[0].act) {
						case "copy_img":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã sao chép một ảnh vào ${v[0].from_album_id === v[0].to_album_id ? "chính album đó" : "album khác"}</div>
								</li>
							`);
							break;

						case "create_album":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã tạo một album ảnh</div>
								</li>
							`);
							break;

						case "delete_album":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã xóa một album ảnh</div>
								</li>
							`);
							break;

						case "delete_img":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã xóa một ảnh</div>
								</li>
							`);
							break;

						case "move_img":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã di chuyển một ảnh sang album khác</div>
								</li>
							`);
							break;

						case "rename_img":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã đổi tên một ảnh</div>
								</li>
							`);
							break;

						case "rename_album":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">Bạn đã đổi tên một album ảnh</div>
								</li>
							`);
							break;

						case "upload":
							$li = $(`
								<li class="w3-cell-row">
									<div class="w3-cell w3-text-gray" style="width:96px">${v[0].time.slice(0, -3)}</div>
									<div class="w3-cell content">
										Bạn đã tải lên ${v.length} ảnh vào album
										<a href="?view=album&id=${v[0].album_id}" class="w3-text-teal w3-underline-none">${text(v[0].album_name)}</a>
									</div>
								</li>
							`);
							break;
					}
					$ul.append($li);

					for (let v2 of v) {
						let $li2;

						switch (v2.act) {
							case "copy_img":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<img src="thumb.php?id=${v2.img_id}&type=${v2.img_type}&s=24" style="width:24px;height:24px;object-fit:cover">
										&nbsp;&nbsp;${text(v2.img_name)}.${v2.img_type}<br>
										<a href="?view=album&id=${v2.from_album_id}" class="w3-text-teal w3-underline-none">${text(v2.from_album_name)}</a>
										&nbsp;&nbsp; &rarr; &nbsp;&nbsp;
										<a href="?view=album&id=${v2.to_album_id}" class="w3-text-teal w3-underline-none">${text(v2.to_album_name)}</a>
									</div>
								`);
								break;

							case "create_album":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<a href="?view=album&id=${v2.album_id}" class="w3-text-teal w3-underline-none">${text(v2.album_name)}</a>
									</div>
								`);
								break;

							case "delete_album":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<del class="w3-text-gray">${text(v2.album_name)}</del>
									</div>
								`);
								break;

							case "delete_img":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<img src="thumb.php?id=${v2.img_id}&type=${v2.img_type}&s=24" class="w3-opacity w3-grayscale" style="width:24px;height:24px;object-fit:cover">
										&nbsp;&nbsp;
										<del class="w3-text-gray">
											${text(v2.img_name)}.${v2.img_type}
										</del>
									</div>
								`);
								break;

							case "move_img":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<img src="thumb.php?id=${v2.img_id}&type=${v2.img_type}&s=24" style="width:24px;height:24px;object-fit:cover">
										&nbsp;&nbsp;
										<a href="javascript:" class="w3-underline-none linkViewImg">${text(v2.img_name)}.${v2.img_type}</a><br>
										<a href="?view=album&id=${v2.from_album_id}" class="w3-text-gray w3-underline-none">${text(v2.from_album_name)}</a>
										&nbsp;&nbsp; &rarr; &nbsp;&nbsp;
										<a href="?view=album&id=${v2.to_album_id}" class="w3-text-teal w3-underline-none">${text(v2.to_album_name)}</a>
									</div>
								`);
								break;

							case "rename_img":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<img src="thumb.php?id=${v2.img_id}&type=${v2.img_type}&s=24" style="width:24px;height:24px;object-fit:cover">
										&nbsp;&nbsp;<del class="w3-text-gray">${text(v2.old_name)}.${v2.img_type}</del>
										&nbsp;&nbsp; &rarr; &nbsp;&nbsp;
										<a href="javascript:" class="w3-text-black w3-underline-none linkViewImg">${text(v2.new_name)}.${v2.img_type}</a>
									</div>
								`);
								break;

							case "rename_album":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<del class="w3-text-gray">${text(v2.old_name)}</del>
										&nbsp;&nbsp; &rarr; &nbsp;&nbsp;
										<a href="?view=album&id=${v2.album_id}" class="w3-text-teal w3-underline-none">${text(v2.new_name)}</a><br>
									</div>
								`);
								break;

							case "upload":
								$li2 = $(`
									<div class="w3-margin-left w3-padding-left w3-padding-top">
										<img src="thumb.php?id=${v2.img_id}&type=${v2.img_type}&s=24" style="width:24px;height:24px;object-fit:cover">
										&nbsp;&nbsp;
										<a href="javascript:" class="w3-underline-none linkViewImg">${text(v2.img_name)}.${v2.img_type}</a>
									</div>
								`);
								break;
						}
						$li.find(">.content").append($li2);

						$li2.find(".linkViewImg").click(event => {
							$viewImg = Modal.viewImg(
								{
									id: v2.img_id,
									status: v2.img_status
								}, {
									id: v2.img_album_id,
									imgs: [],
									num_img: v2.album_num_img
								},
								0
							);
						});
					}
				}

				if (data.next) {
					next = data.next;
					lockLoad = false;

					if ($myHistory.height() < main.clientHeight) {
						load(next);
					}
					else {
						$myHistory.find(".loader").hide();
					}
				}
				else {
					next = undefined;

					if (main.scrollTop) {
						$myHistory.find(".footer").html(`
								<span style="color:#ccc">&#151;</span>
								<span class="w3-text-gray">Hết</span>
								<span style="color:#ccc">&#151;</span>
						`);
					}
					else {
						$myHistory.find(".footer").hide();
					}
				}
			}
		});
	}
}
