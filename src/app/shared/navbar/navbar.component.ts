import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('filters', { static: false }) filtersRef: ElementRef
  constructor(
    @Inject(DOCUMENT) private _document: Document,

    private renderer: Renderer2,

  ) {
  }
  ngOnInit() {
  }

  
  displayJobFilters() {
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'block');
  }
}
