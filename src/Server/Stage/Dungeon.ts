import { RNG } from "../Utils";

import Room from "./Room";
import Tile, { TileType } from "./Tile";
const canvass = require('@napi-rs/canvas')

export default class Dungeon {

    public width: number;
    public height: number;
    public tiles: Tile[][];
    public rooms: Room[] = [];

    constructor({
        width,
        height,
        density,
    }: {
        width   : number;
        height  : number;
        density?: number;
    }) {

        this.width  = width;
        this.height = height;
        this.tiles  = Array( height ).fill( null ).map( ( _, y ) => 
            Array( width ).fill( null ).map( ( _, x ) => new Tile( TileType.EMPTY, x, y ) )
        );

        const numRooms = RNG.inclusive( 5, 10 );
        console.log(numRooms)
        for ( let i = 0; i < numRooms; i++ ) {
            
            const room = new Room();
            this.rooms.push( room );

        }

        this.placeRooms({ density: 0.5 });

        // Export the dungeon to a canvas
        const canvas = canvass.createCanvas( this.width * 10, this.height * 10 )
        const ctx = canvas.getContext('2d')
        for ( const room of this.rooms ) {
            console.log("room", "x", room.position.x, "y", room.position.y)
            // paint the room in different colors for each shape
            room.shape === 0 ? ctx.fillStyle = 'red' : room.shape === 1 ? ctx.fillStyle = 'blue' : room.shape === 2 ? ctx.fillStyle = 'green' : ctx.fillStyle = 'yellow'
            console.log(room.shape)
            for ( let y = 0; y < room.height; y++ ) {
                for ( let x = 0; x < room.width; x++ ) {
                    ctx.fillRect((room.position.x + x) * 10, (room.position.y + y) * 10, 10, 10)
                }
            }
        }
        canvas.encode('png').then((data: any) => {
            require('fs').writeFileSync('dungeon.png', data )
        })

        
    }

    private placeRooms({ density }: { density: number }) {

        // TODO: Implement density logic

        for ( const room of this.rooms ) {
            
            let attempts = 0;

            while ( attempts < 2000 ) {
                
                const x = RNG.inclusive( 1, this.width - room.width - 1 )
                    , y = RNG.inclusive( 1, this.height - room.height - 1 );

                if ( this.canPlaceRoom( room, x, y ) ) {
                    
                    room.position = { x, y };
                    this.addRoomToDungeon( room );
                    break;

                }

                attempts++;

            }

            console.log( room.position );

        }

    }

    private canPlaceRoom( room: Room, x: number, y: number ): boolean {

        for ( let dy = -1; dy <= room.height; dy++ ) {
            for ( let dx = -1; dx <= room.width; dx++ ) {

                const tileX = x + dx
                    , tileY = y + dy;
                
                if (  tileX < 0 
                   || tileX >= this.width
                   || tileY < 0 
                   || tileY >= this.height 
                   || this.tiles[ tileY ][ tileX ].type !== TileType.EMPTY )
                   return false;
                
            }
        }

        return true;
    
    }

    private addRoomToDungeon( room: Room ) {
            
            for ( let y = 0; y < room.height; y++ ) {
                for ( let x = 0; x < room.width; x++ ) {
                    
                    const tile = room.tiles[ y ][ x ]
                    this.tiles[ room.position.y + y ][ room.position.x + x ] = tile;
    
                }
            }

    }

}