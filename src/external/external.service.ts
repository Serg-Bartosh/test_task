import { Injectable, ServiceUnavailableException, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalService {
  private readonly logger = new Logger(ExternalService.name);
  private cache: { data: any[]; expiry: number } | null = null;
  private readonly TTL = 5 * 60 * 1000;

  async getCourses() {
    const now = Date.now();

    try {
      const { data } = await axios.get('https://fakestoreapi.com/products', {
        timeout: 3000
      });

      const transformed = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
      }));

      this.cache = { data: transformed, expiry: now + this.TTL };
      return transformed;
    } catch (error: any) {
      this.logger.error(`External API failure: ${error.message}`, error.stack);

      if (this.cache && this.cache.expiry > now) {
        this.logger.log('Returning data from in-memory cache');
        return this.cache.data;
      }

      throw new ServiceUnavailableException('External API unavailable and no cache');
    }
  }
}