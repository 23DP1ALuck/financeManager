import { motion } from "framer-motion";
import {Transition} from "motion";

const Loading = () => {
    const loadingContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        height: "100%",
    }
    const loadingCircle ={
        display: "block",
        width: "1rem",
        height: "1rem",
        backgroundColor: "#555",
        borderRadius: "50%",
    }
    const loadingContainerVariants = {
        start: {
            transition: {
                staggerChildren: 0.2
            }
        },
        end: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    const loadingCircleVariants = {
        start: {
            y: "0%"
        },
        end: {
            y: "100%"
        }
    };
    const loadingCircleTransition : Transition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
    };

    return(
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>

    );
}
export default Loading;