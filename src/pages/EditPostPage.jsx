import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { useNavigate, useParams } from "react-router-dom";

import PostForm from "../components/PostForm";
import { updatePost, fetchPost } from "../services/postsApi";


export default function EditPostPage({ post }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: postData, isLoading, isError: isFetchError, error: fetchError } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id),
        enabled: !!id,
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ id, postData }) => updatePost(id, postData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
            navigate('/posts');
        }
    });

    function handleSubmit(formData) {
        mutate({ id, formData });
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            {isLoading ? (
                <div>Loading post...</div>
            ) : isFetchError ? (
                <div className="text-red-600">{fetchError?.message || 'Failed to load post'}</div>
            ) : (
                <PostForm
                    key={postData?.id}
                    post={postData}
                    onSubmit={handleSubmit} />
            )}
        </div>
    )
}