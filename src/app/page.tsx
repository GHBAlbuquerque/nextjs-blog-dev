import Container from "@/components/Container";
import Header from "@/components/Header";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";

import { Suspense } from "react";
import FeaturedPost from "@/components/FeaturedPost";

export default async function Home() {
  return (
    <Container>
      <Header />

      <FeaturedPost id="b3f1a9de-2d5c-42cb-9f21-7cf7b5a0e4e3" />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h2 className="text-6x1 font-bold text-center py-8">Aqui é o footer</h2>
      </footer>
    </Container>
  );
}
