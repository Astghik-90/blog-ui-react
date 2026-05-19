import { useQuery } from "@tanstack/react-query";
import { useRouteLoaderData } from "react-router-dom";

import { fetchPosts } from "../services/postsApi";

import PostsList from "../components/PostsList";

export default function PostsPage() {
    const token = useRouteLoaderData('root');
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    });

    if (isLoading) {
        return <div className="max-w-md mx-auto p-6">Loading...</div>;
    }

    if (isError) {
        return <div className="max-w-md mx-auto p-6">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Posts feed</h2>
            <p>Here you can see all the posts.</p>
            <PostsList posts={posts} />
    </div>
  );
}