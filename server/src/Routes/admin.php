<?php
use Haseri\Backend\Modules\Auth\Controllers\AdminAuthController;
use Haseri\Backend\Modules\Admin\Controllers\TechnicianApprovalController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;
use Haseri\Backend\Modules\Admin\Controllers\DashboardController;
use Haseri\Backend\Modules\Admin\Controllers\UserManagementController;
use Haseri\Backend\Modules\Admin\Controllers\SettingsController;
use Haseri\Backend\Modules\Notifications\Controllers\AdminNotificationController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Auth
    if ($uri === '/api/admin/login' && $method === 'POST') {
        (new AdminAuthController())->login();
        exit;
    }

    if ($uri === '/api/admin/verify-otp' && $method === 'POST') {
        (new AdminAuthController())->verifyOtp();
        exit;
    }

    if ($uri === '/api/admin/logout' && $method === 'POST') {
        (new AdminAuthController())->logout();
        exit;
    }

    if ($uri === '/api/admin/refresh' && $method === 'POST') {
        (new AdminAuthController())->refresh();
        exit;
    }

    // Technician Approvals
    if ($uri === '/api/admin/verifications' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->index($admin);
        exit;
    }

    if ($uri === '/api/admin/verifications/pending' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->pending($admin);
        exit;
    }

    if ($uri === '/api/admin/verifications/approve' && $method === 'POST') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->approve($admin);
        exit;
    }

    if ($uri === '/api/admin/verifications/reject' && $method === 'POST') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->reject($admin);
        exit;
    }

    // Dashboard
    if ($uri === '/api/admin/dashboard' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new DashboardController())->stats($admin);
        exit;
    }

    if ($uri === '/api/admin/dashboard/recent-jobs' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new DashboardController())->recentJobs($admin);
        exit;
    }

    if ($uri === '/api/admin/dashboard/recent-payments' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new DashboardController())->recentPayments($admin);
        exit;
    }

    // User Management
    if ($uri === '/api/admin/users' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new UserManagementController())->index($admin);
        exit;
    }

    if (preg_match('/^\/api\/admin\/users\/(\d+)$/', $uri, $m) && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new UserManagementController())->show($admin, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/admin\/users\/(\d+)\/deactivate$/', $uri, $m) && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new UserManagementController())->deactivate($admin, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/admin\/users\/(\d+)\/activate$/', $uri, $m) && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new UserManagementController())->activate($admin, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/admin\/users\/(\d+)$/', $uri, $m) && $method === 'DELETE') {
        $admin = AuthMiddleware::handleAdmin();
        (new UserManagementController())->destroy($admin, $m[1]);
        exit;
    }

    // Job Categories Management
    if ($uri === '/api/admin/jobs/categories' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new \Haseri\Backend\Modules\Jobs\Controllers\JobCategoryController())->index();
        exit;
    }

    if ($uri === '/api/admin/jobs/categories' && $method === 'POST') {
        $admin = AuthMiddleware::handleAdmin();
        (new \Haseri\Backend\Modules\Jobs\Controllers\JobCategoryController())->store($admin);
        exit;
    }

    if (preg_match('/^\/api\/admin\/jobs\/categories\/(\d+)$/', $uri, $m) && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new \Haseri\Backend\Modules\Jobs\Controllers\JobCategoryController())->update($admin, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/admin\/jobs\/categories\/(\d+)$/', $uri, $m) && $method === 'DELETE') {
        $admin = AuthMiddleware::handleAdmin();
        (new \Haseri\Backend\Modules\Jobs\Controllers\JobCategoryController())->destroy($admin, $m[1]);
        exit;
    }

    // Settings & Analytics
    if ($uri === '/api/admin/settings/fees' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new SettingsController())->fees($admin);
        exit;
    }

    if ($uri === '/api/admin/settings/fees' && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new SettingsController())->updateFees($admin);
        exit;
    }

    if ($uri === '/api/admin/analytics' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new SettingsController())->analytics($admin);
        exit;
    }

    // Notifications
    if ($uri === '/api/admin/notifications' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->index($admin);
        exit;
    }

    if ($uri === '/api/admin/notifications/unread' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->unread($admin);
        exit;
    }

    if ($uri === '/api/admin/notifications/count' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->count($admin);
        exit;
    }

    if (preg_match('/^\/api\/admin\/notifications\/(\d+)\/read$/', $uri, $m) && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->markAsRead($admin, $m[1]);
        exit;
    }

    if ($uri === '/api/admin/notifications/read-all' && $method === 'PUT') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->markAllAsRead($admin);
        exit;
    }

    if (preg_match('/^\/api\/admin\/notifications\/(\d+)$/', $uri, $m) && $method === 'DELETE') {
        $admin = AuthMiddleware::handleAdmin();
        (new AdminNotificationController())->destroy($admin, $m[1]);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
} catch (\Throwable $e) {
    Response::error($e->getMessage(), 500);
}