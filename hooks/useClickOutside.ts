import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

const useClickOutSide = (theRef: RefObject<HTMLElement> | null) => {
  const [clickOutSide, setClickOutSide] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (theRef?.current && !theRef.current.contains(event.target as Node)) {
        setClickOutSide(true);
      } else {
        setClickOutSide(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [clickOutSide]);

  return clickOutSide;
};

export default useClickOutSide;

