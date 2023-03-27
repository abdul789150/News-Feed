<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request)
    {
        $user = $this->userService->register($request->input());
        return response()->json(['user' => $user]);
    }

    public function login(Request $request)
    {
        $user = $this->userService->authenticate($request->email, $request->password);
        if (!$user) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('auth-token');
        return response()->json($token);
    }
}
