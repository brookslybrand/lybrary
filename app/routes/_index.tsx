import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Header() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          The Lybrary
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          The digital library of the Lybrand's ever expanding board game
          collection
        </p>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div>
      <Header />
    </div>
  );
}
