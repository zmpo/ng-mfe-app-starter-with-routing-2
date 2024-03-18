import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent1 implements AfterContentInit{

  @ContentChild(DxDataGridComponent) dataGrid?: DxDataGridComponent;

  @ContentChild(MatIcon) matIcon?: MatIcon;

  @ContentChild('text') text: any;

  ngAfterContentInit(): void {
    // setTimeout(() => {
      console.log('#######', this.dataGrid, this.matIcon, this.text);

    // }, 2000)
  }

}
