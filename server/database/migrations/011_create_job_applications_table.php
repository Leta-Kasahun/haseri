<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('job_applications', function ($table) {
    $table->id();
    $table->foreignId('job_id')->constrained('jobs')->onDelete('cascade');
    $table->foreignId('provider_id')->constrained('users');
    $table->text('message')->nullable();
    $table->decimal('proposed_price', 10, 2)->nullable();
    $table->enum('status', ['pending', 'accepted', 'rejected', 'withdrawn'])->default('pending');
    $table->timestamps();
    $table->unique(['job_id', 'provider_id']);
    $table->index('job_id');
    $table->index('provider_id');
});
echo " job_applications table created\n";

// Add foreign key for accepted_application_id
DB::statement('ALTER TABLE jobs ADD FOREIGN KEY (accepted_application_id) REFERENCES job_applications(id) ON DELETE SET NULL');
echo " jobs accepted_application_id foreign key added\n";