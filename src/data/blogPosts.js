export const blogPosts = [
  {
    slug: 'premium-websites-create-trust',
    title: 'How premium websites create trust before the first call',
    category: 'Brand Strategy',
    readTime: '7 min read',
    date: 'Insight 01',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'A refined website does more than look expensive. It reduces doubt, guides desire, and makes action feel natural.',
    intro: 'Trust online is built in tiny moments: the clarity of a headline, the pace of a page, the restraint of a layout, and the confidence of a call to action.',
    sections: [
      {
        title: 'Confidence begins with hierarchy',
        body: 'Premium buyers should never need to decode what a brand does, who it serves, or why it deserves attention. Clear hierarchy gives the visitor a guided first impression.'
      },
      {
        title: 'Restraint signals value',
        body: 'Luxury digital design is selective. The right amount of whitespace, motion, and contrast helps the brand feel composed rather than crowded.'
      },
      {
        title: 'Conversion should feel calm',
        body: 'The strongest websites do not pressure people into action. They make the next step feel obvious, timely, and aligned with the visitor’s intent.'
      }
    ],
    pullQuote: 'A premium website is not a decoration. It is a trust-building system.',
    related: ['quiet-design-rules-luxury-brands', 'conversion-architecture-service-brands']
  },
  {
    slug: 'quiet-design-rules-luxury-brands',
    title: 'The quiet design rules behind luxury digital brands',
    category: 'Design',
    readTime: '6 min read',
    date: 'Insight 02',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'Spacing, contrast, typography, and restraint can communicate more value than a page crowded with effects.',
    intro: 'Luxury is often remembered for what it leaves out. Digital brands feel more premium when every visual choice has a reason.',
    sections: [
      {
        title: 'Typography carries the mood',
        body: 'Type scale, weight, and spacing set the pace of the experience before a visitor reads a full sentence.'
      },
      {
        title: 'Images need intention',
        body: 'Strong imagery should reveal the product, team, space, or outcome. It should never feel like filler.'
      },
      {
        title: 'Motion should guide attention',
        body: 'Elegant animation supports reading and decision-making. It should feel responsive, not theatrical.'
      }
    ],
    pullQuote: 'The most refined interfaces know exactly when to stop.',
    related: ['premium-websites-create-trust', 'conversion-architecture-service-brands']
  },
  {
    slug: 'conversion-architecture-service-brands',
    title: 'Why high-end service brands need conversion architecture',
    category: 'Growth',
    readTime: '8 min read',
    date: 'Insight 03',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'Luxury buyers still need clarity. The best funnels feel personal, composed, and designed around decision comfort.',
    intro: 'Service brands win when the website makes expertise easy to understand and the inquiry process easy to begin.',
    sections: [
      {
        title: 'Map the decision path',
        body: 'Visitors need proof, context, and a clear next step. Conversion architecture arranges those pieces in the right order.'
      },
      {
        title: 'Make proof easy to scan',
        body: 'Metrics, testimonials, process details, and case studies should be close to the moments where doubt naturally appears.'
      },
      {
        title: 'Design the inquiry moment',
        body: 'A premium contact experience asks for enough detail to qualify the lead without making the first step feel heavy.'
      }
    ],
    pullQuote: 'Good conversion design respects the buyer’s pace while removing every unnecessary question.',
    related: ['premium-websites-create-trust', 'quiet-design-rules-luxury-brands']
  },
  {
    slug: 'brand-consistency-builds-recognition',
    title: 'How brand consistency turns attention into recognition',
    category: 'Brand Identity',
    readTime: '5 min read',
    date: 'Insight 04',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'Consistent visual and verbal choices help audiences recognise a brand faster and trust it for longer.',
    intro: 'Recognition is built through repetition with purpose: the same point of view expressed clearly across every meaningful touchpoint.',
    sections: [
      {
        title: 'Create a recognisable rhythm',
        body: 'Typography, colour, imagery, and spacing should work together as a repeatable system. Familiar patterns make every new interaction feel unmistakably connected to the brand.'
      },
      {
        title: 'Keep the voice aligned',
        body: 'A consistent tone helps a business sound confident across websites, campaigns, proposals, and social content without becoming repetitive.'
      },
      {
        title: 'Protect the essential details',
        body: 'Simple brand guidelines give teams enough structure to create quickly while preserving the signals customers already recognise and trust.'
      }
    ],
    pullQuote: 'Consistency is not sameness. It is a clear idea expressed with discipline.',
    related: ['premium-websites-create-trust', 'quiet-design-rules-luxury-brands', 'conversion-architecture-service-brands']
  }
];

export const getBlogPost = (slug) => blogPosts.find((post) => post.slug === slug);
