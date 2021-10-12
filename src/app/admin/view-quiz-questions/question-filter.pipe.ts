import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "../../models/question";
import {Quiz} from "../../models/quiz";

@Pipe({
  name: 'questionFilter'
})
export class QuestionFilterPipe implements PipeTransform {


  transform(list: Question[], searchText: string): any {
      if (!list ){
        return null;
      }
      if (!searchText){
        return list;
      }
      searchText = searchText.toLocaleLowerCase();
      list = list.filter(s=>{
        return s.content.toLocaleLowerCase().includes(searchText);
      });
      return list;
    }


}
