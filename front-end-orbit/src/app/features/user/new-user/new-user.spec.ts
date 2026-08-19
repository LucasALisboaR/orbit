import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NewUser } from './new-user';

describe('NewUser', () => {
  let component: NewUser;
  let fixture: ComponentFixture<NewUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUser],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
