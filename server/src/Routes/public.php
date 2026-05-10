<?php
use Haseri\Backend\Modules\Public\Controllers\PublicController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/public/top-technicians' && $method === 'GET') {
    (new PublicController())->topTechnicians();
    exit;
}

if ($uri === '/api/public/recent-jobs' && $method === 'GET') {
    (new PublicController())->recentJobs();
    exit;
}

if ($uri === '/api/public/high-price-jobs' && $method === 'GET') {
    (new PublicController())->highPriceJobs();
    exit;
}

if ($uri === '/api/public/stats' && $method === 'GET') {
    (new PublicController())->stats();
    exit;
}

if ($uri === '/api/public/search-suggestions' && $method === 'GET') {
    (new PublicController())->searchSuggestions();
    exit;
}

if (preg_match('/^\/api\/public\/technicians\/(\d+)$/', $uri, $m) && $method === 'GET') {

    (new PublicController())->technicianProfile($m[1]);
    exit;
}