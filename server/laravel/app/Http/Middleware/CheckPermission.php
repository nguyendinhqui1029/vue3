<?php

namespace App\Http\Middleware;

use App\Http\Responses\APIResponse;
use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if (empty($user)) {
            return redirect()->route('login');
        }
        $actionName = \Route::getCurrentRoute()->getName();

        if (!$user->hasPermission($actionName)) {
            if ($user) {
                Auth::logout();
            }
            return APIResponse::error401('You do not have permission to access this feature');
        }

        if ($user->hasPermission($actionName)) {
            return $next($request);
        }

        abort(401);

    }
}
