import { json, type V2_MetaFunction } from '@remix-run/node';
import type { RequiredVariantProps } from '~/types.ts';
import { Link, useLoaderData } from '@remix-run/react';
import { cva } from 'class-variance-authority';
import { prisma } from '~/utils/db.server.ts';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'The Lybrary | Lybrand Digital Board Game Library' },
    {
      name: 'description',
      content:
        "Welcome the digital library of the Lybrand's ever expanding board game collection",
    },
  ];
};

export async function loader() {
  const users = await prisma.user.findMany();
  return json({ users });
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  console.log(users);
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center lg:max-w-fit">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Users
        </h1>
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li className="text-xl" key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <div>There were no users</div>
        )}
        {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          The Lybrary
        </h1> */}
        {/* <p className="mt-6 text-base leading-8 text-gray-600 lg:mt-8 lg:text-lg">
          The digital library of the Lybrand's ever expanding board game
          collection
        </p>
        <div className="mt-8 w-full space-y-8 lg:mt-12 lg:space-y-14">
          <CallToAction to="pick-a-game" intent="primary">
            Pick a game
          </CallToAction>
          <CallToAction to="library" intent="secondary">
            Browse library
          </CallToAction>
        </div> */}
      </div>
    </div>
  );
}

const callToActionVariants = cva(
  'flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-lg font-normal leading-8 focus:outline-none focus:ring-2 focus:ring-offset-2 lg:text-2xl lg:font-light lg:leading-10',
  {
    variants: {
      intent: {
        primary:
          'bg-teal-700 text-slate-50 hover:bg-teal-800 focus:ring-teal-600',
        secondary:
          'bg-fuchsia-700 text-slate-50 hover:bg-fuchsia-800 focus:ring-fuchsia-600',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

type CallToActionProps = {
  to: string;
  children: React.ReactNode;
} & RequiredVariantProps<typeof callToActionVariants>;

function CallToAction({ to, intent, children }: CallToActionProps) {
  return (
    <Link to={to} className={callToActionVariants({ intent })}>
      {children}
    </Link>
  );
}
