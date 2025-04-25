
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCog } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-6 px-8"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <BrainCog className="h-8 w-8 text-neuro-accent" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-gradient">NeuroInsight</h1>
          <p className="text-sm text-muted-foreground">AI-Powered Brain MRI Analysis</p>
        </div>
      </div>
      
      <motion.div 
        className="hidden md:flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neuro-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neuro-accent"></span>
        </span>
        <span className="text-sm">AI Processing Active</span>
      </motion.div>
    </motion.header>
  );
};

export default Header;
