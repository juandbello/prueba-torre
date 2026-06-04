import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDialogTsComponent } from './details-dialog.ts.component';

describe('DetailsDialogTsComponent', () => {
  let component: DetailsDialogTsComponent;
  let fixture: ComponentFixture<DetailsDialogTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDialogTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDialogTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
