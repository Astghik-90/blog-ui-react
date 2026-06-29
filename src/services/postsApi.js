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
    // console.log("fetchPost called with id:", postId);

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

    // console.log("fetchPost response:", response);

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

        const validationErrors = errorPayload?.errors?.json;

        let formattedErrors = {};

        if (validationErrors) {
            for (const [field, messages] of Object.entries(validationErrors)) {
                formattedErrors[field] = messages.join(', ');
            }
        }

        if (Object.keys(formattedErrors).length > 0) {
            const error = new Error('Validation failed');
            error.errors = formattedErrors;
            error.type = 'validation';
            throw error;
        }

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

        const validationErrors = errorPayload?.errors?.json;

        let formattedErrors = {};

        if (validationErrors) {
            for (const [field, messages] of Object.entries(validationErrors)) {
                formattedErrors[field] = messages.join(', ');
            }
        }

        if (Object.keys(formattedErrors).length > 0) {
            const error = new Error('Validation failed');
            error.errors = formattedErrors;
            error.type = 'validation';
            throw error;
        }

        throw new Error(errorPayload?.message || 'Failed to update post');
    }
    return response.json();
}

export async function deletePost(postId) {
    const token = getToken();
    const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.message || 'Failed to delete post');
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
