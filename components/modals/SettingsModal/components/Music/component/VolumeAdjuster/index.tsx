import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect } from 'react';
import styles from './index.module.scss';

const MusicComponent: FC = () => {
  const { gameVolume, setGameVolume } = useGameStore((state) => state);
  const { images } = useImages();

  useEffect(() => {
    setGameVolume(gameVolume);
  }, [gameVolume, setGameVolume]);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setGameVolume(newValue);
  };

  const toggleMute = () => {
    setGameVolume(gameVolume === 100 ? 0 : 100);
  };

  const volumeIcon = gameVolume === 0 ? images.noSound : images.hasSound;

  return (
    <div className={styles.musicComponent}>
      <input
        className={styles.volumeRange}
        onChange={handleVolumeChange}
        style={{ backgroundSize: `${gameVolume}% 100%` }}
        type='range'
        min={0}
        value={gameVolume}
        max={100}
      />
      <Image src={volumeIcon} alt='Toggle Mute' className={styles.muteIcon} onClick={toggleMute} />
    </div>
  );
};

export default MusicComponent;
