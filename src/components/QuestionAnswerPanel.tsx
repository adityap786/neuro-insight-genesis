
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Send, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuestionAnswerPanelProps {
  imageFile: File | null;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const QuestionAnswerPanel: React.FC<QuestionAnswerPanelProps> = ({ imageFile }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    if (!imageFile) {
      toast({
        title: "No image uploaded",
        description: "Please upload an MRI scan first",
        variant: "destructive"
      });
      return;
    }
    
    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: question
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setQuestion('');
    setIsAnswering(true);
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(question);
      
      const newAssistantMessage: Message = {
        id: Date.now(),
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      setIsAnswering(false);
    }, 1500);
  };

  const generateResponse = (question: string): string => {
    const commonResponses: Record<string, string> = {
      tumor: "Based on the MRI scan, there is a focal area of abnormal signal intensity which may be consistent with a neoplasm. The specific region shows characteristics that would warrant further investigation with contrast enhancement and possibly a biopsy for definitive diagnosis.",
      stroke: "I don't see evidence of an acute stroke on this particular scan. The diffusion-weighted sequences don't demonstrate restricted diffusion that would indicate acute ischemia. However, a clinical correlation with the patient's symptoms is always recommended.",
      abnormal: "The scan does show an abnormality in the right temporal lobe region. It appears as an area of altered signal intensity measuring approximately 2.3 x 1.8 cm with minimal surrounding edema. This finding requires further characterization.",
      normal: "The overall brain structure appears within normal limits. Ventricles are of normal size, no midline shift is observed, and the gray-white matter differentiation is preserved. No focal lesions or abnormal enhancement patterns are identified.",
      contrast: "This scan was performed without contrast. For better characterization of any potential lesions, especially to evaluate for breakdown of the blood-brain barrier, a contrast-enhanced study would be beneficial.",
      atrophy: "There is no significant evidence of cortical atrophy on this scan. The sulcal and ventricular spaces appear age-appropriate without signs of pathological volume loss.",
      ventricles: "The ventricular system is of normal size and configuration. There is no evidence of hydrocephalus or ventricular compression.",
    };

    // Check if the question contains keywords
    const questionLower = question.toLowerCase();
    for (const [keyword, response] of Object.entries(commonResponses)) {
      if (questionLower.includes(keyword)) {
        return response;
      }
    }

    // Default response if no keywords match
    return "Based on the provided MRI scan, I can see the brain structures appear to be within normal anatomical parameters. I don't see any obvious pathology in the specific area you're asking about, but for a definitive clinical assessment, I'd recommend reviewing this with the radiologist or neurologist directly.";
  };

  const placeholderQuestions = [
    "Is there any evidence of a tumor?",
    "Do you see signs of abnormal tissue?",
    "How do the ventricles look?",
    "Is there any indication of stroke?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <Card className="neo-blur">
        <CardHeader>
          <CardTitle className="text-gradient">Visual Q&A</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 px-4">
            <div className="space-y-4 py-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <BrainCircuit className="mx-auto h-8 w-8 mb-2 text-neuro-accent opacity-80" />
                  <p>Ask questions about the MRI scan</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {placeholderQuestions.map((q, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-xs h-auto py-1.5"
                          onClick={() => {
                            setQuestion(q);
                          }}
                        >
                          {q}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-neuro-accent text-white'
                            : 'bg-neuro-secondary text-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              
              {isAnswering && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-neuro-secondary text-gray-200 px-4 py-2 rounded-lg max-w-[80%]">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 bg-neuro-accent rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-neuro-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-neuro-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-sm text-gray-400">AI thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about the MRI scan..."
              className="bg-neuro-darker/70"
              disabled={!imageFile || isAnswering}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!imageFile || !question.trim() || isAnswering}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionAnswerPanel;
