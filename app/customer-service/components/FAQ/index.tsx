import { getMessageCommonProblems } from '@/api/platform';
import Accordion from '@/app/customer-service/components/FAQ/Accordion';
import HelpSection from '@/app/customer-service/components/FAQ/HelpSection';
import styles from '@/app/customer-service/components/FAQ/index.module.scss';

const FAQ = async () => {
  const faq = await getMessageCommonProblems();

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <HelpSection>
          <ul>
            {faq &&
              !('message' in faq) &&
              faq.length > 0 &&
              faq.map((question, index) => (
                <li key={index}>
                  <Accordion />
                </li>
              ))}
          </ul>
        </HelpSection>
      </div>
    </section>
  );
};

export default FAQ;
