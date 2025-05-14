import { useTheme } from '@/context/theme-provider';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useHeroSlider } from '@/context/HeroSliderContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import useProductNavigation from '@/hooks/useProductNavigation';
import ProductCard from '@/components/ProductCard';
import HomeSkeleton from '@/components/Skeletons/HomeSkeleton'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Home = () => {
  const theme = useTheme();
  const slides = useHeroSlider();
  const { products } = useProductContext();
  const { goToProduct } = useProductNavigation();

  const newArrivals = products.filter((product) => product.tags.toLocaleLowerCase().includes('new arrival'));
  const bestSeller = products.filter((product) => product.tags.toLocaleLowerCase().includes('best seller'));
  const discounted = products.filter((product) => product.tags.toLocaleLowerCase().includes('discounted'));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSlideIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (newArrivals.length === 0 || bestSeller.length === 0 || products.length === 0) {
    return <HomeSkeleton />
  }

  return (
    <div className="">
      {/* Hero Banner Section */}
      <div className="z-10 w-full flex justify-center py-4 relative">
        <div className="overflow-hidden w-full px-2 md:w-11/12 relative" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] flex justify-center mx-2">
                <Link to={`/${slide.category.toLowerCase()}`} className="w-full">
                  <img
                    src={slide.url}
                    alt={`hero banner ${index}`}
                    className="shadow-lg object-cover w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-[5px] cursor-pointer"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="slide-indicator flex items-center gap-2 absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${index === slideIndex
                  ? 'bg-orange-500'
                  : theme.theme === 'dark'
                    ? 'bg-gray-700'
                    : 'bg-gray-300'
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Categories Preview */}
      <div className="mt-12  px-2 sm:px-6 md:px-12 lg:px-16">

        <h2 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-12 text-center">
          Our Top Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[
            "https://i.pinimg.com/736x/c3/b8/d6/c3b8d6fa8f48e4ff98ff5d69408bc16c.jpg",
            "https://i.pinimg.com/736x/cc/c0/ed/ccc0ed1d2a193e20b6cf26e051b5df97.jpg",
            "https://i.pinimg.com/736x/60/09/91/60099117ae97c9698bd790ae079bed8d.jpg",
            "https://i.pinimg.com/736x/ee/43/92/ee4392e36391392788dbb4e1b3845eec.jpg",
            "https://i.pinimg.com/736x/0d/be/18/0dbe18421a5230e8129a8f605deb61a4.jpg",
            "https://i.pinimg.com/736x/62/a6/89/62a689b7c97e2af3c214d6f294f9eaea.jpg",
            "https://img.freepik.com/free-vector/perfume-bottle-black-silk-fabric_107791-1390.jpg",
            "https://img.freepik.com/free-vector/cosmetics-face-cream-jar-tube-water-splash_107791-2129.jpg",
            "https://img.freepik.com/free-psd/black-friday-big-sale-social-media-post-design-template_47987-25239.jpg",
          ].map((src, idx) => (
            <div
              key={idx}
              className={`h-44 flex items-center justify-center rounded-[5px] overflow-hidden border cursor-pointer ${(idx > 3) ? "sm:block hidden" : ""}`}
            >
              <img
                src={src}
                alt={`Category ${idx}`}
                className="h-full w-full hover:scale-105 duration-500 object-cover"
              />
            </div>
          ))}
        </div>

        {/* New Arrivals */}
        <div className="products-for-you py-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {newArrivals.slice(0, 10).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() =>
                  goToProduct(product.subCategory, product.id, product)
                }
              />
            ))}
          </div>
        </div>

        {/* New discounted */}
        <div className="products-for-you py-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
            Discounted
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {discounted.slice(0, 10).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() =>
                  goToProduct(product.subCategory, product.id, product)
                }
              />
            ))}
          </div>
        </div>

        {/* New Best Seller */}
        <div className="products-for-you py-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
            Best Seller
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {bestSeller.slice(0, 10).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() =>
                  goToProduct(product.subCategory, product.id, product)
                }
              />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-50 dark:bg-[#1c1917] py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-gray-500 mb-6">Stay updated with our latest offers, new arrivals, and exclusive discounts.</p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Input placeholder="Enter your email address" className="max-w-md rounded-[5px] shadow-none" />
                <Button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-[5px] w-fit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
