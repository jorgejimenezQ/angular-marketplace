import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-placeholder',
  template: `<div class="card" aria-hidden="true">
    <img src="assets/products/placeholder.png" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-3"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-6"></span>
        <span class="placeholder col-8"></span>
      </p>
    </div>
  </div>`,
})
export class PlaceholderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
