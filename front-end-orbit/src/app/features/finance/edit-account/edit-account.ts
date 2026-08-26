import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  template: '',
})
export class EditAccount implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    void this.router.navigate(['/finance'], {
      replaceUrl: true,
    });
  }
}
