import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';
import Loader from '../components/shared/Loader.jsx';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 
        try {
            const response = await fetch('https://productmanager-backend.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Login failed');
            const res = await response.json();

            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleSignupClick = () => {
        navigate('/register');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-xl">
                <div className="flex flex-col items-center space-y-2 text-red-600">
                    <PackageIcon className="h-12 w-12 text-primary" />
                    <h2 className="text-2xl font-bold">Product Manager</h2>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full hover:bg-red-500 border-black border">
                            Sign In
                        </Button>
                    </form>
                )}
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PackageIcon(props) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

export default LoginForm;

