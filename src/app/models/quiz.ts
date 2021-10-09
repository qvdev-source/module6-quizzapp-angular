import {Category} from "./category";

export class Quiz {
  qId:number;
  title:string;
  description:string;
  maxMarks:string;
  numberOfQuestions:string;
  active:boolean=false;
  category:Category;

}
