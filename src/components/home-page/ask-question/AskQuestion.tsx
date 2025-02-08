"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'


const AskQuestion = () => {

    const [item, setItem] = useState<number | null>(null)

    const accordions = [
        { id: 1, title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { id: 2, title: "Is it styled??", content: "Yes. It comes with default styles that matches the other components&apos; aesthetic." },
    ]

    return (
        <div className='flex flex-col gap-4 items-center px-[20px]'>
            <div className='text-center flex flex-col items-center'>
                <h2 className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%]'>Frequently Ask Question</h2>
                <p className='text-muted-foreground text-md lg:max-w-[80%] mt-4'>
                    We use only the best quality materials on the market in order to provide the best products to our patients.
                </p>
            </div>
            <div className='lg:w-[60%] md:w-[80%] w-full mt-6'>
                <Accordion type="single" collapsible className="w-full">
                    {accordions.map((accordion, i) => (
                        <AccordionItem onClick={() => setItem(i + 1)}
                            className={`${accordion.id === item ? "bg-mid-blue text-white rounded-lg p-3" : ""} mt-3`}
                            key={i} value={`item-${i + 1}`}>
                            <AccordionTrigger className='text-xl'>{accordion.title}</AccordionTrigger>
                            <AccordionContent className='text-sm'>
                                <div className="h-[1px] mb-4 w-full bg-slate-400"></div>
                                {accordion.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default AskQuestion