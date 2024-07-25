import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //Create post >>>>>>>>>>>>>>>>>>
  async createPost({ title, slug, content, featuredimage, status, userId,userName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userId,
          userName
        }
      );
    } catch (error) {
      console.log("Appwrite service :: CreatePost :: error", error);
    }
  }

  //Update post >>>>>>>>>>>>>>>>>>
  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status
        }
      );
    } catch (error) {
      console.log("Appwrite service :: UpdatePost :: error", error);
    }
  }

  //Delete post >>>>>>>>>>>>>>>>>>
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeletePost :: error", error);
      return false;
    }
  }

  //Get a post >>>>>>>>>>>>>>>>>>
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: GetPost :: error", error);
      return false;
    }
  }

  //Get all posts >>>>>>>>>>>>>>>>>>
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        //Returns an array
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: GetAllPosts :: error", error);
      return false;
    }
  }

  //Upload file service >>>>>>>>>>>>>>>>>>>>>>>
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  //Delete file service >>>>>>>>>>>>>>>>>>>>>>>
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
    return false;
  }

  //File preview >>>>>>>>>>>>>>>>>>>
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const appwriteService = new Service();

export default appwriteService;
