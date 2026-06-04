
import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { MatDrawer } from '@angular/material/sidenav';
import { DashboardTableComponent } from '../../../components/dashboard-table/dashboard-table.component';
import { DashboardSummaryComponent } from '../../../components/dashboard-summary/dashboard-summary.component';
import { MATERIAL_MODULES } from '../../../core/imports/material.imports';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DrawerService } from '../../../core/services/drawner.service';

@Component({
  selector: 'app-dashboard',

  imports: [
    MATERIAL_MODULES,
    DashboardTableComponent,
    DashboardSummaryComponent
  ],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent
  implements AfterViewInit {

  @ViewChild('drawer')
  drawer!: MatDrawer;

  idPedido: number | null = null;

  drawerMode: 'side' | 'over' = 'side';


  constructor(

    private readonly dashboardService:
      DashboardService,

    private readonly cdr:
      ChangeDetectorRef,

    private readonly drawerService:
      DrawerService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Responsive
      this.checkScreen();

      window.addEventListener(
        'resize',
        () => this.checkScreen()
      );
    }
    // Abrir/cerrar manualmente
    this.drawerService.drawerState$
      .subscribe(open => {

        if (open) {

          this.drawer.open();

        } else {

          this.drawer.close();

        }

      });

    // Abrir automáticamente
    // SOLO en desktop
    this.dashboardService.pedido$
      .subscribe(productos => {

        if (
          window.innerWidth > 914
        ) {

          if (productos.length > 0) {

            this.drawer.open();

          } else {

            this.drawer.close();

          }

        }

      });

  }

  onIdCambiado(
    idCambiado: number | null
  ): void {

    this.idPedido = idCambiado;

    this.cdr.detectChanges();

  }

  checkScreen(): void {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (window.innerWidth <= 914) {

      this.drawerMode = 'over';

      this.drawer.close();

    } else {

      this.drawerMode = 'side';

      this.drawer.open();

    }

  }

}
