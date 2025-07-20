import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import RegisterForm from './registerform';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/auth/admins/admins' },
    { title: 'Register User', href: '/auth/admins/register' },
];

export default function RegisterUser() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register User" />
            <div className="flex gap-4 rounded-xl p-4">
                <RegisterForm valueButton='Register User' />
            </div>
        </AppLayout>
    );
}
