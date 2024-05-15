export default function BrandBannerVideo({ Component = null }) {
    return (
      <section className="brand-main-banner-video flex items-center justify-center gap-4 py-14 h-full">
        <video
          className="brand-video"
          id="brandVideo"
          autoPlay={true}
          loop={true}
          muted
          controls={false}
        >
          <source src="/images/brand-vid.mp4" />
          {/* <source src="https://videos.ctfassets.net/0g2c0d4v74kt/7JddRckDmiDTFoj2zkuibz/19a06bc6173d8b205ead99ba8b0a0307/brand-vid.mp4" /> */}
  
        </video>
        {Component ? <Component /> : ''}
      </section>
    );
  }