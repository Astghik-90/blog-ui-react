import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../../services/postsApi";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function CommentSection({ postId }) {

    const { data: comments, isLoading, isError, error } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
            {isLoading && <p className="text-gray-700">Loading comments...</p>}
            {isError && <p className="text-red-600">Error: {error.message}</p>}
            {!isLoading && !isError && (
                <>
                    <CommentList comments={comments} />

                    <CommentForm postId={postId} />
                </>
            )}
        </div>
    );
}