import React, { useEffect, useRef, useState } from "react";

function Cursor({ position }) {
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const posRef = useRef(position);

  // keep latest mouse position in a ref
  useEffect(() => {
    posRef.current = position;
  }, [position]);

  useEffect(() => {
    let frameId;

    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.1,
        y: prev.y + (posRef.current.y - prev.y) * 0.1,
      }));
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className="fixed w-32 h-32 rounded-full bg-indigo-500 mix-blend-difference pointer-events-none z-50"
      style={{
        left: `${trailPos.x}px`,
        top: `${trailPos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default Cursor;
