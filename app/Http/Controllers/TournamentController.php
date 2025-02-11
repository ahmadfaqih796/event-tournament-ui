<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
        $this->middleware('can:authorization')->except(['index', 'show']);
    }

    public function index()
    {
        $data = Tournament::with('event')->get();
        return response()->json($data);
    }

    public function show($id)
    {
        $data = Tournament::with('event')->find($id);
        if (!$data) {
            return response()->json(['message' => 'Tournament not found'], 404);
        }
        return response()->json($data);
    }

    public function store(Request $request)
    {

        $request->validate(
            [
                'name' => 'required|string|max:255',
                'event_id' => 'required|exists:events,id',
                'game' => 'required|string|max:255',
                'status' => 'required|in:pending,ongoing,completed'
            ]
        );

        $data = Tournament::create([
            'name' => $request->name,
            'event_id' => $request->event_id,
            'game' => $request->game,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Tournament created successfully', 'tournament' => $data], 201);
    }
}
