<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function admins(): Response
    {
        $admins = User::where('role', Role::ADMIN)->get();

        return Inertia::render('auth/admins/admins', [
            'admins' => $admins,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('auth/admins/register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role' => ['required', new Enum(Role::class)],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => Role::from($request->role),
            'password' => Hash::make($request->password),
        ]);

        return redirect()->intended(
            $user->role === Role::ADMIN
                ? route('auth.admins.admins')
                : route('auth.admins.users.users')
        );
    }

    public function edit($id): Response
    {
        $user = User::findOrFail($id);

        return Inertia::render('auth/admins/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrfail($id);

        $rules = [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => ['required', new Enum(Role::class)],
        ];

        if ($request->filled('password') || $request->filled('password_confirmation')) {
            $rules['password'] = ['required', 'confirmed', Rules\Password::defaults()];
        }

        $validator = Validator::make($request->all(), $rules);

        if ($request->filled('password') && Hash::check($request->password, $user->password)) {
            $validator->after(function ($validator) {
                $validator->errors()->add('password', 'The new password cannot be the same as the current password.');
            });
        }

        $validator->validate();

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => Role::from($request->role),
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->intended(
            $user->role === Role::ADMIN
                ? route('auth.admins.admins')
                : route('auth.admins.users.users')
        );
    }

    public function users(): Response
    {
        $users = User::where('role', Role::USER)->paginate(10);

        return Inertia::render('auth/admins/users/users', [
            'users' => $users,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $role = $user->role;

        $user->delete();

        return redirect()->intended(
            $role === Role::ADMIN
                ? route('auth.admins.admins')
                : route('auth.admins.users.users')
        );
    }
}
