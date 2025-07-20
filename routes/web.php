<?php

use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('auth/admins/admins', [AdminController::class, 'admins'])->name('auth.admins.admins');
        Route::get('auth/admins/users/users', [AdminController::class, 'users'])->name('auth.admins.users.users');
        Route::get('auth/admins/register', [AdminController::class, 'create'])->name('auth.admins.register');
        Route::post('auth/admins/store', [AdminController::class, 'store'])->name('auth.admins.store');
        Route::get('auth/admins/{id}/edit', [AdminController::class, 'edit'])->name('auth.admins.edit');
        Route::put('auth/admins/{id}', [AdminController::class, 'update'])->name('auth.admins.update');
        Route::delete('auth/admins/users/{id}', [AdminController::class, 'destroy'])->name('destroy');
        Route::delete('auth/admins/{id}', [AdminController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
