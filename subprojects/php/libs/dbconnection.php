<?
class DBConnection {
    private static $instance;

    private $server;
    private $name;
    private $password;
    private $database;

    private function __construct($server, $name, $password, $database) {
        $this->server = $server;
        $this->name = $name;
        $this->password = $password;
        $this->database = $database;

        $this->connect();
    }

    private static function initialize() {
        if (!DBConnection::$instance) {
            DBConnection::$instance = new DBConnection('localhost', 'ponguser', 'password', 'pingpong');
        } else {
            throw Exception('DBConnection already initialized');
        }
    }

    /**
     * @return DBConnection
     * @throws Exception
     */
    public static function getInstance() {
        if (!DBConnection::$instance) {
            DBConnection::initialize();
        }
        return DBConnection::$instance;
    }

    private function connect() {
        mysql_connect($this->server, $this->name, $this->password);
        mysql_select_db($this->database);
    }

    /**
     * @param String $query
     * @return resource
     */
    public function query($query) {
        return mysql_query($query);
    }
}
?>