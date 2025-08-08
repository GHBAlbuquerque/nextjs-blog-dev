import { PostModel } from "@/models/post/post-model";

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  
  create(post: PostModel): Promise<PostModel>;
  update(post: PostModel): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
}
