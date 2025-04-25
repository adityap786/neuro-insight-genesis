
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ReportPanelProps {
  imageFile: File | null;
  abnormalityDetected: boolean;
}

const ReportPanel: React.FC<ReportPanelProps> = ({ imageFile, abnormalityDetected }) => {
  const [report, setReport] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateReport = () => {
    if (!imageFile) {
      toast({
        title: "No image uploaded",
        description: "Please upload an MRI scan first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI report generation with a delay
    setTimeout(() => {
      // Generate different reports based on abnormality flag
      const generatedReport = abnormalityDetected
        ? generateAbnormalReport()
        : generateNormalReport();
        
      setReport(generatedReport);
      setIsGenerating(false);
      
      toast({
        title: "Report generated",
        description: "AI analysis complete",
      });
    }, 2000);
  };

  const generateNormalReport = () => {
    return `CLINICAL INDICATION: Brain MRI scan for routine evaluation.

TECHNIQUE: Multi-parametric MRI brain study was performed without contrast.

FINDINGS:
- Brain parenchyma: Normal signal intensity throughout the cerebral hemispheres.
- Ventricles: Normal size and configuration.
- Gray-white matter differentiation: Well-preserved.
- Midline structures: No midline shift.
- Brainstem and cerebellum: Unremarkable.
- Extra-axial spaces: No abnormal extra-axial collections.
- Vascular structures: Flow voids appear normal.

IMPRESSION:
Normal brain MRI study. No acute intracranial abnormality.

RECOMMENDATION:
No follow-up imaging required based on this study. Routine clinical follow-up as needed.`;
  };

  const generateAbnormalReport = () => {
    return `CLINICAL INDICATION: Brain MRI scan for evaluation of persistent headaches.

TECHNIQUE: Multi-parametric MRI brain study was performed without contrast.

FINDINGS:
- Brain parenchyma: Focal area of T2/FLAIR hyperintensity in the right temporal lobe, measuring approximately 2.3 x 1.8 cm.
- Mass effect: Mild local mass effect with minimal surrounding edema.
- Ventricles: Normal size and configuration.
- Gray-white matter differentiation: Preserved except in the region of the lesion.
- Midline structures: No midline shift.
- Brainstem and cerebellum: Unremarkable.
- Extra-axial spaces: No abnormal extra-axial collections.
- Vascular structures: Flow voids appear normal.

IMPRESSION:
Focal abnormality in the right temporal lobe, concerning for a primary neoplastic process. Differential diagnosis includes low-grade glioma, focal cortical dysplasia, or less likely, focal encephalitis.

RECOMMENDATION:
1. Contrast-enhanced MRI is recommended for further characterization.
2. Neurosurgical consultation advised.
3. Clinical correlation with EEG may be considered to evaluate for seizure activity.`;
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report);
    toast({
      title: "Report copied",
      description: "The report has been copied to your clipboard",
    });
  };

  const downloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "brain-mri-report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clear report when image changes
  useEffect(() => {
    setReport('');
  }, [imageFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="neo-blur">
        <CardHeader>
          <CardTitle className="text-gradient">AI-Generated Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Generated report will appear here..."
            className="h-64 font-mono text-sm resize-none bg-neuro-darker/70"
            readOnly={!report}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={generateReport} 
            disabled={isGenerating || !imageFile}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={copyReport}
              disabled={!report}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadReport}
              disabled={!report}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ReportPanel;
