export enum TileType {
    EMPTY,
    WALL,
    FLOOR,
    DOOR,
    CORRIDOR,
    TRAP,
    TREASURE,
    STAIRS_UP,
    STAIRS_DOWN,
}

export default class Tile {
    
    public ID   : string;
    public type : TileType;
    public x    : number;
    public y    : number;
    
    
    constructor(
        type: TileType,
        x: number,
        y: number
    ) {
        
        this.ID   = `${ x }:${ y }`;
        this.type = type;
        this.x    = x;
        this.y    = y;

    }
}