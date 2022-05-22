import React from 'react';
import styles from '../styles/components/Layout.module.scss'

const Layout = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export default Layout;