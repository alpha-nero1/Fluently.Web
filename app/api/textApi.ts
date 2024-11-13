import axios from "axios"

export const TextApi = (() => {
    const generate = async (language: string, level: string, topic: string) => {
        return await axios.post('http://localhost:5000/text/generate',
            {
                language,
                level,
                topic
            }
        ).then(res => res.data);
    }

    return { generate }
})()