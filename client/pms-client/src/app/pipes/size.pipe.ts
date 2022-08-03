import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {
  sizeData!:String[];
  transform(value: String): String {
    this.sizeData=value.split(",");
    return `${this.sizeData[0]} * ${this.sizeData[1]}`
  }

}
