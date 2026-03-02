import Slider from "react-slick";

export default function GallerySlider() {
  const settings = { dots: true, infinite: true };

  return (
    <Slider {...settings}>
      {[1,2,3].map(i => (
        <img
          key={i}
          src={`https://source.unsplash.com/1200x500/?restaurant&sig=${i}`}
          className="h-96 object-cover"
        />
      ))}
    </Slider>
  );
}
