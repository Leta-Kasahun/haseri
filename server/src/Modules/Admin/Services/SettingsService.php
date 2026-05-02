<?php
namespace Haseri\Backend\Modules\Admin\Services;

class SettingsService
{
    private $configPath;

    public function __construct()
    {
        $this->configPath = __DIR__ . '/../../../Config/chapa.php';
    }

    public function getFees()
    {
        $config = require $this->configPath;
        return [
            'verification_fee' => $config['verification_fee'],
            'job_post_fee' => $config['job_post_fee'],
        ];
    }

    public function updateFees(array $data)
    {
        $config = require $this->configPath;
        
        if (isset($data['verification_fee'])) {
            $config['verification_fee'] = (int) $data['verification_fee'];
        }
        
        if (isset($data['job_post_fee'])) {
            $config['job_post_fee'] = (int) $data['job_post_fee'];
        }

        file_put_contents(
            $this->configPath,
            '<?php return ' . var_export($config, true) . ';'
        );

        return $config;
    }
}