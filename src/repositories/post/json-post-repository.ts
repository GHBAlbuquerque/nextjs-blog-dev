import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import simulateWait from "@/utils/simulate-wait";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    await simulateWait();
    return await this.readFromDisk();
  }

  async findAllPublic(): Promise<PostModel[]> {
    await simulateWait();
    const posts = await this.readFromDisk();
    return posts.filter((post) => post.published);
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.id === id);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.slug === slug);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    console.log("Create");
    throw new Error("Method not implemented.");
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt">
  ): Promise<PostModel> {
   
    console.log("Update");
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<PostModel> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
}
