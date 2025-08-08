const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || '').replace(/['"]/g, ''),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || '').replace(/['"]/g, ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || '').replace(/['"]/g, ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || '').replace(/['"]/g, ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || '').replace(/['"]/g, ''),
}

export default conf