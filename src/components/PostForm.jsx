
import { useRouteLoaderData } from "react-router-dom";

export default function PostForm({ post, onSubmit }) {

    const token = useRouteLoaderData('root');

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content'),
        };

        onSubmit(postData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post?.title || ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    id="content"
                    name="content"
                    defaultValue={post?.content || ''}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {post?.id ? 'Update Post' : 'Create Post'}
            </button>
        </form>
    )
}