<?php
//пример: [[aDate? &date=`[*createdon*]` &date2=`[*pub_date*]`]]
/**
**  $date - дата для использования
**  $date2 - запасная дата
**	$short - вставить короткое имя месяца
**	$outFormat - шаблон вывода даты, строка для замены %d%, %m%, %y%
**/
if(!defined('MODX_BASE_PATH')){die('What are you doing? Get out of here!');}
$output = $return = "";
$format = "%d.%m.%Y";
$fullMonth = array('1' => 'января',
					'2' => 'февраля',
					'3' => 'марта',
					'4' => 'апреля',
					'5' => 'мая',
					'6' => 'июня',
					'7' => 'июля',
					'8' => 'августа',
					'9' => 'сентября',
					'10' => 'октября',
					'11' => 'ноября',
					'12' => 'декабря');
$shortMonth = array('1' => 'янв',
					'2' => 'фев',
					'3' => 'мар',
					'4' => 'апр',
					'5' => 'мая',
					'6' => 'июн',
					'7' => 'июл',
					'8' => 'авг',
					'9' => 'сен',
					'10' => 'окт',
					'11' => 'ноя',
					'12' => 'дек');
if (isset($date2) && $date2>0 ) {
    $output = strftime($format,$date2);
}
else{
    $output = strftime($format,$date);
}

$date=explode(".", $output);
$month = (int)$date[1];
if ( isset($short) ){
    $m = $shortMonth[$month];
}
else {
    $m = $fullMonth[$month];
}
if( isset( $outFormat ) ) {
	$searchArray = array("%d%", "%m%", "%y%");
	$replaceArray = array($date[0], $m, $date[2]);
	$return = str_replace($searchArray, $replaceArray, $outFormat);
}
else
	$return = $date[0].'&nbsp;'.$m.'&nbsp;'.$date[2];
return $return;
?>
