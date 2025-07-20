import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPen, UserX } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/auth/admins/admins' },
];

interface Admin {
    id: number;
    name: string;
    email: string;
}

interface AdminsShowProps {
    admins: Admin[];
}

export default function AdminsShow({ admins }: AdminsShowProps) {
    const { auth } = usePage<SharedData>().props;
    const { delete: destroy, processing } = useForm();
    const deleteAdmin = (id: number) => destroy(route('destroy', id), {
        onFinish: () => router.visit(route('auth.admins.admins')),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <Table className="gap-4 rounded-xl p-4 text-center">
                <TableCaption>List of Administrators</TableCaption>
                <TableHeader>
                    <TableRow className="cursor-default">
                        <TableHead className="text-center">N°</TableHead>
                        <TableHead className="text-center">Id</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {admins.map((admin, index) => (
                        <TableRow key={index} className="cursor-default">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{admin.id}</TableCell>
                            <TableCell>{admin.name}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell className="flex justify-evenly items-center my-1 gap-1">
                                <Link href={admin.id === auth.user.id ? "/settings/profile" : `/auth/admins/${admin.id}/edit`} title={`Update ${admin.name}`}>
                                    <Icon
                                        iconNode={UserPen}
                                        aria-label={`Update ${admin.name}`}
                                        className="size-6 text-yellow-600 hover:text-yellow-500 duration-300"
                                    />
                                </Link>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        {admin.id !== auth.user.id && (
                                            <button type="button" title={`Delete ${admin.name}`}>
                                                <Icon
                                                    iconNode={UserX}
                                                    aria-label={`Delete ${admin.name}`}
                                                    className="size-6 text-red-600 cursor-pointer hover:text-red-500 duration-300"
                                                />
                                            </button>
                                        )}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            He is sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Once you confirm, you will not be able to reverse this action!
                                        </DialogDescription>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                disabled={processing}
                                                onClick={() => deleteAdmin(admin.id)}
                                            >
                                                Yes, Delete!
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
