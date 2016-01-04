//function palindrome(str) {
//    var noPunc = str.replace(/[^\w\s]|_/g, "")
//        .replace(/\s+/g, "");
//    var lwr = noPunc.toLowerCase();
//    var backwards = lwr.split('').reverse();
//    var forwards = lwr.split('');
//    var test = 0;
//
//    for (i=0; i<=backwards.length; i++){
//        if (backwards[i] !== forwards[i]){
//            test = test +1;
//        }else{
//            test=test;
//        }
//    }
//    //console.log(test);
//    if(test==0){
//        return true;
//    }else{
//        return false;
//    }
//
//}
//
//
//palindrome("eye");
