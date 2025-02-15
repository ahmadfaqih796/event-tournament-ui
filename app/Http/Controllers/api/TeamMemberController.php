<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $keyword = $request->input('search');
        $user = TeamMember::with(['team', 'user'])
            ->where('user_id', 'like', "%{$keyword}%")
            ->orWhereHas('user', function ($query) use ($keyword) {
                $query->where('user_id', 'like', "%{$keyword}%");
            })->get();
        return response()->json($user);
    }

    public function show($id)
    {
        $data = TeamMember::find($id);
        if (!$data) {
            return response()->json(['message' => 'Team Member not found'], 404);
        }
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'team_id' => 'required|integer',
        ]);

        $data = TeamMember::create([
            'user_id' => $request->user_id,
            'team_id' => $request->team_id,
        ]);

        return response()->json(['message' => 'Team Member created successfully', 'data' => $data], 201);
    }

    public function update(Request $request, $id)
    {
        $data = TeamMember::find($id);
        if (!$data) {
            return response()->json(['message' => 'Team Member not found'], 404);
        }

        $request->validate([
            'user_id' => 'required|integer',
            'team_id' => 'required|integer',
        ]);

        $data->update([
            'user_id' => $request->user_id,
            'team_id' => $request->team_id,
        ]);

        return response()->json(['message' => 'Team Member updated successfully', 'data' => $data]);
    }

    public function destroy($id)
    {
        $data = TeamMember::find($id);
        if (!$data) {
            return response()->json(['message' => 'Team Member not found'], 404);
        }

        $data->delete();
        return response()->json(['message' => 'Team Member deleted successfully']);
    }
}
