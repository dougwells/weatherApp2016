/*
Remove all falsy values from an array.
Falsy values in javascript are false, null, 0, "", undefined, and NaN.
*/

var a;
function bouncer(arr) {

  var newArr = [];
  for(var i=0; i<arr.length; i++){
    if (arr[i]){
      newArr.push(arr[i]);
      console.log(newArr);
    }
  }
      return newArr;
}

bouncer([7, "ate", "", null, false, 9, 0, a]);
