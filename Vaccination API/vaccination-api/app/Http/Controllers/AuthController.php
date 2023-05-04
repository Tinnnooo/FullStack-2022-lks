<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CheckPassword;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginResource;
use App\Http\Resources\UserResource;
use App\Models\Society;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware(CheckPassword::class)->only("login");
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $society = Society::where('id_card_number', $credentials['id_card_number'])->first();

        $token = md5($society->id_card_number);
        $society->update(['login_tokens' => $token]);

        return new LoginResource($society);
    }

    public function logout(Request $request)
    {

        $society = Society::where('login_tokens', $request->token)->first();

        $society->update(['login_tokens' => null]);

        return response([
            "message" => "Logout success"
        ], 200);
    }

    public function me(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();

        return new UserResource($society);
    }
}
