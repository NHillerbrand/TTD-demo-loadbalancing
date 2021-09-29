    
export default class CalcFeature {
    
    constructor() {}

    sum(a,b) {
        return a + b;
    } 
    dif(a,b) {
        return a - b;
    } 
    div(a,b) {
        return b === 0 ? undefined : a / b;
    } 
    mul(a,b) {
        return a * b;
    } 
}   



