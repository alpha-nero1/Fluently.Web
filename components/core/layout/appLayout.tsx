"use client"

import React from 'react'
import styles from '~/app/page.module.css';
import { Button } from '../inputs/button/button';
import { Dropdown } from '../inputs/dropdown/dropdown';
import { Language } from '~/lib/types/enums/Language';
import { HorizontalSpacer } from './spacer';
import Link from 'next/link';

interface Props {
    children: any;
}

/**
 *  Standard fluently app layout. 
 */
export function AppLayout({ children }: Props) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/">
                    <h1>Fluently</h1>
                </Link>
                <div className={styles.row}>
                    <Dropdown<Language> 
                        placeholder='I want to learn'
                        display={(opt) => opt.toString()}
                        options={Object.keys(Language) as Language[]}
                        onSelect={(opt) => { console.log('aa you chose', opt)}}
                    />
                    <HorizontalSpacer spacing={1} />
                    <Button>Generate</Button>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>Copyright 2024 - {new Date().getFullYear()}</p>
                <p>|</p>
                <p>Follow us on socials</p>
            </footer>
        </div>
    );
}
