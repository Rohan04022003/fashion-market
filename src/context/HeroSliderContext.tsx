import { HeroSlide } from '@/types/types';
import React, { createContext, useContext } from 'react';
import women_slide from "../assets/women-slide.jpg"
import men_slide from "../assets/men-slide.jpg"
import kids_slide from "../assets/kids-slide.jpg"
import cusmetics_slide from "../assets/cusmetics-slide.jpg"
import shoes_slide from "../assets/shoes-slide.jpg"
import electronics_slide from "../assets/electronics-slide.jpg"

const heroSliderData: HeroSlide[] = [
  {
    url: women_slide,
    category: 'Women',
    description: 'Discover elegant and trendy outfits designed to elevate your everyday style.'
  },
  {
    url: men_slide,
    category: 'Men',
    description: 'Explore the latest fashion trends for men – from casual wear to formal essentials.'
  },

  {
    url: kids_slide,
    category: 'Kids',
    description: 'Fun, vibrant, and comfy clothing options for the little fashion icons.'
  },
  {
    url: cusmetics_slide,
    category: 'Cusmetics',
    description: 'Fragrances that define you – fresh, bold, and long-lasting scents for all moods.'
  },
  {
    url: shoes_slide,
    category: 'Shoes',
    description: 'Step into style with our premium collection of sneakers, boots, and formal shoes.'
  },
  {
    url: electronics_slide,
    category: 'Electronics',
    description: 'Discover the latest electronics – smart gadgets, high-tech devices, and more to upgrade your life.'
  }
];

const HeroSliderContext = createContext<HeroSlide[]>([]);

// eslint-disable-next-line react-refresh/only-export-components
export const useHeroSlider = () => useContext(HeroSliderContext);

export const HeroSliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HeroSliderContext.Provider value={heroSliderData}>
      {children}
    </HeroSliderContext.Provider>
  );
};
