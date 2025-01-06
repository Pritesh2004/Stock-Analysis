import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private newsData = [
    {
      article_id: '650dbf54ba9d23a5efce92caa7346231',
      title: 'Elon Musk Donates $108 Million In Tesla Shares To Charity As Part of Year-End Tax Planning',
      link: 'https://www.newsx.com/business/elon-musk-donates-108-million-in-tesla-shares-to-charity-as-part-of-year-end-tax-planning/',
      description: 'In 2022, Musk gifted shares valued at $1.95 billion, and in 2021, he donated approximately $5.74 billion to the Musk Foundation, his nonprofit.',
      pubDate: '2025-01-05 21:43:49',
      image_url: 'https://www.newsx.com/wp-content/uploads/2024/11/elon-musk-richest.png',
      source_name: 'Newsx',
      category: ['business'],
    },
    {
      article_id: 'a5945e9eff7c5a9cbfefd08466aa2307',
      title: 'Tesla on NASDAQ: A Game-Changing Trend. How Will It Affect the Gaming World?',
      link: 'https://zaman.co.at/en/news/tesla-on-nasdaq-a-game-changing-trend-how-will-it-affect-the-gaming-world/1198601/',
      description: 'When we think of Tesla, the immediate associations are electric cars, renewable energy, and technological innovation...',
      pubDate: '2025-01-05 20:26:22',
      image_url: 'https://zaman.co.at/wp-content/plugins/wp-youtube-lyte/lyteCache.php?origThumbUrl=https%3A%2F%2Fi.ytimg.com%2Fvi%2F_zZ1EK0FQwc%2Fhqdefault.jpg',
      source_name: 'Zaman Co Aten',
      category: ['top'],
    },
    // Add more articles here...
  ];

  getNews(): Observable<any[]> {
    return of(this.newsData);
  }
}
