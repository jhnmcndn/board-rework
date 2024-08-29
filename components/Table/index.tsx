import classNames from 'classnames';
import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import NoData from '../NoData';
import styles from './index.module.scss';

export type TableProps = {
  content: any[];
  withHeader?: {
    headers: string[];
    height?: number;
  };
  withPullToRefresh?: {
    isPullable: boolean;
    onRefresh: () => Promise<any>;
  };
  withBorder?: boolean;
};

const TableBody: FC<
  Readonly<
    Pick<TableProps, 'content' | 'withBorder'> & {
      headerLength: number;
    }
  >
> = ({ content, withBorder, headerLength }) => {
  return (
    <div className={styles.body}>
      {content.map((data, index) => (
        <div
          className={classNames(styles.row, 'table-row')}
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${headerLength}, 1fr)`,
          }}
        >
          {Object.keys(data).map((d, idx) => (
            <div
              key={idx}
              className={classNames(styles.item, 'tableItem', {
                [styles.withBorder]: withBorder,
              })}
            >
              {data[d]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Table: FC<Readonly<TableProps>> = ({ content, withHeader, withPullToRefresh, withBorder }) => {
  return (
    <div className={styles.table}>
      {withHeader && (
        <div
          className={styles.header}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${withHeader.headers.length}, 1fr)`,
            ...(withHeader.height && { height: `${withHeader.height}rem` }),
          }}
        >
          {withHeader.headers.map((header, index) => (
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
          {content.length ? (
            <TableBody content={content} headerLength={withHeader?.headers.length || 0} withBorder />
          ) : (
            <NoData />
          )}
        </PullToRefresh>
      ) : content.length ? (
        <TableBody content={content} headerLength={withHeader?.headers.length || 0} withBorder />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Table;
