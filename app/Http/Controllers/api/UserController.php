<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
        $this->middleware('can:authorization')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $keyword = $request->input('search');

        // $user = User::with(['events'])
        //     ->where('name', 'like', "%{$keyword}%")
        //     ->orWhereHas('events', function ($query) use ($keyword) {
        //         $query->where('name', 'like', "%{$keyword}%");
        //     })
        //     // ->orWhereHas('tournaments', function ($query) use ($keyword) {
        //     //     $query->where('name', 'like', "%{$keyword}%")
        //     //         ->orWhere('game', 'like', "%{$keyword}%");
        //     // })
        //     ->get();

        $user = User::get();

        return response()->json($user);
    }

    public function show($id)
    {
        $event = User::with('events')->find($id);
        if (!$event) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($event);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string|max:255'
        ]);

        $event = User::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'location' => $request->location,
            'created_by' => Auth::id(),
        ]);

        return response()->json(['message' => 'User created successfully', 'event' => $event], 201);
    }

    public function update(Request $request, $id)
    {
        $event = User::find($id);
        if (!$event) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string|max:255'
        ]);

        $event->update([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'location' => $request->location,
        ]);

        return response()->json(['message' => 'User updated successfully', 'event' => $event]);
    }

    public function destroy($id)
    {
        $event = User::find($id);
        if (!$event) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $event->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
