import React from 'react'
import Link from 'next/link';
import { ComponentProps } from '~/components/types/componentProps';
import styles from '../button/button.module.css';

interface Props extends ComponentProps{
    href: string;
    children: any;
}

/**
 *  Next.js link component that appears as a button. 
 */
export function LinkButton({ children, href, id }: Props) {
  return (
    <Link id={id} className={styles.button} href={href}>{children}</Link>
  );
}
