"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Sparkles, Gem, Gift, Users, Play } from "lucide-react";
import { FadeIn, StaggeredFadeIn } from "@/components/animations";
import { apiClient } from '@/lib/api';
import { wsClient } from '@/lib/websocket';

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
    
    // Set up polling to refresh streams every 30 seconds
    const interval = setInterval(fetchActiveStreams, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStreamClick = (stream: LivestreamCard) => {
    if (stream.isLive && stream.hls_url) {
      setSelectedStream(stream);
      setShowVideoModal(true);
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
            Trullu Live Shopping
          </h1>
          <p className="text-gray-400 text-lg">
            Watch live streams and shop with your favorite vendors on Trullu
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
                        TRULLU LIVE
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
                      Trullu Live Shopping
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

        {/* Video Modal - YouTube Style Layout */}
        {showVideoModal && selectedStream && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {selectedStream.streamerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedStream.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{selectedStream.streamerName}</span>
                    <div className="flex items-center gap-2 text-red-400">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span>TRULLU LIVE</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatViewerCount(selectedStream.viewers)} viewers</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedStream(null);
                  if (selectedStream) {
                    leaveStream(selectedStream.id);
                  }
                }}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-white"
              >
                ×
              </button>
            </div>

            {/* Main Content - YouTube Style */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Side - Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center">
                <div className="w-full h-full relative">
                  {selectedStream.hls_url ? (
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
                        <p className="text-gray-400">Stream not available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Comments Section */}
              <div className="w-96 bg-gray-900 border-l border-gray-700 flex flex-col">
                {/* Comments Header */}
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-2">Live Chat</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span>{formatViewerCount(selectedStream.viewers)} viewers watching</span>
                  </div>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedStream.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">
                          {comment.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{comment.username}</span>
                          <span className="text-xs text-gray-400">now</span>
                        </div>
                        <p className="text-sm text-gray-300 break-words">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Sample Comments for Demo */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">R</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">Rahul</span>
                        <span className="text-xs text-gray-400">2m ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Great products! How much is this?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">N</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">Nithin</span>
                        <span className="text-xs text-gray-400">5m ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Interested in the jewelry collection!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">S</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">Sarah</span>
                        <span className="text-xs text-gray-400">8m ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Love the quality! Do you have more colors?</p>
                    </div>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none text-sm"
                    />
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
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
