import { customerService as customerServiceApi, getMessageCommonProblems, init as initApi } from '@/api/platform';
import OtherHeader from '@/components/OtherHeader';
import { Fragment } from 'react';
import MainContent from './components/MainContent';

const CustomerService = async () => {
  const init = await initApi();
  const customerService = await customerServiceApi();
  const messageCommonProblems = await getMessageCommonProblems();
  return (
    <Fragment>
      <OtherHeader headerTitle='客户服务' />
      <MainContent init={init} customerService={customerService} messageCommonProblems={messageCommonProblems} />
    </Fragment>
  );
};

export default CustomerService;
