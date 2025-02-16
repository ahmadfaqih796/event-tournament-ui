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
        Schema::create('financials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tr_id')->constrained('tournament_registrations')->onDelete('cascade');
            $table->string('event_name');
            $table->string('tournament_name');
            $table->string('game_name');
            $table->string('team_name');
            $table->string('price');
            $table->string('pay');
            $table->string('paid_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial');
    }
};
