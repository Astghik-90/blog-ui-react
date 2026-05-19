import TopNav from "../components/TopNav";

export default function ErrorPage() {
    return (
        <>
        <TopNav />
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">An error occurred!</h1>
            <p className="text-gray-600">This page could not be found.</p>
        </div>
        </>
    );
}