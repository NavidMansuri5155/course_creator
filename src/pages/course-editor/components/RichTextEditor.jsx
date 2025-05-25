import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const RichTextEditor = ({ initialContent, onChange }) => {
  const [content, setContent] = useState(initialContent || "");
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (initialContent !== undefined) {
      setContent(initialContent);
    }
  }, [initialContent]);

  // Execute command on the editor
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    
    // Get updated content from the editor
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
    
    // Refocus the editor
    editorRef.current.focus();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Bold: Ctrl+B
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      execCommand('bold');
    }
    // Italic: Ctrl+I
    else if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      execCommand('italic');
    }
    // Underline: Ctrl+U
    else if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      execCommand('underline');
    }
  };

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Insert heading
  const insertHeading = (level) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <button
          onClick={() => execCommand('bold')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bold (Ctrl+B)"
        >
          <Icon name="Bold" size={18} />
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="p-2 rounded hover:bg-gray-200"
          title="Italic (Ctrl+I)"
        >
          <Icon name="Italic" size={18} />
        </button>
        <button
          onClick={() => execCommand('underline')}
          className="p-2 rounded hover:bg-gray-200"
          title="Underline (Ctrl+U)"
        >
          <Icon name="Underline" size={18} />
        </button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <button
          onClick={() => insertHeading(2)}
          className="p-2 rounded hover:bg-gray-200"
          title="Heading 2"
        >
          <Icon name="Heading2" size={18} />
        </button>
        <button
          onClick={() => insertHeading(3)}
          className="p-2 rounded hover:bg-gray-200"
          title="Heading 3"
        >
          <Icon name="Heading3" size={18} />
        </button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          <Icon name="List" size={18} />
        </button>
        <button
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <Icon name="ListOrdered" size={18} />
        </button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <button
          onClick={insertLink}
          className="p-2 rounded hover:bg-gray-200"
          title="Insert Link"
        >
          <Icon name="Link" size={18} />
        </button>
        <button
          onClick={() => execCommand('unlink')}
          className="p-2 rounded hover:bg-gray-200"
          title="Remove Link"
        >
          <Icon name="LinkOff" size={18} />
        </button>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <button
          onClick={() => execCommand('justifyLeft')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Left"
        >
          <Icon name="AlignLeft" size={18} />
        </button>
        <button
          onClick={() => execCommand('justifyCenter')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Center"
        >
          <Icon name="AlignCenter" size={18} />
        </button>
        <button
          onClick={() => execCommand('justifyRight')}
          className="p-2 rounded hover:bg-gray-200"
          title="Align Right"
        >
          <Icon name="AlignRight" size={18} />
        </button>
      </div>
      
      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        className="p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;