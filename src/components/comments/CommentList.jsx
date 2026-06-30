export default function CommentList({ comments }) {

    if (comments.length === 0) {
        return <p className="text-gray-700">No comments yet.</p>;
    }

    return (
        <ul className="mt-4 space-y-4">
            {comments.map((comment) => (
                <li key={comment.id} className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-gray-700">{comment.user.username}</p>
                    <p className="text-gray-500 whitespace-pre-line">{comment.content}</p>
                </li>
            ))}
        </ul>
    );

}