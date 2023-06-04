import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  transform(html: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  constructor(private sanitizer: DomSanitizer) { }

}
