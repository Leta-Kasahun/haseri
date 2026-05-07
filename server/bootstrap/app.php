<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Dotenv\Dotenv;
use Haseri\Backend\Core\Database;
use Haseri\Backend\Shared\Helpers\JWT;
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();
Database::init();
JWT::init();
 
// Global helper functions
if (!function_exists('now')) {
    function now() {
        return date('Y-m-d H:i:s');
    }
}

if (!function_exists('today')) {
    function today() {
        return date('Y-m-d');
    }
}

