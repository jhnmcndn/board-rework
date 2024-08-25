import ImgWithFallback from '@/components/ImgWithFallback';
import useAuthActions from '@/hooks/useAuthActions';
import useImages from '@/hooks/useImages';
import { FC, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import styles from './index.module.scss';

type ImageAccordionProps = {
  url: string | undefined;
  icon: string;
  switched?: boolean;
  content: string;
  // handleSwitch: () => void;
};

const ImageAccordion: FC<ImageAccordionProps> = ({ url, icon, content }) => {
  const { images } = useImages();
  const { authCheck } = useAuthActions();
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
