import { ApplicationOptions, Assets, Sprite, Text } from "pixi.js";
import ECSManager from "./Managers/ECSManager";
import Renderer from "./Pixi/Renderer";
import Socket from "./Socket";
import MovementSystem from "./Systems/MovementSystem";
import InputManager, { Action } from "./Managers/InputManager";

class Game {
	private ecs: ECSManager;
	// TODO: Public only for testing purposes
	public rnd: Renderer;
	private socket: Socket;
	private inputManager: InputManager;


	constructor( ) {
		
		this.ecs 	= ECSManager.getInstance();
		this.rnd 	= new Renderer();
		this.socket = new Socket();

		this.inputManager = new InputManager(
			this.handlePlayerInput.bind( this )
		);
	}

	public async init( rendererOptions: Partial<ApplicationOptions> ) {
		
		await this.rnd.init( rendererOptions );
		await this.socket.connect();
		
		console.log( "%cWebsocket connected", "color: #00FF00" );

		

		const player = this.ecs.createEntity( );
		this.ecs.addComponent( player, "Position", { x: 0, y: 0 });
		this.ecs.addComponent( player, "Velocity", { x: 1, y: 1 });
		

		this.ecs.addSystem([
			new MovementSystem( ),
		]);
				
		const animate = ( time: number ) => {

			this.rnd.app.ticker.update( time );
			this.ecs.update( time );
			this.rnd.app.renderer.render( this.rnd.app.stage );
		
			requestAnimationFrame( animate );
		};

		animate( performance.now() );
		
		document.addEventListener( "visibilitychange", ( ) => {
			this.rnd.app.ticker[ document.hidden ? "stop" : "start" ]();
		});

		return this.rnd.app;
	}

	private handlePlayerInput( input: Action ) {
		console.log( "Input received:", input )
	}

	public stop(): void {
		this.rnd.destroy();
		this.socket.disconnect();
	}

}

export default Game;