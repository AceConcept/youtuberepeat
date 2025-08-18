import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Hybrid approach: Refs for instant API access + State for UI updates
  const playerRef = useRef(null);                    // Direct API access (like this.player)
  const timeUpdateInterval = useRef(null);
  
  // State for UI updates and component re-renders
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(10);
  const [isLooping, setIsLooping] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notification, setNotification] = useState(null);

  // Refs for DOM elements
  const videoUrlRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  // Load YouTube API immediately (like JavaScript version)
  useEffect(() => {
    console.log('Setting up YouTube API...');
    
    // Set up the callback first
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API is ready, creating player...');
      createPlayer();
    };

    // Fallback timeout in case API doesn't load
    const fallbackTimeout = setTimeout(() => {
      console.warn('YouTube API taking too long, enabling button anyway');
      setIsPlayerReady(true);
    }, 5000); // 5 second timeout

    // Load script immediately if not already loaded
    if (!window.YT && !document.querySelector('script[src*="iframe_api"]')) {
      console.log('Loading YouTube API script...');
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onload = () => {
        console.log('YouTube API script loaded');
        clearTimeout(fallbackTimeout);
      };
      script.onerror = () => {
        console.error('Failed to load YouTube API script');
        clearTimeout(fallbackTimeout);
        setIsPlayerReady(true);
      };
      document.head.appendChild(script);
    } else if (window.YT && window.YT.Player) {
      // API already loaded, create player immediately
      console.log('YouTube API already available, creating player...');
      clearTimeout(fallbackTimeout);
      createPlayer();
    } else if (window.YT) {
      console.log('YouTube API loading, waiting for Player...');
      // API is loading but Player not ready yet
      const checkReady = setInterval(() => {
        if (window.YT.Player) {
          console.log('YouTube Player now available');
          clearInterval(checkReady);
          clearTimeout(fallbackTimeout);
          createPlayer();
        }
      }, 100);
    }

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Create YouTube player
  const createPlayer = () => {
    console.log('Creating YouTube player...');
    if (window.YT && window.YT.Player) {
      try {
        const newPlayer = new window.YT.Player('player', {
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
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        
        // Instant access via ref (like this.player in JavaScript)
        playerRef.current = newPlayer;
        console.log('YouTube player created successfully');
        // Don't set ready here - wait for onPlayerReady callback
      } catch (error) {
        console.error('Error creating YouTube player:', error);
        // If player creation fails, try enabling the button anyway
        setIsPlayerReady(true);
      }
    } else {
      console.error('YouTube API not available for player creation');
    }
  };

  // Player ready event
  const onPlayerReady = (event) => {
    console.log('YouTube player is ready');
    // Update UI state to indicate player is fully ready
    setIsPlayerReady(true);
    updateDuration();
    startTimeUpdate();
  };

  // Player state change event
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      if (isLooping) {
        restartLoop();
      }
    }
  };

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Load video
  const loadVideo = () => {
    const url = videoUrlRef.current.value.trim();
    if (!url) {
      showError('Please enter a YouTube URL');
      return;
    }

    const extractedVideoId = extractVideoId(url);
    if (!extractedVideoId) {
      showError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      return;
    }

    setVideoId(extractedVideoId);
    // Check if player is fully ready and has the loadVideoById method
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(extractedVideoId);
      resetCounter();
      showSuccess('Video loaded successfully!');
    } else {
      showError('Player not ready yet. Please wait a moment and try again.');
    }
  };

  // Set loop points
  const setLoopPoints = () => {
    const start = parseFloat(startTimeRef.current.value);
    const end = parseFloat(endTimeRef.current.value);

    if (isNaN(start) || isNaN(end)) {
      showError('Please enter valid numbers for start and end times');
      return;
    }

    if (start < 0 || end < 0) {
      showError('Times cannot be negative');
      return;
    }

    if (start >= end) {
      showError('Start time must be less than end time');
      return;
    }

    setLoopStart(start);
    setLoopEnd(end);
    showSuccess(`Loop points set: ${formatTime(start)} - ${formatTime(end)}`);
  };

  // Start looping
  const startLooping = () => {
    if (loopStart >= loopEnd) {
      showError('Please set valid loop points first');
      return;
    }

    setIsLooping(true);
    
    // Start the loop - instant access via ref with safety check
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(loopStart);
      playerRef.current.playVideo();
    }
    
    showSuccess('Looping started!');
  };

  // Stop looping
  const stopLooping = () => {
    setIsLooping(false);
    // Instant access via ref with safety check
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }
    showSuccess('Looping stopped');
  };

  // Restart loop
  const restartLoop = () => {
    if (isLooping) {
      setLoopCount(prev => prev + 1);
      // Instant access via ref with safety check
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(loopStart);
        playerRef.current.playVideo();
      }
    }
  };

  // Reset counter
  const resetCounter = () => {
    setLoopCount(0);
    showSuccess('Counter reset');
  };

  // Start time update monitoring
  const startTimeUpdate = () => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
    }
    
    timeUpdateInterval.current = setInterval(() => {
      // Use ref for instant access with safety check
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const current = playerRef.current.getCurrentTime();
        setCurrentTime(current);
        
        // Check if we need to loop
        if (isLooping && current >= loopEnd) {
          restartLoop();
        }
      }
    }, 100);
  };

  // Update duration
  const updateDuration = () => {
    // Use ref for instant access with safety check
    if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
      const videoDuration = playerRef.current.getDuration();
      setDuration(videoDuration);
      
      // Set default end time if not already set
      if (endTimeRef.current && endTimeRef.current.value === '10') {
        endTimeRef.current.value = Math.min(10, videoDuration);
        setLoopEnd(Math.min(10, videoDuration));
      }
    }
  };

  // Format time helper
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Notification functions
  const showSuccess = (message) => {
    showNotification(message, 'success');
  };

  const showError = (message) => {
    showNotification(message, 'error');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space bar to toggle play/pause
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        // Use ref for instant access with safety check
        if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
          const state = playerRef.current.getPlayerState();
          if (state === window.YT.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
          } else {
            playerRef.current.playVideo();
          }
        }
      }
      
      // L key to toggle looping
      if (e.code === 'KeyL' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (isLooping) {
          stopLooping();
        } else {
          startLooping();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLooping, loopStart, loopEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>YouTube Video Looper</title>
        <meta name="description" content="Loop any section of a YouTube video with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1>🎬 YouTube Video Looper</h1>
          <p>Loop any section of a YouTube video with ease</p>
        </header>

        <div className={styles.mainContent}>
          {/* URL Input Section */}
          <div className={styles.inputSection}>
            <div className={styles.urlInputGroup}>
              <label htmlFor="videoUrl">YouTube Video URL:</label>
              <div className={styles.urlInputContainer}>
                <input 
                  type="url" 
                  id="videoUrl" 
                  ref={videoUrlRef}
                  placeholder="https://www.youtube.com/watch?v=..." 
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      loadVideo();
                    }
                  }}
                />
                <button 
                  onClick={loadVideo}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={!isPlayerReady}
                >
                  {isPlayerReady ? 'Load Video' : 'Loading Player...'}
                </button>
              </div>
            </div>
          </div>

          {/* Video Player Section */}
          <div className={styles.videoSection} style={{ display: videoId ? 'block' : 'none' }}>
            <div className={styles.videoContainer}>
              <div id="player"></div>
            </div>

            {/* Loop Controls */}
            <div className={styles.loopControls}>
              <div className={styles.loopSettings}>
                <h3>Loop Settings</h3>
                <div className={styles.timeInputs}>
                  <div className={styles.timeInputGroup}>
                    <label htmlFor="startTime">Start Time (seconds):</label>
                    <input 
                      type="number" 
                      id="startTime" 
                      ref={startTimeRef}
                      min="0" 
                      step="0.1" 
                      defaultValue="0" 
                    />
                  </div>
                  <div className={styles.timeInputGroup}>
                    <label htmlFor="endTime">End Time (seconds):</label>
                    <input 
                      type="number" 
                      id="endTime" 
                      ref={endTimeRef}
                      min="0" 
                      step="0.1" 
                      defaultValue="10" 
                    />
                  </div>
                </div>
                <div className={styles.loopActions}>
                  <button 
                    onClick={setLoopPoints}
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    disabled={isLooping}
                  >
                    Set Loop Points
                  </button>
                  <button 
                    onClick={startLooping}
                    className={`${styles.btn} ${styles.btnSuccess}`}
                    disabled={isLooping}
                  >
                    Start Looping
                  </button>
                  <button 
                    onClick={stopLooping}
                    className={`${styles.btn} ${styles.btnDanger}`}
                    disabled={!isLooping}
                  >
                    Stop Looping
                  </button>
                </div>
              </div>

              {/* Loop Counter */}
              <div className={styles.loopCounter}>
                <h3>Loop Counter</h3>
                <div className={styles.counterDisplay}>
                  <span className={styles.loopCount}>{loopCount}</span>
                  <span className={styles.counterLabel}>repetitions</span>
                </div>
                <button 
                  onClick={resetCounter}
                  className={`${styles.btn} ${styles.btnOutline}`}
                >
                  Reset Counter
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className={styles.videoInfo}>
              <div className={styles.currentTimeDisplay}>
                <span>Current Time: </span>
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className={styles.durationDisplay}>
                <span>Duration: </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className={styles.instructions}>
            <h3>How to use:</h3>
            <ol>
              <li>Paste a YouTube video URL and click "Load Video"</li>
              <li>Set your desired start and end times for the loop</li>
              <li>Click "Set Loop Points" to confirm your selection</li>
              <li>Click "Start Looping" to begin the repetition</li>
              <li>Watch the counter track how many times the section has repeated</li>
            </ol>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
          </div>
        )}
      </div>
    </>
  );
}
