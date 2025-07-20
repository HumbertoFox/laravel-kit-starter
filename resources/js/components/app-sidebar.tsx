import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, UserCog, UserPlus, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
];

const adminNavItems: NavItem[] = [
    { title: 'Admins', href: '/auth/admins/admins', icon: UserCog },
    { title: 'Register User', href: '/auth/admins/register', icon: UserPlus },
    { title: 'Users', href: '/auth/admins/users/users', icon: Users },
];

const footerNavItems: NavItem[] = [
    { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder, },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen, },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userAdmin = auth.user.role === 'ADMIN';
    const navItems = userAdmin ? [...mainNavItems, ...adminNavItems] : mainNavItems;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
