import { refetch } from '@/api/refetch';
import Accordion from '@/components/Accordion';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { MessageCommonProblems } from '@/types/app';
import { API_ENDPOINT } from '@/types/enums';
import { FC } from 'react';
import HtmlParser from 'react-html-parser';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const Faq: FC<
  Readonly<{
    messageCommonProblems: MessageCommonProblems[];
  }>
> = ({ messageCommonProblems }) => {
  const theme = useAccountStore((s) => s.theme);
  const onRefresh = () => refetch(API_ENDPOINT.MESSAGE_COMMON_PROBLEMS);
  const dropdownImg = require(`@/assets/${theme}/fragments/arrowDown.png`);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <PullToRefresh onRefresh={onRefresh}>
          <ul>
            {messageCommonProblems.length > 0 &&
              messageCommonProblems.map((faq, index) => (
                <li key={index}>
                  <Accordion
                    content={HtmlParser(faq.content)}
                    delay={index}
                    title={faq.title}
                    dropdownImg={dropdownImg}
                  />
                </li>
              ))}
          </ul>
        </PullToRefresh>
      </div>
    </div>
  );
};

export default Faq;
