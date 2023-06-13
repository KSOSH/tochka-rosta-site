<?php
return array (
	'caption' => 'TELEGRAM',
	'introtext' => '<b style="color: red">Доступы к Боту, группам, какналам в Telegram</b>',
	'settings' => array (
		'bot_token' => array (
			'caption' => 'Токен бота',
			'type' => 'text',
			'note' => 'Бот должен быть участником канала, группы',
			'default_text' => '5742061218:AAE6zhQrQwnIPFh4yZr2-ABwr586c_3WULY',
		),
		'tlg_chanel' => array (
			'caption' => 'ID канала',
			'type' => 'text',
			'note' => 'Получить с помощю Бота https://t.me/username_to_id_bot',
			'default_text' => '-1001600878365',
		),
		'tlg_group' => array (
			'caption' => 'ID группы',
			'type' => 'text',
			'note' => 'Получить с помощю Бота https://t.me/username_to_id_bot',
			'default_text' => '-1001600878365',
		),
		'chat_id' => array (
			'caption' => 'ID разрапотчика',
			'type' => 'text',
			'note' => 'Получить с помощю Бота https://t.me/username_to_id_bot',
			'default_text' => '83741005',
		),
	),
);