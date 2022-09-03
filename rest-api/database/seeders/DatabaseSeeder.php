<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    // \App\Models\User::factory(10)->create();

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);

    Student::create([
      "name" => "Atras Shalhan",
      "username" => "beowulf",
      "email" => "atrasshalhan@gmail.com",
      "password" => bcrypt("testing12345"),
    ]);

    Student::factory(20)->create();
  }
}
