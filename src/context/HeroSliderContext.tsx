import { HeroSlide } from '@/types/types';
import React, { createContext, useContext } from 'react';

const heroSliderData: HeroSlide[] = [
    {
        url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/1b00dbc6-113d-4349-a8a7-683d39402a87/Leonardo_Phoenix_10_Create_a_visually_appealing_modern_ecommer_0.jpg',
        category: 'Women',
        description: 'Discover elegant and trendy outfits designed to elevate your everyday style.'
      },
  {
    url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/e673a708-2ab4-414d-9909-cbc712c70c0a/Leonardo_Phoenix_10_A_modern_colorful_ecommerce_banner_showcas_1.jpg',
    category: 'Men',
    description: 'Explore the latest fashion trends for men – from casual wear to formal essentials.'
  },

  {
    url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/30d35b55-86fb-4adf-a0d6-f8322aee1a7e/Leonardo_Phoenix_10_Create_a_visually_appealing_modern_ecommer_0.jpg',
    category: 'Kids',
    description: 'Fun, vibrant, and comfy clothing options for the little fashion icons.'
  },
  {
    url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/dbb9631e-5825-47f4-bb79-d648776d9087/Leonardo_Phoenix_10_Create_a_visually_appealing_banner_featuri_1.jpg',
    category: 'Cusmetics',
    description: 'Fragrances that define you – fresh, bold, and long-lasting scents for all moods.'
  },
  {
    url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/ca5cca1c-9fcb-427e-adfc-9cc233f47809/Leonardo_Phoenix_10_A_strikingly_vibrant_banner_showcasing_a_3_0.jpg',
    category: 'Shoes',
    description: 'Step into style with our premium collection of sneakers, boots, and formal shoes.'
  },
  {
    url: 'https://cdn.leonardo.ai/users/2ed5c08f-8685-4d97-8e8e-25315118fb58/generations/196585b0-a131-46d3-967e-218277fd828f/Leonardo_Phoenix_10_Create_a_vibrant_banner_for_a_websites_her_1.jpg',
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
