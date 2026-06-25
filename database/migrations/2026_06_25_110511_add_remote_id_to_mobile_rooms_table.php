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
        Schema::table('mobile_rooms', function (Blueprint $table) {
            $table->unsignedBigInteger('remote_id')->nullable()->unique()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mobile_rooms', function (Blueprint $table) {
            $table->dropUnique(['remote_id']);
            $table->dropColumn('remote_id');
        });
    }
};
