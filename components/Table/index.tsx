import classNames from 'classnames';
import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import NoData from '../NoData';
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
            <div key={idx} className={styles.item}>
              {data[d]}
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
    withBorder?: boolean;
  }>
> = ({ headers, content, withHeader, withPullToRefresh, withBorder }) => {
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
            <div
              key={index}
              className={classNames({
                [styles.withBorder]: withBorder,
              })}
            >
              <span>{header}</span>
            </div>
          ))}
        </div>
      )}
      {withPullToRefresh ? (
        <PullToRefresh isPullable={withPullToRefresh.isPullable} onRefresh={withPullToRefresh.onRefresh}>
          {content.length ? <TableBody content={content} headerLength={headers.length} /> : <NoData />}
        </PullToRefresh>
      ) : content.length ? (
        <TableBody content={content} headerLength={headers.length} />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Table;
