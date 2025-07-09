import { postRepository } from "@/repositories/post";
import PostCoverImage from "../PostCoverImage";
import PostHeading from "../PostHeading";
import {
  formatDatetime,
  formatRelativeDate,
  isOlderThanDays,
} from "@/utils/date-utils";

type FeaturedpostProps = {
  id: string;
};

export default async function FeaturedPost({ id }: FeaturedpostProps) {
  const post = await postRepository.findById(id);
  const createdDate = post.createdAt;
  const isOlderThanAWeek = isOlderThanDays(createdDate, 7);

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 group">
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1024,
          height: 720,
          priority: true,
        }}
        linkProps={{ href: `/posts/${post.slug}` }}
      />
      <div className="flex flex-col gap-4 md:justify-center">
        <time
          className="text-slate-600 block text-sm/tight"
          dateTime={createdDate}
        >
          {isOlderThanAWeek
            ? formatDatetime(createdDate)
            : formatRelativeDate(createdDate)}
        </time>
        <PostHeading url="#" as="h1">
          {post.title}
        </PostHeading>
        <p>{post.excerpt}</p>
      </div>
    </section>
  );
}
