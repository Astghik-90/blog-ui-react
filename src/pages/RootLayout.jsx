import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, { action: '/logout', method: 'POST' });
            return;
        }

        const tokenDuration = getTokenDuration();
        
        if (tokenDuration <= 0) {
            submit(null, { action: '/logout', method: 'POST' });
            return;
        }

        const timer = setTimeout(() => {
            submit(null, { action: '/logout', method: 'POST' });
        }, tokenDuration);

        return () => clearTimeout(timer);
    }, [token, submit]);


    return (
        <>
            <TopNav />
            <Outlet />
        </>
    )

}

export default RootLayout;