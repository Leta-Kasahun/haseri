<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('admin_notifications', function ($table) {
    $table->id();
    $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');
    $table->string('title', 255);
    $table->text('message');
    $table->string('type', 100)->default('system');
    $table->integer('reference_id')->nullable();
    $table->boolean('is_read')->default(false);
    $table->timestamp('read_at')->nullable();
    $table->timestamp('created_at')->useCurrent();
    $table->index('admin_id');
    $table->index('is_read');
});
echo " admin_notifications table created\n";
