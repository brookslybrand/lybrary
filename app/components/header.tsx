import { Fragment, useState } from 'react';
import { Link } from '@remix-run/react';
import { UserIcon } from '@heroicons/react/20/solid';

import { Menu, Transition } from '@headlessui/react';
import { cx } from 'class-variance-authority';

const avatarFocusCss =
  'flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800';

export function Header() {
  // TODO: hook up logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-slate-700/10 bg-gradient-to-tl from-teal-50/80 to-teal-300/50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end gap-x-8">
          <button onClick={() => setIsLoggedIn((p) => !p)}>Toggle</button>
          {isLoggedIn ? (
            <Menu as="div">
              <Menu.Button className={cx('bg-gray-800', avatarFocusCss)}>
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={cx(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={cx(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={cx(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                      >
                        Sign out
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link
              to="login"
              className={cx(
                'text-gray-600 ring-1 ring-gray-600/40 ',
                avatarFocusCss,
              )}
            >
              <span className="sr-only">Log in</span>
              <UserIcon className="h-8 w-8 rounded-full" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
