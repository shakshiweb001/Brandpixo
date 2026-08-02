import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { blogPosts, getBlogPost } from '../data/blogPosts';

const SITE_NAME = 'BrandPixo';
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://brandpixo.com').replace(/\/$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

const baseDescription = 'BrandPixo is a premium creative digital agency for luxury websites, brand identity, UI/UX design, SEO, social media, and performance marketing.';

const staticMeta = {
  '/': {
    title: 'BrandPixo | Premium Creative Digital Agency',
    description: baseDescription,
    keywords: 'creative digital agency, luxury website design, brand identity, UI UX design, web development, digital marketing agency'
  },
  '/about': {
    title: 'About BrandPixo | Luxury Digital Studio',
    description: 'Meet BrandPixo, a strategy-led digital studio crafting refined brand identities, premium websites, and growth-focused digital experiences.',
    keywords: 'about BrandPixo, luxury digital studio, premium branding agency, creative web agency'
  },
  '/blog': {
    title: 'BrandPixo Journal | Branding, Design & Growth Insights',
    description: 'Explore BrandPixo insights on luxury website design, brand strategy, conversion architecture, and premium digital experiences.',
    keywords: 'branding blog, web design insights, luxury digital design, conversion design, brand strategy'
  },
  '/contact': {
    title: 'Contact BrandPixo | Start a Premium Digital Project',
    description: 'Contact BrandPixo to plan a premium website, brand identity, UI/UX design, SEO, or digital marketing project.',
    keywords: 'contact BrandPixo, website design inquiry, branding agency contact, digital project consultation'
  },
  '/services': {
    title: 'Services | BrandPixo Creative Digital Agency',
    description: 'Explore BrandPixo services across website development, WordPress, Shopify, UI/UX design, brand identity, SEO, social media, and performance marketing.',
    keywords: 'website development services, UI UX design services, brand identity design, SEO optimization, performance marketing'
  }
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const upsertJsonLd = (id, data) => {
  let element = document.head.querySelector(`script#${id}`);
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

const servicePath = '/services/';
const blogPath = '/blog/';

const getRouteMeta = (pathname) => {
  if (pathname.startsWith(servicePath)) {
    const serviceId = pathname.replace(servicePath, '');
    const service = servicesData[serviceId];

    if (service) {
      return {
        title: `${service.title} | BrandPixo Services`,
        description: `${service.tagline} ${service.aboutText}`,
        keywords: `${service.title}, ${service.category}, BrandPixo services, premium ${service.category.toLowerCase()} agency`,
        image: service.heroImage,
        type: 'service',
        service
      };
    }
  }

  if (pathname.startsWith(blogPath) && pathname !== '/blog') {
    const slug = pathname.replace(blogPath, '');
    const post = getBlogPost(slug);

    if (post) {
      return {
        title: `${post.title} | BrandPixo Journal`,
        description: post.excerpt,
        keywords: `${post.category}, luxury digital design, BrandPixo journal, premium website strategy`,
        image: post.image,
        type: 'article',
        post
      };
    }
  }

  return {
    ...staticMeta[pathname],
    image: DEFAULT_IMAGE,
    type: 'website'
  };
};

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeMeta = getRouteMeta(pathname);
    const canonicalPath = pathname === '/' ? '' : pathname;
    const canonical = `${SITE_URL}${canonicalPath}`;
    const title = routeMeta.title || staticMeta['/'].title;
    const description = (routeMeta.description || staticMeta['/'].description).slice(0, 220);
    const image = routeMeta.image || DEFAULT_IMAGE;

    document.documentElement.setAttribute('lang', 'en');
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: routeMeta.keywords || staticMeta['/'].keywords });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' });
    upsertMeta('meta[name="author"]', { name: 'author', content: SITE_NAME });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#F7F5F2' });

    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: routeMeta.type === 'article' ? 'article' : 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    upsertLink('canonical', canonical);

    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@brandpixo.com',
        telephone: '+1-555-019-2834',
        contactType: 'sales'
      }
    };

    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    };

    let pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
      isPartOf: { '@id': `${SITE_URL}/#website` }
    };

    if (routeMeta.type === 'article' && routeMeta.post) {
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: routeMeta.post.title,
        description: routeMeta.post.excerpt,
        image: routeMeta.post.image,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: canonical
      };
    }

    if (routeMeta.type === 'service' && routeMeta.service) {
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: routeMeta.service.title,
        description,
        provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        serviceType: routeMeta.service.category,
        url: canonical
      };
    }

    upsertJsonLd('brandpixo-organization-schema', organization);
    upsertJsonLd('brandpixo-website-schema', { ...website, '@id': `${SITE_URL}/#website` });
    upsertJsonLd('brandpixo-page-schema', pageSchema);
  }, [pathname]);

  return null;
}
