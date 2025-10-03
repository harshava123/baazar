import { io } from 'socket.io-client';
import Peer from 'simple-peer';

class WebRTCViewer {
  constructor() {
    this.socket = null;
    this.peer = null;
    this.streamId = null;
    this.streamerId = null;
    this.isConnected = false;
    this.onStreamCallback = null;
    this.onDisconnectCallback = null;
    this.onViewerCountCallback = null;
    this.onErrorCallback = null;
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      const serverUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';
      console.log(`🔌 Connecting to WebRTC server: ${serverUrl}`);
      
      this.socket = io(serverUrl, {
        transports: ['websocket'],
        withCredentials: true,
        timeout: 10000,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('✅ WebRTC Viewer connected to server');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ WebRTC Viewer connection error:', error);
        console.error('Make sure the backend server is running and accessible');
        reject(error);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('🔌 WebRTC Viewer disconnected:', reason);
      });

      this.socket.on('webrtc-stream-joined', (data) => {
        console.log('✅ Joined WebRTC stream:', data);
        this.streamId = data.streamId;
        this.streamerId = data.streamerId;
        this.isConnected = true;
      });

      this.socket.on('stream-not-found', (data) => {
        console.error('❌ Stream not found:', data.streamId);
        if (this.onErrorCallback) {
          this.onErrorCallback('Stream not found or not live');
        }
      });

      this.socket.on('webrtc-offer', async (data) => {
        const { offer, fromId, streamId } = data;
        console.log(`📡 Received WebRTC offer from streamer: ${fromId} for stream: ${streamId}`);
        
        if (this.streamId !== streamId) {
          console.warn(`Received offer for different stream (${streamId}), current stream: ${this.streamId}, ignoring`);
          return;
        }

        console.log('🔗 Creating peer connection to receive stream...');

        // Create peer connection
        this.peer = new Peer({
          initiator: false,
          trickle: false
        });

        this.peer.on('signal', (answer) => {
          console.log('📤 Sending WebRTC answer to streamer...');
          this.socket.emit('webrtc-answer', {
            streamId: this.streamId,
            answer: answer,
            targetId: fromId
          });
        });

        this.peer.on('stream', (stream) => {
          console.log('🎥 Received remote stream from streamer! Stream tracks:', stream.getTracks().length);
          if (this.onStreamCallback) {
            this.onStreamCallback(stream);
          }
        });

        this.peer.on('connect', () => {
          console.log('✅ Peer connected to streamer!');
          this.isConnected = true;
        });

        this.peer.on('close', () => {
          console.log('🔌 Peer disconnected from streamer!');
          this.isConnected = false;
          if (this.onDisconnectCallback) {
            this.onDisconnectCallback();
          }
        });

        this.peer.on('error', (err) => {
          console.error('❌ Peer error:', err);
          this.isConnected = false;
          if (this.onErrorCallback) {
            this.onErrorCallback(err.message);
          }
        });

        console.log('🔄 Processing WebRTC offer...');
        this.peer.signal(offer);
      });

      this.socket.on('webrtc-answer', (data) => {
        const { answer } = data;
        if (this.peer) {
          this.peer.signal(answer);
        }
      });

      this.socket.on('webrtc-ice-candidate', (data) => {
        const { candidate } = data;
        if (this.peer) {
          this.peer.signal(candidate);
        }
      });

      this.socket.on('webrtc-stream-ended', (data) => {
        console.log(`🛑 WebRTC stream ended: ${data.streamId}`);
        this.isConnected = false;
        if (this.peer) {
          this.peer.destroy();
          this.peer = null;
        }
        if (this.onDisconnectCallback) {
          this.onDisconnectCallback();
        }
      });

      this.socket.on('disconnect', () => {
        console.log('🔌 WebRTC Viewer disconnected from server');
        this.isConnected = false;
        if (this.peer) {
          this.peer.destroy();
          this.peer = null;
        }
      });
    });
  }

  async joinStream(streamId) {
    try {
      console.log(`👁️ Joining WebRTC stream: ${streamId}`);
      
      if (!this.socket || !this.socket.connected) {
        throw new Error('WebRTC viewer not connected to server');
      }
      
      this.streamId = streamId;
      this.socket.emit('join-webrtc-stream', { streamId: streamId });
      
      console.log(`📡 Join request sent for stream: ${streamId}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Error joining WebRTC stream:', error);
      return { success: false, error: error.message };
    }
  }

  async leaveStream() {
    if (this.streamId) {
      console.log(`👋 Leaving WebRTC stream: ${this.streamId}`);
      
      this.socket.emit('leave-webrtc-stream', { streamId: this.streamId });
      
      if (this.peer) {
        this.peer.destroy();
        this.peer = null;
      }
      
      this.streamId = null;
      this.streamerId = null;
      this.isConnected = false;
    }
  }

  isStreamConnected() {
    return this.isConnected;
  }

  getStreamId() {
    return this.streamId;
  }

  // Event handlers
  setOnStream(callback) {
    this.onStreamCallback = callback;
  }

  setOnDisconnect(callback) {
    this.onDisconnectCallback = callback;
  }

  setOnViewerCount(callback) {
    this.onViewerCountCallback = callback;
  }

  setOnError(callback) {
    this.onErrorCallback = callback;
  }

  disconnect() {
    this.leaveStream();
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default WebRTCViewer;