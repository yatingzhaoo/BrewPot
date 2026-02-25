import { Pencil } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingButton() {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-[10px] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.1)] hover:opacity-90 transition-all"
        >
            <Pencil className="w-5 h-5" />
        </motion.button>
    );
}
