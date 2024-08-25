class MapManager {


    private static _instance: MapManager;

    public static get Instance(): MapManager {
        
        return this._instance = this._instance || new MapManager();

    }

    private constructor() {
        
    }

    

}