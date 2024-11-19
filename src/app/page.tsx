import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import the DeckGLMap to prevent SSR issues
// const DeckGLMap = dynamic(() => import('../components/DeckGLMap'), { ssr: false });
const DeckGLMap = dynamic(() => import('../components/DeckGLMap'));


export default function Home() {
  return (
    <div>
      <Head>
        <title>Deck.gl with Next.js</title>
        <meta name="description" content="Deck.gl visualization with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ margin: 0, padding: 0, height: '100vh' }}>
        <DeckGLMap />
      </main>
    </div>
  );
};
