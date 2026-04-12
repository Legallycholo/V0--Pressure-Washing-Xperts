import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicePages = [
  // Residential
  { path: 'services/residential/brick-stone-masonry', title: 'Brick, Stone & Masonry', category: 'Residential', desc: 'Professional cleaning for brick, stone, and masonry surfaces to restore original beauty and remove stains.' },
  { path: 'services/residential/gutters', title: 'Gutters', category: 'Residential', desc: 'Thorough gutter cleaning and exterior gutter washing to prevent clogs and maintain proper drainage.' },
  { path: 'services/residential/curbing', title: 'Curbing', category: 'Residential', desc: 'Professional curb cleaning to remove dirt, oil stains, and grime for improved curb appeal.' },
  
  // Commercial
  { path: 'services/commercial/hoa-services', title: 'HOA Services', category: 'Commercial', desc: 'Comprehensive pressure washing services for homeowner associations including common areas, buildings, and amenities.' },
  { path: 'services/commercial/commercial-buildings', title: 'Commercial Buildings', category: 'Commercial', desc: 'Professional exterior cleaning for commercial buildings to maintain a professional appearance.' },
  { path: 'services/commercial/office-buildings', title: 'Office Buildings', category: 'Commercial', desc: 'Keep your office building looking pristine with our professional pressure washing services.' },
  { path: 'services/commercial/apartment-complexes', title: 'Apartment Complexes', category: 'Commercial', desc: 'Comprehensive cleaning services for apartment complexes including walkways, buildings, and common areas.' },
  { path: 'services/commercial/hotels-hospitality', title: 'Hotels & Hospitality', category: 'Commercial', desc: 'Maintain a welcoming appearance for guests with our hotel and hospitality pressure washing services.' },
  { path: 'services/commercial/government-complexes', title: 'Government Complexes', category: 'Commercial', desc: 'Professional cleaning services for government buildings and facilities.' },
  { path: 'services/commercial/awning-cleaning', title: 'Awning Cleaning', category: 'Commercial', desc: 'Specialized awning cleaning to remove dirt, mold, and stains while preserving fabric integrity.' },
  { path: 'services/commercial/gas-stations', title: 'Gas Stations', category: 'Commercial', desc: 'Thorough cleaning for gas stations including pumps, canopies, and concrete surfaces.' },
  { path: 'services/commercial/graffiti-removal', title: 'Graffiti Removal', category: 'Commercial', desc: 'Safe and effective graffiti removal that protects your building surfaces.' },
  { path: 'services/commercial/parking-decks', title: 'Parking Decks', category: 'Commercial', desc: 'Heavy-duty cleaning for parking garages and decks to remove oil, dirt, and stains.' },
  
  // Industrial
  { path: 'services/industrial/warehouses', title: 'Warehouses', category: 'Industrial', desc: 'Industrial-strength cleaning for warehouse facilities and loading areas.' },
  { path: 'services/industrial/loading-docks', title: 'Loading Docks', category: 'Industrial', desc: 'Professional cleaning for loading docks to maintain safety and cleanliness standards.' },
  { path: 'services/industrial/manufacturing-plants', title: 'Manufacturing Plants', category: 'Industrial', desc: 'Specialized cleaning services for manufacturing facilities and equipment.' },
  { path: 'services/industrial/distribution-centers', title: 'Distribution Centers', category: 'Industrial', desc: 'Comprehensive cleaning for distribution centers to maintain operational efficiency.' },
  { path: 'services/industrial/fleet-wash', title: 'Fleet Wash', category: 'Industrial', desc: 'Professional fleet washing services to keep your vehicles clean and branded.' },
];

const template = (title, category, desc) => `"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

export default function ServicePage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="${title}"
        description="${desc}"
        category="${category}"
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
`;

// Generate all service pages
servicePages.forEach(({ path: servicePath, title, category, desc }) => {
  const fullPath = path.join(__dirname, '..', 'app', servicePath);
  const filePath = path.join(fullPath, 'page.tsx');
  
  // Create directory if it doesn't exist
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Write the page file
  fs.writeFileSync(filePath, template(title, category, desc));
  console.log(`Created: ${filePath}`);
});

console.log('✅ All service pages generated successfully!');
