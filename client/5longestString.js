//function toLength(i){
//    var length = i.length;
//    return length;
//}
//
//function findLongestWord(str) {
//    var array = str.split(" ");
//    var arrayOfLengths = array.map(toLength);
//    console.log(arrayOfLengths);
//
//    //Option A (Written by Doug)
//    var max=0;
//    for(j=0; j<=arrayOfLengths.length; j++){
//        if (arrayOfLengths[j]>=arrayOfLengths[j+1]){
//            if(arrayOfLengths[j]>=max) {
//                max = arrayOfLengths[j];
//                console.log(max);
//            }else{
//                max=max;
//                console.log(max);
//            }
//        }else{
//            if(arrayOfLengths[j+1]>=max){
//                max=arrayOfLengths[j+1];
//                console.log(max);
//            }else{
//                max=max;
//                console.log(max);
//            }
//        }
//    }
//    console.log(max);
//    return max;
//
//    //Option B (StackOverflow Search)
//    //var largest = Math.max.apply(Math, arrayOfLengths);
//    //console.log(largest);
//    //return largest;
//}
//
//
//findLongestWord("What if we try a super-long word such as otorhinolaryngology");

