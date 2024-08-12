'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from '@/utils/helpers';
import styles from './index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { onClickSound } from '@/utils/audioFile';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { setBindCard } from '@/api/pay';
import useModalStore from '@/store/modals';
import Form, { FormField } from '@/components/Fragments/Form';

type Props = {
  showMe?: boolean;
  onClose: () => void;
};

const AddCardModal = ({ showMe, onClose }: Props) => {
  const theme = useAccountStore((state) => state.theme);
  const bankList = useAccountStore((state) => state.bankList);
  const fetchBankList = useAccountStore((state) => state.fetchBankList);
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [bindRealName, setBindRealName] = useState('');
  const [bindBankAddress, setBindBankAddress] = useState('');
  const [bindBankAccount, setBindBankAccount] = useState('');
  const [bindBankId, setBindBankId] = useState(139);
  const { openAlert } = useModalStore();

  const bankOptions = bankList.map((item) => ({
    value: item.id,
    label: (
      <span>
        <Image width={20} height={20} src={item.bankIcon || ''} alt='Bank Icons' className={styles.bankIcons} />
        &nbsp;{item.bankName}
      </span>
    ),
  }));

  const formFields: FormField[] = useMemo(
    () => [
      {
        type: 'input',
        label: '真实姓名:',
        placeholder: '请输入您的姓名',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setBindRealName(e.target.value),
      },
      {
        type: 'select',
        label: '那图:',
        options: bankOptions,
        defaultValue: bankOptions[0],
        onSelectChange: (selected: any) => setBindBankId(selected.value),
      },
      {
        type: 'input',
        label: '银行卡号:',
        placeholder: '请输入开户行卡号',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setBindBankAccount(e.target.value),
      },
      {
        type: 'input',
        label: '开户地址:',
        placeholder: '请输入开户行地址',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setBindBankAddress(e.target.value),
      },
    ],
    [bankOptions],
  );

  useEffect(() => {
    fetchBankList();
  }, []);

  const handleSubmit = async () => {
    if (!bindRealName) {
      openAlert({ body: '请输入您的姓名' });
    } else if (!bindBankAccount) {
      openAlert({ body: '请输入户行卡号' });
    } else if (!bindBankAddress) {
      openAlert({ body: '请输入开户地址' });
    } else if (bindBankAccount?.length < 16) {
      openAlert({ body: '请输入超过16个银行卡号' });
    }

    const { code, msg } = await setBindCard(bindRealName, bindBankAccount, bindBankAddress, bindBankId);
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
              data-theme={theme}
            >
              <div className={styles.header}>
                <div className={styles.headerTitle}>绑定银行卡</div>
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

export default AddCardModal;
