<table class="w3-table w3-bordered w3-white">
	<thead>
		<tr>
			<th>Tên tập tin</th>
			<th>Loại</th>
			<th>Kích thước</th>
			<th>Trạng thái</th>
		</tr>
	</thead>
	<tbody>
		<?php
		if ($meId) {
			if (isset($_FILES['files'])) {
				$files = $_FILES['files'];
				$filezip = $_FILES['filezip'];
				$album_id = $_POST['album_id'];

				$upload_dir = 'img/upload';

				if ($album_id > 0) {
					$query = "SELECT max(id) img_id FROM imgs";

					if ($rs = $con->query($query)) {
						$img_id = $rs->fetch_assoc()['img_id'] + 1;

						if (is_array($files['name'])) {
							for ($i = 0; $i < count($files['name']); $i++) {
								$flag = FALSE;

								if ($files['error'][$i] === 0) {
									if (preg_match('/^image\/(png|jpg|jpeg|gif)$/', $files['type'][$i])) {
										if ($files['size'][$i] <= 1024 * 1024 * 5) {
											$pathinfo = pathinfo($files['name'][$i]);

											$name = $pathinfo['filename'];
											$now = date('Y-m-d H:i:s');
											$type = $pathinfo['extension'];

											$con->begin_transaction();

											$query = sprintf(
												"INSERT INTO imgs (name, album_id, date_upload, type)
												VALUES ('%s', %d, '%s', '%s')",
												$name, $album_id, $now, $type
											);

											if ($con->query($query)) {
												if (move_uploaded_file($files['tmp_name'][$i], "$upload_dir/$img_id.$type")) {
													$flag = true;
													$img_id++;

													$con->commit();
												}
												else {
													$con->rollback();
												}
											}
										}
									}
								}
								?>
								<tr>
									<td><?php echo $files['name'][$i] ?></td>
									<td><?php echo $files['type'][$i] ?></td>
									<td><?php echo round($files['size'][$i] / 1024) ?> KB</td>
									<td>
										<?php if ($flag) { ?>
											<span class="w3-text-green">Thành công</span>
										<?php } else { ?>
											<span class="w3-text-red">Thất bại</span>
										<?php } ?>
									</td>
								</tr>
							<?php
							}
						}
						else {

						}
					}
				}
			}
		}
		?>
	</tbody>
</table>
