import { useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@/components/ui/icon';
import { UserUpdateProps } from '@/types';

type RegisterForm = {
    id?: string;
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
};

type UserFormProps = {
    user?: UserUpdateProps;
    valueButton: string;
};

export default function RegisterForm({ user, valueButton }: UserFormProps) {
    const [isVisibledPassword, setIsVisibledPassword] = useState<boolean>(false);
    const [isVisibledPasswordConfirm, setIsVisibledPasswordConfirm] = useState<boolean>(false);
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<RegisterForm>>({
        id: user?.id ?? '',
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? 'USER',
        password: '',
        password_confirmation: '',
    });

    const togglePasswordVisibility = () => setIsVisibledPassword(!isVisibledPassword);
    const togglePasswordConfirmVisibility = () => setIsVisibledPasswordConfirm(!isVisibledPasswordConfirm);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!user) {
            return post(route('auth.admins.store'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }

        return put(route('auth.admins.update', user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });

    };

    return (
        <form className="w-full max-w-96 flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                {user?.id && (
                    <div className="grid gap-2">
                        <Label htmlFor="id">Id User</Label>
                        <Input
                            id="id"
                            type="text"
                            required
                            autoFocus
                            autoComplete="id"
                            value={data.id}
                            onChange={(e) => setData('id', e.target.value)}
                            disabled={processing}
                            placeholder="Id User"
                            readOnly
                            className="cursor-no-drop"
                        />
                        <InputError message={errors.id} className="mt-2" />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Full name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Select
                        required
                        value={data.role}
                        onValueChange={(value) => setData("role", value)}
                        disabled={processing}
                    >
                        <SelectTrigger
                            id="role"
                            title="Select Account Type"
                            tabIndex={3}
                        >
                            <SelectValue placeholder="Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={isVisibledPassword ? "text" : "password"}
                            required={user?.id ? false : true}
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {isVisibledPassword ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            type={isVisibledPasswordConfirm ? "text" : "password"}
                            required={user?.id ? false : true}
                            tabIndex={5}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <button
                            type="button"
                            className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                            onClick={togglePasswordConfirmVisibility}
                        >
                            {isVisibledPasswordConfirm ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {valueButton}
                </Button>
            </div>
        </form>
    );
}
