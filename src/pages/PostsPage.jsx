import PostsList from "../components/PostsList";

export default function PostsPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Posts feed</h2>
      <p>Here you can see all the posts.</p>
        <PostsList posts={[]} />
    </div>
  );
}