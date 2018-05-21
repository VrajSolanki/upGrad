import _ from 'lodash'

export const compareArrays= (arr1, arr2) => {
    let arrayAreEqual = true;
    arr1.forEach((item)=>{
        arrayAreEqual = arrayAreEqual &&  _.includes(arr2, item)
    })
    arr2.forEach((item)=>{
        arrayAreEqual = arrayAreEqual &&  _.includes(arr1, item)
    })
    return arrayAreEqual;
  };
  