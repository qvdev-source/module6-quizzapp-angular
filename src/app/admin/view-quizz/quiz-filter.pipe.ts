import { Pipe, PipeTransform } from '@angular/core';
import {Quiz} from "../../models/quiz";

@Pipe({
  name: 'quizFilter'
})
export class QuizFilterPipe implements PipeTransform {

  transform(list: Quiz[], searchText: string): Quiz[] {
    if (!list ){
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
