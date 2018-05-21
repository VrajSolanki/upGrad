export const generateStringFromArray = (array) => {
    let string = "";
    array.map((element,key) => {
        string = string+element;
        if(array.length-1!=key){
            if(array.length-2==key){
                string = string +" and ";
            }
            else{
                string=string+", ";
            }
        }
    });
    return string;
}   