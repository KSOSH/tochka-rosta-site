<?php
use ProjectSoft\Video;
if(!defined('MODX_BASE_PATH')) die('What are you doing? Get out of here!');
$url = isset($url) ? $url : '';
$vd = new Video(null, false);
$arr = $vd->setLink($url);

return $arr['video'] ? $arr['video'].'<p class="text-center"><a href="' . $url . '" target="_blank" savefrom_lm="0">' . $url . '</a></p>' : "";