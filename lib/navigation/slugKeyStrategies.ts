import { ContentPageData } from "../types/ContentPageData";
import { ContentType } from "../types/enums/ContentType";
import { Language } from "../types/enums/Language";
import { LanguageLevel } from "../types/enums/LanguageLevel";
import { capitaliseFirst } from "../utils/textUtils";

const languageExtractor = (data: ContentPageData, segment: string) => {
    const language = capitaliseFirst(segment) as Language; // "Italian" instead of "italian"
    if (!Language[language]) {
        throw new Error('Invalid content key strategy for language');
    }
    data.language = language;
}

const languageLevelExtractor = (data: ContentPageData, segment: string) => {
    const languageLevel = segment.toUpperCase() as LanguageLevel; // "A1" instead of "a1"
    if (!LanguageLevel[languageLevel]) {
        throw new Error('Invalid content key strategy for language level');
    }
    data.level = languageLevel;
}

/**
 * Get page data for content page.
 */
export const getContentPageData = (key: string): ContentPageData => {
    if (!key) {
        throw new Error('Key missing for page data');
    }
    const pageData = new ContentPageData();
    const split = key.split('-');

    if (split.length < 1) {
        throw new Error('Invalid content key strategy, not enough segments');
    }

    // content/generated-italian-a1-la-storia-epica-awfawaw22131232
    if (split[0] === ContentType.Generated.toLowerCase() && split.length > 3) {
        pageData.type = ContentType.Generated;
        languageExtractor(pageData, split[1]);
        languageLevelExtractor(pageData, split[2]);
        // Get remaining data
        const remaining = split.slice(3);
        remaining.forEach((slice, i) => {
            if (i === remaining.length - 1) {
                pageData.id = slice;
                return;
            }
            pageData.title += ` ${slice}`;
        });

        return pageData;
    }

    // content/original-italian-la-storia-epica-awfawaw22131232
    if (split[0] === ContentType.Original.toLocaleLowerCase()) {
        pageData.type = ContentType.Original;
        languageExtractor(pageData, split[1]);
        // Get remaining data
        const remaining = split.slice(2);
        remaining.forEach((slice, i) => {
            if (i === remaining.length - 1) {
                pageData.id = slice;
                return;
            }
            pageData.title += ` ${slice}`;
        });

        return pageData;
    }

    throw new Error('Invalid content key strategy');
}
