
import Room from "./Room";

export default class Dungeon {

    private iterations  : number = 100;
    private density     : number = 0.3;

    private rooms: Room[] = [];
    private tiles: number[][] = [];
    
    // —— Count of carved tiles (tiles that are not walls)
    private carvedTiles: number = 0;
    
    public width : number = 100;
    public height: number = 100;

    


    
    constructor({ density }: { density: number }) {


        this.density = density;
    }
    

    *generate(): Generator<Room> {
        
        let failed = 0;

        while ( this.carvedDensity < this.density && failed < this.iterations ) {

            const room = new Room( );

            let placed = false;

            if ( this.placeRoomInAvailableSpace( room ) )
                yield room;
            else
                failed++;

        }


            // for ( let i = 0; i < 400; i++ ) {

            // }


            // const x = Math.floor( Math.random() * this.width );
            // const y = Math.floor( Math.random() * this.height );

            // if ( this.canPlaceRoom({ room, x, y }) ) {
            //     this.carvedTiles += room.width * room.height;
            //     yield room;
            // } else {
            //     failed++;

    } 


    private canPlaceRoom({ 
        room,
        x,
        y, 
    }: {
        room: Room;
        x: number;
        y: number;
    }): boolean {
        
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                if (Math.random() < this.density) {
                    return false;
                }
            }
        }

    }

    private placeRoomInAvailableSpace( room: Room ): boolean {
        
        let bestPosition: { x: number; y: number } | null = null
          , maxDistance = 0;
    
        for ( let x = 1; x < this.width - room.width; x++ ) {
            for ( let y = 1; y < this.height - room.height; y++ ) {
                if ( this.canPlaceRoom({ room, x, y }) ) {
                
                    const distance = this.calculateDistanceToOtherRooms({ x, y });
                    
                    if ( distance > maxDistance ) {

                        maxDistance = distance;
                        bestPosition = { x, y };

                    }
                
                }
            }
        }
    
        if ( bestPosition ) {
            this.carveRoom({ room, x: bestPosition.x, y: bestPosition.y });
            return true;
        }

        return false;

    }

    private carveRoom({ 
        room, 
        x, 
        y 
    }: { 
        room: Room; 
        x: number; 
        y: number 
    }): void {

        for ( const pos of room.bounds ) {

            const here = { 
                x: pos.x + x, 
                y: pos.y + y 
            };

        }



    }



    get carvedDensity(): number {
        return this.carvedTiles / ( this.width - 2 * this.height - 2 );
    }

    

    
    
    
    
}