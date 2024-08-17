import { randomUUID } from "node:crypto";

export type EntityID = string;
export type ComponentName = string;
export type Component = Record<string, any>;
export type System = ( deltaTime: number, ecs: ECSManager ) => void;

export class ECSManager {

	private static instance: ECSManager;

	private entities: Map<EntityID, Set<ComponentName>>;
	private components: Map<`${EntityID}:${ComponentName}`, Component>;
	private systems: System[];
	private entitiesToDestroy: Set<EntityID>;

	private constructor() {
		this.entities = new Map();
		this.components = new Map();
		this.systems = [];
		this.entitiesToDestroy = new Set();
	}

	public static getInstance(): ECSManager {
		
		if ( !ECSManager.instance )
			ECSManager.instance = new ECSManager();

		return ECSManager.instance;
	
	}

	// —— Component management

	addComponent( entityID: EntityID, componentName: ComponentName, component: Component ): void {

		if ( !this.entities.has( entityID ) )
			throw new Error( `Entity ${ entityID } does not exist`);

		this.components.set( `${ entityID }:${ componentName }`, component );
		this.entities.get( entityID )!.add( componentName );
	
	}
	
	removeComponent( entityID: EntityID, componentName: ComponentName ): void {

		this.components.delete( `${ entityID }:${ componentName }` );
		this.entities.get( entityID )!.delete( componentName );

	}

	getComponent( entityID: EntityID, componentName: ComponentName ): Component | undefined {

		return this.components.get( `${ entityID }:${ componentName }` );

	}

	hasComponent( entityID: EntityID, componentName: ComponentName): boolean {

		return this.entities.get( entityID )?.has( componentName ) ?? false;

	}

	// —— System management

	addSystem( system: System ): void {
		this.systems.push( system );
	}

	removeSystem( system: System ): void {

		const index = this.systems.indexOf( system );

		if ( index !== -1 )
			this.systems.splice( index, 1 );

	}

	update( deltaTime: number ): void {

		for ( const system of this.systems )
			system( deltaTime, this );

		this.cleanupEntities();
	}

	// —— Entity management

	createEntity(): EntityID {

		const entityId = randomUUID();

		this.entities.set( entityId, new Set() );
		
		return entityId;

	}
	
	destroyEntity( entityID: EntityID ): void {
		
		this.entitiesToDestroy.add( entityID );
	
	}


	private cleanupEntities(): void {
		
		for ( const entityID of this.entitiesToDestroy ) {
		  
			const components = this.entities.get( entityID );
		
		  	if ( components ) 
				for ( const componentName of components )
			  		this.removeComponent( entityID, componentName );

		  this.entities.delete( entityID );
		
		}

		this.entitiesToDestroy.clear();

	}

	getEntitiesWithComponents( componentNames: ComponentName[] ): EntityID[] {

		return Array.from( this.entities.entries() )
			.filter(([_, components]) => componentNames.every( ( name ) => components.has( name ) ) )
			.map(( [ entityID, _ ]) => entityID );
  
	}


	serialize(): string {

		return JSON.stringify({
			entities: Array.from( this.entities.entries() ),
			components: Array.from( this.components.entries() ),
		});

	}

	deserialize( serializedState: string ): void {
		
		const { entities, components } = JSON.parse( serializedState );
		
		this.entities = new Map( entities );
		this.components = new Map( components );
	
	}

}