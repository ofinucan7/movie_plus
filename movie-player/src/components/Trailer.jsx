import React, { useMemo, useCallback, useState } from "react";

const Trailer = () => {
  const trailers = useMemo(
    () => [
      "dune2.mp4",
      "everything-everywhere.mp4",
    ],
    []
  );

  const getRandomTrailer = useCallback(
    (exclude) => {
      const filtered = trailers.filter((t) => t !== exclude);
      return filtered[Math.floor(Math.random() * filtered.length)];
    },
    [trailers]
  );

  const [curTrailer, setCurTrailer] = useState(() => {
    return trailers[Math.floor(Math.random() * trailers.length)];
  });

  const handleTrailerEnd = () => {
    const nextTrailer = getRandomTrailer(curTrailer);
    setCurTrailer(nextTrailer);
  };

  const trailerPath = `/movieTrailers/${curTrailer}`;

  return (
    <div className="relative w-full h-[110vh] bg-black text-white overflow-hidden">
      
      {/* trailer itself */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video key={curTrailer} autoPlay muted loop onEnded={handleTrailerEnd} className="w-full h-full object-cover">
          <source src={trailerPath} type="video/mp4" /> Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* overlay content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-[1240px] mx-auto px-6 pb-28">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
          Any Movie, Whenever. <br />
          Only on <span className="text-[#3535df]">Movie+</span>
        </h1>

        <button onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })} className="mt-8 bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition">
          View Plans
        </button>
      </div>

    </div>
  );
};

export default Trailer;