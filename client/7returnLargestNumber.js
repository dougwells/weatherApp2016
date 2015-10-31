function largestOfFour(arr) {
    var maxOutArray=[];

    for(i=0; i<arr.length; i++) {
        var maxStart = 0;
        for (j=0; j<(arr[i].length); j++){
            if (arr[i][j]>maxStart) {
                maxStart = arr[i][j];
            }
            console.log(maxStart);

        }
        maxOutArray.push(maxStart);
        console.log(i, maxOutArray);

    }
    // You can do this!
    return maxOutArray;
}

largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]);