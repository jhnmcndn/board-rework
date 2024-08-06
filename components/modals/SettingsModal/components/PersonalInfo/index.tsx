import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import Image, { StaticImageData } from 'next/image';
import styles from './index.module.scss';

const isValidSrc = (src: string | StaticImageData | undefined): src is string | StaticImageData => {
  return typeof src === 'string' || src instanceof Object;
};

const PersonalInfo: React.FC = () => {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const { images } = useImages();
  const isLoggedIn = accountInfo.id !== undefined;

  const profilePicSrc = isLoggedIn ? accountInfo.headImg : images.avatarPlaceholder;
  return (
    <>
      <div className={styles.personalInfo}>
        <div className={styles.basicInfo}>
          <span className={styles.infoTitle}>基础信息</span>
        </div>
        <div className={styles.basicDetails}>
          <div className={styles.profilePic}>
            {isValidSrc(profilePicSrc) && <Image src={profilePicSrc} alt='Avatar' width={100} height={100} />}
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.userName}>
              <Image src={require(`@/assets/${theme}/footer/settingUser.png`)} alt='user profile' />
              <span>账号:</span>
              <span className={styles.nickName}>{accountInfo.nickName || '用戶名'}</span>
            </div>

            {/* {process.env.REACT_APP_SITE === '8803' && (
              <div className={styles.idContainer}>
                <div className='wd-15'></div>
                <div className='wd-85'>
                  <span>ID:</span>
                  <span className={styles.accountId}>{accountInfo.id || '用戶名'}</span>
                </div>
              </div>
            )} */}

            <div className={styles.vipContainer}>
              <span className={styles.labelVip}> 等级: </span>
              <Image src={images.vipLevel} alt='vip level' width={50} height={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
