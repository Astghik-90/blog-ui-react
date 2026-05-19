import PostItem from './PostItem';

export default function PostsList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-600">No posts available yet.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </div>
  );
}
