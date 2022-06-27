import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Banner() {
  return (
    <div className="relative">
      <div className="absolute z-20 w-full h-32 bottom-0
      bg-gradient-to-t from-white to-transparent"/>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div><img loading="lazy" src="/banner-1.jpg" alt="" /></div>
        <div><img loading="lazy" src="/banner-2.jpg" alt="" /></div>
        <div><img loading="lazy" src="/banner-3.jpg" alt="" /></div>
      </Carousel>
    </div>
  );
}

export default Banner;
