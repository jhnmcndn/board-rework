'use client';

import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Parser, Player } from 'svga';

export type CSVGAProps = {
  src: string;
  className?: HTMLAttributes<HTMLCanvasElement>['className'];
};
export type CSVGAComponent = FC<Readonly<CSVGAProps>>;

const CSVGA: CSVGAComponent = ({ src, className }) => {
  const [parser, setParser] = useState<Parser>();
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    loadSvga();

    return () => {
      parser?.destroy();
      player?.destroy();
    };
  }, [src, parser, player]);

  const loadSvga = () => {
    const canvas = document.getElementById(src) as HTMLCanvasElement;
    setParser(new Parser());
    setPlayer(new Player({ container: canvas, loop: true }));
  };

  const startPlayer = async () => {
    if (!player || !parser) return;
    const svga = await parser?.load(src);
    await player?.mount(svga);
    player?.start();
  };

  return <canvas id={src} className={className} />;
};

export default CSVGA;
