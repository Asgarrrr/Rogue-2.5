import { useEffect, useRef, useState } from "react";

import Game from "./Game";

enum GameStatus {
	UNMOUNTED,
	INITIALIZING,
	READY,
}

export default function App() {
	
	const canvasRef = useRef<HTMLCanvasElement>( );
	const gameRef = useRef<Game>( );

	const [ status, setStatus ] = useState<GameStatus>( GameStatus.UNMOUNTED );
	
	useEffect(() => {

		if ( status === GameStatus.READY ) {
			return ( ) => {
				console.log( "> Unmounting..." );
				gameRef.current?.stop( );
				setStatus( GameStatus.UNMOUNTED );
			}
		}

		if ( status > GameStatus.UNMOUNTED || !canvasRef.current )
			return console.warn( "> Invalid status or missing canvas element" );

		const init = async ( ) => {

			setStatus( GameStatus.INITIALIZING );

			gameRef.current = new Game( );
			await gameRef.current.init({
				preference: "webgpu",
				resolution: window.devicePixelRatio || 1,
				backgroundColor: 0x000000,
				canvas: canvasRef.current,
			});

			setStatus( GameStatus.READY );
		};

		if ( status === GameStatus.UNMOUNTED && !gameRef.current )
			init( );

	}, [ ]);

	return (
		<main>
			<span style={{ 
				color: status === GameStatus.READY ? "#00FF00" : status === GameStatus.INITIALIZING ? "#FFFF00" : "#FF0000",
				position: "absolute",
				opacity: 0.5,
				top: 10,
				right: 10,
			}}>
				{ status === GameStatus.UNMOUNTED ? "Unmounted" : status === GameStatus.INITIALIZING ? "Initializing" : "Ready" }
			</span>
		
			<canvas ref={ canvasRef as React.RefObject<HTMLCanvasElement> } />
		</main>
	);
	
}