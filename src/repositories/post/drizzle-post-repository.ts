import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { logColor } from "@/utils/log-color";
import simulateWait from "@/utils/simulate-wait";
import { postsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    logColor("findAllPublic", Date.now());

    await simulateWait();
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    logColor("findBySlugPublic", Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    logColor("findAll", Date.now());

    await simulateWait();
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    logColor("findById", Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error("Post with ID or Slug already exists on database");
    }

    await simulateWait();
    await drizzleDb.insert(postsTable).values(post);
    
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt">
  ): Promise<PostModel> {
    
    const existingPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if(!existingPost) {
      throw new Error("Post does not exist");
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      title: newPostData.title,
      excerpt: newPostData.excerpt,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      published: newPostData.published,
      updatedAt,
    };

    await simulateWait();

    await drizzleDb.update(postsTable)
    .set(postData)
    .where(eq(postsTable.id, id))

    return {
      ...existingPost,
      ...postData // overwrites the previous post
    }
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error("Post does not exist");
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }
}
