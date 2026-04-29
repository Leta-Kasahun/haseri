<?php
error_reporting(E_ALL & ~E_DEPRECATED);
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap/app.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../src/Routes/api.php';