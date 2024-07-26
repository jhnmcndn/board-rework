'use client';

import Accordion from '@/components/Accordion';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { ErrorData, MessageCommonProblems } from '@/types/app';
import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';

export type AccordionListComponentProps = {
  faq: ErrorData | MessageCommonProblems[] | undefined;
};

export type AccordionListComponent = FC<Readonly<AccordionListComponentProps>>;

const AccordionList: AccordionListComponent = ({ faq }) => {
  const theme = useAccountStore((state) => state.theme);

  return (
    <ul>
      {faq &&
        !('message' in faq) &&
        faq.length > 0 &&
        faq.map((question, index) => (
          <li key={index}>
            <Accordion
              title={question.title}
              content={ReactHtmlParser(question.content)}
              dropdownImg={require(`@/assets/${theme}/fragments/arrowDown.png`)}
              delay={index}
            />
          </li>
        ))}
    </ul>
  );
};

export default AccordionList;
