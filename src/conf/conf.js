const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || ''),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ''),
}

// Debug logging for production
console.log('=== APPWRITE CONFIG DEBUG ===');
console.log('VITE_APPWRITE_URL:', import.meta.env.VITE_APPWRITE_URL);
console.log('VITE_APPWRITE_PROJECT_ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
console.log('conf.appwriteUrl:', conf.appwriteUrl);
console.log('conf.appwriteProjectId:', conf.appwriteProjectId);
console.log('============================');

// Check if environment variables are properly configured
if (!conf.appwriteUrl || !conf.appwriteProjectId) {
    console.error('Appwrite environment variables are not configured. Please set VITE_APPWRITE_URL and VITE_APPWRITE_PROJECT_ID');
}

export default conf