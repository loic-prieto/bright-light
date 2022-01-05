/**
 * The definition of a unit's attributes as found in a catalogue.
 * This is different from a unit included in a roster.
 * In OOP terms, this would be the class, and the units in a roster, the
 * instance.
 */
export class CatalogueUnit {
    constructor(
        public type: string, 
        public cost: number = 0,
        public category: string
        ) {}
}