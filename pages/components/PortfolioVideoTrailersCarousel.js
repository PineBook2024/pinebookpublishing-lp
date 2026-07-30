import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videoTrailers = [
    { id: "GXBJEw7nzQ0", url: "https://youtu.be/GXBJEw7nzQ0?si=NBuKF2FgXZ0ILI-T" },
    { id: "wxQ34HyePTo", url: "https://youtu.be/wxQ34HyePTo?si=mj-EVoZYcTmwKUXu" },
    { id: "nPwzZDdIYxw", url: "https://youtu.be/nPwzZDdIYxw?si=geUE3pwBybOEcOhd" },
    { id: "JAT1XuWNCTs", url: "https://youtu.be/JAT1XuWNCTs?si=aD-T-9zuGBLlGfE4" },
    { id: "dCP4ierbO_Y", url: "https://www.youtube.com/watch?v=dCP4ierbO_Y&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=6" },
    { id: "SZvaKio_X_Q", url: "https://www.youtube.com/watch?v=SZvaKio_X_Q&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=7" },
    { id: "IYviqGuF26I", url: "https://www.youtube.com/watch?v=IYviqGuF26I&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=8" },
    { id: "YRJUth1YILs", url: "https://www.youtube.com/watch?v=YRJUth1YILs&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=9" },
    { id: "dk9nFbw5K1o", url: "https://www.youtube.com/watch?v=dk9nFbw5K1o&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=10" },
    { id: "mrufdG3C8ts", url: "https://www.youtube.com/watch?v=mrufdG3C8ts&list=PLMlqRcwWCiRqTCwnDfVoLjI_LSf9xChX9&index=11" },
];

const getEmbedUrl = (id) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

const getThumbUrl = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const loadYouTubePlayerApi = () => {
    if (window.YT?.Player) return Promise.resolve(window.YT);

    return new Promise((resolve) => {
        const previousReadyHandler = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            previousReadyHandler?.();
            resolve(window.YT);
        };

        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(script);
        }
    });
};

export default function PortfolioVideoTrailersCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIframeRef = useRef(null);
    const playerRef = useRef(null);
    const wrap = (value) => (value + videoTrailers.length) % videoTrailers.length;

    const moveLeft = () => setActiveIndex((index) => wrap(index - 1));
    const moveRight = () => setActiveIndex((index) => wrap(index + 1));

    useEffect(() => {
        let cancelled = false;

        loadYouTubePlayerApi().then((YT) => {
            if (cancelled || !activeIframeRef.current) return;

            playerRef.current = new YT.Player(activeIframeRef.current, {
                events: {
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            setActiveIndex((index) => wrap(index + 1));
                        }
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            playerRef.current?.destroy?.();
            playerRef.current = null;
        };
    }, [activeIndex]);

    const visibleVideos = [-2, -1, 0, 1, 2].map((level) => {
        const index = wrap(activeIndex + level);
        return {
            ...videoTrailers[index],
            index,
            level,
        };
    });

    return (
        <section className="portfolio-video-trailers-section">
            <div className="portfolio-video-trailers-inner">
                <div className="portfolio-video-trailers-head">
                    <h2 className="text-3xl font-medium mb-10 text-black">Book Video Trailer</h2>
                </div>

                <div className="portfolio-video-carousel-panel noselect">
                    <div className="portfolio-video-carousel-stage">
                        {visibleVideos.map((video) => {
                            const levelClass = video.level < 0 ? `level-negative-${Math.abs(video.level)}` : `level-${video.level}`;
                            const isActive = video.level === 0;

                            return (
                                <article
                                    className={`portfolio-video-carousel-item ${levelClass}`}
                                    key={`${video.id}-${video.level}`}
                                    onClick={() => !isActive && setActiveIndex(video.index)}
                                >
                                    {isActive ? (
                                        <iframe
                                            ref={activeIframeRef}
                                            src={getEmbedUrl(video.id)}
                                            title="Active book trailer"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
                                            <img src={getThumbUrl(video.id)} alt="Book trailer thumbnail" loading="lazy" />
                                            <span className="portfolio-video-carousel-play" aria-hidden="true" />
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    <div className="portfolio-video-carousel-controls">
                        <button
                            type="button"
                            className="portfolio-video-carousel-arrow"
                            onClick={moveLeft}
                            aria-label="Previous trailer"
                        >
                            <ChevronLeft size={24} strokeWidth={3} />
                        </button>
                        <button
                            type="button"
                            className="portfolio-video-carousel-arrow"
                            onClick={moveRight}
                            aria-label="Next trailer"
                        >
                            <ChevronRight size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                <hr className="portfolio-video-trailers-rule" />
            </div>
        </section>
    );
}
