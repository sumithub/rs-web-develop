"use client"
import "../../styles/progress-bar.css"

export default function ProgressTopBar({ stepTitle1, stepTitle2, stepTitle3, stepTitle4, stepTitle5, currentStep, class_ = "" }) {
    const step = currentStep

    const getStepStatus = (stepNumber) => {
        if (step > stepNumber) return { class: "completed", content: stepNumber }
        if (step === stepNumber) return { class: "active", content: stepNumber }
        return { class: "pending", content: stepNumber }
    }

    const getLineClass = (stepNumber) => {
        return step > stepNumber ? "completed" : "pending"
    }

    const steps = [
        { number: 1, title: stepTitle1 },
        { number: 2, title: stepTitle2 },
        { number: 3, title: stepTitle3 },
        { number: 4, title: stepTitle4 },
        { number: 5, title: stepTitle5 }
    ].filter(s => s.title)

    return (
        <div className={`flex justify-center items-center md:mb-10 mb-6 ${class_}`}>
            <div className="flex items-center mb-7">
                {steps.map((stepItem, index) => {
                    const stepStatus = getStepStatus(stepItem.number)
                    const isLastStep = index === steps.length - 1

                    return (
                        <div key={stepItem.number} className="flex items-center">
                            <div
                                className={`steps ${stepStatus.class}`}
                                role="button"
                                onClick={() => {
                                    if (step > stepItem.number) {
                                        // setStep(stepItem.number) - uncomment when you need navigation
                                    }
                                }}
                            >
                                <span className="step-number">{stepStatus.content}</span>
                                <div className={`step-title ${step === stepItem.number ? "show" : "hide"}`}>
                                    {stepItem.title}
                                </div>
                            </div>

                            {!isLastStep && (
                                <span className={`line ${getLineClass(stepItem.number)}`}></span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}