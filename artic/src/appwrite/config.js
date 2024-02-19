import conf from '../conf/conf'
import {Client, Databases , ID, Storage, Query} from 'appwrite'

 class Service  {
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket  = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status}, userId){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Service :: createPost :: error ",error)
        }
        return null;
    }

    async updatePost(slug,{title, content, featuredImage, status }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Service :: updatePost :: error ",error)
        }
        return null;
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Service :: deletePost :: error ",error)
        }
        return false
    }

    async getPostBySlug(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Service :: getPostBySlug :: error ",error)
        }
        return null
    }

    async getPosts(query= [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Service :: getPosts :: error ",error)
        }
        return null
    }

    // file services

    async fileUpload(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Service :: fileUpload :: error ",error)
        }
        return null
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Service :: deleteFile :: error ",error)
        }
        return null
    }
    
    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Service :: getFilePreview :: error ",error)
        }
        return null
    }
}

const service = new Service()
export default service