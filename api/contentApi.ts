import axios from "axios"
import { Language } from "~/lib/types/enums/Language";
import { LanguageLevel } from "~/lib/types/enums/LanguageLevel";

/**
 * Code to reach out to the /content api.
 */
export const ContentApi = (() => {
    const baseUri = 'http://localhost:5000';
    
    const get = async (id: string) => {
        return await axios.get(`${baseUri}/content/${id}`).then(res => res.data);
    }
    
    const generate = async (language: Language, level: LanguageLevel, topic: string) => {
        return await axios.post(`${baseUri}/content/generate`,
            {
                language,
                level,
                topic
            }
        ).then(res => res.data);
    }

    return { get, generate }
})();