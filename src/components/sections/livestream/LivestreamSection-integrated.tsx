"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Sparkles, Gem, Gift, Users, Play } from "lucide-react";
import { FadeIn, StaggeredFadeIn } from "@/components/animations";
import { apiClient } from '@/lib/api';
import { wsClient } from '@/lib/websocket';
import WebRTCViewer from '@/lib/webrtc-viewer';

interface LivestreamCard {
  id: string;
  title: string;
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
  hls_url: string;
  rtmp_url: string;
  status: string;
}

interface Comment {
  id: string;
  username: string;
  message: string;
  avatar?: string;
}

export default function LivestreamSectionIntegrated() {
  const [livestreams, setLivestreams] = useState<LivestreamCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<LivestreamCard | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [webrtcViewer, setWebrtcViewer] = useState(null);
  const [webrtcStream, setWebrtcStream] = useState(null);

  // Fetch active streams from backend
  const fetchActiveStreams = async () => {
    try {
      const result = await apiClient.getLivestreams();
      if (result.success) {
        // Transform API data to match component interface
        const transformedStreams: LivestreamCard[] = result.data.map((stream: any) => ({
          id: stream.id,
          title: stream.title,
          streamerName: stream.vendor_profiles?.business_name || 'Unknown',
          streamerAvatar: stream.vendor_profiles?.profile_image || '/livestream/placeholder.png',
          viewers: stream.current_viewers || 0,
          isLive: stream.status === 'live',
          thumbnail: '/livestream/placeholder.png', // You can add thumbnail to the API later
          videoSrc: stream.hls_url || stream.rtmp_url,
          category: 'Live Shopping',
          comments: [], // Will be populated via WebSocket
          icon: "sparkles" as const,
          stream_key: stream.stream_key,
          hls_url: stream.hls_url,
          rtmp_url: stream.rtmp_url,
          status: stream.status,
        }));
        setLivestreams(transformedStreams);
      } else {
        console.error('Failed to fetch active streams:', result.message);
      }
    } catch (error) {
      console.error('Failed to fetch active streams:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set up WebSocket connection for real-time updates
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      wsClient.connect(token);
      
      // Listen for stream updates
      wsClient.onStreamStats((stats) => {
        setLivestreams(prev => prev.map(stream => 
          stream.id === stats.streamId 
            ? { ...stream, viewers: stats.viewerCount }
            : stream
        ));
      });

      // Listen for chat messages
      wsClient.onStreamChatMessage((message) => {
        setLivestreams(prev => prev.map(stream => {
          if (stream.id === message.streamId) {
            return {
              ...stream,
              comments: [...stream.comments, {
                id: message.id,
                username: message.userPhone || 'Anonymous',
                message: message.message,
              }]
            };
          }
          return stream;
        }));
      });
    }
    
    return () => {
      wsClient.disconnect();
    };
  }, []);

  // Fetch streams on component mount and set up polling
  useEffect(() => {
    fetchActiveStreams();
    
    // Initialize WebRTC viewer
    const initializeWebRTC = async () => {
      const viewer = new WebRTCViewer();
      await viewer.initialize();
      
      // Set up callbacks
      viewer.setOnStream((stream) => {
        setWebrtcStream(stream);
      });
      
      viewer.setOnDisconnect(() => {
        setWebrtcStream(null);
      });
      
      viewer.setOnViewerCount((count) => {
        // Update viewer count in real-time
        setLivestreams(prev => prev.map(stream => ({
          ...stream,
          viewers: count
        })));
      });
      
      setWebrtcViewer(viewer);
    };
    
    initializeWebRTC();
    
    // Set up polling to refresh streams every 30 seconds
    const interval = setInterval(fetchActiveStreams, 30000);
    
    return () => {
      clearInterval(interval);
      if (webrtcViewer) {
        webrtcViewer.disconnect();
      }
    };
  }, []);

  const handleStreamClick = async (stream: LivestreamCard) => {
    if (stream.isLive) {
      setSelectedStream(stream);
      setShowVideoModal(true);
      
      // Join WebRTC stream
      if (webrtcViewer) {
        await webrtcViewer.joinStream(stream.id);
      }
    } else {
      console.log('Stream is not live yet');
    }
  };

  const joinStream = (streamId: string) => {
    wsClient.joinStream(streamId);
  };

  const leaveStream = (streamId: string) => {
    wsClient.leaveStream(streamId);
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "gem":
        return <Gem className="w-4 h-4" />;
      case "gift":
        return <Gift className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Live Shopping
          </h1>
          <p className="text-gray-400 text-lg">
            Watch live streams and shop with your favorite vendors
          </p>
        </div>

        {/* Livestreams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {livestreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => handleStreamClick(stream)}
            >
              {/* Stream Card */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105">
                {/* Thumbnail */}
                <div className="relative h-64 bg-gradient-to-br from-green-500 to-blue-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-70" />
                  </div>
                  
                  {/* Live Badge */}
                  {stream.isLive && (
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        LIVE
                      </span>
                    </div>
                  )}

                  {/* Viewer Count */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    <Users className="w-4 h-4" />
                    {formatViewerCount(stream.viewers)}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stream.status === 'live' ? 'bg-green-500 text-white' :
                      stream.status === 'scheduled' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {stream.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      {getIconComponent(stream.icon)}
                    </div>
                    <span className="text-green-400 text-sm font-medium">
                      {stream.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {stream.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {stream.streamerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{stream.streamerName}</p>
                      <p className="text-xs text-gray-400">Vendor</p>
                    </div>
                  </div>

                  {/* Comments Preview */}
                  {stream.comments.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {stream.comments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xs">
                              {comment.username.charAt(0)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 line-clamp-1">
                            <span className="font-medium text-white">{comment.username}:</span> {comment.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (stream.isLive) {
                        joinStream(stream.id);
                        handleStreamClick(stream);
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      stream.isLive
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {stream.isLive ? (
                      <>
                        <Eye className="w-4 h-4 inline mr-2" />
                        Join Live Stream
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 inline mr-2" />
                        Stream Not Live
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {livestreams.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No Live Streams</h3>
            <p className="text-gray-400 mb-8">
              There are no live streams at the moment. Check back later!
            </p>
            <button
              onClick={fetchActiveStreams}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Refresh Streams
            </button>
          </div>
        )}

        {/* Video Modal */}
        {showVideoModal && selectedStream && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-gray-900 rounded-2xl overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                {webrtcStream ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full"
                    ref={(video) => {
                      if (video && webrtcStream) {
                        video.srcObject = webrtcStream;
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : selectedStream.hls_url ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    src={selectedStream.hls_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Connecting to WebRTC stream...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stream Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedStream.title}</h2>
                    <p className="text-gray-400">by {selectedStream.streamerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">
                      {formatViewerCount(selectedStream.viewers)} viewers
                    </span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-bold mb-4">Live Chat</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {selectedStream.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">
                            {comment.username.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{comment.username}</p>
                          <p className="text-gray-300">{comment.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedStream(null);
                  if (selectedStream) {
                    leaveStream(selectedStream.id);
                  }
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
