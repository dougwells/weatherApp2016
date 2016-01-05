//Return the remaining elements of an array after chopping off n elements from the head.
//The head meaning the beginning of the array, or the zeroth index
//Remember to use Read-Search-Ask if you get stuck. Write your own code.

function slasher(arr, howMany) {
  var newArray = arr.slice(howMany, arr.length);
  return newArray;
}

slasher([1, 2, 3], 9);
