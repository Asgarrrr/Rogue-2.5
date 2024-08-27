import { RNG } from "../Utils"

// Room class is a representation of a dungeon room in the game

export enum RoomShape {
    RECTANGLE,
    L,
    T,
    PLUS,
}

export enum tileType {
    EMPTY,
    WALL,
    FLOOR,
    DOOR,
    CORRIDOR,
}

export default class Room {

    public width  : number = 0;
    public height : number = 0;
    public shape  : number = 0;
    
    public tiles  : tileType[][] = [];
    public bounds : { x: number; y: number }[] = [];

    constructor( ) {

        console.log( "Room created" );

        // Take a random value between 0 and 3, run the function in fun
        // 0: Room is a rectangle
        // 1: Room is a "L" shape
        // 2: Room is a "T" shape
        // 3: Room is a "+" shape
        this.shape = ~~( Math.random() * 0 );

        [
            this.rectangle,
            this.lShape,
            this.tShape,
            this.plusShape
        ][ this.shape ].call( this );

    }

    private rectangle( ) {
        
        console.log( "Generating a rectangle room" );

        const { width, height } = this.generateDimensions({ 
            min: 5,
            max: 10,
            maxLengthDifference: 5,
        });

        this.tiles = new Array( width ).fill( tileType.FLOOR ).map( ( ) => 
            new Array( height ).fill( tileType.FLOOR )
        );


        this.calculateEdges( );

    }

    private lShape( ) { }

    private tShape( ) { }

    private plusShape( ) { }

    // Idk if this is a good idea,
    private roughenCorners( ) {
        // Get the corners of the room

    }


    public generateDimensions({
        min = 5,
        max = 10,
        maxLengthDifference = 5,
    }: {
        min?: number;
        max?: number;
        maxLengthDifference?: number;
    }): { 
        width: number; 
        height: number 
    } {
        
        const width        = RNG.inclusive( min, max )
            , height       = RNG.inclusive( min, max )
            , maxDimension = Math.max( width, height )
            , minDimension = Math.min( width, height )
            , difference   = maxDimension - minDimension
        
        if ( difference > maxLengthDifference )
            return this.generateDimensions({ min, max, maxLengthDifference });

        return { width, height };
    
    }



    private calculateEdges( ) {

        for ( let x = 0; x < this.width; x++ ) {
            for ( let y = 0; y < this.height; y++ ) {
                
                const position = { x, y };
                const title     = this.tiles[ x ][ y ];

            }
        }

    }
    

}