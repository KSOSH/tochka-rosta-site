<?php 
$e = &$modx->Event;
$help_content = '';
$chelp = "";
$id_help = isset($id_help) ? intval($id_help) : 1;
switch($e->name){
	case 'OnManagerWelcomeHome': 
		$tbl_site_content = $modx->getFullTableName('site_content');
		$rs = $modx->db->select('content', $tbl_site_content, "id='{$id_help}'");
		$chelp = $modx->db->getValue($rs);
		$help_content .=  '
<div id="help_content">
	<div id="frame_help">
		' . $chelp . '
	</div>
</div>';
		$menuindex = isset($menuindex) ? (int)$menuindex : 10;
		$widgets['help-widget'] = array(
			'menuindex' => $menuindex,
			'id' => 'help-widget',
			'cols' => 'col-sm-12',
			'icon' => 'fa-question-circle',
			'title' => 'Помощь',
			'body' => '<div class="card-body">'.$help_content.'</div>
			<style>
				.list-decimal > li {
					list-style: decimal;
				}
				h3, .h3 {
					color: red;
				}
			</style>'
		);
		$modx->event->output(serialize($widgets));
		break;
}