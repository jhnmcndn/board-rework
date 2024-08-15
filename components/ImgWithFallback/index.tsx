import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { FC, useState } from 'react';

interface IProps extends ImageProps {
  onLoadCall?: () => void;
  onErrorCall?: () => void;
  fallback: StaticImageData;
  loadingIcon: StaticImageData;
}

const ImgWithFallback: FC<IProps> = ({
  onLoadCall,
  onErrorCall,
  fallback,
  loadingIcon,
  alt,
  src,
  sizes,
  quality,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>(loadingIcon);

  const onError = () => {
    onErrorCall?.();
    setImgSrc(fallback);
  };

  const onLoad = () => {
    onLoadCall?.();
    setImgSrc(src);
  };

  return (
    <Image
      sizes={sizes || '(max-width: 600px) 100vw, 50vw'}
      alt={alt || ''}
      fill
      quality={quality || 100}
      src={imgSrc || fallback}
      onLoad={onLoad}
      onError={onError}
      draggable='false'
      {...rest}
    />
  );
};

export default ImgWithFallback;
