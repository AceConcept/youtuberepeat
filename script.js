// YouTube Video Looper Application
class YouTubeLooper {
    constructor() {
        this.player = null;
        this.videoId = null;
        this.loopStart = 0;
        this.loopEnd = 10;
        this.isLooping = false;
        this.loopCount = 0;
        this.timeUpdateInterval = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadYouTubeAPI();
    }

    initializeElements() {
        this.elements = {
            videoUrl: document.getElementById('videoUrl'),
            loadVideo: document.getElementById('loadVideo'),
            videoSection: document.getElementById('videoSection'),
            player: document.getElementById('player'),
            startTime: document.getElementById('startTime'),
            endTime: document.getElementById('endTime'),
            setLoop: document.getElementById('setLoop'),
            startLoop: document.getElementById('startLoop'),
            stopLoop: document.getElementById('stopLoop'),
            loopCount: document.getElementById('loopCount'),
            resetCounter: document.getElementById('resetCounter'),
            currentTime: document.getElementById('currentTime'),
            duration: document.getElementById('duration')
        };
    }

    bindEvents() {
        this.elements.loadVideo.addEventListener('click', () => this.loadVideo());
        this.elements.setLoop.addEventListener('click', () => this.setLoopPoints());
        this.elements.startLoop.addEventListener('click', () => this.startLooping());
        this.elements.stopLoop.addEventListener('click', () => this.stopLooping());
        this.elements.resetCounter.addEventListener('click', () => this.resetCounter());
        
        // Enter key support for URL input
        this.elements.videoUrl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadVideo();
            }
        });
    }

    loadYouTubeAPI() {
        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            this.createPlayer();
        };
    }

    createPlayer() {
        this.player = new YT.Player('player', {
            height: '400',
            width: '100%',
            videoId: '',
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    onPlayerReady(event) {
        console.log('YouTube player is ready');
        this.updateDuration();
        this.startTimeUpdate();
    }

    onPlayerStateChange(event) {
        // Handle player state changes
        if (event.data === YT.PlayerState.ENDED) {
            if (this.isLooping) {
                this.restartLoop();
            }
        }
    }

    extractVideoId(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    loadVideo() {
        const url = this.elements.videoUrl.value.trim();
        if (!url) {
            this.showError('Please enter a YouTube URL');
            return;
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
            this.showError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
            return;
        }

        this.videoId = videoId;
        this.player.loadVideoById(videoId);
        this.elements.videoSection.style.display = 'block';
        this.resetCounter();
        this.showSuccess('Video loaded successfully!');
    }

    setLoopPoints() {
        const start = parseFloat(this.elements.startTime.value);
        const end = parseFloat(this.elements.endTime.value);

        if (isNaN(start) || isNaN(end)) {
            this.showError('Please enter valid numbers for start and end times');
            return;
        }

        if (start < 0 || end < 0) {
            this.showError('Times cannot be negative');
            return;
        }

        if (start >= end) {
            this.showError('Start time must be less than end time');
            return;
        }

        this.loopStart = start;
        this.loopEnd = end;
        this.showSuccess(`Loop points set: ${this.formatTime(start)} - ${this.formatTime(end)}`);
    }

    startLooping() {
        if (this.loopStart >= this.loopEnd) {
            this.showError('Please set valid loop points first');
            return;
        }

        this.isLooping = true;
        this.elements.startLoop.disabled = true;
        this.elements.stopLoop.disabled = false;
        this.elements.setLoop.disabled = true;
        
        // Start the loop
        this.player.seekTo(this.loopStart);
        this.player.playVideo();
        
        this.showSuccess('Looping started!');
    }

    stopLooping() {
        this.isLooping = false;
        this.elements.startLoop.disabled = false;
        this.elements.stopLoop.disabled = true;
        this.elements.setLoop.disabled = false;
        this.player.pauseVideo();
        this.showSuccess('Looping stopped');
    }

    restartLoop() {
        if (this.isLooping) {
            this.loopCount++;
            this.updateLoopCounter();
            this.player.seekTo(this.loopStart);
            this.player.playVideo();
        }
    }

    updateLoopCounter() {
        this.elements.loopCount.textContent = this.loopCount;
        this.elements.loopCount.classList.add('counter-update');
        
        setTimeout(() => {
            this.elements.loopCount.classList.remove('counter-update');
        }, 300);
    }

    resetCounter() {
        this.loopCount = 0;
        this.updateLoopCounter();
        this.showSuccess('Counter reset');
    }

    startTimeUpdate() {
        this.timeUpdateInterval = setInterval(() => {
            if (this.player && this.player.getCurrentTime) {
                const currentTime = this.player.getCurrentTime();
                this.elements.currentTime.textContent = this.formatTime(currentTime);
                
                // Check if we need to loop
                if (this.isLooping && currentTime >= this.loopEnd) {
                    this.restartLoop();
                }
            }
        }, 100);
    }

    updateDuration() {
        if (this.player && this.player.getDuration) {
            const duration = this.player.getDuration();
            this.elements.duration.textContent = this.formatTime(duration);
            
            // Set default end time if not already set
            if (this.elements.endTime.value === '10') {
                this.elements.endTime.value = Math.min(10, duration);
            }
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new YouTubeLooper();
});

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space bar to toggle play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const looper = window.youTubeLooper;
        if (looper && looper.player) {
            const state = looper.player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                looper.player.pauseVideo();
            } else {
                looper.player.playVideo();
            }
        }
    }
    
    // L key to toggle looping
    if (e.code === 'KeyL' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const looper = window.youTubeLooper;
        if (looper) {
            if (looper.isLooping) {
                looper.stopLooping();
            } else {
                looper.startLooping();
            }
        }
    }
}); 