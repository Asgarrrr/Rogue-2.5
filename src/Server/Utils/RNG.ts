export default class RNG {

    // —— Simple methods to generate random numbers or pick random elements from arrays

    // Returns a random number between min (inclusive) and max (inclusive)
    static inclusive(min: number, max: number): number {
        return Math.floor( Math.random() * ( max - min + 1 ) + min );
    }

    // Returns a random number between min (inclusive) and max (exclusive)
    static exclusive(min: number, max: number): number {
        return Math.floor( Math.random() * ( max - min ) + min );
    }

    // Returns a random boolean with a given percentage of being true
    static chance(percentage: number): boolean {
        return Math.random() < percentage;
    }

    // Returns a random number between min (inclusive) and max (exclusive)
    static range(min: number, max: number): number {
        return Math.random() * ( max - min ) + min;
    }

    // Returns a random element from an array
    static shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = RNG.inclusive(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Returns a random element from an array
    static pick<T>(array: T[]): T {
        return array[RNG.inclusive(0, array.length - 1)];
    }

    // Returns a random element from an array and removes it
    static pickSome<T>(array: T[], amount: number): T[] {
        return RNG.shuffle(array).slice(0, amount);
    }

    // —— Generates a random UUID
    static generateUUID( ): string {

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, ( c ) => {
            const r = Math.random() * 16 | 0
                , v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString( 16 );
        });

    }

}