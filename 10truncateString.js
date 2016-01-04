function truncate(str, num) {
  var shorterString;
  if (str.length>num){
    if (num>3){
      shorterString = str.slice(0, num-3) +"...";
      } else {
        shorterString = str.slice(0, num) +"...";
      }
  }else{
    shorterString = str;
  }

  return shorterString;
}

truncate("A-tisket a-tasket A green and yellow basket", 11);
