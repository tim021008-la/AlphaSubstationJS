import { expect } from 'chai';
import SrtParser from '../src/srtParser';

describe('SrtParser', () => {
  it('should parse SRT subtitles', () => {
    const srtText = `1
00:00:02,000 --> 00:00:06,000
Subtitle 1.1
Subtitle 1.2

2
00:00:28,967 --> 01:30:30,958
Subtitle 2.1
Subtitle 2.2
`;

    const parser = new SrtParser(srtText);
    const parsedSubtitles = parser.parse();

    expect(parsedSubtitles).to.have.lengthOf(2);
    expect(parsedSubtitles[0]).to.deep.equal({
      id: '1',
      startTime: '00:00:02,000',
      endTime: '00:00:06,000',
      text: 'Subtitle 1.1\nSubtitle 1.2',
    });
    expect(parsedSubtitles[1]).to.deep.equal({
      id: '2',
      startTime: '00:00:28,967',
      endTime: '01:30:30,958',
      text: 'Subtitle 2.1\nSubtitle 2.2',
    });
  });

  // Add more test cases for different SRT file structures here
});
