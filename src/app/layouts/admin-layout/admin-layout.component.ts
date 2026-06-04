import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { MATERIAL_MODULES } from '../../core/imports/material.imports';
import { DashboardService } from '../../core/services/dashboard.service';
import { DrawerService } from '../../core/services/drawner.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MATERIAL_MODULES, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  totalItems = 0;

  constructor(public drawerService: DrawerService, private readonly dashboardService: DashboardService) {
    this.dashboardService.pedido$
      .subscribe(productos => {
        this.totalItems = productos.length;
      });
  }



}
