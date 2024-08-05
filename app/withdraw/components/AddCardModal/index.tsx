'use client'

import { AnimatePresence, motion } from "framer-motion";
import { MODAL_CONTENT_ANIMATION, MODAL_BG_ANIMATION } from "@/utils/helpers";
import styles from './index.module.scss';
import {useAccountStore} from "@/components/Providers/AccountStoreProvider";
import {onClickSound} from "@/utils/audioFile";
import {ChangeEvent, useEffect, useState} from "react";
import Select from 'react-select';
import Image from 'next/image';
import classnames from "classnames";
import {log} from "node:util";
import ButtonDesignTwo from "@/components/Fragments/Buttons/ButtonDesignTwo";
import { setBindCard } from "@/api/pay";
import useModalStore from "@/store/modals";

type Props = {
  showMe?: boolean;
  onClose: (() => void) | undefined;
  onSuccess?: undefined;
  special?: boolean;
  passedBankName?: undefined;
  passedBankID?: number;
}

type TemplatedInputForUserProps = {
  label: string;
  placeholder: string;
  changeMe: (event: ChangeEvent<HTMLInputElement>) => void;
  myValue?: string;
  amIdisable?: boolean;
  bgColor?: string;
}

const TemplatedInputForUser = ({
   label,
   placeholder,
   changeMe,
   myValue,
   amIdisable,
   bgColor
}: TemplatedInputForUserProps) => (
  <div className={styles.templatedInputForUser}>
    <div className={styles.inputLabel}>{label}</div>
    <div className={styles.inputHolder}>
      <input
        type='text'
        placeholder={placeholder}
        onChange={changeMe}
        value={myValue}
        disabled={amIdisable}
        style={{ background: bgColor || '' }}
      />
    </div>
  </div>
);

const AddCardModal = ({ showMe, onClose, onSuccess, special, passedBankName, passedBankID }: Props) => {
  const theme = useAccountStore((state) => state.theme);
  const bankList = useAccountStore((state) => state.bankList);
  const fetchBankList = useAccountStore((state) => state.fetchBankList);
  const fetchBindCardList = useAccountStore((state) => state.fetchBindCardList);
  const [bindRealName, setBindRealName] = useState();
  const [bindBankAddress, setBindBankAddress] = useState();
  const [bindBankAccount, setBindBankAccount] = useState();
  const [bindBankId, setBindBankId] = useState(139);
  const { openAlert } = useModalStore();

  useEffect(() => {
    fetchBankList();
  }, []);

  const handleBindData = (e, v) => {
    if (v === 1) {
      setBindRealName(e.target.value);
    }
    if (v === 2) {
      setBindBankAccount(e.target.value);
    }
    if (v === 3) {
      setBindBankAddress(e.target.value);
    }
  }

  const bankOptions = bankList.map((item) => ({
    value: item.id,
    label: (
      <span>
      <Image
        width={20}
        height={20}
        src={item.bankIcon || ''}
        alt='Bank Icons'
        className={styles.bankIcons}
      />
        &nbsp;{item.bankName}
    </span>
    )
  }));

  const changeBankIdSelect = (selected) => {
    setBindBankId(selected.value);
  }

  const bindMyCard = async () => {
     if (!bindRealName) {
      openAlert(({ body: '请输入您的姓名' }));
    } else if (!bindBankAccount) {
      openAlert(({ body: '请输入户行卡号' }));
    } else if (!bindBankAddress) {
      openAlert(({ body: '请输入开户地址' }));
    } else if (bindBankAccount.length < 16) {
      openAlert(({ body: '请输入超过16个银行卡号' }));
    }

    const { code, msg } = await setBindCard(
      bindRealName,
      bindBankAccount,
      bindBankAddress,
      bindBankId,
    )
    if (code === 200) {
      fetchBindCardList();
      setTimeout(() => {
        handleClose();
      }, 3000);
    } else if (code === 500) {
      openAlert(({ body: msg }));
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }

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
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
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
                <div className={styles.headerTitle}>
                  {!special && '绑定银行卡'}
                  {special && '绑定' + passedBankName}
                </div>
                <span
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                    onClickSound('pop');
                  }}
                  className={styles.closeBtn}
                />
              </div>
              <div className={styles.addCardContainer}>
                <div className={styles.bodyContainer}>
                  <div className={styles.inputFields}>
                    <ul>
                      <li
                        className={classnames(styles.list, {
                          [styles.listSpecial]: special
                        })}
                      >
                        <TemplatedInputForUser
                          bgColor={theme === 'blackGold' ? '#000' : ''}
                          changeMe={(e) => handleBindData(e, 1)}
                          label='真实姓名:'
                          placeholder={
                            !special
                              ? '请输入您的姓名'
                              : '请输入与' + passedBankName + '实名认证的姓名'
                          }
                        />
                      </li>
                      {!special && (
                        <li>
                          <span className={styles.bankListSpan}>那图: </span>
                          <div className={styles.selectContainer}>
                            <Select
                              options={bankOptions}
                              isClearable={false}
                              // menuIsOpen={true}
                              defaultValue={bankOptions[0]}
                              classNamePrefix={'bindCardSelect'}
                              onChange={(selected) => changeBankIdSelect(selected)}
                              isSearchable={false}
                            />

                          </div>
                        </li>
                      )}
                      <li
                        style={{
                          marginBottom: special ? '0.15rem' : '0.15rem',
                          marginTop: '0.1rem',
                        }}
                      >
                        <TemplatedInputForUser
                          bgColor={theme === 'blackGold' ? '#000' : ''}
                          changeMe={(e) => handleBindData(e, 2)}
                          label={!special ? '银行卡号:' : '钱包地址:'}
                          placeholder={
                            !special ? '请输入开户行卡号' : '请输入' + passedBankName + '钱包地址'
                          }
                        />
                      </li>
                      {!special && (
                        <li>
                          <TemplatedInputForUser
                            bgColor={theme === 'blackGold' ? '#000' : ''}
                            changeMe={(e) => handleBindData(e, 3)}
                            label='开户地址:'
                            placeholder='请输入开户行地址'
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                  <div
                    className={styles.buttonHolder}
                    onClick={() => {
                      bindMyCard();
                    }}
                  >
                    <ButtonDesignTwo
                      brad={0}
                      buttonName='确认绑定'
                      height={0.3}
                      width={0.8}
                      padding='0.035rem 0'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AddCardModal