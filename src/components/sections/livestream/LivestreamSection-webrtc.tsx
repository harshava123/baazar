"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Sparkles, Gem, Gift, Users, Play, Camera, Radio } from "lucide-react";
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
  product?: {
    id: string;
    name: string;
    price: number;
    discount_price?: number;
    images: string[];
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
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    username: string;
    message: string;
    timestamp: Date;
    avatar: string;
  }>>([
    {
      id: '1',
      username: 'Alex',
      message: 'Great product! How much is it?',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      avatar: 'A'
    },
    {
      id: '2',
      username: 'Sarah',
      message: 'Love the quality! Adding to cart 🛒',
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      avatar: 'S'
    },
    {
      id: '3',
      username: 'Mike',
      message: 'Do you have this in different colors?',
      timestamp: new Date(Date.now() - 30 * 1000), // 30 seconds ago
      avatar: 'M'
    }
  ]);

  // Add chat message function
  const addChatMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      username: 'You', // In a real app, this would be the logged-in user's name
      message: message,
      timestamp: new Date(),
      avatar: 'Y'
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  // Format time ago
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'now';
    if (minutes === 1) return '1m ago';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1h ago';
    return `${hours}h ago`;
  };

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
          category: 'Live Shopping stream',
          comments: [],
          icon: 'sparkles' as const,
          stream_key: stream.stream_key,
          status: stream.status,
          is_webrtc: stream.is_webrtc,
          current_viewers: stream.current_viewers || 0,
          vendor_profiles: stream.vendor_profiles,
          product: stream.product ? {
            id: stream.product.id,
            name: stream.product.name,
            price: stream.product.price,
            discount_price: stream.product.discount_price,
            images: stream.product.images || []
          } : null
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
      viewer.setOnStream((stream: any) => {
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
      
      viewer.setOnError((error: any) => {
        console.error('❌ WebRTC error:', error);
        setConnectionError(error);
        setIsConnecting(false);
      });
      
      setWebrtcViewer(viewer);
    } catch (error) {
      console.error('Failed to initialize WebRTC viewer:', error as any);
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
      setConnectionError('Failed to join WebRTC stream: ' + (error as any).message);
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
          <p className="text-gray-400">Loading Live Shopping streams...</p>
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
              Live Shopping Streams
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch live shopping streams from vendors for real-time interaction and product discovery
            </p>
          </div>
        </FadeIn>

        {/* Streams Grid */}
        {livestreams.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No Active Live Shopping Streams</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no active Live Shopping livestreams. Check back later or vendors can start streaming from the Vendor Admin panel.
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
                      src={stream.product?.images?.[0] || stream.thumbnail || '/livestream/placeholder.png'}
                      alt={stream.product?.name || stream.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Live Badge */}
                    {stream.isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                        <Radio className="w-3 h-3 text-white animate-pulse" />
                        <span className="text-sm font-semibold">LIVE STREAM</span>
                      </div>
                    )}
                    
                    {/* Viewer Count */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{stream.current_viewers}</span>
                    </div>
                    
                    {/* Play Button */}
                  </div>

                  {/* Stream Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stream.product?.images?.[0] || '/livestream/placeholder.png'}
                          alt={stream.product?.name || stream.streamerName}
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
                    
                    {stream.product && (
                      <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-medium">Product:</span> {stream.product.name}
                        </p>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">Price:</span> 
                          {stream.product.discount_price ? (
                            <>
                              <span className="text-green-400 ml-1">₹{stream.product.discount_price}</span>
                              <span className="text-gray-500 line-through ml-2">₹{stream.product.price}</span>
                            </>
                          ) : (
                            <span className="text-white ml-1">₹{stream.product.price}</span>
                          )}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{stream.current_viewers} watching</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          <span>Live Stream</span>
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

        {/* YouTube Live-Style Video Modal */}
        {showVideoModal && selectedStream && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStream.product?.images?.[0] || selectedStream.streamerAvatar}
                  alt={selectedStream.product?.name || selectedStream.streamerName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold">{selectedStream.title}</h3>
                  <p className="text-gray-400 text-sm">{selectedStream.streamerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-red-500">
                  <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                  <span className="text-sm font-medium">LIVE</span>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-white"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Side - Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center">
                <div className="w-full h-full relative">
                  {isConnecting ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Connecting to Live Shopping stream...</p>
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
                        <p className="text-gray-400">Waiting for Live Shopping stream...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Live Chat */}
              <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-semibold">Live Chat</h3>
                  <p className="text-gray-400 text-sm">{selectedStream.current_viewers} viewers</p>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" id="chat-messages">
                  {chatMessages.map((msg) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500'];
                    const colorIndex = msg.avatar.charCodeAt(0) % colors.length;
                    
                    return (
                      <div key={msg.id} className="flex items-start gap-2">
                        <div className={`w-6 h-6 ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                          {msg.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{msg.username}</span>
                            <span className="text-gray-400 text-xs">{formatTimeAgo(msg.timestamp)}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{msg.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            // Add message to chat
                            addChatMessage(input.value.trim());
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Type a message..."]') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          addChatMessage(input.value.trim());
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Send
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
