import { Form, useActionData, useNavigation } from 'react-router-dom';

export default function LoginForm() {
    const actionData = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method='POST' className="space-y-4">
            <div>
                <label htmlFor="username_email" className="block text-sm font-medium mb-1 text-gray-700">Username/Email:</label>
                <input type="text" id="username_email" name="username_email" required className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                {actionData?.errors?.username_email && (
                    <ul className="text-red-600 text-xs mt-1 list-disc pl-5">
                        {actionData.errors.username_email.map((msg) => (
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
                {actionData?.error && (
                    <p className="text-red-600 text-xs mt-1">{actionData.error}</p>
                )}
            </div>
            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
        </Form>
    )
}