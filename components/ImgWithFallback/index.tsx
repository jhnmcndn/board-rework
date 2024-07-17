import Image, { StaticImageData } from 'next/image';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
  onLoadCall?: () => void;
  onErrorCall?: () => void;
  fallback: StaticImageData;
  loadingIcon: StaticImageData;
  keyIcon: string;
  src: string;
  loading: 'lazy';
  handleIconWidthChange: (value: number) => void;
}

const ImgWithFallback: FC<IProps> = ({
  onLoadCall,
  onErrorCall,
  fallback,
  loadingIcon,
  keyIcon,
  src,
  loading,
  handleIconWidthChange,
}) => {
  const iconRef = useRef<HTMLImageElement | null>(null);
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(loadingIcon);
  const [iconWidth, setIconWidth] = useState(0);

  const onError = () => {
    onErrorCall && onErrorCall();
    setImgSrc(fallback);
  };

  const onLoad = () => {
    onLoadCall && onLoadCall();
    setImgSrc(src);
  };

  useEffect(() => {
    handleResize();
  }, [iconRef?.current?.offsetWidth, window.orientation]);

  const handleResize = useCallback(() => {
    setIconContainerSize();
  }, []);

  const setIconContainerSize = () => {
    if (!iconRef) return;
    handleIconWidthChange && handleIconWidthChange(Number(iconRef?.current?.offsetWidth));
    setIconWidth(Number(iconRef?.current?.offsetWidth));
  };

  useEffect(() => {
    let debounceId: any;

    function handleDebouncedResize() {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        handleResize();
      }, 1000);
    }

    window.addEventListener('resize', handleDebouncedResize);
    window.addEventListener('pageshow', handleDebouncedResize);
    window.addEventListener('orientationchange', handleDebouncedResize);

    return () => {
      window.removeEventListener('resize', handleDebouncedResize);
      window.removeEventListener('pageshow', handleDebouncedResize);
      window.removeEventListener('orientationchange', handleDebouncedResize);
    };
  }, [handleResize]);

  return (
    <Image
      ref={iconRef}
      key={keyIcon && keyIcon}
      height={200}
      width={200}
      src={imgSrc || fallback}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
      draggable='false'
      style={iconWidth ? { width: iconWidth } : {}}
      alt='Key Icon'
    />
  );
};

export default ImgWithFallback;
