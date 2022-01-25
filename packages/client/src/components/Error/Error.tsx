import styles from './Error.module.scss';
import { memo } from 'react';

interface ErrorProps {
    readonly message: string;
}

const Error = memo(({ message }: ErrorProps) => {
    return <div className={styles.error}>{message}</div>;
});

export { Error };
