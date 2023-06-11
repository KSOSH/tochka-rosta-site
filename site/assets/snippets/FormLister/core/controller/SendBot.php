<?php
namespace FormLister;

/**
 * Контроллер для отправки данных в TelegramBot
 * Class SendBot
 * @package FormLister
 */
class SendBot extends Core
{

	public function __construct (DocumentParser $modx, $cfg = [])
	{
		parent::__construct($modx, $cfg);
		$this->lexicon->fromFile('sendbot');
        $this->log('Lexicon loaded', ['lexicon' => $this->lexicon->getLexicon()]);
	}

	/**
	 * Загружает в formData данные не из формы
	 * @param string $sources список источников
	 * @param string $arrayParam название параметра с данными
	 * @return $this
	 */
	public function setExternalFields ($sources = 'array', $arrayParam = 'defaults')
	{
		parent::setExternalFields($sources, $arrayParam);
		return $this;
	}


	/**
	 * @return string
	 */
	public function render ()
	{
		return parent::render();
	}

	public function getValidationRules($param = 'rules')
	{
		$rules = parent::getValidationRules($param); // TODO: Change the autogenerated stub
		return $rules;
	}

	/**
	 *
	 */
	public function process ()
	{
		/**
		 * Проверка
		 **/

		$this->log('Update sendbot', [
			'data'   => $fields,
			'result' => $result,
			'log'    => $this->user->getLog()
		]);
		/**
		 * Отправка
		 * Проверить $result и отправить
		 **/
		// Отправляем на канал заявки с форм
		if($chanel_id):
			$url = "https://api.telegram.org/bot" . $bot_token . "/sendMessage?chat_id=" . $chanel_id;
			$messagge =  $params['message'];
			$url .= "&text=" . urlencode($messagge) . "&parse_mode=Markdown&disable_web_page_preview=true";
			$result = $this->sendBotMessage($url);
			if ($result):
				$this->setFormStatus(true);
				$this->runPrepare('preparePostProcess');
				$this->runPrepare('prepareAfterProcess');

				//$this->redirect();
				if ($successTpl = $this->getCFGDef('successTpl')):
					$this->renderTpl = $successTpl;
				else:
					$this->addMessage($this->translate('sendbot.send_success'));
				endif;
			else:
				$this->addMessage($this->translate('sendbot.send_failed'));
			endif;
		endif;
	}

	public function sendBotMessage($url, $arrayQuery = array()){
		$ch = curl_init();
		$optArray = array(
				CURLOPT_URL => $url,
				CURLOPT_RETURNTRANSFER => true
		);
		curl_setopt_array($ch, $optArray);
		if(!empty($arrayQuery)):
			curl_setopt($ch, CURLOPT_POSTFIELDS, $arrayQuery);
		endif;
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}
}