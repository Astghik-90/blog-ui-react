import { redirect, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message');

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Log in to Tech Blog</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <LoginForm />
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData();
    const loginData = {
        username_email: formData.get('username_email'),
        password: formData.get('password'),
    };

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    const data = await response.json();

    if (response.status === 422) {
        return {
            status: 422,
            errors: data.errors.json,
        };
    }

    if (response.status === 401) {
        return {
            status: 401,
            error: 'Invalid credentials'
        };
    }

    if (!response.ok) {
        throw new Response('An Error occurred while trying to log in.', { status: 500 });
    }

    const token = data.access_token;
    const refreshToken = data.refresh_token;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);

    return redirect('/');
}