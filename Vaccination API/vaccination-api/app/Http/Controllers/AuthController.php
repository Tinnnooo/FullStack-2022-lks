<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\Society;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $society = Society::with('regional')->where('id_card_number', $credentials['id_card_number'])->first();

        if (!$society || $society->password !== $credentials['password']) {
            return response([
                "message" => "ID Card Number or Password incorrect"
            ], 401);
        }

        $token = md5($society->id_card_number);
        $society->update(['login_tokens' => $token]);

        $regional = [
            "id" => $society->regional->id,
            "province" => $society->regional->province,
            "district" => $society->regional->district,
        ];


        return response([
            "name" => $society->name,
            "born_date" => $society->born_date,
            "gender" => $society->gender,
            "address" => $society->address,
            "token" => $society->login_tokens,
            "regional" => $regional,
        ], 200);
    }

    public function logout(Request $request)
    {

        $society = Society::where('login_tokens', $request->token)->first();

        $society->update(['login_tokens' => null]);

        return response([
            "message" => "Logout success"
        ], 200);
    }
}
