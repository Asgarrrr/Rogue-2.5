import React, {
	createContext,
	useContext,
	useRef,
	useEffect,
	useState,
} from "react"

import io, { Socket } from "socket.io-client"

export const SocketContext = createContext<Socket | null>(null)

interface SocketProviderProps {
	url: string
	children: React.ReactNode
}

export const SocketProvider = ({ children, url }: SocketProviderProps) => {

	const socket = useRef<Socket | null>( null )
	const [ isConnected, setConnected ] = useState( false )

	useEffect(() => {
		
		if ( !isConnected ) {
		  	
			socket.current = io(url, {
				transports: [ "websocket" ],
				query: {
			  		token: localStorage.getItem('token'),
				},
		  	})

			socket.current.on( "connect", () => {
				setConnected( true )
				console.log( "%cSocket connected", "color: green" )
			})

			socket.current.on( "disconnect", () => {
				setConnected( false )
				console.log( "%cSocket disconnected", "color: red" )
			})
	
			socket.current.on( "error", err => {
				console.error( "Socket error", err )
			})
		
		}
	
		return () => {

			if ( socket.current && socket.current.connected ) {
				socket.current.removeAllListeners()
				socket.current.disconnect()
			}

		}
	}, [])

	return (
		<SocketContext.Provider value={socket.current}>
			{ children }
		</SocketContext.Provider>
	)

}

export const useSocket = () => useContext( SocketContext )