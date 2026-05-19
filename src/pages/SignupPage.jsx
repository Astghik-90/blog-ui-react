import {redirect} from 'react-router-dom';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Sign up for Tech Blog</h2>
            <SignupForm />
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData();
    const registerData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })

    const data = await response.json();

    if(response.status === 422) {
        return {
            status: 422,    
            errors: data.errors.json,
        };
    }

    if(response.status === 409) {
        return {
            status: 409,
            errors: { email: ['Email or username already exists'] }
        };
    }

    if (!response.ok) {
        throw new Error('An Error occurred while trying to register.', { status: 500 });
    }  
    return redirect('/');     
}