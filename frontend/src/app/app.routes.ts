import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { StockVisualizeComponent } from './components/stock-visualize/stock-visualize.component'; // Import components

export const routes: Route[] = [
 { path: 'stock', component: StockVisualizeComponent },  // Stock Visualize Component route
];
