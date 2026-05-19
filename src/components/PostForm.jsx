
export default function PostForm() {
    //  function handleSubmit(event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const postData = {
    //         title: formData.get('title'),
    //         content: formData.get('content'),
    //     };

    //     onSubmit(postData);
    //  }

    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    // defaultValue={post?.title || ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    id="content"
                    name="content"
                    // defaultValue={post?.content || ''}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </form>
    )
}