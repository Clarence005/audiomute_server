const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const muteAudioRoute = require('./routes/muteAudioRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/hls', express.static(path.join(__dirname, 'output')));
app.use('/muted', express.static(path.join(__dirname, 'muted')));


app.use('/mute-audio', muteAudioRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
