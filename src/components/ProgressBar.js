"use client"
import { useState } from "react"

export default function ProgressTopBar({ stepTitle1, stepTitle2, stepTitle3, stepTitle4, stepTitle5 }) {
    const [step, setStep] = useState(1)
    return (<main>
        <div className="flex justify-center items-center md:mb-10 mb-6 w-full">
            <div className="flex items-center mb-7">
                <div className={`steps ${step >= 1 ? "active" : ""}`} role="button" onClick={() => {
                    if (step > 1) {
                        setStep(1)
                    }
                }}>
                    {step > 1 ? "::" : <span className="font-semibold">1</span>}
                    <span></span>
                    <div className={`md:inline-block step-title font-medium ${step === 1 ? "inline-block" : "hidden"}`}>{stepTitle1}</div>
                </div>
                {stepTitle2 && <>
                    <span className={`line ${step >= 2 ? "active" : ""}`}></span>
                    <div className={`steps ${step >= 2 ? "active" : ""}`} role="button" onClick={() => {
                        setStep(2)
                    }}>
                        {step > 2 ? "::" : <span className="font-semibold">2</span>}
                        <span></span>
                        <div className={`md:inline-block step-title font-medium ${step === 2 ? "inline-block" : "hidden"}`}>{stepTitle2}</div>
                    </div>
                </>}
                {stepTitle3 && <><span className={`line ${step >= 3 ? "active" : ""}`}></span>
                    <div className={`steps ${step >= 3 ? "active" : ""}`} role="button" onClick={() => {
                        setStep(3)
                    }}>
                        {step > 3 ? "::" : <span className="font-semibold">3</span>}
                        <span></span>
                        <div className={`md:inline-block step-title font-medium ${step === 3 ? "inline-block" : "hidden"}`}>{stepTitle3}</div>
                    </div></>}
                {stepTitle4 && <><span className={`line ${step >= 4 ? "active" : ""}`}></span>
                    <div className={`steps ${step >= 4 ? "active" : ""}`} role="button" onClick={() => {
                        setStep(4)
                    }}>
                        {step > 4 ? "::" : <span className="font-semibold">4</span>}
                        <span></span>
                        <div className={`md:inline-block step-title font-medium ${step === 4 ? "inline-block" : "hidden"}`}>{stepTitle4}</div>
                    </div></>}

                {stepTitle5 && <><span className={`line ${step === 5 ? "active" : ""}`}></span>
                    <div className={`steps ${step === 5 ? "active" : ""}`} role="button"
                        onClick={() => { setStep(5) }}>
                        {step > 5 ? "::" : <span className="font-semibold">5</span>}
                        <span></span>
                        <div className={`md:inline-block step-title font-medium ${step === 5 ? "inline-block" : "hidden"}`}>{stepTitle5}</div>
                    </div></>}
            </div>
        </div>
    </main>
    )
}