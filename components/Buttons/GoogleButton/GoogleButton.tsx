import type { ComponentProps } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function GoogleButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type="button"
      className={`${props.className} mr-2 mb-2 inline-flex items-center rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900  `}
    >
      <FaGoogle className="mr-2" />
      {props.children}
    </button>
  );
}
