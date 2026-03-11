<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->decimal('price', 8, 2)->default(0.00)->after('type');
            $table->foreignId('uploader_id')->nullable()->constrained('users')->nullOnDelete()->after('id');
            $table->string('status')->default('approved')->after('uploader_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['uploader_id']);
            $table->dropColumn(['price', 'uploader_id', 'status']);
        });
    }
};
