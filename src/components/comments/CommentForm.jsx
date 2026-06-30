import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../services/postsApi";

export default function CommentForm({ postId, comment }) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => addComment(postId, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        }
    });

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const content = formData.get('comment');

        mutation.mutate(content);
    }

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <textarea
                name="comment"
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Write your comment here..."
            />
            {mutation.isError && (
                <p className="text-red-600">
                    {mutation.error.message}
                </p>
            )}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {mutation.isPending ? 'Submitting...' : 'Submit Comment'}
                </button>
            </div>
        </form>
    )
}