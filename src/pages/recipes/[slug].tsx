import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';

type Recipe = {
  title: string;
  slug: string;
  image: string;
  ingredients: string[];
  steps: string[];
};

type RecipePageProps = {
  recipe: Recipe;
};

export default function RecipePage({ recipe }: RecipePageProps) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#E6E0F8', minHeight: '100vh' }}>
      <h1>{recipe.title}</h1>
      <Image src={recipe.image} alt={recipe.title} width={500} height={300} className="rounded-xl" />
      <h2>Ingredients</h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
        {recipe.steps.map((step, i) => (
          <li key={i} style={{ marginBottom: 8 }}>{step}</li>
        ))}
      </ol>
      <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: '#6B46C1', textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === slug);

  return {
    props: {
      recipe,
    },
  };
};