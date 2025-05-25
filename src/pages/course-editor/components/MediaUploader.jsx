import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MediaUploader = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  const ALLOWED_TYPES = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'video/mp4', 
    'video/webm'
  ];

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  // Upload file
  const uploadFile = (file) => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds the maximum limit of 100MB.`);
      return;
    }
    
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(`File type not supported. Please upload JPEG, PNG, GIF, MP4, or WebM files.`);
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // Simulate a slight delay for completion
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          
          // Generate a mock URL for the uploaded file
          const isImage = file.type.startsWith('image/');
          const mockUrl = isImage 
            ? `https://source.unsplash.com/random/800x600?sig=${Math.random()}`
            : 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
          
          onUploadComplete(mockUrl);
        }, 500);
      }
      setUploadProgress(Math.floor(progress));
    }, 200);
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-error-light text-error rounded-md flex items-start">
          <Icon name="AlertCircle" size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Upload Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="ml-auto"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-primary bg-primary-light' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="py-4">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Upload" size={24} className="text-primary animate-pulse" />
            </div>
            <p className="text-gray-700 mb-2">Uploading file... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <Icon name="Upload" size={36} className="text-gray-400" />
            </div>
            <p className="text-gray-700 mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-gray-500 text-sm mb-4">
              Supports images (JPEG, PNG, GIF) and videos (MP4, WebM) up to 100MB
            </p>
            <button
              onClick={() => document.getElementById('file-upload').click()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Select File
            </button>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/png,image/gif,video/mp4,video/webm"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tips:</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Use high-quality images for better engagement</li>
          <li>Keep videos under 5 minutes for better retention</li>
          <li>Compress large files before uploading</li>
        </ul>
      </div>
    </div>
  );
};

export default MediaUploader;