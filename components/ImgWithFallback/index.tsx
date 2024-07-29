import Image, { StaticImageData } from 'next/image';
import { FC, useState } from 'react';

interface IProps {
  onLoadCall?: () => void;
  onErrorCall?: () => void;
  fallback: StaticImageData;
  loadingIcon: StaticImageData;
  src: string;
  loading?: 'lazy' | 'eager';
}

const ImgWithFallback: FC<IProps> = ({ onLoadCall, onErrorCall, fallback, loadingIcon, src, loading = 'lazy' }) => {
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(loadingIcon);

  const onError = () => {
    onErrorCall && onErrorCall();
    setImgSrc(fallback);
  };

  const onLoad = () => {
    onLoadCall && onLoadCall();
    setImgSrc(src);
  };

  return (
    <Image
      sizes='(max-width: 600px) 100vw, 50vw'
      fill
      quality={100}
      src={imgSrc || fallback}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
      draggable='false'
      objectFit='cover'
      objectPosition='center'
      alt='Key Icon'
    />
  );
};

export default ImgWithFallback;
