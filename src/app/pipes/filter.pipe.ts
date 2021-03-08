import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoPost =[];
    if(value){
      for(const post of value){
        if (post.cedula.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          resultadoPost.push(post);
        };
      };
      return resultadoPost;
    }
  }

}
