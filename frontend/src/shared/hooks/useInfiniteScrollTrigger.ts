import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScrollTrigger = (
  onIntersect: () => void,
  isDisabled: boolean,
  root: HTMLElement | null = null,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return useCallback(
    (node: HTMLElement | null) => {
      if (isDisabled) return;

      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        { root },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [onIntersect, isDisabled, root],
  );
};
