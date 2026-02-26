import { Injectable, ServiceUnavailableException, Logger } from '@nestjs/common';
import axios from 'axios';

export interface CourseResponse {
  id: number;
  title: string;
  price: number;
}

@Injectable()
export class ExternalService {
  private readonly logger = new Logger(ExternalService.name);
  private cache: { data: CourseResponse[]; expiry: number } | null = null;
  private readonly TTL = 5 * 60 * 1000;

  async getCourses(): Promise<CourseResponse[]> {
    const now = Date.now();

    try {
      const { data } = await axios.get('https://fakestoreapi.com/products', {
        timeout: 3000
      });

      const transformed: CourseResponse[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
      }));

      this.cache = { data: transformed, expiry: now + this.TTL };
      return transformed;
    } catch (error: any) {
      this.logger.error(`External API failure: ${error.message}`, error.stack);

      if (this.cache && (this.cache.expiry > now || this.cache.data)) {
        this.logger.log('Returning data from in-memory cache');
        return this.cache.data;
      }

      throw new ServiceUnavailableException('External API unavailable and no cache');
    }
  }
}