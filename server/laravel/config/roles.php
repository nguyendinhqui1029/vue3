<?php

use App\Models\User;

$clientRole = [
    "api.client.users.index"
];


$developRole = [
    "l5-swagger.docs",
    "l5-swagger.api",
];

return [
    'admin_names' => [
        \App\Models\User::ROLE_ADMIN => 'Admin',
        \App\Models\User::ROLE_CLIENT => 'Client',
    ],

    'user_names' => [

    ],

    'permissions' => [
        \App\Models\User::ROLE_ADMIN => null, // Null mean full access
        \App\Models\User::ROLE_CLIENT => null,//$clientRole,
    ],

    'none_authorize_actions' => [
        'home',
        'password.*'

    ]
];
