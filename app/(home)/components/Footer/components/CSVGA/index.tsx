import { FC, HTMLAttributes } from 'react';
import { Svga } from 'react-svga';

export type CSVGAProps = {
  src: string;
  className?: HTMLAttributes<HTMLElement>['className'];
};
export type CSVGAComponent = FC<Readonly<CSVGAProps>>;

const CSVGA: CSVGAComponent = ({ src, className }) => {
  return (
    <Svga
      src={src}
      option={{
        loop: true,
        cacheFrames: true,
        intersectionObserverRender: true,
      }}
      className={className}
    />
  );
};

export default CSVGA;
