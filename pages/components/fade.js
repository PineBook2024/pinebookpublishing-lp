import { motion } from 'framer-motion';
import { useInView } from "framer-motion"
import { useRef } from 'react';



export default function AnimateFade({type, children}){
    // const control = useAnimation()
    // const [ref] = useInView(0)
    // useEffect(() => {
    //     if (inView) {
    //       control.start("visible");
    //     } 
    //   }, [control, inView]);


    switch (type) {
        case "top":
            return (
                <motion.div 
                    // ref={ref}    
                    initial={{opacity: 0, y: 700}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeIn"}}
                    >
                        {children}
                </motion.div>
            );
            case "bottom":
            return (
                <motion.div 
                    // ref={ref}
                    initial={{opacity: 0, y: -700}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.8, ease: "easeIn"}}
                    >
                        {children}
                </motion.div>
            );
            case "right":
            return (
                <motion.div 
                    // ref={ref}
                    initial={{opacity: 0, x: -300}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1.9, ease: "easeIn"}}
                    >
                        {children}
                </motion.div>
            );
            case "left":
            return (
                <motion.div 
                    // ref={ref}
                    initial={{opacity: 0, x: 300}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1.8, ease: "easeIn"}}
                    >
                        {children}
                </motion.div>
            );
    
        default:
            break;
    }
}