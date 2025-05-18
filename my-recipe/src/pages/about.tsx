// File: pages/about.tsx
import path from 'path';
import fs from 'fs';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes = JSON.parse(jsonData);
  return { props: { recipes } };
}

export default function About({ recipes }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About This App</h1>
      <p>This is a simple recipe viewer built with Next.js, TypeScript, and Static Site Generation.</p>
      <h2>Available Recipes and Ingredients</h2>
      <ul>
        {recipes.map((r) => (
          <li key={r.slug}>
            <strong>{r.title}</strong>
            <ul>
              {r.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}