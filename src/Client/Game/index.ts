import { ApplicationOptions } from "pixi.js";
import ECSManager from "./Core/ECSManager";
import Renderer from "./Pixi/Renderer";
import { Socket } from "socket.io-client";

export default class Game {
	private ecs: ECSManager;
	private rnd: Renderer;
	private socket: Socket;

	constructor({ socket }: { socket: Socket }) {
		this.ecs = ECSManager.getInstance();
		this.rnd = new Renderer();
		this.socket = socket;

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
