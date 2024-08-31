import { RNG } from "../Utils"

import Tile, { TileType } from "./Tile"


export enum RoomShape {
    RECTANGLE,
    L,
    T,
    PLUS,
}

export default class Room {

    public ID       : string;

    public width    : number = 0;
    public height   : number = 0;
    public shape    : RoomShape;
    
    public tiles    : Tile[][] = [];
    public bounds   : { x: number; y: number }[] = [];
    public position : { x: number; y: number };

    constructor( 
        shape?: RoomShape, 
        position?: { x: number; y: number }
    ) {

        this.ID       = RNG.generateUUID();
        this.position = position ?? { x: 0, y: 0 };
        this.shape    = shape ?? ( RNG.pick( Object.values( RoomShape ) ) as RoomShape );

        switch ( this.shape ) {
            case RoomShape.RECTANGLE:
                this.rectangle();
                break;
            case RoomShape.L:
                this.lShape();
                break;
            case RoomShape.T:
                this.tShape();
                break;
            case RoomShape.PLUS:
                this.plusShape();
                break;
        }

        this.calculateEdges();

    }

    private rectangle( ) {
    
        const { width, height } = this.generateDimensions({ 
            min: 5,
            max: 10,
            maxLengthDifference: 5,
        });

        this.width  = width;
        this.height = height;
        this.tiles  = Array( height ).fill( null ).map( ( _, y ) => 
            Array( width ).fill( null ).map( ( _, x ) => 
                new Tile( TileType.FLOOR, this.position.x + x, this.position.y + y )
            )
        );
    

    }

    private lShape( ) {

        const { width, height } = this.generateDimensions({ min: 7, max: 12, maxLengthDifference: 3 });
        this.width = width;
        this.height = height;
        this.tiles = Array(height).fill(null).map(() => Array(width).fill(TileType.EMPTY));

        const splitX = Math.floor(width / 2);
        const splitY = Math.floor(height / 2);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (x < splitX || y >= splitY) { 
                    this.tiles[y][x] = new Tile(TileType.FLOOR, this.position.x + x, this.position.y + y);
                }
            }
        }
        

    }

    private tShape() {
        const { width, height } = this.generateDimensions({ min: 7, max: 12, maxLengthDifference: 3 });
        this.width = width;
        this.height = height;
        this.tiles = Array(height).fill(null).map(() => Array(width).fill(TileType.EMPTY));
        
        const splitY = Math.floor(height / 3);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (y < splitY || (x > width / 3 && x < 2 * width / 3)) {
                    this.tiles[y][x] = new Tile(TileType.FLOOR, this.position.x + x, this.position.y + y);
                }
            }
        }

        // Render the room in the console
        this.tiles.forEach(row => {
            console.log(row.map(tile => tile.type === TileType.FLOOR ? " " : "#").join(""));
        })

    }

    private plusShape() {
        const { width, height } = this.generateDimensions({ min: 9, max: 15, maxLengthDifference: 2 });
        this.width = width;
        this.height = height;
        this.tiles = Array(height).fill(null).map(() => Array(width).fill(TileType.EMPTY));
        
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const armWidth = Math.floor(width / 3);
        const armHeight = Math.floor(height / 3);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if ((x >= centerX - armWidth / 2 && x <= centerX + armWidth / 2) ||
                    (y >= centerY - armHeight / 2 && y <= centerY + armHeight / 2)) {
                    this.tiles[y][x] = new Tile(TileType.FLOOR, this.position.x + x, this.position.y + y);
                }
            }
        }
    }


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

        this.bounds = [ ];

        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                if ( this.tiles[ y ][ x ].type === TileType.FLOOR ) {
                    if ( this.isEdge( x, y ) ) {

                        this.bounds.push({ x, y });
                        this.tiles[ y ][ x ].type = TileType.WALL;

                    }
                }
            }
        }
        

    }

    private isEdge( x: number, y: number ): boolean {
        
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        return directions.some(([dx, dy]) => {

            const newX = x + dx
                , newY = y + dy;

            return newX < 0 
                || newX >= this.width 
                || newY < 0 
                || newY >= this.height 
                || this.tiles[ newY ][ newX ].type === TileType.EMPTY;

        });

    }
}