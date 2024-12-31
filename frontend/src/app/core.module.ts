import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule here
import { StockService } from './service/stock.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule  // Include HttpClientModule here
  ],
  providers: [StockService],  // Provide services here
  exports: [HttpClientModule]  // Export HttpClientModule if needed by other modules
})
export class CoreModule { }
