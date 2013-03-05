<?
class Utils {
    public static function HashPassword($pass) {
        return md5(crypt($pass));
    }
}
