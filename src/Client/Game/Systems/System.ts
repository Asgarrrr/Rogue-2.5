import ECSManager from "../Managers/ECSManager";

export default abstract class System {

    public abstract update( deltaTime: number, ecs: ECSManager ): void;

}