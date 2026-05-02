<?php
use Illuminate\Database\Capsule\Manager as DB;
DB::schema()->create('customer_verifications', function ($table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->enum('status', ['pending', 'verified'])->default('pending');
    $table->timestamp('verified_at')->nullable();
    $table->timestamp('created_at')->useCurrent();
    $table->index('user_id');
});
echo " customer_verifications table created\n";