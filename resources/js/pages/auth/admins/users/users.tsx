import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight, UserPen, UserX } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/auth/admins/admins' },
    { title: 'Users', href: '/auth/admins/users/users' },
];

type Link = {
    url: string | null;
    active: boolean;
    label: string;
};

type PaginatedUsersProps = {
    users: {
        data?: User[];
        links?: Link[];
        current_page: number;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
};

export default function UsersShow({ users }: PaginatedUsersProps) {
    const { delete: destroy, processing } = useForm();
    const deleteUser = (id: number) => destroy(route('destroy', id), {
        onFinish: () => router.visit(route('auth.admins.users.users')),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <Table className="gap-4 rounded-xl p-4 text-center">
                <TableCaption>User List</TableCaption>
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
                    {users?.data?.length ? (
                        users?.data?.map((user, index) => (
                            <TableRow key={index} className="cursor-default">
                                <TableCell>{index + 1 + (users?.current_page - 1) * users?.per_page}</TableCell>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="flex justify-evenly items-center my-1 gap-1">
                                    <Link href={`/auth/admins/${user.id}/edit`} title={`Update ${user.name}`}>
                                        <Icon
                                            iconNode={UserPen}
                                            aria-label={`Update ${user.name}`}
                                            className="size-6 text-yellow-600 hover:text-yellow-500 duration-300"
                                        />
                                    </Link>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button type="button" title={`Delete ${user.name}`}>
                                                <Icon
                                                    iconNode={UserX}
                                                    aria-label={`Delete ${user.name}`}
                                                    className="size-6 text-red-600 cursor-pointer hover:text-red-500 duration-300"
                                                />
                                            </button>
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
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Yes, Delete!
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                No registered users.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {users?.links && (
                <Pagination className="py-4">
                    <PaginationContent>
                        {users.prev_page_url && (
                            <PaginationItem>
                                <PaginationLink href={users.prev_page_url} className="flex items-center justify-center">
                                    <ChevronLeft />
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {Array.from({ length: users.last_page }, (_, i) => i + 1)
                            .filter(page =>
                                page === users.current_page ||
                                page === users.current_page - 1 ||
                                page === users.current_page + 1
                            )
                            .map(page => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href={`${users.path}?page=${page}`}
                                        isActive={users.current_page === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        {users.next_page_url && (
                            <PaginationItem>
                                <PaginationLink href={users.next_page_url} className="flex items-center justify-center">
                                    <ChevronRight />
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </AppLayout>
    );
}
