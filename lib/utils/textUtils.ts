/**
 *  Capitalise the first character in a string. 
 */
export const capitaliseFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}