import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { useNavigate } from "react-router-dom";

import PostForm from "../components/PostForm";
import { createPost } from "../services/postsApi";

export default function NewPostPage() {
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
            navigate('/posts');
        }
    });

    function handleSubmit(postData) {
        mutate(postData);
    }

    return (
        <>
            {isError && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error.message}
                </div>
            )}
            <div className="max-w-md mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">New Post</h2>
                <PostForm onSubmit={handleSubmit} />
            </div>

            {isPending && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                    <p>Creating post...</p>
                </div>
            )}
        </>
    )
}