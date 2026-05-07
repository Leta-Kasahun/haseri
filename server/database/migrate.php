<?php
require_once __DIR__ . '/../bootstrap/app.php';
require __DIR__ . '/migrations/001_create_users_table.php';
require __DIR__ . '/migrations/002_create_admins_table.php';
require __DIR__ . '/migrations/003_create_admin_otps_table.php';
require __DIR__ . '/migrations/004_create_refresh_tokens_table.php';
require __DIR__ . '/migrations/005_create_addresses_table.php';
require __DIR__ . '/migrations/006_create_customer_verifications_table.php';
require __DIR__ . '/migrations/007_create_technician_verifications_table.php';
require __DIR__ . '/migrations/008_create_payments_table.php';
require __DIR__ . '/migrations/009_create_job_categories_table.php';
require __DIR__ . '/migrations/010_create_jobs_table.php';
require __DIR__ . '/migrations/011_create_job_applications_table.php';
require __DIR__ . '/migrations/012_create_reviews_table.php';
require __DIR__ . '/migrations/013_create_notifications_table.php';
require __DIR__ . '/migrations/014_create_admin_notifications_table.php';

echo "\nAll tables migrated!\n";