import { useUser } from '@clerk/nextjs';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { useState } from 'react';

type Recipe = {
  title: string;
  slug: string;
  image: string;
};

type HomeProps = {
  recipes: Recipe[];
};

export default function Home({ recipes }: HomeProps) {
  const { isSignedIn, isLoaded } = useUser(); // 👈 Clerk hook
  const [query, setQuery] = useState('');

  if (!isLoaded) {
    // Still loading user info
    return <div style={{ background: 'black', height: '100vh' }} />;
  }

  if (!isSignedIn) {
    // User is not signed in yet
    return <div style={{ background: 'black', height: '100vh' }} />;
  }

  const filtered = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#E6E0F8', minHeight: '100vh' }}>
      <h1>🍽️ My Recipe Viewer</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: 400, marginBottom: '1rem', borderRadius: 8 }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {filtered.map((recipe) => (
          <div key={recipe.slug} style={{ width: 300, backgroundColor: '#F3EBFF', borderRadius: 16, padding: 16, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Link href={`/recipes/${recipe.slug}`} className="block">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={200}
                className="rounded-xl"
              />
              <h2 style={{ marginTop: 12, color: '#6B46C1' }}>{recipe.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes = JSON.parse(jsonData);

  return {
    props: {
      recipes,
    },
  };
};
