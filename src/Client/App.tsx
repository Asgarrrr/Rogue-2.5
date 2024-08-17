import React, { useCallback, useEffect, useRef } from "react";

import Game from "./Game";

export default function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const init = useCallback(async () => {
		const canvas = canvasRef.current;
		const game = new Game();
		return await game.init({
			preference: "webgpu",
			resolution: window.devicePixelRatio || 1,
			backgroundColor: 0x1099bb,
			resizeTo: window,
			canvas: canvas!,
		});
	}, []);

	useEffect(() => {
		const app = init();
		return () => {
			app.then((game) => game.stop());
		};
	}, [init]);

	return (
		<canvas ref={canvasRef}>
			Votre navigateur ne supporte pas l'élément canvas
		</canvas>
	);
}

// import React, { useEffect, useRef } from "react";
// import { Application, Container } from "pixi.js";

// export default function App() {
//   const pixiContainer = useRef<HTMLDivElement>(null);
//   const appRef = useRef<Application | null>(null); // Pour stocker l'instance de l'application

//   useEffect(() => {
//     if (!pixiContainer.current) return;

//     const app = new Application();
//     appRef.current = app; // Stocke l'instance dans le ref

//     // Attendre que la promesse de `app.init` soit résolue
//     app.init({
//       width: 800,
//       height: 600,
//       backgroundColor: 0x1099bb,
//     })
//       .then(() => {
//         if (pixiContainer.current) {
//           pixiContainer.current.appendChild(app.view); // `app.view` est le canvas PixiJS
//         }

//         const worldContainer = new Container();
//         app.stage.addChild(worldContainer);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de l'initialisation de l'application PixiJS:", error);
//       });

//     return () => {
//       if (appRef.current) {
//         appRef.current.destroy(true, { children: true, texture: true, textureSource: true });
//         appRef.current = null; // Réinitialiser la référence
//       }
//     };
//   }, []);

//   return <div ref={pixiContainer}></div>;

//   // Create camera entity
//   const cameraEntity = ecs.createEntity();
//   ecs.addComponent(cameraEntity, 'Camera', { width: 800, height: 600, zoom: 1 });
//   ecs.addComponent(cameraEntity, 'Position', { x: 0, y: 0 });

//   // Create player entity
//   const playerEntity = ecs.createEntity();
//   ecs.addComponent(playerEntity, 'Position', { x: 100, y: 100 });
//   ecs.addComponent(playerEntity, 'Renderable', { texture: 'path/to/player/texture.png' });

//   // Add systems
//   ecs.addSystem(movementSystem);
//   ecs.addSystem(renderSystem(app, worldContainer));
//   ecs.addSystem(cameraSystem(app, worldContainer));

//   // Game loop
//   app.ticker.add((delta) => {
//     ecs.update(delta / 60); // Convert to seconds
//   });

//   return () => {
//     app.destroy(true, { children: true, texture: true, baseTexture: true });
//   };
// }, [ecs]);

// };
