<?php

namespace App\Support;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class BrevoService
{
    public function sendAdminOtp(string $email, string $name, string $otpCode): bool
    {
        $senderEmail = config('services.brevo.sender_email');
        $senderName = config('services.brevo.sender_name');

        try {
            Mail::html(
                $this->otpTemplate($otpCode, $name),
                function ($message) use ($email, $name, $senderEmail, $senderName) {
                    $message->to($email, $name)
                        ->subject('Admin Login OTP - Haseri')
                        ->from($senderEmail, $senderName);
                }
            );
            Log::info('OTP sent to: ' . $email);
            return true;
        } catch (\Exception $e) {
            Log::error('OTP Email failed: ' . $e->getMessage());
            return false;
        }
    }

    private function otpTemplate(string $otp, string $name): string
    {
        return <<<HTML
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
            <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px;">
                <h1 style="color: #2563eb;">Haseri Admin OTP</h1>
                <p>Hello {$name},</p>
                <p>Your OTP code is:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb;">{$otp}</div>
                <p style="color: #9ca3af; font-size: 12px;">Expires in 10 minutes.</p>
            </div>
        </body>
        </html>
        HTML;
    }
}