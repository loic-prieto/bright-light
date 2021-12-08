import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueTreeComponent } from './catalogue-tree.component';

describe('CatalogueTreeComponent', () => {
  let component: CatalogueTreeComponent;
  let fixture: ComponentFixture<CatalogueTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
