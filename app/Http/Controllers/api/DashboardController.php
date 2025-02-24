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
        // $finance = Financial::get();
        return response()->json(
            [
                'user' =>
                ['peserta' => $peserta, 'komunitas' => $komunitas],
                'finance' => $this->financeChartData($request)
            ]
        );
    }

    private function financeChartData(Request $request)
    {
        $year = $request->input('year', date('Y'));

        $data = Financial::selectRaw('MONTH(created_at) as month, SUM(pay) as total_pay')
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyData = array_fill(1, 12, 0);

        foreach ($data as $row) {
            $monthlyData[$row->month] = $row->total_pay;
        }

        return response()->json([
            'year' => $year,
            'data' => array_values($monthlyData),
        ]);
    }
}
