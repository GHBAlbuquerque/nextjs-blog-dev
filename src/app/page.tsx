import Container from "@/components/Container";
import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Container>
      <header>
        <h1 className="text-6x1 font-bold text-center py-8">Aqui é a header</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h2 className="text-6x1 font-bold text-center py-8">Aqui é o footer</h2>
      </footer>
    </Container>
  );
}
