<table class="w3-table w3-bordered w3-white">
	<thead>
		<tr>
			<th>Ảnh</th>
			<th>Tên</th>
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
					$stm = $con->prepare("
						SELECT * FROM albums
						WHERE id=? AND user_id=? AND status=1
					");
					$stm->bind_param('ii', $album_id, $meId);
					$stm->execute();

					if ($rs = $stm->get_result()) {
						if ($album = $rs->fetch_assoc()) {
							$album_name = $album['name'];
							$date = date('Y-m-d');
							$time = date('H:i:s');
							$datetime = "$date $time";

							if ($files['name'][0]) {
								for ($i = 0; $i < count($files['name']); $i++) {
									$isSuccess = FALSE;

									if ($files['error'][$i] === 0) {
										if (preg_match('/^image\/(png|jpg|jpeg|gif)$/', $files['type'][$i])) {
											if ($files['size'][$i] <= 1024 * 1024 * 25) {
												$pathinfo = pathinfo($files['name'][$i]);

												$name = $pathinfo['filename'];
												$type = $pathinfo['extension'];

												$con->begin_transaction();

											if($type == 'JPG') {
												$type = strtoupper($type);
											}
												$stm = $con->prepare("
													INSERT INTO imgs (name, album_id, date_upload, type)
													VALUES (?, ?, ?, ?)
												");
												$stm->bind_param('siss', $name, $album_id, $datetime, $type);

												if ($stm->execute()) {
													$insert_id = $con->insert_id;

													$stm = $con->prepare("
														UPDATE albums
														SET date_last_upload=?
														WHERE id=?
													");
													$stm->bind_param('si', $datetime, $album_id);

													if ($stm->execute()) {
														$stm = $con->prepare("
															INSERT INTO histories_upload (
																user_id,
																album_id,
																album_name,
																img_id,
																img_name,
																date,
																time
															)
															VALUES (?, ?, ?, ?, ?, ?, ?)
														");
														$stm->bind_param(
															'iisisss',
															$meId,
															$album_id,
															$album_name,
															$insert_id,
															$name,
															$date,
															$time
														);

														if ($stm->execute()) {
															if (move_uploaded_file(
																$files['tmp_name'][$i],
																"$upload_dir/$insert_id.$type"
															)) {
																$isSuccess = TRUE;

																$con->commit();
															}
															else {
																$con->rollback();
															}
														}
														else {
															$con->rollback();
														}
													}
													else {
														$con->rollback();
													}
												}
												else {
													$con->rollback();
												}
											}
										}
									}
									?>
									<tr>
										<td><img src="<?php
											echo $isSuccess ? "$upload_dir/$insert_id.$type" : 'notfound.png'
										?>" style="width:48px;height:48px;object-fit:cover"></td>
										<td><?php echo $files['name'][$i] ?></td>
										<td><?php echo $files['type'][$i] ?></td>
										<td><?php echo round($files['size'][$i] / 1024) ?> KB</td>
										<td>
											<?php if ($isSuccess) { ?>
												<span class="w3-text-green">Thành công</span>
											<?php } else { ?>
												<span class="w3-text-red">Thất bại</span>
											<?php } ?>
										</td>
									</tr>
									<?php
								}
							}
							else if ($filezip['name']) {
								$type = pathinfo($filezip['name'], PATHINFO_EXTENSION);

								if (preg_match('/^zip$/', $type)) {
									$zip = zip_open($filezip['tmp_name']);

									if (!is_int($zip)) {
										while ($zip_entry = zip_read($zip)) {
											$isSuccess = FALSE;

											if (zip_entry_open($zip, $zip_entry)) {
												$pathinfo = pathinfo(zip_entry_name($zip_entry));
												$name = $pathinfo['filename'];
												$type = $pathinfo['extension'];
												$size = zip_entry_filesize($zip_entry);

												if (preg_match('/^png|jpg|jpeg|gif$/', $type)) {
													if ($size <= 1024 * 1024 * 25) {
														$content = zip_entry_read($zip_entry, $size);

														$con->begin_transaction();

														$stm = $con->prepare("
															INSERT INTO imgs (name, album_id, date_upload, type)
															VALUES (?, ?, ?, ?)
														");
														$stm->bind_param('siss', $name, $album_id, $datetime, $type);

														if ($stm->execute()) {
															$insert_id = $con->insert_id;

															$stm = $con->prepare("
																UPDATE albums
																SET date_last_upload=?
																WHERE id=?
															");
															$stm->bind_param('si', $datetime, $album_id);

															if ($stm->execute()) {
																$stm = $con->prepare("
																	INSERT INTO histories_upload (
																		user_id,
																		album_id,
																		album_name,
																		img_id,
																		img_name,
																		date,
																		time
																	)
																	VALUES (?, ?, ?, ?, ?, ?, ?)
																");
																$stm->bind_param(
																	'iisisss',
																	$meId,
																	$album_id,
																	$album_name,
																	$insert_id,
																	$name,
																	$date,
																	$time
																);

																if ($stm->execute()) {
																	if (file_put_contents("$upload_dir/$insert_id.$type", $content)) {
																		$isSuccess = TRUE;

																		$con->commit();
																	}
																	else {
																		$con->rollback();
																	}
																}
																else {
																	$con->rollback();
																}
															}
															else {
																$con->rollback();
															}
														}
														else {
															$con->rollback();
														}
													}
												}

												zip_entry_close($zip_entry);
											}

											?>
											<tr>
												<td><img src="<?php
													echo $isSuccess ? "$upload_dir/$insert_id.$type" : 'notfound.png'
												?>" style="width:48px;height:48px;object-fit:cover"></td>
												<td><?php echo $name ?></td>
												<td><?php echo $type ?></td>
												<td><?php echo round($size / 1024) ?> KB</td>
												<td>
													<?php if ($isSuccess) { ?>
														<span class="w3-text-green">Thành công</span>
													<?php } else { ?>
														<span class="w3-text-red">Thất bại</span>
													<?php } ?>
												</td>
											</tr>
											<?php
										}

										zip_close($zip);
									}
								}
							}
						}
					}

					$stm->close();
				}
			}
		}
		?>
	</tbody>
</table>
