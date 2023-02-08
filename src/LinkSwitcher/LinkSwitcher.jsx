import { motion } from "framer-motion";
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const LinkSwitcher = ({ children }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7 }}
        >
            {children}
            <motion.div
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
        </motion.div>
        
    );
};
export default LinkSwitcher;