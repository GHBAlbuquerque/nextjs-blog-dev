import PostCoverImage from "../PostCoverImage";
import PostHeading from "../PostHeading";

export default function FeaturedPost() {
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 group">
      <PostCoverImage
        imageProps={{
          src: "/images/planet8.jpeg",
          alt: "planet8",
          width: 1024,
          height: 720,
          priority: true,
        }}
        linkProps={{ href: "#" }}
      />
      <div className="flex flex-col gap-4 md:justify-center">
        <time
          className="text-slate-600 block text-sm/tight"
          dateTime="2025-04-20"
        >
          20/04/2025 10:00
        </time>
        <PostHeading url="#" as="h1">
          Lorem ipsum dolor sit amet.
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ratione
          quod quae dolorem odit sequi quia, aliquam aspernatur dignissimos
          expedita possimus, culpa ex excepturi tempora rerum, rem autem veniam!
          Consequuntur!
        </p>
      </div>
    </section>
  );
}
