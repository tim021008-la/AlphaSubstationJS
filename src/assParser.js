import {AssDocument, AssInfo, AssStyle, AssDialogue} from './parsable.js';


/**
 * Class for parsing ASS subtitle files
 */
class AssParser {

    /**
     * Constructor
     * @param {string} assText - The text content of the ASS file
     */
    constructor(assText) {
        this.assText = assText;
    }


    /**
     * Get the events section from the parsed ASS data
     * @param {Object} parsedAss - The parsed ASS data
     * @returns {Array} The events section body
     */
    getEvents(parsedAss) {
        const events = [];
        const temp = parsedAss[2].body.slice(1)
        for (let index = 0; index < temp.length; index++) {
            events[index] = new AssDialogue(temp[index].value);

        }
        return events;
    }

    /**
     * Get the style section from the parsed ASS data
     * @param {Object} parsedAss - The parsed ASS data 
     * @returns {Array} The style section body
     */
    getStyles(parsedAss) {
        return parsedAss[1].body.slice(1);
    }

    /**
     * Get the format section from the parsed ASS data
     * @param {Object} parsedAss - The parsed ASS data
     * @returns {Array} The format section body 
     */
    getFormat(parsedAss) {
        return parsedAss[0].body;
    }

    /**
     * Parse the ASS text into sections
     * @returns {Object} The parsed ASS data
     */
    parse() {
        const parsedAss = {
            sections: [],
        };

        let currentSection = null;

        // Split the ASS text into lines
        const lines = this.assText.split('\n');

        for (const line of lines) {
            // Trim leading and trailing whitespace
            const trimmedLine = line.trim();

            // Check if the line is a section header
            const sectionMatch = trimmedLine.match(/^\[(.+)\]$/);
            if (sectionMatch) {
                const sectionName = sectionMatch[1];
                currentSection = {
                    section: sectionName,
                    body: [],
                };
                parsedAss.sections.push(currentSection);
                continue;
            }

            if (!currentSection) {
                // Skip lines outside of sections
                continue;
            }

            // Check if the line is a key-value pair
            const keyValueMatch = trimmedLine.match(/^([^:]+):\s*(.*)$/);
            if (keyValueMatch) {
                const key = keyValueMatch[1];
                const value = keyValueMatch[2];
                currentSection.body.push({
                    key,
                    value,
                });
            } else if (trimmedLine.startsWith(';')) {
                // Handle comments
                currentSection.body.push({
                    type: 'comment',
                    value: trimmedLine.substring(1).trim(),
                });
            }
        }

        /*const infoTag = parsedAss.sections[0].section;
        const info;
        const styleTag;
        const styleFormat;
        const style;
        const dialogueTag;
        const dialogueFormat;
        const dialogue;*/



        //const document = new AssDocument()

        return parsedAss.sections;
    }
}


export default AssParser;
