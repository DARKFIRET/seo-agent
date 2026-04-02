export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  schema?: Record<string, unknown>;
}

export function updateSEO(config: SEOConfig) {
  // Update title
  document.title = config.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', config.description);

  // Update or create meta keywords
  if (config.keywords && config.keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', config.keywords.join(', '));
  }

  // Update OG tags
  if (config.og) {
    updateOGTags(config.og);
  }

  // Update Twitter tags
  if (config.twitter) {
    updateTwitterTags(config.twitter);
  }

  // Add Schema.org structured data
  if (config.schema) {
    updateSchemaOrgData(config.schema);
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

function updateOGTags(og: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  const ogFields = {
    'og:title': og.title,
    'og:description': og.description,
    'og:image': og.image,
    'og:url': og.url,
    'og:type': og.type || 'website',
  };

  Object.entries(ogFields).forEach(([property, content]) => {
    if (content) {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }
  });
}

function updateTwitterTags(twitter: {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
}) {
  const twitterFields = {
    'twitter:card': twitter.card || 'summary_large_image',
    'twitter:title': twitter.title,
    'twitter:description': twitter.description,
    'twitter:image': twitter.image,
  };

  Object.entries(twitterFields).forEach(([name, content]) => {
    if (content) {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }
  });
}

function updateSchemaOrgData(schema: Record<string, unknown>) {
  // Remove existing schema script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new schema script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'НОБЕРЛИН',
  description: 'Цифровое агентство. Помогаем компаниям привлекать целевой трафик через SEO и Яндекс Директ',
  image: 'https://luminaagency.com/logo.png',
  url: 'https://luminaagency.com',
  telephone: '+7 (999) 999-99-99',
  email: 'info@luminaagency.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Moscow, Russia',
    addressCountry: 'RU',
  },
  sameAs: [
    'https://www.facebook.com/luminaagency',
    'https://www.instagram.com/luminaagency',
    'https://www.linkedin.com/company/luminaagency',
  ],
};
