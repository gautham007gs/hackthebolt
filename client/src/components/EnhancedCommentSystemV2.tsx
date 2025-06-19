import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Reply, Flag, MoreVertical, Star, Award, ThumbsUp, Edit, Trash2, Pin, Shield } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: number;
  content: string;
  author: string;
  authorId: string;
  authorAvatar?: string;
  authorRole?: 'admin' | 'creator' | 'moderator' | 'user';
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
  depth?: number;
}

interface EnhancedCommentSystemV2Props {
  postId: number;
  postType: 'blog' | 'tutorial' | 'tool';
  className?: string;
  initialComments?: Comment[];
}

const EnhancedCommentSystemV2: React.FC<EnhancedCommentSystemV2Props> = ({
  postId,
  postType,
  className = '',
  initialComments = []
}) => {
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (initialComments.length === 0) {
      const mockComments: Comment[] = [
        {
          id: 1,
          content: "Excellent article! The explanation of APT techniques is very comprehensive. I particularly appreciated the section on lateral movement detection.",
          author: "CyberDefender42",
          authorId: "user1",
          authorRole: "user",
          createdAt: "2024-12-15T10:30:00Z",
          likes: 23,
          isLiked: false,
          isPinned: true,
          reactions: { like: 15, love: 5, star: 2, award: 1 },
          replies: [
            {
              id: 11,
              content: "Thanks for the feedback! Lateral movement is indeed a critical aspect that many overlook.",
              author: "Sarah Chen",
              authorId: "author1",
              authorRole: "creator",
              createdAt: "2024-12-15T11:15:00Z",
              likes: 8,
              isLiked: true,
              reactions: { like: 6, love: 2, star: 0, award: 0 },
              depth: 1
            }
          ]
        },
        {
          id: 2,
          content: "Could you elaborate on the specific tools mentioned for network monitoring? I'm looking to implement something similar in our SOC.",
          author: "SOCAnalyst",
          authorId: "user2",
          authorRole: "user",
          createdAt: "2024-12-15T09:45:00Z",
          likes: 12,
          isLiked: false,
          reactions: { like: 10, love: 1, star: 1, award: 0 },
          replies: []
        },
        {
          id: 3,
          content: "Great writeup! This should be mandatory reading for anyone in cybersecurity. The real-world examples really help drive the points home.",
          author: "InfoSecPro",
          authorId: "user3",
          authorRole: "moderator",
          createdAt: "2024-12-15T08:20:00Z",
          likes: 18,
          isLiked: true,
          reactions: { like: 12, love: 4, star: 2, award: 0 }
        }
      ];
      setComments(mockComments);
    }
  }, [initialComments]);

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      case 'creator': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400';
      case 'moderator': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-3 w-3" />;
      case 'creator': return <Award className="h-3 w-3" />;
      case 'moderator': return <Star className="h-3 w-3" />;
      default: return null;
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isAuthenticated) return;

    setIsLoading(true);
    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      author: user?.name || 'Anonymous',
      authorId: user?.id || 'anonymous',
      authorRole: user?.role as any || 'user',
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      reactions: { like: 0, love: 0, star: 0, award: 0 },
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setIsLoading(false);
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim() || !isAuthenticated) return;

    setIsLoading(true);
    const reply: Comment = {
      id: Date.now(),
      content: replyContent,
      author: user?.name || 'Anonymous',
      authorId: user?.id || 'anonymous',
      authorRole: user?.role as any || 'user',
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      reactions: { like: 0, love: 0, star: 0, award: 0 },
      depth: 1
    };

    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyContent('');
    setReplyingTo(null);
    setIsLoading(false);
  };

  const handleLikeComment = (commentId: number, isReply = false, parentId?: number) => {
    if (!isAuthenticated) return;

    if (isReply && parentId) {
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies?.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked 
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked 
            }
          : comment
      ));
    }
  };

  const handleAddReaction = (commentId: number, reactionType: 'like' | 'love' | 'star' | 'award', isReply = false, parentId?: number) => {
    if (!isAuthenticated) return;

    if (isReply && parentId) {
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies?.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      reactions: {
                        ...reply.reactions!,
                        [reactionType]: (reply.reactions?.[reactionType] || 0) + 1
                      }
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              reactions: {
                ...comment.reactions!,
                [reactionType]: (comment.reactions?.[reactionType] || 0) + 1
              }
            }
          : comment
      ));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean; parentId?: number }> = ({ 
    comment, 
    isReply = false, 
    parentId 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 ${
        isReply ? 'ml-8 mt-4' : 'mb-6'
      } border ${isDark ? 'border-gray-700' : 'border-gray-200'} ${
        comment.isPinned ? 'ring-2 ring-emerald-500/20' : ''
      }`}
    >
      {comment.isPinned && (
        <div className="flex items-center space-x-2 mb-4 text-emerald-500">
          <Pin className="h-4 w-4" />
          <span className="text-sm font-medium">Pinned Comment</span>
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {comment.authorAvatar ? (
            <img src={comment.authorAvatar} alt={comment.author} className="w-10 h-10 rounded-full" />
          ) : (
            <span className="font-semibold">{comment.author.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {comment.author}
            </span>
            {comment.authorRole && comment.authorRole !== 'user' && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(comment.authorRole)}`}>
                {getRoleIcon(comment.authorRole)}
                <span className="capitalize">{comment.authorRole}</span>
              </span>
            )}
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(comment.createdAt)}
            </span>
            {comment.isEdited && (
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                (edited)
              </span>
            )}
          </div>

          {editingComment === comment.id ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none`}
                rows={3}
                placeholder="Edit your comment..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    // Handle edit submission
                    setEditingComment(null);
                    setEditContent('');
                  }}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingComment(null);
                    setEditContent('');
                  }}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              {comment.content}
            </p>
          )}

          {/* Reactions */}
          {comment.reactions && (
            <div className="flex items-center space-x-4 mb-4">
              {Object.entries(comment.reactions).map(([type, count]) => (
                count > 0 && (
                  <button
                    key={type}
                    onClick={() => handleAddReaction(comment.id, type as 'like' | 'love' | 'star' | 'award', isReply, parentId)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type === 'like' && <ThumbsUp className="h-3 w-3" />}
                    {type === 'love' && <Heart className="h-3 w-3" />}
                    {type === 'star' && <Star className="h-3 w-3" />}
                    {type === 'award' && <Award className="h-3 w-3" />}
                    <span>{count}</span>
                  </button>
                )
              ))}
            </div>
          )}

          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                comment.isLiked 
                  ? 'text-emerald-500' 
                  : isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}

            {/* Reaction buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAddReaction(comment.id, 'like', isReply, parentId)}
                className={`p-1 rounded transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Like"
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleAddReaction(comment.id, 'love', isReply, parentId)}
                className={`p-1 rounded transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Love"
              >
                <Heart className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleAddReaction(comment.id, 'star', isReply, parentId)}
                className={`p-1 rounded transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Star"
              >
                <Star className="h-3 w-3" />
              </button>
            </div>

            {isAuthenticated && user?.id === comment.authorId && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingComment(comment.id);
                    setEditContent(comment.content);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title="Edit"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  className={`p-1 rounded transition-colors ${
                    isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'
                  }`}
                  title="Delete"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none`}
                rows={3}
                placeholder="Write a reply..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim() || isLoading}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                >
                  {isLoading ? 'Posting...' : 'Reply'}
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  parentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="seo-heading-h3">
          Comments ({comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)})
        </h3>
        
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`px-3 py-1 rounded-lg border text-sm ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Comment Form - Only for authenticated users */}
      {isAuthenticated ? (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-8 border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <span className="font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={`w-full p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none`}
                rows={4}
                placeholder="Share your thoughts on this article..."
              />
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {newComment.length}/1000 characters
                </span>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isLoading}
                  className="btn-primary px-6 py-2 disabled:opacity-50"
                >
                  {isLoading ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 mb-8 border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } text-center`}>
          <div className="max-w-md mx-auto">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}>
              <MessageCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Join the Discussion
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Sign in to share your thoughts, ask questions, and engage with our cybersecurity community.
            </p>
            <Link
              href="/login"
              className="btn-primary px-6 py-3 inline-flex items-center space-x-2"
            >
              <span>Sign In to Comment</span>
            </Link>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className={`h-12 w-12 mx-auto mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No comments yet. Be the first to start the conversation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCommentSystemV2;