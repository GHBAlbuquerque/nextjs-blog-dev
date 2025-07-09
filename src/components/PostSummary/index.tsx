import {
  formatDatetime,
  formatRelativeDate,
  isOlderThanDays,
} from "@/utils/date-utils";
import PostHeading from "../PostHeading";
import { PostModel } from "@/models/post/post-model";

type PostSummaryProps = {
  postUrl: string;
  postHeadingType: "h1" | "h2";
  post: PostModel;
};

export default function PostSummary({
  postUrl,
  postHeadingType,
  post,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 md:justify-center">
      <time
        className="text-slate-600 block text-sm/tight"
        dateTime={post.createdAt}
      >
        {isOlderThanDays(post.createdAt, 7)
          ? formatDatetime(post.createdAt)
          : formatRelativeDate(post.createdAt)}
      </time>
      <PostHeading url={postUrl} as={postHeadingType}>
        {post.title}
      </PostHeading>
      <p>{post.excerpt}</p>
    </div>
  );
}
