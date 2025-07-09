import Container from "@/components/Container";
import Header from "@/components/Header";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";

import { Suspense } from "react";
import PostHeading from "@/components/PostHeading";
import PostCoverImage from "@/components/PostCoverImage";

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 group">
        <PostCoverImage
          imageProps={{
            src: "/images/planet1.jpeg",
            alt: "planet1",
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            ratione quod quae dolorem odit sequi quia, aliquam aspernatur
            dignissimos expedita possimus, culpa ex excepturi tempora rerum, rem
            autem veniam! Consequuntur!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h2 className="text-6x1 font-bold text-center py-8">Aqui é o footer</h2>
      </footer>
    </Container>
  );
}
