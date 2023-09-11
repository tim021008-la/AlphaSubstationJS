class SrtParser {
    constructor(srtText) {
      this.srtText = srtText;
    }
  
    parse() {
      const subtitles = [];
      
      // Split the SRT text into subtitle blocks
      const subtitleBlocks = this.srtText.trim().split(/\n\s*\n/);
  
      // Regular expression to match the SRT format
      const srtPattern = /^(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]*?)(?=\n\s*\d+\s*\n|$)/g;
      
      for (const block of subtitleBlocks) {
        const match = srtPattern.exec(block);
        if (match) {
          const id = match[1];
          const startTime = match[2];
          const endTime = match[3];
          const text = match[4].trim();
          
          subtitles.push({
            id,
            startTime,
            endTime,
            text,
          });
        }
      }
  
      return subtitles;
    }
  }
  
  export default SrtParser;
  