export default function Hero({ Component = null }){
    return (
        <section className="main-banner-vid flex items-center justify-center gap-4 py-14 h-full">
      <video
          className="vide"
          id="vide"
          autoPlay={true}
          loop={true}
          muted
          controls={false}
        >
          {/* <source src="https://pinebookpublishing.com/publishing-lp/assets/images/brand-vid.mp4" /> */}
          <source src="/images/brand-vid.mp4" />

        </video>
        { Component ? <Component /> : '' }
      </section>
    );
}