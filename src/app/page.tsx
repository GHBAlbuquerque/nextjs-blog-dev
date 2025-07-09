import PostsList from "@/components/PostsList";
import SpinLoader from "@/components/SpinLoader";

import { Suspense } from "react";
import FeaturedPost from "@/components/FeaturedPost";

export default async function Home() {
  return (
    <>
      <FeaturedPost />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
