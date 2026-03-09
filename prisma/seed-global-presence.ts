import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all regions and gatherings
  await prisma.gathering.deleteMany({});
  await prisma.region.deleteMany({});
  
  console.log('Cleared regions and gatherings tables');
  
  // Seed regions
  const regions = [
    { continent: 'Asia', name: 'South Asia', countries: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Maldives', 'Afghanistan', 'Bhutan'] },
    { continent: 'Asia', name: 'Middle East', countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Turkey', 'Iran'] },
    { continent: 'Europe', name: 'Europe', countries: ['UK', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Sweden', 'Norway', 'Denmark'] },
    { continent: 'North America', name: 'North America', countries: ['United States', 'Canada', 'Mexico'] },
    { continent: 'Africa', name: 'Africa', countries: ['Morocco', 'Algeria', 'Tunisia', 'Egypt', 'Libya', 'Mali', 'Mauritania'] },
    { continent: 'Asia', name: 'Southeast Asia', countries: ['Indonesia', 'Malaysia', 'Brunei', 'Singapore', 'Thailand', 'Philippines'] },
    { continent: 'Asia', name: 'Central Asia', countries: ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Azerbaijan'] },
    { continent: 'South America', name: 'South America', countries: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru'] },
    { continent: 'Oceania', name: 'Oceania', countries: ['Australia', 'New Zealand'] },
  ];
  
  for (const region of regions) {
    await prisma.region.create({
      data: {
        continent: region.continent,
        name: region.name,
        countries: JSON.stringify(region.countries),
      },
    });
    console.log(`✓ Added region: ${region.name}`);
  }
  
  // Seed gatherings
  const gatherings = [
    { year: 2024, location_city: 'Washington D.C.', location_country: 'United States', region_name: 'North America', description: 'Circle discussion on documenting contemporary spiritual reflections.' },
    { year: 2023, location_city: 'New York', location_country: 'United States', region_name: 'North America', description: 'Regional gathering of seekers exploring knowledge and ethics.' },
    { year: 2022, location_city: 'California', location_country: 'United States', region_name: 'North America', description: 'Small circle meeting on preserving teachings through structured archives.' },
    { year: 2024, location_city: 'Srinagar', location_country: 'India', region_name: 'South Asia', description: 'Reflection gathering with seekers reviewing archival work.' },
    { year: 2023, location_city: 'New Delhi', location_country: 'India', region_name: 'South Asia', description: 'Dialogue on knowledge, spirituality, and contemporary society.' },
    { year: 2022, location_city: 'Srinagar', location_country: 'India', region_name: 'South Asia', description: 'Structured meeting on documentation of teachings.' },
    { year: 2024, location_city: 'Paris', location_country: 'France', region_name: 'Europe', description: 'Regional dialogue on spiritual traditions and modern inquiry.' },
    { year: 2023, location_city: 'London', location_country: 'United Kingdom', region_name: 'Europe', description: 'Documented regional dialogue session.' },
    { year: 2022, location_city: 'Berlin', location_country: 'Germany', region_name: 'Europe', description: 'Gathering of seekers reflecting on knowledge and responsibility.' },
    { year: 2024, location_city: 'Dubai', location_country: 'UAE', region_name: 'Middle East', description: 'Circle discussion on spiritual knowledge and global participation.' },
    { year: 2023, location_city: 'Doha', location_country: 'Qatar', region_name: 'Middle East', description: 'Regional meeting of seekers and contributors.' },
    { year: 2022, location_city: 'Istanbul', location_country: 'Turkey', region_name: 'Middle East', description: 'Dialogue on Sufi tradition and intellectual heritage.' },
    { year: 2024, location_city: 'Sydney', location_country: 'Australia', region_name: 'Oceania', description: 'Regional gathering of seekers documenting reflections.' },
    { year: 2023, location_city: 'Melbourne', location_country: 'Australia', region_name: 'Oceania', description: 'Discussion on preserving spiritual teachings across continents.' },
    { year: 2022, location_city: 'Brisbane', location_country: 'Australia', region_name: 'Oceania', description: 'Circle meeting on knowledge and community engagement.' },
    { year: 2024, location_city: 'São Paulo', location_country: 'Brazil', region_name: 'South America', description: 'Regional dialogue among seekers and scholars.' },
    { year: 2023, location_city: 'Buenos Aires', location_country: 'Argentina', region_name: 'South America', description: 'Gathering focused on cross-cultural spiritual dialogue.' },
    { year: 2022, location_city: 'Santiago', location_country: 'Chile', region_name: 'South America', description: 'Circle meeting discussing documentation of teachings.' },
  ];
  
  for (const gathering of gatherings) {
    await prisma.gathering.create({
      data: gathering,
    });
    console.log(`✓ Added gathering: ${gathering.year} - ${gathering.location_city}`);
  }
  
  console.log('\n✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
