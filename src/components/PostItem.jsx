import { Link } from "react-router-dom";

import updatePost from "../services/postsApi";

export default function PostItem({ post }) {
    return (
        <article className="rounded border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
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
            <button
                type="button"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
                Add a comment
            </button>
            <Link
                to={`/posts/${post.id}/edit`}
                type="button"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
                Edit Post
            </Link>
        </article>
    );
}
