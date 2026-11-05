export default function Hero({ Component = null, videoSrc = "/brand-img/brand-vid-new.mp4" }) {
  return (
    <section className="main-banner-vid flex items-center justify-center gap-4 py-14 h-full" style={{ position: "relative", isolation: "isolate", overflow: "hidden", backgroundImage: "none" }}>
      <video
        className="vide"
        id="vide"
        autoPlay={true}
        loop={true}
        playsInline
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1, pointerEvents: "none" }}
        muted
        controls={false}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* <source src="https://videos.ctfassets.net/0g2c0d4v74kt/7JddRckDmiDTFoj2zkuibz/19a06bc6173d8b205ead99ba8b0a0307/brand-vid.mp4" /> */}

      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(3, 8, 18, 0.72), rgba(3, 8, 18, 0.45))" }} />
        {Component ? <Component /> : ''}
    </section>
  );
}