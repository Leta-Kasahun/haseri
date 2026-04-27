Laravel Sanctum
Use When: API authentication for users
How: Route::middleware('auth:sanctum')->group(function () { ... })


Laravel Broadcast + Pusher
Use When: Real-time chat, notifications, job alerts
How: event(new MessageSent($message));



spatie/laravel-permission
Use When: Check if user is admin, customer, or provider
How: $user->hasRole('admin') | $user->can('post_jobs') | $user->assignRole('customer')



spatie/laravel-medialibrary
Use When: Upload profile photos, provider resumes, company logos
How: $user->addMediaFromRequest('photo')->toMediaCollection('avatar') | $user->getFirstMediaUrl('avatar', 'thumb')



spatie/laravel-data
Use When: Return clean, consistent JSON responses from API
How: return UserData::from($user) | return JobData::collection($jobs)



spatie/laravel-activitylog
Use When: Track admin actions - bans, deletions, warnings (audit_logs table)
How: activity()->causedBy($admin)->log('User banned for spam') | $user->activities


irazasyed/telegram-bot-sdk
Use When: Send notifications to users via Telegram bot
How: Telegram::sendMessage(['chat_id' => $chatId, 'text' => 'You have a new job invitation!'])


intervention/image
Use When: Resize, crop, or optimize uploaded images (avatars, logos)
How: Image::make($uploadedFile)->fit(300, 300)->save($path)



mews/purifier
Use When: Sanitize user input (job descriptions, messages) to prevent XSS attacks
How: $cleanDescription = clean($request->description) | $safeMessage = clean($request->message)



Laravel CORS
Use When: Allow Next.js frontend (localhost:3000) to call Laravel API
How: Already configured in config/cors.php - no code needed