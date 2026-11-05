export default function BrandBannerVideo({ Component = null }) {
    return (
      <section className="brand-main-banner-video flex items-center justify-center gap-4 h-full" style={{ position: "relative", isolation: "isolate", overflow: "hidden", backgroundImage: "none" }}>
        <video
          className="brand-video"
          id="brandVideo"
          autoPlay={true}
          loop={true}
          playsInline
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -1, pointerEvents: "none" }}
        muted
          controls={false}
        >
          <source src="/brand-img/Thanksgiving-video.mp4" type="video/mp4" />
          {/* <source src="https://videos.ctfassets.net/0g2c0d4v74kt/7JddRckDmiDTFoj2zkuibz/19a06bc6173d8b205ead99ba8b0a0307/brand-vid.mp4" /> */}
  
        </video>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(3, 8, 18, 0.72), rgba(3, 8, 18, 0.45))" }} />
        {Component ? <Component /> : ''}
      </section>
    );
  }