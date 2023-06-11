<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'title' => array(
		'caption' => 'Заголовок',
		'type' => 'textareamini'
	),
	'image' => array(
		'caption' => 'Изображение',
		'type' => 'image'
	),
	'link' => array(
		'caption' => 'Ссылка на страницу',
		'type' => 'text'
	),
	'thumb' => array(
		'caption' => 'Thumbnail',
		'type' => 'thumb',
		'thumbof' => 'image'
	)
);
$settings['templates'] = array(
	'outerTpl' => '
	<div class="container main-wrapper">
		<div class="row">
			<div class="container-full">
				<div class="govlist">
					[+wrapper+]
				</div>
			</div>
		</div>
	</div>',
	'rowTpl' => '
					<div class="govlist-item">
						<div class="column govlist-item-image">
							<a href="[+link+]" title="[+title+]" target="_blank">
								<img src="[+image+]" alt="[+title+]">
							</a>
						</div>
					</div>'
);
$settings['configuration'] = array(
	'enablePaste' => true,
	'csvseparator' => ';'
);