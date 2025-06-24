# YouTube Video Looper 🎬

A modern web application that allows you to easily loop any section of a YouTube video with precise control over start and end points, plus a built-in repetition counter.

## Features

- **Easy Video Loading**: Simply paste any YouTube URL and load the video
- **Precise Loop Control**: Set exact start and end times in seconds
- **Real-time Counter**: Track how many times your selected section has repeated
- **Modern UI**: Clean, responsive design that works on desktop and mobile
- **Keyboard Shortcuts**: Quick controls for play/pause and loop toggle
- **Visual Feedback**: Success/error notifications and animated counter updates

## Quick Start

### Option 1: Using npm (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Option 2: Direct file opening

1. Download all files to a local directory
2. Open `index.html` in your web browser

## How to Use

1. **Load a Video**
   - Paste a YouTube video URL in the input field
   - Click "Load Video" or press Enter
   - The video player will appear once loaded

2. **Set Loop Points**
   - Enter your desired start time (in seconds)
   - Enter your desired end time (in seconds)
   - Click "Set Loop Points" to confirm

3. **Start Looping**
   - Click "Start Looping" to begin the repetition
   - Watch the counter increase with each loop
   - Use "Stop Looping" to end the repetition

4. **Track Progress**
   - The loop counter shows how many times the section has repeated
   - Click "Reset Counter" to start counting from zero again
   - Current time and video duration are displayed in real-time

## Keyboard Shortcuts

- **Spacebar**: Toggle play/pause
- **L key**: Toggle looping on/off
- **Enter**: Load video (when URL input is focused)

## Supported URL Formats

The application supports various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **YouTube Integration**: YouTube IFrame API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Development Server**: Hot reloading with Express

## Available Scripts

- `npm run dev` - Start the development server
- `npm start` - Start the production server
- `npm run build` - Build the application (no build step required for this static app)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## File Structure

```
youtube-looper/
├── index.html      # Main HTML file
├── styles.css      # CSS styles and responsive design
├── script.js       # JavaScript functionality
├── server.js       # Express development server
├── package.json    # Node.js dependencies and scripts
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Tips for Best Experience

- Use decimal values for precise timing (e.g., 5.5 seconds)
- The application automatically validates your loop points
- The counter persists until you manually reset it
- You can change loop points while looping is active
- The video will automatically seek to your start point when looping begins

## Troubleshooting

**Video won't load?**
- Make sure you're using a valid YouTube URL
- Check your internet connection
- Try refreshing the page

**Loop not working?**
- Ensure start time is less than end time
- Make sure you've clicked "Set Loop Points" before starting
- Check that the video has loaded completely

**Counter not updating?**
- The counter only updates when a complete loop finishes
- Try resetting the counter if needed

**Server won't start?**
- Make sure you've run `npm install` first
- Check that port 3000 is available
- Try using a different port: `PORT=3001 npm run dev`

## Development

To contribute to this project:

1. Fork the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Enjoy looping your favorite YouTube videos!** 🎵 