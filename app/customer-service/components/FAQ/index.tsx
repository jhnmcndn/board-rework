import HelpSection from '@/app/customer-service/components/FAQ/HelpSection';
import styles from '@/app/customer-service/components/FAQ/index.module.scss';
import AccordionList from './AccordionList';

const FAQ = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <HelpSection>
          <AccordionList />
        </HelpSection>
      </div>
    </section>
  );
};

export default FAQ;
