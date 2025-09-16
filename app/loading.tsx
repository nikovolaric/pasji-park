"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
  return (
    <div className="bg-neutral-gray fixed top-0 left-0 z-[999] h-dvh w-dvw">
      <div className="mt-20 h-48 w-auto">
        <DotLottieReact
          src="https://lottie.host/d6b9b7be-b172-4aec-915a-673cc9932dde/z4Cal8JEaZ.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}

export default Loading;
