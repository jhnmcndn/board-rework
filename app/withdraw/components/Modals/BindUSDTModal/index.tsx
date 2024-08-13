'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from '@/utils/helpers';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { onClickSound } from '@/utils/audioFile';
import { ChangeEvent, useMemo, useState } from 'react';
import { setBindCard } from '@/api/pay';
import useModalStore from '@/store/modals';
import Form, { FormField } from '@/components/Fragments/Form';
import styles from './index.module.scss';

type Props = {
  showMe?: boolean;
  onClose: () => void;
};

const BindUSDTModal = ({ showMe, onClose }: Props) => {
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [usdtAddress, setUsdtAddress] = useState('');
  const [realName, setRealName] = useState('');
  const { openAlert } = useModalStore();

  const formFields: FormField[] = useMemo(
    () => [
      {
        type: 'input',
        label: '真实姓名:',
        placeholder: '请输入您的姓名',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setRealName(e.target.value),
      },
      {
        type: 'input',
        label: '链名称:',
        value: 'USDT-TRC20',
        readOnly: true,
      },
      {
        type: 'input',
        label: '钱包地址:',
        placeholder: '请输入USDT钱包地址',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setUsdtAddress(e.target.value),
      },
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!realName) {
      openAlert({ body: '请输入您的姓名' });
    } else if (!usdtAddress) {
      openAlert({ body: '请输入您的 USDT 地址' });
    } else if (usdtAddress.length < 16) {
      openAlert({ body: '请输入正确的 USDT 地址' });
    }

    const { code, msg } = await setBindCard(realName, usdtAddress, 'USDT-TRC20', 139);
    if (code === 200) {
      fetchBindCardList();
      openAlert({ body: msg });
      setTimeout(() => {
        onClose();
      }, 500);
    } else if (code === 500) {
      openAlert({ body: msg });
    }
  };

  return (
    <AnimatePresence>
      {showMe && (
        <>
          <motion.div
            variants={MODAL_BG_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={styles.overlay}
            onClick={onClose}
          >
            <motion.div
              variants={MODAL_CONTENT_ANIMATION}
              initial='hidden'
              animate='visible'
              exit='exit'
              className={styles.wrapper}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={styles.header}>
                <div className={styles.headerTitle}>绑定USDT</div>
                <span
                  onClick={() => {
                    onClose();
                    onClickSound('pop');
                  }}
                  className={styles.closeBtn}
                />
              </div>
              <div className={styles.addCardContainer}>
                <div className={styles.bodyContainer}>
                  <Form fields={formFields} onSubmit={handleSubmit} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BindUSDTModal;
