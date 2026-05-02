<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('jobs', function ($table) {
    $table->id();
    $table->foreignId('customer_id')->constrained('users');
    $table->foreignId('technician_id')->nullable()->constrained('users');
    $table->foreignId('category_id')->constrained('job_categories');
    $table->foreignId('address_id')->nullable()->constrained('addresses');
    $table->foreignId('accepted_application_id')->nullable();
    $table->string('title', 255);
    $table->text('description');
    $table->decimal('price', 10, 2);
    $table->decimal('commission', 10, 2)->default(0);
    $table->enum('status', ['open', 'assigned', 'in_progress', 'completed', 'cancelled'])->default('open');
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();
    $table->index('customer_id');
    $table->index('technician_id');
    $table->index('category_id');
    $table->index('status');
});
echo "✅ jobs table created\n";