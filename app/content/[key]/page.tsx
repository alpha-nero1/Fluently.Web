import React from 'react';
import { getContentPageData } from '~/lib/navigation/slugKeyStrategies';
import { PageStaticProps } from '~/lib/types/PageStaticProps';
import PageClient from './pageClient';

export default async function Content({ params }: PageStaticProps<{ key: string }>) {
    const paramss = await params;
    const pageData = getContentPageData(paramss.key);
    
    return <PageClient pageData={{...pageData}} />;
}
