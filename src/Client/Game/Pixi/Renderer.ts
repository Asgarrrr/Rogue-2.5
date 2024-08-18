import { Application, ApplicationOptions, Container } from "pixi.js";

export enum Layer {
	WORLD,
	ENTITIES,
	EFFECTS,
	UI,
}

export default class Renderer {
	
	public app: Application;
	private layers: Container[] = [];

	constructor() {
		this.app = new Application();
		(globalThis as any).__PIXI_APP__ = this.app;
		this.layers = Array.from({ length: Object.keys( Layer).length / 2 }).map(() => new Container( ));
		this.layers.forEach((layer) => this.app.stage.addChild(layer));

	}

	public async init(
		options: Partial<ApplicationOptions>
	): Promise<Application> {
		await this.app.init(options);
		return this.app;
	}

	public get view(): HTMLCanvasElement {
		return this.app.canvas;
	}

	public destroy(): void {
		if ( this.app ) 
			this.app.destroy();
	}
}
