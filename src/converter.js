class SrtToAssConverter {
    constructor(srtSubtitle) {
        this.srtSubtitle = srtSubtitle;
    }

    convert() {
        const assLines = [];

        for (const subtitle of this.srtSubtitle) {
            // Format the start and end times in ASS format
            const startTime = this.formatTime(subtitle.startTime);
            const endTime = this.formatTime(subtitle.endTime);

            // Create the ASS dialogue line
            const dialogueLine = `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${subtitle.text}`;
            assLines.push(dialogueLine);
        }

        // Combine the lines into an ASS script
        const assText = `[Script Info]
Title: Converted ASS Subtitles
ScriptType: v4.00+
WrapStyle: 0

[V4 Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,Strikeout,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
${assLines.join('\n')}
`;

        return assText;
    }

    // Helper method to format time from SRT to ASS format (HH:mm:ss.cc)
    formatTime(srtTime) {
        const [hhmmss, cc] = srtTime.split(',');
        const [hh, mm, ss] = hhmmss.split(':');
        return `${hh}:${mm}:${ss}.${cc}`;
    }
}

class AssToSrtConverter {
    constructor(assSubtitle) {
        this.assSubtitle = assSubtitle;
    }

    convert() {
        const srtLines = [];
        let id = 0;
        for (const dialogue of this.assSubtitle) {
            // Parse the start and end times from ASS format to SRT format
            const startTime = this.formatTime(dialogue.value.split(',')[1]);
            const endTime = this.formatTime(dialogue.value.split(',')[2]);

            if (!startTime || !endTime) {
                console.error(`Error parsing time: ${dialogue.value.split(',')[1]} or ${dialogue.value.split(',')[2]}`);
                continue; // Skip this subtitle if there's an error with the time format
            }

            // Create the SRT subtitle block
            const srtBlock = `${id}\n${startTime} --> ${endTime}\n${dialogue.value.split(',')[9]}\n`;
            id++;
            srtLines.push(srtBlock);
        }

        // Combine the lines into an SRT script
        const srtText = srtLines.join('\n');
        return srtText;
    }

    // Helper method to format time from ASS to SRT format (HH:mm:ss,ccc)
    formatTime(assTime) {
        if (!assTime) {
            return null;
        }
        const [hh, mm, sscc] = assTime.split(':');
        if (!hh || !mm || !sscc) {
            return null;
        }
        const ss = sscc.split('.')[0];
        const cc = sscc.split('.')[1];
        if (!ss || !cc) {
            return null;
        }
        return `${hh}:${mm}:${ss},${cc}`;
    }
}

export { SrtToAssConverter, AssToSrtConverter };
