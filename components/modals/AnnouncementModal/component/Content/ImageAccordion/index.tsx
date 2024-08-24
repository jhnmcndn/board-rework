import ImgWithFallback from '@/components/ImgWithFallback';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import styles from './index.module.scss';

type ImageAccordionProps = {
  url: string | undefined;
  // handleSwitch: () => void;
  icon: string;
  switched?: boolean;
  content: string;
};

const ImageAccordion: React.FC<ImageAccordionProps> = ({ url, icon, content }) => {
  const { authCheck } = useAuthCheck();
  const { images } = useImages();
  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = () => {
    authCheck(() => {
      setExpand((prev) => !prev);
    });

    if (!expand && url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={styles.imageAccordionContaier}>
      <div className={styles.header} onClick={handleExpand}>
        <ImgWithFallback
          className={styles.photoEvent}
          fallback={images.fallback}
          loadingIcon={images.loading}
          src={icon || images.fallback}
          alt='Image with fallback'
        />
      </div>
      {expand && (
        <div className={styles.imageAccordionBody}>
          <div>{ReactHtmlParser(content)}</div>
        </div>
      )}
    </div>
  );
};

export default ImageAccordion;
