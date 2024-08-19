import OtherHeader from '@/components/OtherHeader';

const RechargeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: '100%' }}>
      <OtherHeader showPurse />
      {children}
    </div>
  );
};

export default RechargeLayout;
