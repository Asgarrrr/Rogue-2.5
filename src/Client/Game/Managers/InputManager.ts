
export enum Action {
	Up,
	Down,
	Left,
	Right
}

type ActionCallback = ( action: Action ) => void;
type KeyMapping = { [key: string]: Action };

const DEFAULT_KEY_MAPPING: KeyMapping = {
	ArrowUp: Action.Up,
	ArrowDown: Action.Down,
	ArrowLeft: Action.Left,
	ArrowRight: Action.Right
};

class InputManager {

	private onAction: ActionCallback;
	private keyMap: Map<string, Action>;

	constructor(
		onAction: ActionCallback,
		keyMapping: KeyMapping = DEFAULT_KEY_MAPPING
	) {

		this.onAction = onAction;
		this.keyMap = new Map( Object.entries( keyMapping ) );

		window.addEventListener( "keydown", this.onKeyDown );
		window.addEventListener( "touchstart", this.onTouchStart );

	}

	private onKeyDown = ( event: KeyboardEvent ): void => {

		if ( event.repeat )
			return;

		const action = this.keyMap.get( event.code );
		
		if ( action !== undefined )
			this.onAction( action );
	
	};

	private onTouchStart = ( event: TouchEvent ): void => {
		
		if ( event.touches.length === 0 )
			return;

		const touch  = event.touches[0]
			, action = this.getTouchAction( touch.clientX, touch.clientY );

		if ( action !== null ) 
			this.onAction( action );
	
	};


  	private getTouchAction( x: number, y: number ): Action | null {
    
		const thirdWidth  = window.innerWidth / 3
			, thirdHeight = window.innerHeight / 3;

		if ( x < thirdWidth ) 
			return Action.Left;
		
		if ( x > 2 * thirdWidth )
			return Action.Right;
		
		if ( y < thirdHeight ) 
			return Action.Up;
		
		if ( y > 2 * thirdHeight ) 
			return Action.Down;

    	return null;
  	
	}

  	public destroy() {
    	
		window.removeEventListener( "keydown", this.onKeyDown );
    	window.removeEventListener( "touchstart", this.onTouchStart );
  	
	}

}

export default InputManager;