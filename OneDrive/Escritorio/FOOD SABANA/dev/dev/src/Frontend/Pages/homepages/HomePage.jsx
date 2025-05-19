import Hero from "./Sections/Hero";
import CallToAction from "./Sections/CallToAction";
import FeaturedProducts from "./Sections/FeaturedProduct";

function HomePage() {
  return (
    <div className="pt-16">
      <Hero />
<FeaturedProducts/>
      <CallToAction />
    </div>
  );
}

export default HomePage;
