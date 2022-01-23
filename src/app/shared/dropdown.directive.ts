import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') open: boolean = false ;
  constructor(private dropdownElement: ElementRef) { }

  @HostListener('document:click',['$event']) toggleOpen(event: Event) {
      this.open = this.dropdownElement.nativeElement.contains(event.target) ? !this.open : false;
  }
}
