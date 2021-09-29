import CalcFeature from './calcFeature';

describe('Simple calculation:',() => {
    const calcFeature = new CalcFeature();
    it('adds 2 real numbers', () => {
        let a = 1, b = a + 1;
        expect(calcFeature.sum(a, b)).toBe(a+b);
    })
    it('divides 2 real numbers', () => {
        let a = 1, b = a+1, c = 0;
        expect(calcFeature.div(a, b)).toBe(a/b);
        expect(calcFeature.div(a,c)).toBe(undefined);
    })
    it('multiplies 2 real numbers', () => {
        let a = 1, b = a+1, c=0;
        for(let i = 0; i<b; ++i) {
            c+=a;
        }   
        expect(calcFeature.mul(a,b)).toBe(c);
    })
    it('subtracts 2 real numbers', () => {
        let a = 1, b = a-1;
        expect(calcFeature.dif(a,b)).toBe(a-b);
    })
} )
