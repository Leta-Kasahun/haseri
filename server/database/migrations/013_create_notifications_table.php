<?php
use Illuminate\Database\Capsule\Manager as DB;
DB::schema()->create('notifications', function ($table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->string('title', 255);
    $table->text('message');
    $table->enum('type', ['job_assigned', 'job_completed', 'new_application', 'application_accepted', 'application_rejected', 'review_received', 'verification_approved', 'verification_rejected', 'payment_success', 'system'])->default('system');
    $table->integer('reference_id')->nullable();
    $table->boolean('is_read')->default(false);
    $table->timestamp('read_at')->nullable();
    $table->timestamp('created_at')->useCurrent();
    $table->index('user_id');
    $table->index('is_read');
});
echo " notifications table created\n";