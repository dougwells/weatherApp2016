/*
Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.
For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.
The arguments ["hello", "hey"] should return false because the string "hello" does not contain a "y".
Lastly, ["Alien", "line"], should return true because all of the letters in "line" are present in "Alien".
*/

function mutation(arr) {
  var count = 0;
  var answer = false;
  for(var i=0; i<arr[1].length; i++){
    var letterToSearch = arr[1].charAt(i).toUpperCase();

    for(var j=0; j<arr[0].length; j++){
      var currentLetter = arr[0].charAt(j).toUpperCase();
      if (currentLetter == letterToSearch){
        count +=1;
        j=arr[0];
        console.log(letterToSearch +" "+currentLetter+" "+count);
      } else {
        console.log(letterToSearch +" "+currentLetter+" "+count);
      }
    }
  }
  if (count === arr[1].length){answer=true;}else{answer = false;}
  console.log ("array 1: "+arr[1]);
  console.log ("count = "+count);
  console.log (answer);
  return answer;
}
