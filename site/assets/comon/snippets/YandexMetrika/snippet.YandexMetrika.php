<?php
if(!defined('MODX_BASE_PATH')) die('What are you doing? Get out of here!');
$id = isset($id) ? $id : 0;
if(!is_file(dirname(__FILE__) . "/.htaccess")):
	$content = '<Files yandex.metrika.html>
	Order Deny,Allow
	Deny from all
</Files>';
	file_put_contents(dirname(__FILE__) . "/.htaccess", $content);
	chmod(dirname(__FILE__) . "/.htaccess", 0644);
endif;
if(!is_file(dirname(__FILE__) . "/yandex.metrika.html")){
	file_put_contents(dirname(__FILE__) . "/yandex.metrika.html", "");
}
return file_get_contents(dirname(__FILE__) . "/yandex.metrika.html");