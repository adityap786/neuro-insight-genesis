
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageUploadPanel from '@/components/ImageUploadPanel';
import ModelViewer from '@/components/ModelViewer';
import ReportPanel from '@/components/ReportPanel';
import QuestionAnswerPanel from '@/components/QuestionAnswerPanel';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [abnormalityDetected, setAbnormalityDetected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setIsProcessing(true);
    
    // Simulate the AI processing with a delay
    setTimeout(() => {
      // For demo purposes, randomly determine if abnormality is detected
      // In a real app, this would be determined by AI analysis
      const hasAbnormality = Math.random() > 0.5;
      setAbnormalityDetected(hasAbnormality);
      setIsProcessing(false);
      
      toast({
        title: hasAbnormality ? "Abnormality Detected" : "Analysis Complete",
        description: hasAbnormality 
          ? "Potential anomaly identified in brain scan" 
          : "No abnormalities detected in scan",
        variant: hasAbnormality ? "destructive" : "default"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neuro-darker flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pb-8">
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-neuro-accent/20 border border-neuro-accent/30 rounded-md p-4 mb-6 flex items-center justify-center"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 border-4 border-t-neuro-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <p>Processing MRI scan... Converting to 3D model and analyzing results</p>
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ImageUploadPanel onImageUpload={handleImageUpload} />
          <ReportPanel imageFile={imageFile} abnormalityDetected={abnormalityDetected} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px]">
            <ModelViewer imageFile={imageFile} abnormalityDetected={abnormalityDetected} />
          </div>
          <div>
            <QuestionAnswerPanel imageFile={imageFile} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
