<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('technician_verifications', function ($table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->foreignId('address_id')->nullable()->constrained('addresses')->onDelete('set null');
    $table->string('national_id_path', 255);
    $table->string('proof_document_path', 255)->nullable();
    $table->enum('proof_document_type', ['coc', 'tvet_diploma', 'local_permit', 'work_experience'])->nullable();
    $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
    $table->string('rejection_reason', 255)->nullable();
    $table->foreignId('reviewed_by')->nullable()->constrained('admins')->onDelete('set null');
    $table->timestamp('reviewed_at')->nullable();
    $table->timestamps();
    $table->index('user_id');
    $table->index('status');
});
echo "technician_verifications table created\n";