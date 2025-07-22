<div align="center">

<a href="https://portfolio-next-betofoxnet-info-projects.vercel.app/"><img src="https://github.com/user-attachments/assets/8e37b052-5c84-4c25-bcb3-56f36e875326" width="150px"/></a>

# BetoFoxNet_Info

</div>

<div align="center">

<p>
  <a href="https://vite.dev" rel="noopener noreferrer">
    <img width="110" src="https://vite.dev/logo.svg" alt="Vite logo">
  </a>
</p>
<p>
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
  <a href="https://github.com/vitejs/vite/actions/workflows/ci.yml"><img src="https://github.com/vitejs/vite/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://pr.new/vitejs/vite"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
  <a href="https://chat.vite.dev"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>

# Vite
</div>

<div align="center">

<p align="center"><a href="https://laravel.com"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Laravel

### Breeze

Altentications!

</div>

---

### 🛠️ Changes Made to Laravel Starter Kit Default Migration
This migration modifies the default structure provided by Laravel's Starter Kit. Below are the specific additions and updates:

### ✅ 1. Added role field to the users table

- `Type: ENUM`

- Source: Dynamically generated using the Role enum defined in `App\Enums\Role`.

- Default value: Role::USER->value

- Purpose: This allows for assigning specific roles (such as `USER`, `ADMIN`, etc.) to users, enabling role-based access control (RBAC) in the application.

```php

$table->enum('role', array_map(fn($case) => $case->value, Role::cases()))
      ->default(Role::USER->value);

```

---

### ✅ 2. Added softDeletes() to the users table
- Enables Laravel's soft delete functionality.

- Adds a deleted_at timestamp column.

- Allows marking users as deleted without permanently removing their data.

```php

$table->softDeletes();

```

### Summary of Additions

| Feature	      | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
|`role column`	  | Enum field using App\Enums\Role, adds support for role-based user access |
|`softDeletes()`  | Adds deleted_at field to support soft deletion of users                  |

---

### 🔐 Admin Access Middleware
This project includes a custom middleware called `AdminMiddleware`, which ensures that only users with the admin role can access specific routes in the application.

### ✳️ What does AdminMiddleware do?
The middleware checks if the authenticated user has the `Role::ADMIN` role. If not, they are redirected to the dashboard with an access denied message.

Middleware Example

```php

if (Auth::check() && Auth::user()->role !== Role::ADMIN) {
    return redirect()->route('dashboard')
        ->with('error', 'Access denied. Only administrators can access this page.');
}

```

---

👮 Admin Controller
The AdminController is responsible for managing system users, with clear separation between administrators and regular users.

### Features
- List all administrators (`admins()`)

- List all regular users (`users()`)

- Register new users and admins (`create(), store()`)

- Edit existing users (`edit(), update()`)

- Delete users (`destroy()`)

All methods in this controller are protected by the AdminMiddleware, making sure that only admin users can access or perform admin operations.

---

### 🧭 Protected Routes
Admin-related routes are protected by the auth, verified, and AdminMiddleware middlewares. This ensures only authenticated, verified, and authorized admin users can access them.

Example of Protected Routes

```php

Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
    Route::get('auth/admins/admins', [AdminController::class, 'admins'])->name('auth.admins.admins');
    Route::get('auth/admins/users/users', [AdminController::class, 'users'])->name('auth.admins.users.users');
    Route::get('auth/admins/register', [AdminController::class, 'create'])->name('auth.admins.register');
    Route::post('auth/admins/store', [AdminController::class, 'store'])->name('auth.admins.store');
    Route::get('auth/admins/{id}/edit', [AdminController::class, 'edit'])->name('auth.admins.edit');
    Route::put('auth/admins/{id}', [AdminController::class, 'update'])->name('auth.admins.update');
    Route::delete('auth/admins/{id}', [AdminController::class, 'destroy'])->name('destroy');
});

```

---

### 📄 Overview of the AdminsShow Component
This React component (built with Inertia.js) renders a table of system administrators. It allows authorized users to view, edit, and delete admin accounts, with some built-in protections:

- 🔒 The currently logged-in admin cannot delete themselves.

- 📝 Enables editing of other administrators' information.

- 🧾 Styled table displaying admin name, email, and available actions.

- ❌ Delete confirmation handled via a dialog modal (Dialog component).

- ✅ Integrated with Inertia's useForm and router for smooth deletion and redirect.

- 📍 Breadcrumb navigation: Dashboard > Admin.

### Technologies used:

- React + TypeScript

- Inertia.js

- Tailwind CSS

- Lucide Icons

- Custom UI components (`Table, Dialog, Button, Icon`)

---

### 👤 RegisterForm, RegisterUser, and UserUpdate Components
These components together handle the creation and editing of admin/user accounts within the admin panel. They share a dynamic and reusable form component (`RegisterForm`) to streamline user management.

### 🔧 Features
- RegisterForm:

  - Dynamic form used for both registering and updating users.

  - Includes fields for `ID, name, email, password, password confirmation,` and account type (`USER or ADMIN`).

  - Password fields support visibility toggling using icons (`Eye, EyeClosed`).

  - Uses Inertia.js useForm with post and put methods for submissions.

  - Handles validation errors with InputError, and shows a loading spinner (LoaderCircle) during submission.

  - Built-in logic to reset password fields after submission.

- RegisterUser:

  - A page for registering new users, using RegisterForm with no initial data.

  - Submit button is labeled "Register User".

- UserUpdate:

  - A page for updating an existing user, passing user data as props to RegisterForm.

  - Submit button is labeled "Update User".

### 🧰 Technologies & Components Used
- React + TypeScript

- Inertia.js for frontend-backend interaction

- Tailwind CSS

- Lucide Icons (`Eye, EyeClosed, LoaderCircle`)

- Custom shared UI components: `Button, Input, Label, Select, Icon, InputError`

- Single form component designed for reuse across create and update flows

---

### 📄 Component: UsersShow
The `UsersShow` component is an administrative view that displays a paginated list of users, built with `React + Inertia.js`, and connected to a Laravel backend.

### ⚙️ Features
- ✅ Displays a user table with: `position`, `ID`, `name`, and `email`.

- 🖊️ Edit button: redirects to the user edit page.

- ❌ Delete button: opens a confirmation dialog before sending a `DELETE` request.

- 🔢 Pagination: navigate between pages dynamically.

- 🧭 Breadcrumbs for better navigation inside the admin panel.

- 🔄 Uses Inertia’s useForm for smooth, `SPA-style` interactions.

### 📥 Props Structure
The component expects a users object structured as follows (Laravel pagination format):

```ts

{
  data?: User[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  total: number;
}

```

This is typically returned by Laravel’s paginate() method.

### 🧩 Component Overview

```tsx

<AppLayout breadcrumbs={breadcrumbs}>
  <Head title="Users" />
  <Table>...</Table>
  <Pagination>...</Pagination>
</AppLayout>

```

- AppLayout: Shared layout wrapper.

- Table: Displays each user row.

- Pagination: Renders page navigation.

- Dialog: Used for confirming user deletion.

- useForm: Handles deletion requests with feedback.

### 🔢 Pagination Explained
Pagination only shows the most relevant pages:

- The current page

- The previous page

- The next page

Example
If you're on page 5, it will display:

```css

← 4 [5] 6 →

```

- Left arrow appears if there's a previous page.

- Right arrow appears if there's a next page.

- The current page is visually highlighted using isActive.

Pagination Logic

```ts

Array.from({ length: users.last_page }, (_, i) => i + 1)
  .filter(page =>
    page === users.current_page ||
    page === users.current_page - 1 ||
    page === users.current_page + 1
  )

```

This ensures clean and minimal pagination UI.

### 💡 Future Improvements
- Add ... for skipped pages.

- Include “First” and “Last” buttons.

- Add a dropdown to jump to a specific page.

### 🛠️ Tech Stack
- React with Inertia.js

- Laravel (`backend`)

- Lucide Icons (`lucide-react`)

- Custom reusable UI components

- TypeScript types and layout abstraction

---

### 🧩 Requirements
- Laravel 11+

- User role enum (`App\Enums\Role`)

- Email verification and authentication enabled (`auth, verified middlewares`)

### 📌 Notes
Make sure your User model uses the Role enum properly to distinguish between different types of users. This setup is essential for enforcing admin-only access to sensitive parts of the system.

## Desenvolvido em:

<div>

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/composer/composer-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="30px"/>
  
</div>
