"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Sparkles, Gem, Gift, Users, Play, Camera, Mic } from "lucide-react";
import { FadeIn, StaggeredFadeIn } from "@/components/animations";
import { apiClient } from '@/lib/api';
import WebRTCViewer from '@/lib/webrtc-viewer';

interface WebRTCLivestreamCard {
  id: string;
  title: string;
  description?: string;
  streamerName: string;
  streamerAvatar: string;
  viewers: number;
  isLive: boolean;
  thumbnail: string;
  videoSrc: string;
  category: string;
  comments: Comment[];
  icon: "sparkles" | "gem" | "gift";
  stream_key: string;
  status: string;
  is_webrtc: boolean;
  current_viewers: number;
  vendor_profiles?: {
    business_name: string;
    profile_image: string;
    city: string;
    state: string;
  };
}

interface Comment {
  id: string;
  username: string;
  message: string;
  avatar?: string;
}

export default function LivestreamSectionWebRTC() {
  const [livestreams, setLivestreams] = useState<WebRTCLivestreamCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<WebRTCLivestreamCard | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [webrtcViewer, setWebrtcViewer] = useState<WebRTCViewer | null>(null);
  const [webrtcStream, setWebrtcStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Fetch active WebRTC streams
  const fetchActiveStreams = async () => {
    try {
      const result = await apiClient.getLivestreams();
      if (result.success) {
        const streams = result.data || [];
        
        // Transform data for the UI
        const transformedStreams: WebRTCLivestreamCard[] = streams.map((stream: any) => ({
          id: stream.id,
          title: stream.title,
          description: stream.description,
          streamerName: stream.vendor_profiles?.business_name || 'Unknown Vendor',
          streamerAvatar: stream.vendor_profiles?.profile_image || '/livestream/placeholder.png',
          viewers: stream.current_viewers || 0,
          isLive: stream.status === 'live' && stream.is_webrtc,
          thumbnail: '/livestream/placeholder.png',
          videoSrc: '', // WebRTC doesn't use static video sources
          category: 'WebRTC Live',
          comments: [],
          icon: 'sparkles' as const,
          stream_key: stream.stream_key,
          status: stream.status,
          is_webrtc: stream.is_webrtc,
          current_viewers: stream.current_viewers || 0,
          vendor_profiles: stream.vendor_profiles
        }));

        setLivestreams(transformedStreams);
      } else {
        console.error('Failed to fetch streams:', result.message);
      }
    } catch (error) {
      console.error('Error fetching streams:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize WebRTC viewer
  const initializeWebRTCViewer = async () => {
    try {
      const viewer = new WebRTCViewer();
      await viewer.initialize();
      
      // Set up event handlers
      viewer.setOnStream((stream) => {
        console.log('🎥 Received WebRTC stream!');
        setWebrtcStream(stream);
        setIsConnecting(false);
        setConnectionError(null);
      });
      
      viewer.setOnDisconnect(() => {
        console.log('🔌 WebRTC stream disconnected');
        setWebrtcStream(null);
        setIsConnecting(false);
      });
      
      viewer.setOnError((error) => {
        console.error('❌ WebRTC error:', error);
        setConnectionError(error);
        setIsConnecting(false);
      });
      
      setWebrtcViewer(viewer);
    } catch (error) {
      console.error('Failed to initialize WebRTC viewer:', error);
      setConnectionError('Failed to initialize WebRTC viewer');
    }
  };

  // Fetch streams on component mount and set up polling
  useEffect(() => {
    fetchActiveStreams();
    initializeWebRTCViewer();
    
    // Set up polling to refresh streams every 30 seconds
    const interval = setInterval(fetchActiveStreams, 30000);
    
    return () => {
      clearInterval(interval);
      if (webrtcViewer) {
        webrtcViewer.disconnect();
      }
    };
  }, []);

  // Clean up stream when switching streams or closing modal
  useEffect(() => {
    if (!showVideoModal && webrtcStream) {
      setWebrtcStream(null);
    }
  }, [showVideoModal, webrtcStream]);

  const handleStreamClick = async (stream: WebRTCLivestreamCard) => {
    if (!stream.isLive || !stream.is_webrtc) {
      console.log('Stream is not live or not WebRTC');
      return;
    }

    // Clean up any existing stream first
    if (webrtcViewer && selectedStream) {
      await webrtcViewer.leaveStream();
    }
    
    setSelectedStream(stream);
    setShowVideoModal(true);
    setIsConnecting(true);
    setConnectionError(null);
    setWebrtcStream(null); // Clear any existing stream
    
    try {
      if (webrtcViewer) {
        console.log('Attempting to join stream with ID:', stream.id);
        console.log('Stream details:', stream);
        
        // Use the database ID to join the stream
        await webrtcViewer.joinStream(stream.id);
      } else {
        console.error('WebRTC viewer not initialized');
        setConnectionError('WebRTC viewer not initialized');
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Failed to join stream:', error);
      setConnectionError('Failed to join WebRTC stream: ' + error.message);
      setIsConnecting(false);
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedStream(null);
    setWebrtcStream(null);
    setIsConnecting(false);
    setConnectionError(null);
    
    if (webrtcViewer && selectedStream) {
      webrtcViewer.leaveStream();
    }
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "sparkles": return <Sparkles className="w-4 h-4" />;
      case "gem": return <Gem className="w-4 h-4" />;
      case "gift": return <Gift className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading WebRTC streams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Live WebRTC Streams
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch live streams from vendors using WebRTC technology for real-time interaction
            </p>
          </div>
        </FadeIn>

        {/* Streams Grid */}
        {livestreams.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No Active WebRTC Streams</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no active WebRTC livestreams. Check back later or vendors can start streaming from the Vendor Admin panel.
            </p>
          </div>
        ) : (
          <StaggeredFadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {livestreams.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleStreamClick(stream)}
                >
                  {/* Stream Thumbnail */}
                  <div className="relative aspect-video bg-gray-800">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Live Badge */}
                    {stream.isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold">WebRTC LIVE</span>
                      </div>
                    )}
                    
                    {/* Viewer Count */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{stream.current_viewers}</span>
                    </div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Stream Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stream.streamerAvatar}
                          alt={stream.streamerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white">{stream.streamerName}</h3>
                          <p className="text-sm text-gray-400">{stream.vendor_profiles?.city}, {stream.vendor_profiles?.state}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        {getIconComponent(stream.icon)}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {stream.title}
                    </h4>
                    
                    {stream.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {stream.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{stream.current_viewers} watching</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          <span>WebRTC</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggeredFadeIn>
        )}

        {/* Video Modal */}
        {showVideoModal && selectedStream && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-gray-900 rounded-2xl overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                {isConnecting ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                      <p className="text-gray-400">Connecting to WebRTC stream...</p>
                      <p className="text-sm text-gray-500 mt-2">Please wait while we establish the connection</p>
                    </div>
                  </div>
                ) : connectionError ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-red-400 mb-2">Connection Error</p>
                      <p className="text-gray-400 text-sm">{connectionError}</p>
                      <button
                        onClick={closeVideoModal}
                        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : webrtcStream ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full"
                    ref={(video) => {
                      if (video && webrtcStream) {
                        console.log('🎥 Setting video srcObject:', webrtcStream);
                        
                        // Stop any current playback first
                        video.pause();
                        video.srcObject = null;
                        
                        // Set the new stream
                        video.srcObject = webrtcStream;
                        
                        // Wait a bit before playing to avoid interruption
                        setTimeout(() => {
                          if (video && video.srcObject === webrtcStream) {
                            video.play().catch(err => {
                              console.error('Video play error:', err);
                            });
                          }
                        }, 100);
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Waiting for WebRTC stream...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stream Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedStream.streamerAvatar}
                      alt={selectedStream.streamerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedStream.title}</h3>
                      <p className="text-gray-400">{selectedStream.streamerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">WebRTC Live</span>
                    </div>
                    <button
                      onClick={closeVideoModal}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                {selectedStream.description && (
                  <p className="text-gray-300 mb-4">{selectedStream.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedStream.current_viewers} viewers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span>WebRTC Technology</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                    <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                      <Sparkles className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
