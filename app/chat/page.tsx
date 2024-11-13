"use client"

import React, { useEffect, useState } from 'react'
import { TextApi } from '../api/textApi';
import styles from "./page.module.css";


export default function ChatPage() {
    const [spans, setSpans] = useState<string[][]>([]);
    const [dictionary, setDictionary] = useState<any>({});
    
    useEffect(() => {
        TextApi.generate('Italian', 'A2', 'Story')
        .then(res => {
            console.log(res);
            const spans: string[][] = [];
            const { message, data } = res;
            if (data) setDictionary(data);
            const lines = message.split('\\');
            lines.forEach((line: string) => {
                spans.push(line.split(' '));
            });
            setSpans(spans);
        });
    }, []);


    return (
        <div className={styles.container}>
            {spans.map(lineSpan => (
                <p key={lineSpan.join('-')} className={styles.paragraph}>{lineSpan.map((span, i) => {
                    let classes = styles.spansegment;
                    if (dictionary[span]) {
                        classes = `${classes} ${styles.spansegmentAvailable}`
                    }
                    return <span key={`${span}-${i}`} className={classes}>{span}</span>
                })}
                </p>
            ))}
        </div>
    );
}
