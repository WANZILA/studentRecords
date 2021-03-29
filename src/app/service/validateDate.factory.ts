import  { AbstractControl, ValidatorFn } from '@angular/forms';
import { DATE_REGEX} from './formUtils.factory';

export function dateValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} =>{
    const dateStr = control.value;
    //length of months
    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    //Object to return if date is invalid
    const invalidObj = { 'date': true };

    //first check for date o
    //if the pattern is wrong, don't validate dates yes
    if(!DATE_REGEX.test(dateStr)){
      return null;
    }

    //Parse the date input to integers
    const parts = dateStr.split('/');
    const month = parseInt(parts [0],10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    //make suer date is in range
    if(year< 1900 || year > 3000 || month === 0 || month> 12){
      return invalidObj;
    }
    //Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 ===0)){
      monthLength[1] = 29;
    }
    //Check the range of the day
    if(!(day > 0 && day <= monthLength[month - 1])){
      return invalidObj;
    }

    return null;
  }

}