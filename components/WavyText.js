import { motion, Variants } from "framer-motion";
import PropTypes from 'prop-types';


const WavyText = ({ text = "", delay = 0, duration = 0.05, replay, style, className }) => {
    const lines = text.split('\n');

    const container = {
        hidden: {
            opacity: 0
        },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: i * delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
            <motion.div
                style={{ display: "flex", flexDirection: "column", overflow: "hidden", ...style }}
                className={className}
                variants={container}
                initial="hidden"
                animate={replay ? "visible" : "hidden"}
            >
                {lines.map((line, lineIndex) => (
                    <motion.h1
                        key={lineIndex}
                        style={{ display: "flex", flexWrap: 'wrap', letterSpacing: '1px', lineHeight: '55px' }}
                    >
                        {Array.from(line).map((letter, letterIndex) => (
                            <motion.span key={letterIndex} variants={child}>
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </motion.h1>
                ))}
            </motion.div>
    );
};

export default WavyText;
