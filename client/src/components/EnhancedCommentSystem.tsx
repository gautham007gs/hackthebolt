import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  Reply, 
  Trash2, 
  Flag, 
  Heart,
  Star,
  Award,
  Shield,
  Edit3,
  MoreHorizontal,
  Share2,
  Eye,
  Clock
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: number;
  content: string;
  author: string;
  authorId: string;
  authorAvatar?: string;
  authorRole?: 'admin' | 'creator' | 'user';
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
  isEdited?: boolean;
  isPinned?: boolean;
  reactions?: {
    like: number;
    love: number;
    star: number;
    award: number;
  };
}

interface EnhancedCommentSystemProps {
  postId: number;
  postType: 'blog' | 'tutorial' | 'tool';
  className?: string;
}

const EnhancedCommentSystem: React.FC<EnhancedCommentSystemProps> = ({ 
  postId, 
  postType, 
  className = '' 
}) => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          authorId: user?.id || 'anonymous',
          author: user?.name || 'Anonymous User'
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prev => [newCommentData, ...prev]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReaction = async (commentId: number, reactionType: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reactionType })
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to react to comment:', error);
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin':
        return isDark ? 'text-red-400' : 'text-red-500';
      case 'creator':
        return isDark ? 'text-purple-400' : 'text-purple-500';
      default:
        return isDark ? 'text-gray-400' : 'text-gray-500';
    }
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return (
          <div className="flex items-center space-x-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
            <Shield className="h-3 w-3" />
            <span>Admin</span>
          </div>
        );
      case 'creator':
        return (
          <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
            <Award className="h-3 w-3" />
            <span>Creator</span>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ 
    comment, 
    isReply = false 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200'} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${isDark ? 'hover:shadow-emerald-500/5' : 'hover:shadow-emerald-500/10'}`}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
          comment.authorRole === 'admin' 
            ? 'from-red-500 to-pink-500' 
            : comment.authorRole === 'creator'
            ? 'from-purple-500 to-indigo-500'
            : 'from-emerald-500 to-teal-500'
        } flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-lg">
            {comment.author.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-3">
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {comment.author}
            </h4>
            {getRoleBadge(comment.authorRole)}
            <div className="flex items-center space-x-2 text-sm">
              <Clock className={`h-3 w-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {formatTime(comment.createdAt)}
              </span>
              {comment.isEdited && (
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  (edited)
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            {comment.content}
          </div>

          {/* Reactions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReaction(comment.id, 'like')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  comment.isLiked 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : isDark 
                    ? 'bg-gray-700/50 text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-medium">{comment.likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReplyingTo(comment.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isDark ? 'bg-gray-700/50 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
              >
                <Reply className="h-4 w-4" />
                <span className="text-sm font-medium">Reply</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isDark ? 'bg-gray-700/50 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-medium">Share</span>
              </motion.button>
            </div>

            {/* More Options */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-200 ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Reply Form */}
          <AnimatePresence>
            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <form onSubmit={handleSubmitComment}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center`}>
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={`Reply to ${comment.author}...`}
                        rows={2}
                        className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none`}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={!replyContent.trim() || isSubmitting}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          <Send className="h-4 w-4" />
                          <span>Reply</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center space-x-3`}>
          <MessageCircle className="h-6 w-6 text-emerald-500" />
          <span>Discussion ({comments.length})</span>
        </h3>
        
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`px-3 py-1.5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Comment Form */}
      <div className={`${isDark ? 'bg-gray-800/30' : 'bg-gray-50'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200'} rounded-2xl p-6 mb-8`}>
        <form onSubmit={handleSubmitComment}>
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts, insights, or questions about this content..."
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none`}
              />
              <div className="flex items-center justify-between mt-4">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Be respectful and constructive in your discussions
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/25"
                >
                  <Send className="h-5 w-5" />
                  <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No comments yet</p>
            <p>Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCommentSystem;