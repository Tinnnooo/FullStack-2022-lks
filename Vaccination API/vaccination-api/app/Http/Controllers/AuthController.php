<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials, true, 'societies')) {
            return response([
                'error' => 'Login failed'
            ], 422);
        }

        $user = Auth::user();
        $token = md5($user->password);

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
