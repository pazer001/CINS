import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMediaComponent } from './saved-media.component';

describe('SavedMediaComponent', () => {
  let component: SavedMediaComponent;
  let fixture: ComponentFixture<SavedMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
