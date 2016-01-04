//Write a function that splits an array (first argument) into groups the length
// of size (second argument) and returns them as a multidimensional array.

function chunk(arr, size) {
  var newArr =[];
  var subArr =[];

  for(var i=0; i<arr.length; i=i+size){
    subArr = arr.slice(i, i+size);
    newArr.push(subArr);
  }


  return newArr;
}

chunk(["a", "z", "c", "d", "e"], 2);
