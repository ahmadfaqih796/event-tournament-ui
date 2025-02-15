<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TournamentRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TournamentRegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $data = TournamentRegistration::with(['team', 'tournament', 'tournament.event', 'payBy'])->latest()->get();
        return response()->json($data);
    }

    public function show($id)
    {
        $data = TournamentRegistration::with('team')->find($id);
        if (!$data) {
            return response()->json(['message' => 'Tournament Registration not found'], 404);
        }
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $this->authorize('create', TournamentRegistration::class);

        $request->validate([
            'tournament_id' => 'required|integer',
            'team_id' => 'required|integer',
            'payment_status' => 'nullable|in:free,pending,paid,rejected',
            'payment_proof' => 'nullable|image|mimes:jpg,png,jpeg,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('payment_proof')) {
            $imagePath = $request->file('payment_proof')->store('transcations', 'public');
        }

        $data = TournamentRegistration::create([
            'tournament_id' => $request->tournament_id,
            'team_id' => $request->team_id,
            'payment_by' => Auth::id(),
            'payment_status' => $request->payment_status,
            'payment_proof' => $imagePath
        ]);

        return response()->json($data, 201);
    }

    public function update(Request $request, $id)
    {
        $data = TournamentRegistration::find($id);
        if (!$data) {
            return response()->json(['message' => 'Tournament Registration not found'], 404);
        }

        $this->authorize('update', $data);

        $request->validate([
            'payment_status' => 'nullable|in:free,pending,paid,rejected',
        ]);

        $data->update([
            'payment_status' => $request->payment_status,
        ]);

        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = TournamentRegistration::find($id);
        if (!$data) {
            return response()->json(['message' => 'Tournament Registration not found'], 404);
        }

        $this->authorize('delete', $data);

        if ($data->image) {
            Storage::disk('public')->delete($data->image);
        }

        $data->delete();
        return response()->json(['message' => 'Tournament Registration deleted successfully']);
    }
}
