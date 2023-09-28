import fs from 'fs';
import SrtParser from './srtParser.js';
import AssParser from './assParser.js';
import { SrtToAssConverter, AssToSrtConverter } from './converter.js'; // Import the converters
import { AssDialogue, AssStyle} from './parsable.js';

const dialogue = new AssDialogue("Dialogue: 0,0:00:15.52,0:00:16.88,Default,,0,0,0,,dass Faultiere nur alle, blasdad,a sd asdas!");
const style = new AssStyle("Style: Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0");

// Read the input SRT subtitle file
const srtInputFilePath = './data/subtitle.srt'; // Update with your SRT file path
const srtInputSubtitleText = fs.readFileSync(srtInputFilePath, 'utf-8');

// Create an instance of SrtParser and parse the input SRT subtitle
const srtParser = new SrtParser(srtInputSubtitleText);
const parsedSrt = srtParser.parse();

// Create an instance of SrtToAssConverter and convert SRT to ASS
const srtToAssConverter = new SrtToAssConverter(parsedSrt);
const assSubtitleText = srtToAssConverter.convert();

// Save the converted ASS subtitle to a file
const assOutputFilePath = './data/subtitle_converted.ass'; // Update with your desired output file path
fs.writeFileSync(assOutputFilePath, assSubtitleText, 'utf-8');

// Now, let's convert the ASS subtitle back to SRT

// Read the input ASS subtitle file
const assInputFilePath = './data/subtitle.ass'; // Update with your ASS file path
const assInputSubtitleText = fs.readFileSync(assInputFilePath, 'utf-8');

// Create an instance of AssParser and parse the input ASS subtitle
const assParser = new AssParser(assInputSubtitleText);
const parsedAss = assParser.parse();

// Create an instance of AssToSrtConverter and convert ASS to SRT
const assToSrtConverter = new AssToSrtConverter(assParser.getEvents(parsedAss));
const srtSubtitleText2 = assToSrtConverter.convert();

// Save the converted SRT subtitle back to a file
const srtOutputFilePath2 = './data/subtitle_reconverted.srt'; // Update with your desired output file path
fs.writeFileSync(srtOutputFilePath2, srtSubtitleText2, 'utf-8');
