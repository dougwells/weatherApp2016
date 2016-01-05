function where(arr, num) {
  var low=0;
  var high=0;
  console.log(arr);
  var newArr = arr.sort(function(a, b){return a-b;});
  console.log(newArr);
  for(var i=0; i<newArr.length; i++){
    if(num>newArr[i]){
      low+=1;
      console.log("low = "+low);
    }
  }
  console.log(low);
  return low;
}

where([2, 5, 10], 15);
