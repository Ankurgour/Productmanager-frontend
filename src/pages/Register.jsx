import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!validatePassword(password)) {
            alert('Password must contain at least 8 characters, including 1 uppercase letter, numbers, and the "@" symbol.');
            return;
        }
        const user  = {email, password,role};
        try {
            const response = await fetch("https://productmanager-backend.onrender.com/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (response.status === 201) {
                const jsonResponse = await response.json();
                navigate('/login')
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };


return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-xl">
            <div className="flex flex-col items-center space-y-2 text-red-600">
                <PackageIcon className="h-12 w-12 text-primary" />
              {/* <h2 className="text-2xl font-bold">Product Manager</h2> */}
                <h2 className="text-2xl font-bold">Register Account</h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder={"Email Address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder={"Password"}
                        pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$"
                        title="Must contain at least 8 characters, including 1 uppercase letter, numbers, and the '@' symbol."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Register as</Label>
                    <div className="flex items-center justify-center space-x-4 ">
                        <Input
                            id="admin"
                            name="role"
                            type="radio"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-radio input-field h-6 w-8 bg-red-500"
                        />
                        <Label htmlFor="admin">Admin</Label>
                        <Input
                            id="team-member"
                            name="role"
                            type="radio"
                            value="team member"
                            checked={role === 'team member'}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-radio input-field h-6 w-6 text-primary"
                        />
                        <Label htmlFor="team-member">Team Member</Label>
                    </div>
                </div>
                <Button type="submit" className="w-full hover:bg-red-500 border-black border">
                    Register
                </Button>
            </form>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium underline underline-offset-4">
                  Sign in
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

export default RegistrationForm;
