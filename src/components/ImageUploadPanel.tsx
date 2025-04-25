
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadPanelProps {
  onImageUpload: (image: File) => void;
}

const ImageUploadPanel: React.FC<ImageUploadPanelProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessImage(file);
    }
  };

  const validateAndProcessImage = (file: File) => {
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, DICOM)",
        variant: "destructive"
      });
      return;
    }
    
    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass the image up to the parent component
    onImageUpload(file);
    
    toast({
      title: "Image uploaded successfully",
      description: "Processing your MRI scan...",
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessImage(file);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="neo-blur">
        <CardHeader>
          <CardTitle className="text-gradient">MRI Scan Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-neuro-accent bg-neuro-accent/10' : 'border-gray-600'
            } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-20 h-20 bg-neuro-secondary rounded-full flex items-center justify-center mb-2">
                    <Upload className="h-10 w-10 text-neuro-accent" />
                  </div>
                </motion.div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drag & drop your MRI scan here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                  <p className="text-xs text-muted-foreground">Supports: JPEG, PNG, DICOM formats</p>
                </div>
                <label htmlFor="image-upload">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="secondary">
                      <ImageIcon className="mr-2 h-4 w-4" /> Select Image
                    </Button>
                  </motion.div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*,.dcm" 
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="MRI Preview" 
                  className="mx-auto max-h-64 rounded-md"
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xs text-muted-foreground">For best results, upload high-quality MRI scans</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ImageUploadPanel;
