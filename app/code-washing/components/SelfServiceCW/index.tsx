import { getWashCodeDetail } from '@/api/game';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useFetchGame from '@/hooks/useFetchGame';
import { WashCodeDetail } from '@/types/app';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import CodeWashList from './CodeWashList';
import styles from './index.module.scss';
import TotalReceived from './TotalReceived';

const SelfServiceCW = () => {
  const { handleChange } = useFetchGame();
  const [washCode, setWashCode] = useState<WashCodeDetail>();
  const sideBar = useGameStore((state) => state.sideBar);
  const { setActiveSideBarItem, setShowPlatform } = useGameStore((state) => state);
  const { push } = useRouter();

  const updateWashCode = (newWashCode: WashCodeDetail) => setWashCode(newWashCode);
  const handleRedirect = (gameTypeId: number) => {
    const item = sideBar.find((item) => item.id === gameTypeId);
    if (item) {
      setShowPlatform(false);
      setActiveSideBarItem(item);
      handleChange(item);
    }
    push('/');
  };

  const codeWashList = useMemo(
    () =>
      washCode?.rspGameTypeWashCodes.map((code) => ({
        0: code.gameTypeName,
        1: code.washCodeAmount,
        2: code.washCodeRate,
        3: code.codeAmountTotal,
        4: (
          <button className={styles.button} onClick={() => handleRedirect(code.gameTypeId)}>
            去完成
          </button>
        ),
      })),
    [washCode],
  );
  const total = codeWashList?.reduce((total, code) => total + code[3], 0) || 0;

  useEffect(() => {
    const fetchWashCodeDetails = async () => {
      const codeWash = await getWashCodeDetail();
      if (codeWash.rspGameTypeWashCodes) setWashCode(codeWash);
    };
    fetchWashCodeDetails();
  }, []);

  return (
    <div className={styles.wrapper} style={{ height: codeWashList?.length ? 'auto' : '100%' }}>
      <CodeWashList list={codeWashList} />
      <TotalReceived total={total} listLength={codeWashList?.length || 0} updateWashCode={updateWashCode} />
    </div>
  );
};

export default SelfServiceCW;
