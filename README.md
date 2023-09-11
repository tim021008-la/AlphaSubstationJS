# SubtitleJS

![License](https://img.shields.io/badge/license-MIT-blue.svg)

SubtitleJS is an npm package that provides tools for working with SubStation Alpha (ASS) and SubRip (SRT) subtitle formats. It includes parsers to read ASS and SRT files and converters to switch between the two formats. (for now)

## Installation

To use SubtitleJS in your project, you can install it via npm:

```bash
npm install subtitlejs (currently unavailable) 
```

## Usage
### Parsing an ASS File
```javascript
const fs = require('fs');
const { AssParser } = require('subtitlejs');

// Read the ASS subtitle file
const assInputFilePath = 'path/to/your/subtitle.ass';
const assInputSubtitleText = fs.readFileSync(assInputFilePath, 'utf-8');

// Create an instance of AssParser and parse the input ASS subtitle
const assParser = new AssParser(assInputSubtitleText);
const parsedAss = assParser.parse();

// Now you can work with the parsed ASS subtitle data
console.log(parsedAss);
```

### Parsing an SRT File
```javascript

const fs = require('fs');
const { SrtParser } = require('subtitlejs');

// Read the SRT subtitle file
const srtInputFilePath = 'path/to/your/subtitle.srt';
const srtInputSubtitleText = fs.readFileSync(srtInputFilePath, 'utf-8');

// Create an instance of SrtParser and parse the input SRT subtitle
const srtParser = new SrtParser(srtInputSubtitleText);
const parsedSrt = srtParser.parse();

// Now you can work with the parsed SRT subtitle data
console.log(parsedSrt);
```

### Converting Between ASS and SRT
```javascript

const fs = require('fs');
const { SrtToAssConverter, AssToSrtConverter } = require('subtitlejs');

// Example: Convert SRT to ASS
const srtToAssConverter = new SrtToAssConverter(parsedSrt);
const assSubtitleText = srtToAssConverter.convert();
fs.writeFileSync('path/to/converted/subtitle.ass', assSubtitleText, 'utf-8');

// Example: Convert ASS to SRT
const assToSrtConverter = new AssToSrtConverter(parsedAss);
const srtSubtitleText = assToSrtConverter.convert();
fs.writeFileSync('path/to/converted/subtitle.srt', srtSubtitleText, 'utf-8');
```

## Contributing
Contributions to SubtitleJS are welcome! Feel free to open issues or pull requests on the GitHub repository.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
