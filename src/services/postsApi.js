import { getToken } from '../utils/auth';

export async function fetchPosts(filters = {}) {

    const token = getToken();

    const params = new URLSearchParams(filters);

    const response = await fetch(`/posts?${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const json = await response.json();
    return Array.isArray(json) ? json : json.posts || [];
}

export async function fetchPost(postId) {
    const token = getToken();
    const response = await fetch(`/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.message || 'Failed to fetch post');
    }

    return response.json();
}

export async function createPost(payload) {
    const token = getToken();
    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.message || 'Failed to create post');
    }

    return response.json();
}

export async function updatePost(postId, payload) {
    const token = getToken();
    const response = await fetch(`/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.message || 'Failed to update post');
    }
    return response.json();
}
