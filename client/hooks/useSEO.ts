import { useEffect } from 'react';
import { updateSEO, SEOConfig } from '@/lib/seo';

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    updateSEO(config);
  }, [JSON.stringify(config)]);
}
