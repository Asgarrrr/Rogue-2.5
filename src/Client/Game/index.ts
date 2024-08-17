import { ApplicationOptions } from "pixi.js";
import ECSManager from "./Core/ECSManager";
import Renderer from "./Pixi/Renderer";

export default class Game {
	private ecs: ECSManager;
	private rnd: Renderer;

	constructor() {
		this.ecs = ECSManager.getInstance();
		this.rnd = new Renderer();
		return this;
	}

	public async init(rendererOptions: Partial<ApplicationOptions>) {
		await this.rnd.init(rendererOptions);
		this.rnd.app.ticker.add((deltaTime) =>
			this.ecs.update(deltaTime.deltaMS)
		);
		return this.rnd.app;
	}

	public stop(): void {
		this.rnd.destroy();
	}
}
