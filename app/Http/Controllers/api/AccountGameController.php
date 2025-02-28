<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\AccountGame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountGameController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $keyword = $request->input('search');

        $data = AccountGame::with(['userAccount', 'game'])
            ->where('name', 'like', "%{$keyword}%")
            ->orWhereHas('userAccount', function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->orWhereHas('game', function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->get();

        return response()->json($data);
    }

    public function show($id)
    {
        $data = AccountGame::find($id);
        if (!$data) {
            return response()->json(['message' => 'Account Game not found'], 404);
        }
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
            'name' => 'required|string|max:255',
            'account' => 'required|string|max:255',
        ]);

        $data = AccountGame::create([
            'game_id' => $request->game_id,
            'name' => $request->name,
            'account' => $request->account,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Account Game created successfully', 'data' => $data], 201);
    }

    public function update(Request $request, $id)
    {
        $data = AccountGame::find($id);
        if (!$data) {
            return response()->json(['message' => 'Account Game not found'], 404);
        }

        $request->validate([
            'game_id' => 'required|exists:games,id',
            'name' => 'required|string|max:255',
            'account' => 'required|string|max:255',
        ]);

        $data->update([
            'game_id' => $request->game_id,
            'name' => $request->name,
            'account' => $request->account,
        ]);

        return response()->json(['message' => 'Account Game updated successfully', 'data' => $data]);
    }

    public function destroy($id)
    {
        $data = AccountGame::find($id);
        if (!$data) {
            return response()->json(['message' => 'Account Game not found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Account Game deleted successfully']);
    }
}
