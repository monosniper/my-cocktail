import React from 'react';
import Image from "next/image";
import styles from '../styles/components/Logo.module.scss'
import Link from "next/link";

const Logo = () => {
    return (
        <Link href={'/'}>
            <div className={styles.logo}>
                <Image
                    src={'/assets/img/logo.png'}
                    width={90}
                    height={90}
                    alt={'My Cocktail'}
                />
                <span>My Cocktail</span>
            </div>
        </Link>
    );
};

export default Logo;