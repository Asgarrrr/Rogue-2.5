import ECSManager from "../Managers/ECSManager";
import System from "./System";

export default class MovementSystem extends System {

    update( deltaTime: number, ecs: ECSManager ): void {

        const entities = ecs.getEntitiesWithComponents([ "Position", "Velocity" ]);
      
        for ( const entityId of entities ) {

            // TODO: Modifier le fonctionnement de la méthode `getComponent` pour qu'on puisse récupérer plusieurs composants en une seule fois`
            const position = ecs.getComponent( entityId, 'Position');
            const velocity = ecs.getComponent( entityId, 'Velocity');

            if ( !position || !velocity ) continue;

            position.x += velocity.x * deltaTime;
            position.y += velocity.y * deltaTime;

        }

    }

}