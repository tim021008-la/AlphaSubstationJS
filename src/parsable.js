class AssDialogue {
    constructor(line) {

        const parts = line.split(',');
        if (parts.length >= 10) {
            this.Index = parts[0].split(':').length > 1 ? parts[0].split(':')[1].trim() : parts[0].trim();
            this.Start = parts[1].trim();
            this.End = parts[2].trim();
            this.Style = parts[3].trim();
            this.Name = parts[4].trim();
            this.MarginL = parts[5].trim();
            this.MarginR = parts[6].trim();
            this.MarginV = parts[7].trim();
            this.Effect = parts[8].trim();
            this.Text = parts.slice(9).join().trim();
        }
    }


    // Function to get the value string
    getValueString() {
        return `Dialogue: ${this.Index},${this.Start},${this.End},${this.Style},${this.Name},${this.MarginL},${this.MarginR},${this.MarginV},${this.Effect},${this.Text}`;
    }
}

class AssStyle {
    constructor(line) {
        const parts = line.split(',');
        if (parts.length >= 22) {
            this.Name = parts[0].split(':').length > 1 ? parts[0].split(':')[1].trim() : parts[0].trim();
            this.Fontname = parts[1].trim();
            this.Fontsize = parts[2].trim();
            this.PrimaryColour = parts[3].trim();
            this.SecondaryColour = parts[4].trim();
            this.OutlineColour = parts[5].trim();
            this.BackColour = parts[6].trim();
            this.Bold = parts[7].trim();
            this.Italic = parts[8].trim();
            this.Underline = parts[9].trim();
            this.Strikeout = parts[10].trim();
            this.ScaleX = parts[11].trim();
            this.ScaleY = parts[12].trim();
            this.Spacing = parts[13].trim();
            this.Angle = parts[14].trim();
            this.BorderStyle = parts[15].trim();
            this.Outline = parts[16].trim();
            this.Shadow = parts[17].trim();
            this.Alignment = parts[18].trim();
            this.MarginL = parts[19].trim();
            this.MarginR = parts[20].trim();
            this.MarginV = parts[21].trim();
            this.Encoding = parts[22].trim();
        }
    }

    // Function to get the value string
    getValueString() {
        return `Style: ${this.Name},${this.Fontname},${this.Fontsize},${this.PrimaryColour},${this.SecondaryColour},${this.OutlineColour},${this.BackColour},${this.Bold},${this.Italic},${this.Underline},${this.Strikeout},${this.ScaleX},${this.ScaleY},${this.Spacing},${this.Angle},${this.BorderStyle},${this.Outline},${this.Shadow},${this.Alignment},${this.MarginL},${this.MarginR},${this.MarginV},${this.Encoding}`;
    }
}

class AssInfo {
    constructor(line) {
        this.key = line.key == undefined ? line.type : line.key;
        this.value = this.value;
    }

    getValueString() {
        return this.key == 'comment' ? `; ${this.value}` : `${this.key}: ${this.value}`;
    }
}

class AssDocument {
    constructor(infoTag, info, styleTag, styleFormat, style, dialogueTag, dialogueFormat, dialogue) {
        this.infoTag = infoTag;
        this.info = info;
        this.styleTag = styleTag;
        this.styleFormat = styleFormat;
        this.style = style;
        this.dialogueTag = dialogueTag;
        this.dialogueFormat = dialogueFormat;
        this.dialogue = dialogue;
    }
}

export {AssDocument, AssInfo, AssStyle, AssDialogue};
