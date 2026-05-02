<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('payments', function ($table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users');
    $table->enum('payment_type', ['job_post', 'customer_verification', 'application', 'commission']);
    $table->integer('related_id')->nullable();
    $table->decimal('amount', 10, 2);
    $table->string('chapa_tx_ref', 100)->nullable();
    $table->string('chapa_transaction_id', 100)->nullable();
    $table->enum('status', ['pending', 'paid', 'failed'])->default('pending');
    $table->timestamp('created_at')->useCurrent();
    $table->index('user_id');
    $table->index('status');
    $table->index('payment_type');
});
echo "payments table created\n";