<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('messages', function ($table) {
    $table->id();
    $table->foreignId('job_id')->constrained('jobs')->onDelete('cascade');
    $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
    $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
    $table->text('message');
    $table->boolean('is_read')->default(false);
    $table->timestamp('read_at')->nullable();
    $table->timestamp('created_at')->useCurrent();
    $table->index('job_id');
    $table->index('sender_id');
    $table->index('receiver_id');
});

echo "messages table created\n";