<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Financial;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $peserta = User::where('role', 'peserta')->get()->count();
        $komunitas = User::where('role', 'komunitas')->get()->count();
        $finance = Financial::get();
        return response()->json(
            [
                'user' =>
                    ['peserta' => $peserta, 'komunitas' => $komunitas],
                'finance' => $finance
            ]
        );
    }
}
