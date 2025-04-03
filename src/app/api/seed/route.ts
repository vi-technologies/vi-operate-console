import { products } from '../../../lib/db/schema';
import { mockProducts } from '../../../lib/db/mock-data';
import { db } from '../../../lib/db/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // For local development, simplify the data with placeholder images
    const seedProducts = mockProducts.map(product => ({
      ...product,
      imageUrl: '/placeholder.svg'
    }));

    // Insert seed data
    await db.insert(products).values(seedProducts);

    return Response.json({
      success: true,
      message: 'Database seeded successfully',
      count: seedProducts.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json(
      {
        success: false,
        message: `Error seeding database: ${error}`
      },
      { status: 500 }
    );
  }
}
