import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
}

/**
 * Custom hook to implement infinite scroll functionality.
 *
 * This hook sets up an Intersection Observer to detect when the last element in a list
 * becomes visible in the viewport. When the element intersects, the provided
 * `onIntersect` callback is executed, typically to fetch more data.
 *
 * @param onIntersect - A function to be called when the last element intersects with the viewport.
 * @param hasMore - A boolean indicating whether there is more data to load.
 * @param loading - A boolean indicating whether data is currently being loaded.
 * @param threshold - The intersection threshold (0 to 1) at which the callback should be executed.
 * @returns A React ref object that should be attached to the last element in the list.
 */
const useInfiniteScroll = ({
  onIntersect,
  hasMore,
  loading,
  threshold = 0.5,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [onIntersect, hasMore, loading, threshold]);

  return lastElementRef;
};

export default useInfiniteScroll;

/**
 * Usage example:
 *
 * import { useRef } from 'react';
 * import useInfiniteScroll from './useInfiniteScroll';
 *
 * function MyListComponent({ data, hasMore, loading, loadMore }) {
 * const lastElementRef = useInfiniteScroll({
 * onIntersect: loadMore,
 * hasMore,
 * loading,
 * });
 *
 * return (
 * <div>
 * {data.map((item, index) => (
 * <div key={index}>
 * {item}
 * </div>
 * ))}
 * {hasMore && <div ref={lastElementRef}>Loading more...</div>}
 * </div>
 * );
 * }
 */
