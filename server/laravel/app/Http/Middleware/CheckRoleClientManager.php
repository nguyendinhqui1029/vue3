<?php

namespace App\Http\Middleware;

use App\Http\Responses\APIResponse;
use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRoleClientManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if (empty($user) || !in_array($user->role, [User::ROLE_CLIENT])) {
            return APIResponse::error401('You do not have permission to access this feature');
        }

        return $next($request);
    }
}
