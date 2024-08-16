import React, { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

export const GradientBackground = () => {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      colors: [{
        "color": "#FF5373",
        "enabled": true
    },
    {
        "color": "#FFC858",
        "enabled": true
    },
    {
        "color": "#17E7FF",
        "enabled": true
    },
    {
        "color": "#6D3BFF",
        "enabled": true
    },
    {
        "color": "#f5e1e5",
        "enabled": false
    }
],
"speed": 4,
"horizontalPressure": 4,
"verticalPressure": 5,
"waveFrequencyX": 2,
"waveFrequencyY": 3,
"waveAmplitude": 5,
"shadows": 0,
"highlights": 2,
"colorBrightness": 1,
"colorSaturation": 7,
"wireframe": false,
"colorBlending": 6,
"backgroundColor": "#003FFF",
"backgroundAlpha": 1,
"resolution": 1
    });

    return () => gradientRef.current.destroy();
  }, [canvasRef]);

  return (
    <canvas
    style={{
      position: "fixed", // Ensure it's behind everything else
      top: 0,
      left: 0,
      zIndex: -1, // Send it to the background
      width: "100%",
      height: "100%",
    }}

      ref={canvasRef}
    />
  );
};