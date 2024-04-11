import React from 'react'
import { motion } from 'framer-motion'

const quote = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            // delay: 0.5,
            staggerChildren: 0.15
        }
    }
}

const singleWord = {
    initial: {
        opacity: 0,
        y: 50
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
}

const AnimatedText = ({ text, classes = "" }) => {

    return (
        <div className='flex items-center  justify-center'>
            <motion.h1 variants={quote} initial="initial" animate="animate" className={`inline-block w-full capitalize ${classes}`} >
                {text.split(" ").map((word, index) => (
                    <motion.span variants={singleWord} key={word + '-' + index} className='inline-block '>
                        {word} &nbsp;
                    </motion.span>
                ))}
            </motion.h1>
        </div>
    )
}

export default AnimatedText;