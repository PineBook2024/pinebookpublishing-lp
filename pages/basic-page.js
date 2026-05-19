import Head from "next/head";

export default function BasicPage() {
  return (
    <>
      <Head>
        <title>Basic Next.js Page</title>
        <meta name="description" content="A simple basic Next.js page." />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900">
        <h1 className="text-4xl font-semibold mb-4">Basic Next.js Page</h1>
        <p className="max-w-xl text-center text-lg leading-8">
          This is a simple page created in the Next.js pages router. You can edit it in <code>pages/basic-page.js</code>.
        </p>
      </main>
    </>
  );
}
