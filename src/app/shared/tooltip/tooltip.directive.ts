import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle: string = '';
  tooltip: any;
  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  show() {
    this.tooltip = this.renderer.createElement('span');
    this.tooltip.innerHTML = this.tooltipTitle;
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.appendChild(document.body, this.tooltip);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    const top = hostPos.top + scrollY - tooltipPos.height - this.offset;
    let left=0;
    if(hostPos.left>300)
     left = window.innerWidth- hostPos.left - 50;

    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    if(hostPos.left>300)
      this.renderer.setStyle(this.tooltip, 'right', `${left}px`);
    else
      this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
  }

  hide() {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }
}
