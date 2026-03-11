<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $librarianRole = Role::where('name', 'Librarian')->first();
        $memberRole = Role::where('name', 'Member')->first();

        // Admin User (Removed)

        // Librarian User
        User::firstOrCreate(
            ['email' => 'librarian@bookvault.com'],
            [
                'name' => 'Librarian User',
                'password' => Hash::make('password'),
                'role_id' => $librarianRole->id ?? 2,
            ]
        );

        // Member User
        User::firstOrCreate(
            ['email' => 'member@bookvault.com'],
            [
                'name' => 'Member User',
                'password' => Hash::make('password'),
                'role_id' => $memberRole->id ?? 3,
            ]
        );
    }
}
