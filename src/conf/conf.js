const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || ''),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ''),
}

// Check if environment variables are properly configured
if (!conf.appwriteUrl || !conf.appwriteProjectId) {
    console.error('Appwrite environment variables are not configured. Please set VITE_APPWRITE_URL and VITE_APPWRITE_PROJECT_ID');
}

export default conf