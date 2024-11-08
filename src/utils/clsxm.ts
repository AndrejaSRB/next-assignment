import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge to handle Tailwind CSS class merging without conflicts
 * @param classes - Any number of class name arguments (strings, objects, arrays)
 *
 * @returns A string of merged class names with Tailwind conflicts resolved
 * @example
 * clsxm('p-4', 'p-8') // returns 'p-8'
 * clsxm('btn', ['text-lg', false && 'uppercase']) // returns 'btn text-lg'
 */

const clsxm: typeof clsx = (...classes) => {
  return twMerge(clsx(...classes));
};

export default clsxm;
