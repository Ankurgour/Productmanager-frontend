import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Button } from '../ui/Button';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      }
  return (
    <header className="bg-background shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center text-lg font-semibold text-primary hover:text-red-500">
          <Package2Icon className="h-6 w-6 mr-2" />
          Product Manager
        </Link>

        <div className="flex items-center space-x-4 lg:hidden mb-5 mt-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:border  hover:border-red-500  hover:bg-slate-100 hover:text-red-500">
                <MenuIcon className="h-6 w-6 " />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  to="/"
                  className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-current="page"
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/dashboard"
                  className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-current="page"
                >
                  Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/profile/mysubmission"
                  className="block rounded-md px-3 py-2 text-sm font-medium transition-colors  hover:bg-slate-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  My Submissions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/profile"
                  className="block rounded-md px-3 py-2 text-sm font-medium transition-colors  hover:bg-slate-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick = {handleLogout}
                  className="block rounded-md px-3 py-2  text-sm font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                   >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="hidden lg:flex items-center space-x-4">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-md font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none "
            aria-current="page"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-2 text-md font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none "
            aria-current="page"
          >
            Products
          </Link>
          <Link
            to="/profile/mysubmission"
            className="rounded-md px-3 py-2 text-md font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none "
          >
            Submissions
          </Link>
          <Link
            to="/profile"
            className="rounded-md px-3 py-2 text-md font-medium transition-colors hover:bg-slate-100 hover:text-red-500 focus:outline-none"
          >
            Profile
          </Link>
          <Button
            variant="outline"
            onClick = {handleLogout}

            className="rounded-md px-3 py-2 mt-5 mb-5 text-md font-medium transition-colors bg-white text-black hover:bg-slate-100 hover:text-red-500 focus:outline-none "
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

export default Header;
