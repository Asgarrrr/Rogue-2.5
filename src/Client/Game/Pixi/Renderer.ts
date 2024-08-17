import { Application, ApplicationOptions } from "pixi.js";

export enum Layer {
	BACKGROUND,
	ENTITIES,
	WORLD,
	UI,
}

export default class Renderer {
	public app: Application;
	// private layers: Container[] = [];

	constructor() {
		this.app = new Application();
		return this;

		// this.layers = Array.from({ length: 4 }).map(() => new Container());
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
		if (this.app) this.app.destroy();
	}
}
