"use client"

import React, { useEffect, useState } from 'react'
import { TextApi } from '../api/textApi';
import styles from "./page.module.css";


export default function ChatPage() {
    const [spans, setSpans] = useState<string[][]>([]);
    const [selectedSpan, setSelectedSpan] = useState('');
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

    const toggleSelectedSpan = (key: string) => {
        if (selectedSpan === key) {
            setSelectedSpan('');
            return;
        }
        const span = key.split('|')[0];
        if (!dictionary[span]) return;
        setSelectedSpan(key);
    }

    const getRightContentClassnames = () => {
        const classnames = styles.rightContent;
        if (selectedSpan) {
            return classnames + ' ' + styles.show;
        }
        return classnames;
    }

    const spanData = React.useMemo(() => {
        const span = selectedSpan.split('|')[0];
        const data = dictionary[span];
        if (!data) return null;
        const word = data.particle ?
            `${data.particle} ${span}`
            : span;
        return {
            ...data,
            word
        }
    }, [selectedSpan]);

    return (
        <div className={styles.container}>
            <div className={styles.leftContent}>
                {spans.map((lineSpan, i) => (
                    <p key={lineSpan.join('-')} className={styles.paragraph}>{lineSpan.map((span, j) => {
                        let classes = styles.spansegment;
                        if (dictionary[span]) {
                            classes = `${classes} ${styles.spansegmentAvailable}`
                        }
                        const spanKey = `${span}|${i}|${j}`
                        if (spanKey === selectedSpan) {
                            classes = `${classes} ${styles.spansegmentSelected}`
                        }
                        return <span key={spanKey} className={classes} onClick={() => toggleSelectedSpan(spanKey)}>{span}</span>
                    })}
                    </p>
                ))}
            </div>
            <div className={getRightContentClassnames()}>
                {spanData && (
                    <div className={styles.explanation}>
                        <p className={styles.explanationWord}>{spanData.word}</p>
                        <p className={styles.explanationMeaning}>{spanData.meaning}</p>
                        <button className={styles.saveButton}>Add to set</button>
                    </div>
                )}
            </div>
        </div>
    );
}
