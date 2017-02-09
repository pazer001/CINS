/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideoModalComponent } from './video-modal.component';

describe('VideoModalComponent', () => {
  let component: VideoModalComponent;
  let fixture: ComponentFixture<VideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
