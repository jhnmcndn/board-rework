'use client';

import Accordion from '@/components/Accordion';
import useImages from '@/hooks/useImages';
import { ErrorData, MessageCommonProblems } from '@/types/app';
import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';

export type AccordionListComponentProps = {
  faq: ErrorData | MessageCommonProblems[] | undefined;
};

export type AccordionListComponent = FC<Readonly<AccordionListComponentProps>>;

const AccordionList: AccordionListComponent = ({ faq }) => {
  const { images } = useImages();

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
              dropdownImg={images.arrow_down}
              delay={index}
            />
          </li>
        ))}
    </ul>
  );
};

export default AccordionList;
