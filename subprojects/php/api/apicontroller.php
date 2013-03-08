<?php
require_once '../settings.php';
require_once LIBS_DIR . 'utils.php';
require_once LIBS_DIR . 'apiexception.php';

/**
 * Base class for all API controllers.
 */
class APIController {
    protected $needsAuth = true;
    protected $requiredParams;
    protected $optionalParams;

    protected $user;
    protected $parsedParams;

    /**
     * Handle an API call.
     * @return String The API response in JSON format.
     * @throws APIException
     */
    public function handle() {
        // If we need to have auth, grab the user's session and set $this->user
        if ($this->needsAuth) {
            $this->user = Utils::LoadSession();
            if (!$this->user) {
                throw new APIException(APIException::AUTH_REQUIRED, 'Authentication required.');
            }
        }

        // Get the passed in params
        $passedParams = $_GET;
        $this->parsedParams = array();

        // Make sure all the required params are there, then parse them into $parsedParams
        if (!empty($this->requiredParams)) {
            for ($i = 0; $i < count($this->requiredParams); ++$i) {
                $param = $this->requiredParams[$i];
                if (!isset($passedParams[$param])) {
                    throw new APIException(APIException::INVALID_PARAMS, 'Missing parameter: ' . $param);
                }
                $this->parsedParams[$param] = $passedParams[$param];
            }
        }

        // Parse each of the optional params into $parsedParams
        for ($i = 0; $i < count($this->optionalParams); ++$i) {
            $param = $this->optionalParams[$i];
            if (isset($passedParams[$param])) {
                $this->parsedParams[$param] = $passedParams[$param];
            }
        }

        // Create the response to send back
        $response = array('response' => array(
            'type' => 'success',
            'data' => $this->getResponseData($this->parsedParams)
        ));

        // We need to save the session if we loaded it
        if ($this->needsAuth) {
            Utils::SaveSession($this->user);
        }

        return json_encode($response);
    }

    /**
     * Create the data for the response. Should be overridden in implementing classes.
     * @param $params array The parameters that were requested by the endpoint
     * @return array
     * @throws APIException
     */
    public function getResponseData($params) {
        return array();
    }
};
