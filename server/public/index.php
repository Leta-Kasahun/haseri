<?php
error_reporting(E_ALL & ~E_DEPRECATED);
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap/app.php';
Haseri\Backend\Shared\Helpers\CorsHelper::handle();

// Serve storage files directly
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (str_starts_with($uri, '/storage/')) {
    $filePath = __DIR__ . '/..' . $uri;
    if (file_exists($filePath) && is_file($filePath)) {
        $mimeType = mime_content_type($filePath);
        header('Content-Type: ' . $mimeType);
        readfile($filePath);
        exit;
    }
}

header('Content-Type: application/json');
require_once __DIR__ . '/../src/Routes/api.php';