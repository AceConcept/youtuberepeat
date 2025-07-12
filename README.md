# 🎬 YouTube Video Looper

A modern web application for looping YouTube video sections with precise control and repetition tracking.

## ✨ Features

- **Load any YouTube video** by URL
- **Set precise loop start and end points** with second-level accuracy
- **Track repetition count** in real-time
- **Modern, responsive interface** that works on all devices
- **Keyboard shortcuts** for quick control (Spacebar, L key)
- **Real-time time display** showing current position and duration

## 🚀 Live Demo

[View the live application](https://youtube-video-looper.vercel.app)

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/youtube-video-looper.git
   cd youtube-video-looper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:3000`

## 📦 Deployment

### Deploy to Vercel (Recommended)

This project is configured for easy deployment to Vercel:

1. **Fork or clone this repository** to your GitHub account

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure the project:**
   - Framework Preset: `Node.js`
   - Root Directory: `./`
   - Build Command: Leave empty (or `echo "No build required"`)
   - Output Directory: Leave empty
   - Install Command: `npm install`

6. **Click "Deploy"**

Your app will be live at `https://your-project-name.vercel.app`

### Manual Deployment

If you prefer to deploy manually:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

## 🎯 How to Use

1. **Paste a YouTube video URL** and click "Load Video"
2. **Set your desired start and end times** for the loop
3. **Click "Set Loop Points"** to confirm your selection
4. **Click "Start Looping"** to begin the repetition
5. **Watch the counter** track how many times the section has repeated

## ⌨️ Keyboard Shortcuts

- **Spacebar**: Play/Pause the video
- **L key**: Toggle looping on/off
- **R key**: Reset the loop counter

## 🏗️ Project Structure

```
youtube-video-looper/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## 🔧 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Express.js** - Server framework
- **YouTube IFrame API** - Video embedding and control
- **Vercel** - Hosting and deployment

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube IFrame API for video embedding capabilities
- Vercel for seamless deployment
- The open-source community for inspiration and tools

---

**Note:** This application respects YouTube's Terms of Service and only provides looping functionality for publicly available videos. 