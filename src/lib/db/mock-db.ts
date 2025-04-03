import { ilike } from 'drizzle-orm';
import { products, SelectProduct } from './schema';
import { mockProducts as initialMockProducts } from './mock-data';

// Mock database implementation
export class MockDB {
  private data: SelectProduct[] = [...initialMockProducts];

  select(params?: any) {
    return {
      from: (table: any) => {
        // Handle count queries
        if (params && params.count) {
          return Promise.resolve([{ count: this.data.length }]);
        }
        
        return {
          where: (condition: any) => {
            if (condition && typeof condition === 'function') {
              // Handle ilike queries for search
              const searchTerm = condition.args ? 
                condition.args[1].toLowerCase().replace(/%/g, '') : 
                '';
              
              const filtered = this.data.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
              );
              
              return Promise.resolve(filtered);
            }
            return Promise.resolve(this.data);
          },
          limit: (limit: number) => {
            return {
              offset: (offset: number) => {
                return Promise.resolve(
                  this.data.slice(offset, offset + limit)
                );
              }
            };
          }
        };
      }
    };
  }

  delete(table: any) {
    return {
      where: (condition: any) => {
        if (condition && typeof condition === 'function') {
          const id = condition.args ? condition.args[1] : null;
          if (id) {
            this.data = this.data.filter(item => item.id !== id);
          }
        }
        return Promise.resolve();
      }
    };
  }

  insert(table: any) {
    return {
      values: (values: any | any[]) => {
        const newItems = Array.isArray(values) ? values : [values];
        this.data = [...this.data, ...newItems];
        return Promise.resolve();
      }
    };
  }
}