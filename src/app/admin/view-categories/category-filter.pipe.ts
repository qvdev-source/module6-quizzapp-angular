import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../../models/category";

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(list: Category[], searchText : string): unknown {
    if (!list){
      return null;
    }
    if (!searchText){
      return list;
    }
    searchText = searchText.toLocaleLowerCase();
    list = list.filter(s=>{
      return s.title.toLocaleLowerCase().includes(searchText);
    });
    return list;
  }

}
