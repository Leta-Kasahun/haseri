<?php
namespace Haseri\Backend\Modules\Admin\Controllers;

use Haseri\Backend\Modules\Admin\Services\SettingsService;
use Haseri\Backend\Shared\Services\AnalyticsService;
use Haseri\Backend\Shared\Helpers\Response;

class SettingsController
{
    private $settingsService;
    private $analyticsService;

    public function __construct()
    {
        $this->settingsService = new SettingsService();
        $this->analyticsService = new AnalyticsService();
    }

    public function fees($admin)
    {
        $result = $this->settingsService->getFees();
        Response::success($result);
    }

    public function updateFees($admin)
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->settingsService->updateFees($data);
        Response::success($result);
    }

    public function analytics($admin)
    {
        $result = $this->analyticsService->adminStats();
        Response::success($result);
    }
}