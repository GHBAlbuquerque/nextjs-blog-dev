import { PostModel } from "@/models/post/post-model";

export interface PostRepository {
  
  // queries
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;

  // mutations
  create(post: PostModel): Promise<PostModel>;
  update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt">
  ): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
}
