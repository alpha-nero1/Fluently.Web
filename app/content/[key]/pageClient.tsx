"use client"

import React, { useEffect, useState } from 'react'
import { ContentApi } from '~/api/contentApi';
import styles from "./page.module.css";
import { AppLayout } from '~/components/core/layout/appLayout';
import { ContentType } from '~/lib/types/enums/ContentType';
import { ContentPageData } from '~/lib/types/ContentPageData';
import { SkeletonLoader } from '~/components/core/layout/skeletonLoader/skeletonLoader';
import { Button } from '~/components/core/inputs/button/button';

interface Props {
    pageData: ContentPageData;
}

export default function PageClient({ pageData }: Props) {
    const [spans, setSpans] = useState<string[][]>([]);
    const [selectedSpan, setSelectedSpan] = useState('');
    const [dictionary, setDictionary] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (pageData.type === ContentType.Generated) {
            setIsLoading(true);
            ContentApi.generate(pageData.language, pageData.level, 'Story')
                .then(res => {
                    const spans: string[][] = [];
                    const { message, data } = res;
                    if (data) setDictionary(data);
                    const lines = message.split('\\');
                    lines.forEach((line: string) => {
                        spans.push(line.split(' '));
                    });
                    setSpans(spans);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
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
        <AppLayout>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    {isLoading && <SkeletonLoader
                        cards={2}
                        spacing={2}
                        gridTemplateCols='1fr 28rem' 
                        gridTemplateRows='auto'
                    />}
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
                            <Button>Add to set</Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
