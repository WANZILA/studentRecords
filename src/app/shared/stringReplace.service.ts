import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class StringReplaceService {
  forwardShlashReplace(text:string) {
    //  console.log(text);   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');
     console.log(txt3);
    return txt3;
  }

  underScoreReplace(text:string){
    //  console.log(text);   
    const txt1 = text.replace('_', '/');
    const txt2 = txt1.replace('_', '/');
     const txt3 = txt2.replace('_', '/');
     console.log(txt3);
    return txt3;
  }
}
