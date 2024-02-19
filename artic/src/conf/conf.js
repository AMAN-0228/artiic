const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPwRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPwRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPwRITE_BUCKET_ID),
    tinymceApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default conf