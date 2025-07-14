import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandAudioPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };


    return (
        <>
            <div className="mt-10 audioPlayer">
                <audio controls src={src} autoPlay={false} controlsList="nodownload" />
            </div>
        </>
    );
}