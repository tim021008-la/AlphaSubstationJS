import { expect } from 'chai';
import AssParser from '../src/assParser';

describe('AssParser', () => {

  let parser;
  beforeEach(() => {
    parser = new AssParser(exampleAssText);
  });
  
  describe('constructor', () => {

    it('sets the assText property', () => {
      expect(parser.assText).to.equal(exampleAssText);
    });

  });

  describe('parse', () => {

    it('parses ASS text into sections', () => {
      const parsed = parser.parse();
      expect(parsed.sections).to.have.length(3);
      expect(parsed.sections[0].section).to.equal('Script Info');
      // etc
    });

    it('parses section bodies into key-value pairs', () => {
      const parsed = parser.parse();
      const scriptInfo = parsed.sections[0];
      expect(scriptInfo.body[0]).to.deep.equal({
        key: 'Title',
        value: 'Example Subtitles'
      });
      // etc
    });

    it('handles comments', () => {
      // test comment parsing
    });

    it('ignores lines outside sections', () => {
      // test skipping non-section lines
    });

  });

  describe('getEvents', () => {

    it('returns the events section body', () => {
      const parsed = parser.parse();
      const events = parser.getEvents(parsed);
      expect(events).to.equal(parsed.sections[2].body);
    });

  });

  describe('getStyle', () => {

    it('returns the style section body', () => {
      // test
    });

  });

  describe('getFormat', () => {
    
    it('returns the format section body', () => {
      // test 
    });

  });

});

const exampleAssText = `
[Script Info]
Title: Example Subtitles  
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,Hello world
`;
