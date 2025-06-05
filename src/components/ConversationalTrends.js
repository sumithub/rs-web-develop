
"use client";
import React, { useState, useEffect, useRef } from "react";

const WordCloud = ({
    positiveWords = [],
    negativeWords = [],
    neutralWords = [],
    width = 800,
    height = 500,
}) => {
    const [wordPositions, setWordPositions] = useState([]);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const processWords = () => {
        const allWords = [];

        const collect = (list, sentiment) => {
            list.forEach(word => {
                if (typeof word === "string") {
                    allWords.push({ text: word, sentiment, frequency: 1 });
                } else {
                    allWords.push({ ...word, sentiment });
                }
            });
        };

        collect(positiveWords, "positive");
        collect(negativeWords, "negative");
        collect(neutralWords, "neutral");

        return allWords
            .sort((a, b) => (b.frequency || 1) - (a.frequency || 1))
            .slice(0, Math.floor((width * height) / 2000)); // Limit words by area
    };

    const getTextDimensions = (text, fontSize) => {
        if (!canvasRef.current) return { width: text.length * fontSize * 0.5, height: fontSize };

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;

        const metrics = ctx.measureText(text);
        return {
            width: metrics.width + 16,
            height: fontSize + 8
        };
    };

    const calculateFontSize = (frequency, maxFreq) => {
        const minSize = Math.max(10, height / 40);
        const maxSize = Math.max(20, height / 12);
        return Math.floor(minSize + ((frequency || 1) / Math.max(maxFreq, 1)) * (maxSize - minSize));
    };

    const hasOverlap = (rect1, rect2, padding = 6) => {
        return !(
            rect1.x + rect1.width + padding < rect2.x ||
            rect2.x + rect2.width + padding < rect1.x ||
            rect1.y + rect1.height + padding < rect2.y ||
            rect2.y + rect2.height + padding < rect1.y
        );
    };

    const calculatePositions = () => {
        const words = processWords();
        if (words.length === 0) return [];

        const maxFreq = Math.max(...words.map(w => w.frequency || 1));
        const centerX = width / 2;
        const centerY = height / 2;
        const positions = [];
        const usedRects = [];

        words.forEach((word, index) => {
            const fontSize = calculateFontSize(word.frequency, maxFreq);
            const dimensions = getTextDimensions(word.text, fontSize);

            let position = null;
            let attempts = 0;
            const maxAttempts = 300;

            while (!position && attempts < maxAttempts) {
                let testPos;

                if (index === 0) {
                    testPos = {
                        x: centerX - dimensions.width / 2,
                        y: centerY - dimensions.height / 2
                    };
                } else if (attempts < 150) {
                    const angle = attempts * 0.4 + (Math.random() * 0.3);
                    const radius = Math.sqrt(attempts) * (Math.min(width, height) / 40) + (index * 8);
                    testPos = {
                        x: centerX + Math.cos(angle) * radius - dimensions.width / 2,
                        y: centerY + Math.sin(angle) * radius - dimensions.height / 2
                    };
                } else {
                    testPos = {
                        x: Math.random() * (width - dimensions.width - 40) + 20,
                        y: Math.random() * (height - dimensions.height - 40) + 20
                    };
                }

                if (testPos.x >= 20 &&
                    testPos.y >= 20 &&
                    testPos.x + dimensions.width <= width - 20 &&
                    testPos.y + dimensions.height <= height - 20) {

                    const testRect = {
                        x: testPos.x,
                        y: testPos.y,
                        width: dimensions.width,
                        height: dimensions.height
                    };

                    const hasCollision = usedRects.some(rect => hasOverlap(testRect, rect));

                    if (!hasCollision) {
                        position = testPos;
                        usedRects.push(testRect);
                    }
                }
                attempts++;
            }

            if (!position) {
                const fallbackCol = index % 6;
                const fallbackRow = Math.floor(index / 6);
                position = {
                    x: Math.min(width - 80, 30 + fallbackCol * 120),
                    y: Math.min(height - 40, 30 + fallbackRow * 50)
                };
                usedRects.push({
                    x: position.x,
                    y: position.y,
                    width: dimensions.width,
                    height: dimensions.height
                });
            }

            positions.push({
                ...word,
                x: position.x + dimensions.width / 2,
                y: position.y + dimensions.height / 2,
                fontSize,
                width: dimensions.width,
                height: dimensions.height
            });
        });

        return positions;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setWordPositions(calculatePositions());
        }, 100);
        return () => clearTimeout(timer);
    }, [positiveWords, negativeWords, neutralWords, width, height]);

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case "positive": return "#10B981";
            case "negative": return "#EF4444";
            case "neutral": return "#3B82F6";
            default: return "#6B7280";
        }
    };

    return (
        <div className="w-full mx-auto overflow-hidden">
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div
                ref={containerRef}
                className="relative"
                style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
            >
                {wordPositions.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <div className="text-lg">No words to display</div>
                            <div className="text-sm mt-2">Add words to see the visualization</div>
                        </div>
                    </div>
                ) : (
                    wordPositions.map((word, index) => (
                        <div
                            key={`${word.text}-${index}`}
                            className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10 select-none"
                            style={{
                                left: `${word.x}px`,
                                top: `${word.y}px`,
                                transform: "translate(-50%, -50%)",
                                fontSize: `${word.fontSize}px`,
                                color: getSentimentColor(word.sentiment),
                                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                padding: "6px 12px",
                                whiteSpace: "nowrap"
                            }}
                            title={`${word.text} (${word.sentiment}) - Frequency: ${word.frequency || 1}`}
                        >
                            {word.text}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Example usage component
export default function ConversationalTrends() {
    const positiveWords = [
        { text: "excellent", frequency: 45 },
        { text: "amazing", frequency: 38 },
        { text: "fantastic", frequency: 32 },
        { text: "wonderful", frequency: 28 },
        { text: "great", frequency: 52 },
        { text: "awesome", frequency: 41 },
        { text: "perfect", frequency: 35 },
        { text: "outstanding", frequency: 25 },
        { text: "brilliant", frequency: 22 },
        { text: "superb", frequency: 18 }
    ]

    const negativeWords = [
        { text: "terrible", frequency: 15 },
        { text: "awful", frequency: 12 },
        { text: "horrible", frequency: 18 },
        { text: "disappointing", frequency: 22 },
        { text: "worst", frequency: 8 },
        { text: "bad", frequency: 28 },
        { text: "slow", frequency: 32 },
        { text: "rude", frequency: 25 }
    ]

    const neutralWords = [
        { text: "service", frequency: 68 },
        { text: "food", frequency: 62 },
        { text: "staff", frequency: 48 },
        { text: "place", frequency: 45 },
        { text: "time", frequency: 38 },
        { text: "order", frequency: 42 },
        { text: "price", frequency: 35 },
        { text: "location", frequency: 28 },
        { text: "experience", frequency: 55 },
        { text: "restaurant", frequency: 40 },
        { text: "meal", frequency: 33 },
        { text: "customer", frequency: 30 }
    ]

    return (<WordCloud
        positiveWords={positiveWords}
        negativeWords={negativeWords}
        neutralWords={neutralWords}
        width={800}
        height={400}
    />);
}
