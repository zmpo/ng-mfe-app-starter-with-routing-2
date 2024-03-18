import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from '../navbar/navbar.component';
import { TestComponent } from '../test/test.component';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { NavbarComponent } from '@my-library';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DxDataGridModule, TestComponent,  HttpClientModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  dataSource: any = {};

  constructor(httpClient: HttpClient) {
    const isNotEmpty = (value: any) => (value !== undefined && value !== null && value !== '');

    this.dataSource = new CustomStore({
      key: 'OrderNumber',
      async load(loadOptions: any) {
        const url = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders';
  
        const paramNames = [
          'skip', 'take', 'requireTotalCount', 'requireGroupCount',
          'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
        ];
  
        let params = new HttpParams();
  
        paramNames
          .filter((paramName) => isNotEmpty(loadOptions[paramName]))
          .forEach((paramName) => {
            params = params.set(paramName, JSON.stringify(loadOptions[paramName]));
          });
  
        try {
          const result: any = await lastValueFrom(httpClient.get(url, { params }));
  
          return {
            data: result.data,
            totalCount: result.totalCount,
            summary: result.summary,
            groupCount: result.groupCount,
          };
        } catch (err) {
          throw new Error('Data Loading Error');
        }
      }
    })
  }
}
