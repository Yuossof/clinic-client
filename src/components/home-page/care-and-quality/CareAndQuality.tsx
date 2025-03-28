'use client';

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const CareAndQuality = () => {
    return (
        <section className='flex lg:justify-between md:px-[65px] px-[10px] lg:px-[70px] lg:flex-row flex-col'>
            <div className='flex flex-col gap-12 flex-1 lg:items-start items-center pt-3 lg:pt-[24px]'>
                <div className='flex flex-col gap-7 lg:text-left text-center'>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                        className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl text-dark-blue lg:max-w-[80%] '>
                        Leave your worries at the door and enjoy a healthier, more precise smile
                    </motion.h2>
                    <motion.p
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                        className='text-muted-foreground text-md lg:max-w-[80%]'>
                        We use only the best quality materials on the market in order to provide the best products to our patients,
                        So don’t worry about anything and book yourself.
                    </motion.p>
                </div>
                <motion.button
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                    className='h-14 bg-mid-blue text-white rounded-md p-2'>Book an appointment</motion.button>
            </div>
            <motion.div
                initial={{ x:50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                className='lg:w-2/4 w-full relative lg:flex lg:justify-end justify-center lg:mt-0 mt-14 flex'>
                <Image src="/images/Group 1000001024.png" alt='img'
                    width={500}
                    height={400}
                    priority
                    className='md:scale-90'
                />
            </motion.div>
        </section>
    )
}

export default CareAndQuality