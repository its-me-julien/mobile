import React from 'react';

const RichSchemaOrganization = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "World Mobile Club",
    url: "https://worldmobile.club/",
    logo: "https://worldmobile.club/images/club_logo.png", // Updated with the correct public path
    description:
      "Connecting everyone, everywhere with the first blockchain-powered mobile network World Mobile Chain. Join the movement to bridge the digital divide.",
    foundingDate: "2024-01-01",
    sameAs: [
      "https://www.facebook.com/coffe.earthnode.worldmobile",
      "https://twitter.com/coffee_wmtx",
      "https://www.linkedin.com/company/coffee-earth-nodes",
      "https://www.instagram.com/coffee_earth_nodes/"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        areaServed: "Global",
        availableLanguage: ["English"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
};

export default RichSchemaOrganization;