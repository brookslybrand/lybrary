import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { clsx } from 'clsx';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center lg:max-w-fit">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          The Lybrary
        </h1>
        <p className="mt-6 text-base leading-8 text-gray-600 lg:mt-8 lg:text-lg">
          The digital library of the Lybrand's ever expanding board game
          collection
        </p>
        <div className="mt-8 w-full space-y-8 lg:mt-12 lg:space-y-14">
          <CallToAction to="pick-a-game" color="primary">
            Pick a game
          </CallToAction>
          <CallToAction to="library" color="secondary">
            Browse library
          </CallToAction>
        </div>
      </div>
    </div>
  );
}

type CallToActionProps = {
  to: string;
  color: 'primary' | 'secondary';
  children: React.ReactNode;
};

function CallToAction({ to, color, children }: CallToActionProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-lg font-normal leading-8 focus:outline-none focus:ring-2 focus:ring-offset-2 lg:text-2xl lg:font-light lg:leading-10',
        color === 'primary' &&
          'bg-teal-700 text-slate-50 hover:bg-teal-800 focus:ring-teal-600',
        color === 'secondary' &&
          'bg-fuchsia-700 text-slate-50 hover:bg-fuchsia-800 focus:ring-fuchsia-600',
      )}
    >
      {children}
    </Link>
  );
}
