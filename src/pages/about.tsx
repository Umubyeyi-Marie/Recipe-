import path from 'path';
import fs from 'fs';
import { GetStaticProps } from 'next';
import Link from 'next/link';

type Recipe = {
  title: string;
  slug: string;
  ingredients: string[];
};

type AboutProps = {
  recipes: Recipe[];
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes = JSON.parse(jsonData);
  return { props: { recipes } };
};

export default function About({ recipes }: AboutProps) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#E6E0F8', minHeight: '100vh' }}>
      <h1>About This App</h1>
      <p>This is a simple recipe viewer built with Next.js, TypeScript, and Static Site Generation.</p>
      <h2>Available Recipes and Ingredients</h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
        {recipes.map((r) => (
          <li key={r.slug} style={{ marginBottom: 16 }}>
            <Link href={`/recipes/${r.slug}`} className="text-purple-700 font-semibold underline">{r.title}</Link>
            <ul>
              {r.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: '#6B46C1', textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
    </div>
  );
}