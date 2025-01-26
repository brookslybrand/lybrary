import * as schema from "~/database/schema";
import type { Route } from "./+types/home";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let message = formData.get("message");
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();
  message = message.trim();
  if (!name || !email) {
    return { guestBookError: "Name and email are required" };
  }

  try {
    await context.db.insert(schema.guestBook).values({ name, email, message });
  } catch (error) {
    return { guestBookError: "Error adding to guest book" };
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const guestBook = await context.db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return {
    guestBook,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Guest Book</h1>

      <Form method="post" className="mb-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {actionData?.guestBookError && (
          <p className="text-red-600">{actionData.guestBookError}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Sign Guest Book
        </button>
      </Form>

      <div>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Previous Guests
        </h2>
        <div className="space-y-2">
          {loaderData.guestBook.map((entry) => (
            <div
              key={entry.id}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md dark:text-white"
            >
              {entry.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
