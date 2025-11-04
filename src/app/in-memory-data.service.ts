// in-memory-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, parseRequestUrl } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { IContent } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { items: IContent[] } {
    return {
      items: [
        { id: 1, name: 'Item 1', description: 'Description for Item 1' },
        { id: 2, name: 'Item 2', description: 'Description for Item 2' },
        // Add more items as needed
      ]
    };
  }

  get(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const url = reqInfo.url;
    const params = parseRequestUrl(url);
    const page = +params.queryParams['page'] || 1;
    const pageSize = +params.queryParams['pageSize'] || 10;
    const sort = params.queryParams['sort'] || 'id';

    const items = this.createDb().items;
    let sortedItems = [...items].sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = sortedItems.slice(start, end);

    return of({
      body: paginatedItems,
      headers: { 'X-Total-Count': items.length.toString() }
    });
  }
}
