// in this file , we write another service , namely database and bucket service

import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'
import authService from './auth.js';
import { data } from 'react-router-dom';

// here client means The one who logs in / signs up = your end-user.
export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectID) // Your project ID
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

// Title → "My First Blog Post"
// Slug → "my-first-blog-post"

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, //used as DOcument ID
                {
                    title,
                    content, 
                    featuredImage,
                    status,
                    userId
                }
            )    
        } 
        catch (error) {
            console.log("Service :: createPost() :: ", error);
            return null
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, //used as DOcument ID   
                {
                    title, 
                    content,
                    featuredImage,
                    status
                }    
            )    
        } 
        catch (error) {
            console.log("Service :: updatePost() :: ", error);
            return null
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug //used as DOcument ID   
            )   
            return true         
        } 
        catch (error) {
            console.log("Service :: deletePost() :: ", error);
            return null
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug //used as DOcument ID
            )            
        } 
        catch (error) {
            console.log("Service :: getPost() :: ", error);
            return null
        }
    }

    // queries is an array of Query objects, there can be more than one query, hence array
    // here, status is passed as key, it should be defined as an index in appwrite
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                return []; // Return empty list if not authenticated
            }

            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries //we could have declared queries here also, but we are passing it as parameter so that it is reusable
            )
            return res.documents //return only array , so that .map could be applied
        } 
        catch (error) {
            console.log("Service :: getPosts() :: ", error);
            return []
        }
    }

    // file upload service 
    // file is not just the file object, it is an object containing file and other meta data like size, type, etc.
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(), //file ID
                file // actual file (image, pdf, docx, etc.)
            )
        } 
        catch (error) {
            console.log("Service :: uploadFIle() :: ", error);
            return null
        }
    }

    async deleteFile(fileId){
        
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId // file ID
            )
        } 
        catch (error) {
            console.log("Service :: deleteFile() :: ", error);
            return null
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketID,
            fileId // file ID
        )
    }
    // no async because it is not a promise, it is just a url, and it is fast
}

const service = new Service()
export default service