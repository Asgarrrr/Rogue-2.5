import Component from "./Component";

export default class HealthComponent extends Component {

    public maxHealth    : number;
    public currentHealth: number;

    constructor( maxHealth: number ) {
        super();
        this.maxHealth     = maxHealth;
        this.currentHealth = maxHealth;
    }

}