import React, { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline, Link, Image, List, ListOrdered, 
  Code, Quote, Highlight, Palette, Type, AlignLeft, AlignCenter, 
  AlignRight, Undo, Redo, Eye, Save, Upload
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  onImageUpload,
  placeholder = "Start writing your amazing content...",
  className = ""
}) => {
  const { isDark } = useTheme();
  const [showPreview, setShowPreview] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = (text: string) => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const newContent = content.substring(0, start) + text + content.substring(end);
    
    onChange(newContent);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.selectionStart = start + text.length;
        editorRef.current.selectionEnd = start + text.length;
        editorRef.current.focus();
      }
    }, 0);
  };

  const wrapSelection = (prefix: string, suffix: string = prefix) => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    const wrappedText = prefix + selectedText + suffix;
    
    const newContent = content.substring(0, start) + wrappedText + content.substring(end);
    onChange(newContent);
    
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.selectionStart = start + prefix.length;
        editorRef.current.selectionEnd = end + prefix.length;
        editorRef.current.focus();
      }
    }, 0);
  };

  const handleImageUpload = async (file: File) => {
    if (onImageUpload) {
      try {
        const url = await onImageUpload(file);
        insertAtCursor(`![${file.name}](${url})`);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
    setShowImageUpload(false);
  };

  const handleImageUrl = () => {
    if (imageUrl) {
      insertAtCursor(`![Image](${imageUrl})`);
      setImageUrl('');
      setShowImageUpload(false);
    }
  };

  const handleLinkInsert = () => {
    if (linkUrl) {
      const text = linkText || linkUrl;
      insertAtCursor(`[${text}](${linkUrl})`);
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  const renderPreview = () => {
    // Simple markdown-like preview
    let preview = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<u>$1</u>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>')
      .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/\n/g, '<br>');

    return <div dangerouslySetInnerHTML={{ __html: preview }} />;
  };

  const toolbarButtons = [
    { icon: Bold, action: () => wrapSelection('**'), tooltip: 'Bold' },
    { icon: Italic, action: () => wrapSelection('*'), tooltip: 'Italic' },
    { icon: Underline, action: () => wrapSelection('_'), tooltip: 'Underline' },
    { icon: Code, action: () => wrapSelection('`'), tooltip: 'Inline Code' },
    { icon: Quote, action: () => insertAtCursor('> '), tooltip: 'Quote' },
    { icon: List, action: () => insertAtCursor('- '), tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => insertAtCursor('1. '), tooltip: 'Numbered List' },
    { icon: Link, action: () => setShowLinkDialog(true), tooltip: 'Insert Link' },
    { icon: Image, action: () => setShowImageUpload(true), tooltip: 'Insert Image' },
    { icon: Highlight, action: () => wrapSelection('=='), tooltip: 'Highlight' }
  ];

  return (
    <div className={`${className} ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Toolbar */}
      <div className={`flex items-center justify-between p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-1 flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              title={button.tooltip}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <button.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showPreview 
                ? isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {showPreview ? (
          <div className={`p-4 min-h-[400px] prose max-w-none ${isDark ? 'prose-invert text-gray-100' : 'text-gray-900'}`}>
            {content ? renderPreview() : (
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} italic`}>
                Nothing to preview yet. Start writing to see the preview.
              </p>
            )}
          </div>
        ) : (
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-96 p-4 resize-none focus:outline-none ${
              isDark ? 'bg-gray-800 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        className="hidden"
      />

      {/* Image Upload Dialog */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-md w-full mx-4`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Insert Image
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-600 hover:border-gray-500 text-gray-300' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Image</span>
              </button>
              
              <div className="text-center text-gray-500">or</div>
              
              <input
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full p-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowImageUpload(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleImageUrl}
                disabled={!imageUrl}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-md w-full mx-4`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Insert Link
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Link text (optional)"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className={`w-full p-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="url"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className={`w-full p-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowLinkDialog(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLinkInsert}
                disabled={!linkUrl}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;