import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { getBlogPost } from '../data/blogPosts';

const SITE_NAME = 'BrandPixo';
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://brandpixo.com').replace(/\/$/, '');
const SHARE_IMAGE = `${SITE_URL}/brandpixo-share.png`;
const EMAIL = 'brandpixo@gmail.com';
const PHONE = '+91-98053-12402';
const SOCIALS = ['https://www.instagram.com/', 'https://www.facebook.com/'];

const staticMeta = {
  '/': {
    title: 'BrandPixo | Digital Marketing Agency Chandigarh',
    description: 'BrandPixo is a digital marketing agency in Chandigarh offering SEO, social media, branding, web design and performance marketing.'
  },
  '/about': {
    title: 'About BrandPixo | Digital Agency Chandigarh',
    description: 'Meet BrandPixo, a Chandigarh digital agency combining brand strategy, web design, SEO and marketing to help ambitious businesses grow.'
  },
  '/services': {
    title: 'Digital Marketing Services Chandigarh | BrandPixo',
    description: 'Explore BrandPixo services in Chandigarh: SEO, social media marketing, performance campaigns, branding, UI/UX and website development.'
  },
  '/blog': {
    title: 'Digital Marketing Insights Chandigarh | BrandPixo',
    description: 'Read BrandPixo insights on SEO, branding, conversion, website design and digital marketing strategy for growing businesses.'
  },
  '/contact': {
    title: 'Contact Digital Agency Chandigarh | BrandPixo',
    description: 'Contact BrandPixo in Chandigarh for SEO, social media, branding, web design and performance marketing. Start your project on WhatsApp.'
  }
};

const truncate = (value, max) => value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
const titleWithBrand = (value) => truncate(`${value} | BrandPixo`, 59);
const cleanPath = (pathname) => pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

const routeDetails = (pathname) => {
  if (pathname.startsWith('/services/')) {
    const id = pathname.slice('/services/'.length);
    const service = servicesData[id];
    if (service) return {
      title: titleWithBrand(`${service.title} Chandigarh`),
      description: truncate(`${service.tagline} BrandPixo provides ${service.title.toLowerCase()} for businesses in Chandigarh and across India.`, 155),
      image: service.heroImage,
      type: 'website',
      service,
      breadcrumbs: [['Home', '/'], ['Services', '/services'], [service.title, pathname]]
    };
  }

  if (pathname.startsWith('/blog/')) {
    const post = getBlogPost(pathname.slice('/blog/'.length));
    if (post) return {
      title: titleWithBrand(post.title),
      description: truncate(post.excerpt, 155),
      image: post.image,
      type: 'article',
      post,
      breadcrumbs: [['Home', '/'], ['Blog', '/blog'], [post.title, pathname]]
    };
  }

  if (staticMeta[pathname]) {
    const labels = { '/about': 'About', '/services': 'Services', '/blog': 'Blog', '/contact': 'Contact' };
    return {
      ...staticMeta[pathname],
      image: SHARE_IMAGE,
      type: 'website',
      breadcrumbs: pathname === '/' ? [] : [['Home', '/'], [labels[pathname], pathname]]
    };
  }

  return {
    title: 'Page Not Found | BrandPixo',
    description: 'The requested BrandPixo page could not be found. Explore our digital marketing, branding and website services in Chandigarh.',
    image: SHARE_IMAGE,
    type: 'website',
    noindex: true,
    breadcrumbs: [['Home', '/'], ['Page not found', pathname]]
  };
};

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: `${SITE_URL}${path === '/' ? '' : path}`
  }))
});

export default function SEO() {
  const location = useLocation();
  const pathname = cleanPath(location.pathname.toLowerCase());
  const meta = routeDetails(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description: 'Digital marketing agency in Chandigarh offering SEO, social media marketing, branding, web design and performance marketing.',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: SHARE_IMAGE },
    email: EMAIL,
    telephone: PHONE,
    sameAs: SOCIALS,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressRegion: 'Punjab',
      addressCountry: 'IN'
    }
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: SHARE_IMAGE,
    url: SITE_URL,
    email: EMAIL,
    telephone: PHONE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressRegion: 'Punjab',
      addressCountry: 'India'
    },
    areaServed: ['Chandigarh', 'Punjab', 'India']
  };

  const pageSchema = meta.post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.post.title,
    description: meta.description,
    image: meta.image,
    mainEntityOfPage: canonical,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` }
  } : meta.service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta.service.title,
    description: meta.description,
    serviceType: meta.service.category,
    areaServed: { '@type': 'City', name: 'Chandigarh' },
    provider: { '@id': `${SITE_URL}/#organization` },
    url: canonical
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: canonical
  };

  const allServicesSchema = pathname === '/services' ? {
    '@context': 'https://schema.org',
    '@graph': Object.entries(servicesData).map(([id, service]) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/services/${id}#service`,
      name: service.title,
      description: service.aboutText,
      serviceType: service.category,
      areaServed: { '@type': 'City', name: 'Chandigarh' },
      provider: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}/services/${id}`
    }))
  } : null;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image || SHARE_IMAGE} />
      <meta property="og:image:alt" content="BrandPixo digital marketing agency in Chandigarh" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image || SHARE_IMAGE} />
      <meta name="twitter:image:alt" content="BrandPixo digital marketing agency in Chandigarh" />

      {pathname === '/' && <script type="application/ld+json">{JSON.stringify(organization)}</script>}
      {pathname === '/' && <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>}
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      {meta.breadcrumbs.length > 0 && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(meta.breadcrumbs))}</script>}
      {allServicesSchema && <script type="application/ld+json">{JSON.stringify(allServicesSchema)}</script>}
    </Helmet>
  );
}
