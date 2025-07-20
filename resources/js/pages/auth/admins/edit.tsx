import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, UserUpdateProps } from '@/types';
import RegisterForm from './registerform';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/auth/admins/admins' },
    { title: 'Update User', href: '/auth/admins/edit' },
];

interface UpdateProps {
    user: UserUpdateProps;
}

export default function UserUpdate({ user }: UpdateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update User" />
            <div className="flex gap-4 rounded-xl p-4">
                <RegisterForm user={user} valueButton="Update User" />
            </div>
        </AppLayout>
    );
}
