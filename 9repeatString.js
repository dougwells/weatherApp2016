function repeat(str, num) {
  var concatString = "";
  for (var i=0; i<num; i++){
    concatString = concatString + str;

  }
  return concatString;
}

repeat("abc", 3);
