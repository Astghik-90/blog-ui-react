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
            <div className="max-w-md mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">New Post</h2>
                <PostForm
                    onSubmit={handleSubmit} 
                    isPending={isPending} 
                    isError={isError} 
                    error={error} />
            </div>
        </>
    )
}