// next-seo.config.ts
const SEO = {
    title: 'World Mobile Club',
    description:
      'Connecting everyone, everywhere with the first blockchain-powered mobile network World Mobile Chain. Join the movement to bridge the digital divide.',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://wmtx.worldmobile.club/', // Update to your website URL
      site_name: 'World Mobile Club',
      images: [
        {
          url: '/images/club_logo.png', // Path to the logo in the public folder
          width: 800,
          height: 600,
          alt: 'World Mobile Club Logo',
        },
      ],
    },
    twitter: {
      handle: '@coffee_wmtx',
      site: '@worldmobileclub',
      cardType: 'summary_large_image',
    },
    additionalSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'World Mobile Club',
        url: 'https://worldmobile.club/', // Organization website
        logo: '/images/club_logo.png',  // Path to the logo in the public folder
        description:
          'Connecting everyone, everywhere with the first blockchain-powered mobile network World Mobile Chain. Join the movement to bridge the digital divide.',
        foundingDate: '2024-01-01',
        sameAs: [
          'https://www.facebook.com/coffe.earthnode.worldmobile',
          'https://twitter.com/coffee_wmtx',
          'https://www.linkedin.com/company/coffee-earth-nodes',
          'https://www.instagram.com/coffee_earth_nodes/',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            areaServed: 'Global',
            availableLanguage: ['English'],
          },
        ],
      },
    ],
  };
  
  export default SEO;
  