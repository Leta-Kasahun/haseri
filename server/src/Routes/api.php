<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/admin.php';
require_once __DIR__ . '/customer.php';
require_once __DIR__ . '/technician.php';
require_once __DIR__ . '/jobs.php';
require_once __DIR__ . '/reviews.php';
require_once __DIR__ . '/notifications.php';
require_once __DIR__ . '/public.php';
require_once __DIR__ . '/chat.php';
http_response_code(404);
echo json_encode(['error' => 'Not Found']);