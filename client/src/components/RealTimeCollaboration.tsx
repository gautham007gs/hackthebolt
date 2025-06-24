import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Share2, 
  Code,
  Terminal,
  Eye,
  Edit3,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  UserPlus,
  Settings,
  Monitor,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  ScreenShare,
  Clock,
  Crown,
  Shield
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: 'host' | 'mentor' | 'participant';
  status: 'online' | 'away' | 'busy';
  isCurrentUser?: boolean;
  permissions: {
    canEdit: boolean;
    canExecute: boolean;
    canShare: boolean;
  };
}

interface CollaborationSession {
  id: string;
  title: string;
  type: 'study-group' | 'mentoring' | 'ctf-team' | 'workshop';
  participants: Participant[];
  startTime: Date;
  duration: number;
  isRecording: boolean;
  sharedCode: string;
  language: string;
}

const RealTimeCollaboration: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeSession, setActiveSession] = useState<CollaborationSession | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string; sender: string; content: string; timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock session data
  const mockSession: CollaborationSession = {
    id: 'session-1',
    title: 'SQL Injection Study Group',
    type: 'study-group',
    participants: [
      {
        id: '1',
        name: user?.firstName + ' ' + user?.lastName || 'You',
        role: 'host',
        status: 'online',
        isCurrentUser: true,
        permissions: { canEdit: true, canExecute: true, canShare: true }
      },
      {
        id: '2',
        name: 'Alex Chen',
        role: 'mentor',
        status: 'online',
        permissions: { canEdit: true, canExecute: true, canShare: true }
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        role: 'participant',
        status: 'online',
        permissions: { canEdit: false, canExecute: false, canShare: false }
      },
      {
        id: '4',
        name: 'Mike Rodriguez',
        role: 'participant',
        status: 'away',
        permissions: { canEdit: false, canExecute: false, canShare: false }
      }
    ],
    startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    duration: 60, // 60 minutes
    isRecording: true,
    sharedCode: `-- SQL Injection Example
SELECT * FROM users 
WHERE username = '$username' 
AND password = '$password';

-- Vulnerable: admin' OR '1'='1' --
-- This bypasses authentication`,
    language: 'sql'
  };

  useEffect(() => {
    setActiveSession(mockSession);
    
    // Mock some initial messages
    setMessages([
      {
        id: '1',
        sender: 'Alex Chen',
        content: 'Great! Now let\'s look at how this SQL injection works',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        sender: 'Sarah Wilson', 
        content: 'I see! The OR condition makes it always true',
        timestamp: new Date(Date.now() - 3 * 60 * 1000)
      }
    ]);
  }, []);

  const joinCall = () => {
    setIsCallActive(true);
  };

  const leaveCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsScreenSharing(false);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      sender: user?.firstName + ' ' + user?.lastName || 'You',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getRoleIcon = (role: Participant['role']) => {
    switch (role) {
      case 'host': return Crown;
      case 'mentor': return Shield;
      default: return Users;
    }
  };

  const getStatusColor = (status: Participant['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!activeSession) {
    return (
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="text-center">
          <Users className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No Active Collaboration
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Join a study group or start a new collaboration session
          </p>
          <button className="btn-primary">
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
            <Users className={`w-5 h-5 ${isDark ? 'text-white' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {activeSession.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {activeSession.participants.length} participants
              </span>
              {activeSession.isRecording && (
                <div className="flex items-center space-x-1 text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Recording</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm">
            <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {Math.floor((Date.now() - activeSession.startTime.getTime()) / 60000)}m
            </span>
          </div>
          
          {!isCallActive ? (
            <button
              onClick={joinCall}
              className="btn-primary flex items-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>Join Call</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-2 rounded-lg transition-colors ${
                  isVideoOff
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
                }`}
              >
                {isVideoOff ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2 rounded-lg transition-colors ${
                  isScreenSharing
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
                }`}
              >
                <ScreenShare className="w-4 h-4" />
              </button>
              
              <button
                onClick={leaveCall}
                className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Participants Grid (when in call) */}
          {isCallActive && (
            <div className="grid grid-cols-2 gap-2 p-4 h-48">
              {activeSession.participants.slice(0, 4).map((participant) => {
                const RoleIcon = getRoleIcon(participant.role);
                return (
                  <div
                    key={participant.id}
                    className={`relative rounded-lg overflow-hidden ${
                      isDark ? 'bg-gray-900' : 'bg-gray-800'
                    } flex items-center justify-center`}
                  >
                    {/* Mock video feed */}
                    <div className={`w-full h-full flex items-center justify-center ${
                      participant.isCurrentUser && isVideoOff ? 'bg-gray-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}>
                      {participant.isCurrentUser && isVideoOff ? (
                        <CameraOff className="w-8 h-8 text-gray-400" />
                      ) : (
                        <div className="text-white text-2xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    {/* Participant info overlay */}
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(participant.status)}`}></div>
                      <span className="text-white text-xs font-medium">{participant.name}</span>
                      <RoleIcon className="w-3 h-3 text-yellow-400" />
                    </div>
                    
                    {/* Muted indicator */}
                    {participant.isCurrentUser && isMuted && (
                      <div className="absolute top-2 right-2">
                        <MicOff className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Shared Code Editor */}
          <div className="flex-1 p-4">
            <div className={`h-full rounded-lg border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
              <div className={`p-3 border-b ${isDark ? 'border-gray-600' : 'border-gray-300'} flex items-center justify-between`}>
                <div className="flex items-center space-x-2">
                  <Code className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shared Code Editor
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {activeSession.language.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                    <Play className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                  <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                    <Share2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <pre className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {activeSession.sharedCode}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className={`w-80 border-l ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
          {/* Participants List */}
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Participants ({activeSession.participants.length})
            </h4>
            <div className="space-y-2">
              {activeSession.participants.map((participant) => {
                const RoleIcon = getRoleIcon(participant.role);
                return (
                  <div key={participant.id} className="flex items-center space-x-2">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                        isDark ? 'border-gray-800' : 'border-white'
                      } ${getStatusColor(participant.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {participant.name}
                        </span>
                        <RoleIcon className="w-3 h-3 text-yellow-500" />
                      </div>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {participant.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {message.sender}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {message.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className={`flex-1 p-2 text-sm rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  newMessage.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;