'use client';

import Accordion from '@/components/Accordion';
import { useCSStore } from '@/components/Providers/CSStoreProvider';
import useImages from '@/hooks/useImages';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

const AccordionList = () => {
  const { images } = useImages();
  const { msgCommonProblems, fetchMsgCommonProblems } = useCSStore((state) => state);

  useEffect(() => {
    fetchMsgCommonProblems();
  }, []);

  return (
    <ul>
      {msgCommonProblems.length > 0 &&
        !('message' in msgCommonProblems) &&
        msgCommonProblems.length > 0 &&
        msgCommonProblems.map((question, index) => (
          <li key={index}>
            <Accordion
              title={question.title || ''}
              content={ReactHtmlParser(question.content || '')}
              dropdownImg={images.arrowDown}
              delay={index}
            />
          </li>
        ))}
    </ul>
  );
};

export default AccordionList;
