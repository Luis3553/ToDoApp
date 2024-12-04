export async function uploadPhotoProfile(token, formData) {
    const response = await fetch('/api/dashboard/profile-photo', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate', // Disable caching
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });

    return response.status;
}