import { Link } from "react-router-dom";
// import { getCurrentUserId, isAdmin} from "../utils/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/postsApi";
import { useState } from "react";
import CommentSection from "./comments/CommentSection";
import { useAuth } from "../store/authContext";

export default function PostItem({ post }) {
    const [showComments, setShowComments] = useState(false);

    const auth = useAuth();
    console.log(auth);

    function toggleComments() {
        setShowComments(prev => !prev);
    }

    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
        onError: (error) => {
            console.error('Failed to delete post:', error);
        }
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteMutation.mutate(post.id);
        }
    };

    const canDelete = auth.userId === post.author_id || auth.isAdmin;

    return (
        <article className="rounded border border-gray-200 bg-white p-5 shadow-sm">
            {deleteMutation.isError && (
                <div className="mb-3 p-3 bg-red-100 text-red-700 rounded text-sm">
                    {deleteMutation.error?.message || 'Failed to delete post'}
                </div>
            )}
            <div className="mb-3 flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">{post.author.username}</h3>
            </div>
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            {Array.isArray(post.category_names) && post.category_names.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.category_names.map((category) => (
                        <span key={category} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                            {category}
                        </span>
                    ))}
                </div>
            )}
            <div className="flex gap-3">            <button
                type="button"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                onClick={toggleComments}
            >
                Comments
            </button>
                {auth.userId === post.author_id && (
                    <Link
                        to={`/posts/${post.id}/edit`}
                        type="button"
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    >
                        Edit Post
                    </Link>)}
                {canDelete && (
                    <button
                        type="button"
                        disabled={deleteMutation.isPending}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
            {showComments && (
                <div className="mt-4">
                    <CommentSection postId={post.id} />
                </div>
            )}
        </article>
    );
}
