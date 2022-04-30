import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(datasource: any[], search: string): any[] {
    if (datasource && datasource.length > 0) {
      const regexp = new RegExp(search, 'i');
      // extract all properties of the object
      const properties = Object.keys(datasource[0]);
      // spread the datasource array and for each row check by regex
      return [
        ...datasource.filter((item) => {
          return properties.some((property) => regexp.test(item[property]));
        }),
      ];
    }
    return [];

  }

}
