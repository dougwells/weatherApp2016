/*
You will be provided with an initial array (the first argument in the destroyer
function), followed by one or more arguments. Remove all elements from the
initial array that are of the same value as these arguments.
*/


function destroyer(arr, param1, param2, param3) {
  var newArr=[];
  for (var i=0; i<arr.length; i++){
    if(arr[i]===param1 || arr[i]===param2 || arr[i]===param3){

    }else{
      newArr.push(arr[i]);
    }
    console.log(newArr);
  }
return newArr;

}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
