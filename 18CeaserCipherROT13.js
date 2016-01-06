/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

String.charCodeAt()
String.fromCharCode()
*/

function rot13(str) {
  var currCode;
  var newCode;
  var newString="";
  for(var i=0; i<str.length; i++){
    currCode = str.charCodeAt(i);
    if(currCode<65){
      console.log('non-letter');
      newCode=currCode;
    }else if (currCode>77){
      console.log('reset less 13');
      newCode =currCode-(78-65);
    }else{
      newCode = currCode+13;
      console.log('letter up to Z');
    }
    console.log(newCode);
    newString = newString + String.fromCharCode(newCode);
    console.log(newString);

  }

  return newString;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
