import styles from './index.module.scss';

const PerformanceInquiry = () => {
  return (
    <div className={styles.performanceInquiry}>
      <div className={styles.performanceInquiry__topSection}>
        <div className={styles.performanceInquiry__headerContent}>
          <span>我的佣金</span>
          <span>返佣金额对照表 &gt;&gt;</span>
        </div>
        <div className={styles.performanceInquiry__mainContent}>
          <div className={styles.performanceInquiry__gridInput}>
            <div className={styles.performanceInquiry__inputContainer}>
              <span>今日佣金</span>
              <input type='text' value={'0.00'} readOnly />
            </div>
            <div className={styles.performanceInquiry__inputContainer}>
              <span>昨日佣金</span>
              <input type='text' value={'0.00'} readOnly />
            </div>
            <div className={styles.performanceInquiry__inputContainer}>
              <span>历史总佣金</span>
              <input type='text' value={'0.00'} readOnly />
            </div>
            <div className={styles.performanceInquiry__inputContainer}>
              <span>可提取佣金</span>
              <input type='text' value={'0.00'} readOnly />
            </div>
          </div>
          <div className={styles.performanceInquiry__receiveCommissionBtn}>
            <button>领取佣金</button>
          </div>
        </div>
      </div>
      <div className={styles.performanceInquiry__bottomSection}>
        <div className={styles.performanceInquiry__userInfo}>
          <div className={styles.performanceInquiry__userId}>
            <div>
              <h1>M296954</h1>
              <span>我的ID</span>
            </div>
          </div>
          <div className={styles.performanceInquiry__inviterCode}>
            <div>
              <h1>1001</h1>
              <span>推荐ID</span>
            </div>
          </div>
        </div>
        <div className={styles.performanceInquiry__shareQRCode}>
          <button>分享二维码</button>
          <div className={styles.performanceInquiry__copyCode} data-text={'复制'}>
            专属分享连接: https://vfchstux.x-sv.t.zhangyuexing.com/wguchuky
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInquiry;
