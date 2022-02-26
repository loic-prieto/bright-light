import { XML } from "sxml";

/**
 * All entities in a battlescribe catalogue have an id and name attribute.
 */
export abstract class BattleScribeEntity {
    constructor(
        public id: string,
        public name: string
    ){}

}