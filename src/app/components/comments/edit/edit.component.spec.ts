import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentComponent } from './edit.component';

describe('EditCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
