export async function fetchPosts() {
  const response = await fetch('/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const json = await response.json();
  return Array.isArray(json) ? json : json.posts || [];
}

export async function createPost(payload) {
  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.message || 'Failed to create post');
  }

  return response.json();
}
