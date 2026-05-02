<?php
use Illuminate\Database\Capsule\Manager as DB;
DB::schema()->create('reviews', function ($table) {
    $table->id();
    $table->foreignId('job_id')->constrained('jobs')->onDelete('cascade');
    $table->foreignId('reviewer_id')->constrained('users');
    $table->foreignId('reviewed_user_id')->constrained('users');
    $table->tinyInteger('rating');
    $table->text('comment')->nullable();
    $table->timestamp('created_at')->useCurrent();
    $table->unique(['job_id', 'reviewer_id', 'reviewed_user_id']);
    $table->index('job_id');
    $table->index('reviewed_user_id');
});
echo "reviews table created\n";