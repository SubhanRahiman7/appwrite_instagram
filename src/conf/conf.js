const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || '').replace(/['"]/g, ''),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || '').replace(/['"]/g, ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || '').replace(/['"]/g, ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || '').replace(/['"]/g, ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || '').replace(/['"]/g, ''),
}

// Debug logging for production
console.log('=== APPWRITE CONFIG DEBUG ===');
console.log('VITE_APPWRITE_URL:', import.meta.env.VITE_APPWRITE_URL);
console.log('VITE_APPWRITE_PROJECT_ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
console.log('conf.appwriteUrl:', conf.appwriteUrl);
console.log('conf.appwriteProjectId:', conf.appwriteProjectId);
console.log('conf.appwriteCollectionId:', conf.appwriteCollectionId);
console.log('============================');

// Check if environment variables are properly configured
if (!conf.appwriteUrl || !conf.appwriteProjectId) {
    console.error('Appwrite environment variables are not configured. Please set VITE_APPWRITE_URL and VITE_APPWRITE_PROJECT_ID');
}

export default conf