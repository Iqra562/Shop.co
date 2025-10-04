

import React, { Children, useEffect, useState } from "react";

 function StarfieldBackground({children}) {
  const [dots, setDots] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const count = 10;
  const size = 3 ;
  const seed = null

  function createRng(seedValue) {
    let s = seedValue == null ? Math.random() * 1e9 : seedValue;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

//   useEffect(() => {
//     // update container size so dots can be positioned correctly
//     function updateSize() {
//       setDimensions({ width: window.innerWidth, height: window.innerHeight });
//     }
//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

  useEffect(() => {
    const rng = createRng(seed == null ? null : seed);
    const newDots = Array.from({ length: count }).map(() => {
      const margin = Math.max(size, 8);
      const left = Math.floor(margin + rng() * Math.max(0, (window.innerWidth ) - margin * 2));
      const top = Math.floor(margin + rng() * Math.max(0, (window.innerHeight ) - margin * 2));
      const opacity = 0.75 + rng() * 0.25;
      return { left, top, opacity };
    });
    setDots(newDots);
  }, [count, size, seed]);

  

  return (
    <div className="min-h-screen w-full relative  overflow-hidden">
      
      <div className="absolute inset-0" aria-hidden>
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.left - size / 2,
              top: d.top - size / 2,
              width: size,
              height: size,
              borderRadius: "0%",
              transform: "translateZ(0)",
              backgroundColor: "#000",
              opacity: d.opacity,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      <div className="relative  liquidGlassEffectForHeader w-full h-screen">
     {children}
      </div>
       
    </div>
  );
}
export {StarfieldBackground }