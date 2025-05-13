import React from 'react';

export default function ProgressBar() {
    return <main>
        <div className="w-full max-w-4xl mx-auto my-8 px-4">
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2"></div>

                {/* Progress Line Filled */}
                <div className="absolute top-1/2 left-0 w-1/6 h-1 bg-primary transform -translate-y-1/2"></div>

                {/* Step Circles with Numbers */}
                <div className="relative flex justify-between">
                    {/* Step 1 - Active */}
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium z-10">
                            01
                        </div>
                        <div className="mt-2 text-xs text-primary font-medium">Campaign Details</div>
                    </div>

                    {/* Step 2 - Inactive */}
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-text3 flex items-center justify-center text-text3 text-sm font-medium z-10">
                            02
                        </div>
                        <div className="mt-2 text-xs text-secondary font-medium">Customer Selection</div>
                    </div>

                    {/* Step 3 - Inactive */}
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-text-3 flex items-center justify-center text-text3 text-sm font-medium z-10">
                            03
                        </div>
                        <div className="mt-2 text-xs text-secondary font-medium">Template Selection</div>
                    </div>

                    {/* Step 4 - Inactive */}
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-text3 flex items-center justify-center text-text3 text-sm font-medium z-10">
                            04
                        </div>
                        <div className="mt-2 text-xs text-secondary font-medium">Scheduling & Launch</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
}