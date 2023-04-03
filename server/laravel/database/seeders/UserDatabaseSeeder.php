<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->truncate();
        $data = [
            [
                'name' => 'admin',
                'point' => '1',
                'user_code' => "123ABC",
                'email' => "superadmin@gmail.com",
                'password' => "123123123",
                'phone' => "0923",
                'role' => '1',
                'info' => 'AvpafZWd4DC1ZcbqNV0s0Z2R15Y1h7XT325b508jScoxoKY2w9hmc9TSPckwA9qno/2/s53pVfeE4P5wIaYYDSa49Fvxa/DfT90SJOYbMCeGOkQUWPWUUfhA3CvTzIC5k3dpQz9Q64rN/rQDo5oV5umhWbH3ql3mSRM/+VFCvwBvzu7x26KGDnEppd2vWuiyi0gdAek2Mo8tlC81S1fftZC1Dg6GzBJTzAZuYr64oZK4SefXyM2BP0yGUOLjayJ1kQQdgMuBmEXTWvPmUxWVpxpJMtxRmrsUkpSZ8Wgi8wyQaQ4d28+zkNONAkx5atU622ECEHon+/NSyL5+Ul9qqzxkFqK/LSHDw+2qJlQSvWU=',
            ],
            [
                'name' => "user",
                'point' => "2",
                'user_code' => "12AB",
                'email' => "user@gmail.com",
                'password' => '123123123',
                'role' => '1',
                'phone' => "92042",
                'info' => 'AvpafZWd4DC1ZcbqNV0s0Z2R15Y1h7XT325b508jScoxoKY2w9hmc9TSPckwA9qno/2/s53pVfeE4P5wIaYYDSa49Fvxa/DfT90SJOYbMCeGOkQUWPWUUfhA3CvTzIC5k3dpQz9Q64rN/rQDo5oV5umhWbH3ql3mSRM/+VFCvwBvzu7x26KGDnEppd2vWuiyi0gdAek2Mo8tlC81S1fftZC1Dg6GzBJTzAZuYr64oZK4SefXyM2BP0yGUOLjayJ1kQQdgMuBmEXTWvPmUxWVpxpJMtxRmrsUkpSZ8Wgi8wyQaQ4d28+zkNONAkx5atU622ECEHon+/NSyL5+Ul9qqzxkFqK/LSHDw+2qJlQSvWU=',
            ],

        ];
        foreach ($data as $item) {
            User::create($item);
        }
    }
}
