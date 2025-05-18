// Updated Next.js Recipe Viewer with Search and Detailed About Page

// File: data/recipes.json
[
  {
    "title": "Pancake",
    "slug": "pancake",
    "image": "/images/pancake.jpg",
    "ingredients": ["2 cups flour", "2 eggs", "1.5 cups milk", "1 tbsp sugar", "1 tsp baking powder"],
    "steps": ["Mix dry ingredients", "Add eggs and milk", "Whisk until smooth", "Cook on griddle until golden"]
  },
  {
    "title": "Pizza",
    "slug": "pizza",
    "image": "/images/pizza.jpg",
    "ingredients": ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil leaves"],
    "steps": ["Preheat oven to 220°C", "Spread sauce on dough", "Add cheese and basil", "Bake for 15 mins"]
  },
  {
    "title": "Spaghetti",
    "slug": "spaghetti",
    "image": "/images/spaghetti.jpg",
    "ingredients": ["Spaghetti pasta", "Tomato sauce", "Ground beef", "Onion", "Garlic"],
    "steps": ["Boil pasta", "Cook beef with onion and garlic", "Add sauce", "Mix and serve"]
  },
  {
    "title": "Salad",
    "slug": "salad",
    "image": "/images/salad.jpg",
    "ingredients": ["Lettuce", "Tomatoes", "Cucumber", "Olive oil", "Feta cheese"],
    "steps": ["Chop vegetables", "Mix in a bowl", "Add olive oil and cheese"]
  },
  {
    "title": "Burger",
    "slug": "burger",
    "image": "/images/burger.jpg",
    "ingredients": ["Burger bun", "Beef patty", "Lettuce", "Tomato", "Cheese"],
    "steps": ["Grill patty", "Assemble burger", "Serve with fries"]
  },
  {
    "title": "Sushi",
    "slug": "sushi",
    "image": "/images/sushi.jpg",
    "ingredients": ["Sushi rice", "Nori", "Fish", "Soy sauce", "Wasabi"],
    "steps": ["Cook rice", "Place ingredients on nori", "Roll and slice"]
  },
  {
    "title": "Omelette",
    "slug": "omelette",
    "image": "/images/omelette.jpg",
    "ingredients": ["2 eggs", "Milk", "Salt", "Pepper", "Cheese"],
    "steps": ["Beat eggs", "Add milk and season", "Cook and add cheese"]
  },
  {
    "title": "Tacos",
    "slug": "tacos",
    "image": "/images/tacos.jpg",
    "ingredients": ["Taco shells", "Ground beef", "Lettuce", "Cheese", "Salsa"],
    "steps": ["Cook beef", "Fill tacos with ingredients"]
  },
  {
    "title": "French Toast",
    "slug": "french-toast",
    "image": "/images/french-toast.jpg",
    "ingredients": ["Bread", "Eggs", "Milk", "Cinnamon", "Syrup"],
    "steps": ["Mix eggs and milk", "Dip bread", "Fry until golden"]
  },
  {
    "title": "Soup",
    "slug": "soup",
    "image": "/images/soup.jpg",
    "ingredients": ["Chicken", "Carrots", "Celery", "Onion", "Broth"],
    "steps": ["Chop vegetables", "Boil chicken in broth", "Add vegetables", "Simmer"]
  }
]

// File: components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// File: pages/_app.tsx
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

// File: pages/index.tsx
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
  const [query, setQuery] = useState('');

  const filtered = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍽️ My Recipe Viewer</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {filtered.map((recipe) => (
          <div key={recipe.slug} style={{ width: '300px' }}>
            <Link href={`/recipes/${recipe.slug}`}>
              <Image src={recipe.image} alt={recipe.title} width={300} height={200} />
              <h2>{recipe.title}</h2>
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
      recipes
    }
  };
};

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
