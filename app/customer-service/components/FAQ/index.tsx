import HelpSection from '@/app/customer-service/components/FAQ/HelpSection';
import styles from '@/app/customer-service/components/FAQ/index.module.scss';
import { ErrorData, MessageCommonProblems } from '@/types/app';
import { FC } from 'react';
import AccordionList from './AccordionList';

export type FAQComponentProps = {
  faq: ErrorData | MessageCommonProblems[] | undefined;
};

export type FAQComponent = FC<Readonly<FAQComponentProps>>;

const FAQ: FAQComponent = ({ faq }) => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <HelpSection>
          <AccordionList faq={faq} />
        </HelpSection>
      </div>
    </section>
  );
};

export default FAQ;
