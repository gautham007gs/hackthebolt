import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Reply, Heart, Flag, MoreVertical, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { Comment, User } from '@shared/schema';

interface ExtendedComment extends Comment {
  author: Pick<User, 'id' | 'username' | 'profileImageUrl' | 'firstName' | 'lastName'>;
  replies?: ExtendedComment[];
  replyCount?: number;
  likes?: number;
  isLiked?: boolean;
}

interface CommentSystemProps {
  postId: number;
  postType: 'blog' | 'tool' | 'lab';
  currentUser?: User;
}

interface CommentItemProps {
  comment: ExtendedComment;
  currentUser?: User;
  onReply: (parentId: number) => void;
  onEdit: (comment: ExtendedComment) => void;
  onDelete: (commentId: number) => void;
  level?: number;
}

function CommentItem({ comment, currentUser, onReply, onEdit, onDelete, level = 0 }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false);
  const maxLevel = 3; // Prevent infinite nesting

  const authorDisplayName = comment.author.firstName && comment.author.lastName 
    ? `${comment.author.firstName} ${comment.author.lastName}`
    : comment.author.username || 'Anonymous';

  const isOwner = currentUser?.id === comment.authorId;
  const canReply = level < maxLevel;

  return (
    <div className={`space-y-3 ${level > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.profileImageUrl || undefined} />
              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                {authorDisplayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {authorDisplayName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                
                {(isOwner || currentUser?.role === 'admin') && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isOwner && (
                        <DropdownMenuItem onClick={() => onEdit(comment)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(comment.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 leading-relaxed">
                {comment.content}
              </p>
              
              <div className="flex items-center space-x-4 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  {comment.likes || 0}
                </Button>
                
                {canReply && currentUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReply(comment.id)}
                    className="h-6 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                )}
                
                {comment.replyCount && comment.replyCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplies(!showReplies)}
                    className="h-6 px-2 text-xs text-emerald-600 dark:text-emerald-400"
                  >
                    {showReplies ? 'Hide' : 'Show'} {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showReplies && comment.replies && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentForm({ 
  postId, 
  parentId, 
  currentUser, 
  onCancel, 
  editingComment 
}: { 
  postId: number;
  parentId?: number;
  currentUser: User;
  onCancel?: () => void;
  editingComment?: ExtendedComment;
}) {
  const [content, setContent] = useState(editingComment?.content || '');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: (data: { content: string; postId: number; parentId?: number }) =>
      apiRequest('/api/comments', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', postId] });
      setContent('');
      onCancel?.();
      toast({ title: 'Comment posted successfully!' });
    },
    onError: () => {
      toast({ title: 'Failed to post comment', variant: 'destructive' });
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: (data: { content: string }) =>
      apiRequest(`/api/comments/${editingComment?.id}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', postId] });
      onCancel?.();
      toast({ title: 'Comment updated successfully!' });
    },
    onError: () => {
      toast({ title: 'Failed to update comment', variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (editingComment) {
      updateCommentMutation.mutate({ content: content.trim() });
    } else {
      createCommentMutation.mutate({ 
        content: content.trim(), 
        postId,
        parentId 
      });
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.profileImageUrl || undefined} />
              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                {(currentUser.firstName?.[0] || currentUser.username?.[0] || 'U').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
                className="min-h-[80px] resize-none border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {parentId ? 'Replying to comment' : 'Be respectful and constructive'}
            </span>
            <div className="flex space-x-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                size="sm"
                disabled={!content.trim() || createCommentMutation.isPending || updateCommentMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                {createCommentMutation.isPending || updateCommentMutation.isPending 
                  ? (editingComment ? 'Updating...' : 'Posting...') 
                  : (editingComment ? 'Update' : 'Post')
                }
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function CommentSystem({ postId, postType, currentUser }: CommentSystemProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<ExtendedComment | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['/api/comments', postId],
    enabled: !!postId
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => apiRequest(`/api/comments/${commentId}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', postId] });
      toast({ title: 'Comment deleted successfully!' });
    },
    onError: () => {
      toast({ title: 'Failed to delete comment', variant: 'destructive' });
    }
  });

  const handleReply = (parentId: number) => {
    if (!currentUser) {
      toast({ title: 'Please log in to reply', variant: 'destructive' });
      return;
    }
    setReplyingTo(parentId);
    setEditingComment(null);
  };

  const handleEdit = (comment: ExtendedComment) => {
    setEditingComment(comment);
    setReplyingTo(null);
  };

  const handleDelete = (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const handleCancel = () => {
    setReplyingTo(null);
    setEditingComment(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Comments
          </h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>
      </div>

      {currentUser && !editingComment && !replyingTo && (
        <CommentForm postId={postId} currentUser={currentUser} />
      )}

      {editingComment && (
        <CommentForm
          postId={postId}
          currentUser={currentUser}
          editingComment={editingComment}
          onCancel={handleCancel}
        />
      )}

      <div className="space-y-4">
        {comments.map((comment: ExtendedComment) => (
          <div key={comment.id}>
            <CommentItem
              comment={comment}
              currentUser={currentUser}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {replyingTo === comment.id && currentUser && (
              <div className="ml-8 mt-3">
                <CommentForm
                  postId={postId}
                  parentId={comment.id}
                  currentUser={currentUser}
                  onCancel={handleCancel}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}