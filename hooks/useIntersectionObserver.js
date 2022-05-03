// https://usehooks-ts.com/react-hook/use-intersection-observer

import { useEffect, useState } from 'react'

export function useIntersectionObserver(
  elementRef,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  },
) {
  const [entry, setEntry] = useState()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen])

  return entry
}

export default useIntersectionObserver
