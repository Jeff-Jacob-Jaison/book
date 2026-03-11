<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $adminRole = Role::where('name', 'Admin')->first();

        if ($adminRole) {
            // Re-assign or delete users with this role. We'll delete the specific admin user, 
            // and set remaining users to Member (role_id = 3).
            User::where('email', 'admin@bookvault.com')->delete();
            
            $memberRole = Role::where('name', 'Member')->first();
            if ($memberRole) {
                User::where('role_id', $adminRole->id)->update(['role_id' => $memberRole->id]);
            }

            $adminRole->delete();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Re-create the role and user if rolling back
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        
        \App\Models\User::firstOrCreate(
            ['email' => 'admin@bookvault.com'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );
    }
};
