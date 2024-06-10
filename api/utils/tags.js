export const generateTags = (content) => {
    return content.split(/\s+/).filter(word => word.startsWith('#'));
}