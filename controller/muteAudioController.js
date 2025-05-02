const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const muteAudioController = (req, res) => {
  console.log("Data received");
  const segments = req.body.segments;

  const muteFilters = segments
    .map(s => `volume=enable='between(t,${s.startTime},${s.endTime})':volume=0`)
    .join(',');

  const mutedDir = path.join(__dirname, '..', 'muted');
  const outputPath = path.join(mutedDir, 'playlist_muted.m3u8');

  if (!fs.existsSync(mutedDir)) {
    fs.mkdirSync(mutedDir);
  }

  ffmpeg('output/output.m3u8')
    .audioFilters(muteFilters)
    .outputOptions([
      '-c:a aac',
      '-b:a 128k',
      '-hls_time 10',
      '-hls_playlist_type vod',
      `-hls_segment_filename ${mutedDir}/muted_%03d.ts`
    ])
    .output(outputPath)
    .on('end', () => {
      res.json({ mutedUrl: 'muted/playlist_muted.m3u8' });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).send('FFmpeg failed');
    })
    .run();
};

module.exports = { muteAudioController };
