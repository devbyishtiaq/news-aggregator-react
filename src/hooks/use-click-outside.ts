import { useEffect, RefObject } from "react";

/**
 * Custom hook to detect clicks outside of a specified element.
 *
 * This hook adds an event listener to the document to listen for 'mousedown' events.
 * If a click occurs outside the element referenced by the provided ref, the provided
 * callback function is executed.
 *
 * @param ref - A React ref object pointing to the element to watch for outside clicks.
 * @param callback - A function to execute when a click occurs outside the element.
 */
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;

/**
 * Usage example:
 *
 * import { useRef } from 'react';
 * import useClickOutside from './useClickOutside';
 *
 * function MyComponent() {
 * const myRef = useRef<HTMLDivElement>(null);
 *
 * useClickOutside(myRef, () => {
 * console.log('Clicked outside!');
 * });
 *
 * return <div ref={myRef}>Click outside me!</div>;
 * }
 */
