import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './index.module.scss';

const TableBody: FC<Readonly<{ content: any[]; headerLength: number }>> = ({ content, headerLength }) => {
  return (
    <div className={styles.body}>
      {content.map((data, index) => (
        <div
          className={styles.row}
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${headerLength}, 1fr)`,
          }}
        >
          {Object.keys(data).map((d, idx) => (
            <div className={styles.item} key={idx}>
              <span>{data[d]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Table: FC<
  Readonly<{
    headers: string[];
    content: any[];
    withHeader?: boolean;
    withPullToRefresh?: {
      isPullable: boolean;
      onRefresh: () => Promise<any>;
    };
  }>
> = ({ headers, content, withHeader, withPullToRefresh }) => {
  return (
    <div className={styles.table}>
      {withHeader && (
        <div
          className={styles.header}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          }}
        >
          {headers.map((header, index) => (
            <div key={index}>
              <span>{header}</span>
            </div>
          ))}
        </div>
      )}
      {withPullToRefresh ? (
        <PullToRefresh isPullable={withPullToRefresh.isPullable} onRefresh={withPullToRefresh.onRefresh}>
          <TableBody content={content} headerLength={headers.length} />
        </PullToRefresh>
      ) : (
        <TableBody content={content} headerLength={headers.length} />
      )}
    </div>
  );
};

export default Table;
