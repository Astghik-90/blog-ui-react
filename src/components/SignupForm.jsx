import { Form, useActionData } from 'react-router-dom';

export default function SignupForm() {
    const actionData = useActionData();

    return (
        <Form method='POST' action="/register" className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">Username:</label>
                <input type="text" id="username" name="username" required className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                {actionData?.errors?.username && (
                    <ul className="text-red-600 text-xs mt-1 list-disc pl-5">
                        {actionData.errors.username.map((msg) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email:</label>
                <input type="email" id="email" name="email" required className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                {actionData?.errors?.email && (
                    <ul className="text-red-600 text-xs mt-1 list-disc pl-5">
                        {actionData.errors.email.map((msg) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">Password:</label>
                <input type="password" id="password" name="password" required className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                {actionData?.errors?.password && (
                    <ul className="text-red-600 text-xs mt-1 list-disc pl-5">
                        {actionData.errors.password.map((msg) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
                Create account
            </button>
        </Form>
    )
}