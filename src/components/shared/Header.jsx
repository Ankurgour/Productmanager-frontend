import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Button } from '../ui/Button';

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('role') || null;
            setUser(storedUser);
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="shadow bg-background">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center text-lg font-semibold text-primary hover:text-red-500">
                    <Package2Icon className="w-6 h-6 mr-2" />
                    Product Manager
                </Link>

                {/* Mobile Menu */}
                <div className="flex items-center mt-5 mb-5 space-x-4 lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:border hover:border-red-500 hover:bg-slate-100 hover:text-red-500">
                                <MenuIcon className="w-6 h-6 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link to="/" className="menu-link">Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/dashboard" className="menu-link">Products</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={user === 'team member' ? "/profile/mysubmission" : "/pending-requests"} className="menu-link">
                                    {user === 'team member' ? "My Submissions" : "All Submissions"}
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/profile" className="menu-link">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="outline" onClick={handleLogout} className="menu-link">Logout</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Desktop Menu */}
                <nav className="items-center hidden space-x-4 lg:flex">
                    <Link to="/" className="menu-link">Home</Link>
                    <Link to="/dashboard" className="menu-link">Products</Link>
                    <Link to={user === 'team member' ? "/profile/mysubmission" : "/pending-requests"} className="menu-link">
                        {user === 'team member' ? "My Submissions" : "All Submissions"}
                    </Link>
                    <Link to="/profile" className="menu-link">Profile</Link>
                    <Button variant="outline" onClick={handleLogout} className="menu-link">Logout</Button>
                </nav>
            </div>
        </header>
    );
}

const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const Package2Icon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
    </svg>
);

export default Header;
