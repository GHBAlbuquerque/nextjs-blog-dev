type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  return <h1 className="text-7xl font-extrabold py-6">Dinâmica: {slug}</h1>;
}
