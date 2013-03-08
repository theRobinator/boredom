<?php
require_once '../settings.php';

class APIException extends Exception {
    protected $message;
    protected $code;

    const
        AUTH_REQUIRED = 'auth_required',
        INVALID_PARAMS = 'invalid_params',
        FAILURE = 'failure';

    public function __construct($code, $message) {
        parent::__construct($message);
        $this->message = $message;
        $this->code = $code;
    }

    public function toArray() {
        return array(
            'message' => $this->message,
            'code'    => $this->code
        );
    }
}