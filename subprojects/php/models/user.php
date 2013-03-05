<?

require_once LIBS_DIR . 'dbconnection.php' ;
require_once LIBS_DIR . 'utils.php' ;

class User {
    private $id;
    private $name;
    private $wins;
    private $losses;
    private $gamesPlayed;

    public function __construct($id, $name, $wins, $losses, $gamesPlayed) {
        $this->id = $id;
        $this->name = $name;
        $this->wins = $wins;
        $this->losses = $losses;
        $this->gamesPlayed = $gamesPlayed;
    }

    public static function LoadByNameAndPassword($name, $password) {
        $hashedPass = Utils::HashPassword($password);
        $resource = DBConnection::getInstance()->query("SELECT * FROM users WHERE name='$name' AND password='$hashedPass' LIMIT 1;");
        if ($row = mysql_fetch_array($resource)) {
            return new User($row->id, $row->name, $row->wins, $row->losses, $row->gamesPlayed);
        } else {
            return null;
        }
    }

    public static function LoadByID($id) {
        $resource = DBConnection::getInstance()->query("SELECT * FROM users WHERE id=$id LIMIT 1;");
        if ($row = mysql_fetch_array($resource)) {
            return new User($row->id, $row->name, $row->wins, $row->losses, $row->gamesPlayed);
        } else {
            return null;
        }
    }

    public static function CreateUser($name, $password) {
        $hashedPass = Utils::HashPassword($password);
        try {
            DBConnection::getInstance()->query("INSERT INTO users (name, password) VALUES ('$name', '$hashedPass')");
            return true;
        } catch (Exception $err) {
            return false;
        }
    }
}
