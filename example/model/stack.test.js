import {Stack} from './stack';


describe('My Stack', () => {
    
    let stack;
    beforeEach(() => {
        stack = new Stack();
    });
    it('is created empty', () => {
        expect(stack.top).toBe(-1);
        expect(stack.items).toEqual({});
    });

    it('can push to the top', () => {
        stack.push('🥑');
        expect(stack.top).toBe(0);
        expect(stack.peak).toBe('🥑');
    });

    it('can pop from the top', () => {
        stack.push('🥑');
        let top = stack.pop();
        expect(top).toBe('🥑');
        expect(stack.peak).toBeUndefined;
        expect(stack.top).toBe(-1);
    })

})