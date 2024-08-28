'use client';

import { setBindCard } from '@/api/pay';
import Form, { FormField } from '@/components/Fragments/Form';
import HeaderModalTitle from '@/components/HeaderModalTitle';
import ModalLayout from '@/components/modals/ModalLayout';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const BindBankModal = () => {
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const bankList = useAccountStore((state) => state.bankList);
  const { openAlert, closeBindBank, isBindBankOpen } = useModalStore();
  const [bindRealName, setBindRealName] = useState('');
  const [bindBankAddress, setBindBankAddress] = useState('');
  const [bindBankAccount, setBindBankAccount] = useState('');
  const [bindBankId, setBindBankId] = useState(139);
  const isMounted = useIsMounted();

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

  const handleSubmit = async () => {
    if (!bindRealName) {
      openAlert('请输入您的姓名');
    } else if (!bindBankAccount) {
      openAlert('请输入户行卡号');
    } else if (!bindBankAddress) {
      openAlert('请输入开户地址');
    } else if (bindBankAccount?.length < 16) {
      openAlert('请输入超过16个银行卡号');
    } else {
      const { code, msg } = await setBindCard(bindRealName, bindBankAccount, bindBankAddress, bindBankId);
      if (code === 200) {
        fetchBindCardList();
        openAlert(msg);
        setTimeout(() => {
          closeBindBank();
        }, 500);
      } else if (code === 500) {
        openAlert(msg);
      }
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isBindBankOpen && (
        <ModalLayout onClose={closeBindBank} backdrop={0.8}>
          <div className={styles.wrapper}>
            <HeaderModalTitle title='绑定银行卡' onClick={closeBindBank} />
            <div className={styles.addCardContainer}>
              <div className={styles.bodyContainer}>
                <Form fields={formFields} onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default BindBankModal;
