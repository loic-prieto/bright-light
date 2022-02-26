import { Maybe } from "purify-ts";
import { XML } from "sxml";

/**
 * This is a convenience method, not a general purpose boolean extractor. It doesn't handle errors.
 * @param xmlNode 
 */
export function getBool(propertyName: string, xmlNode: XML): boolean {
    return xmlNode.getProperty(propertyName) == "true" ? true : false
}

export function getOptional(propertyName: string, xmlNode: XML): Maybe<string> {
    return xmlNode.hasProperty(propertyName) ?
        Maybe.of(xmlNode.getProperty(propertyName)) :
        Maybe.empty()
}
/**
 * This is a convenience method, not a general purpose number extractor. It doesn't handle errors.
 * @param xmlNode 
 */
export function getNumber(propertyName: string, xmlNode: XML): number {
    return +xmlNode.getProperty(propertyName)
}

/**
 * Convenience method to extract an optional array of entities from an xml node
 * Handles non existent tags in the xml node
 * @param tagName
 * @param xmlNode 
 * @param builderFunction 
 * @returns 
 */
export function getOptionalArray<T>(tagName: string, xmlNode: XML, builderFunction: BuilderFunction<T>): Maybe<Array<T>> {
    let optionalArray = Maybe.empty() as Maybe<Array<T>>

    if(xmlNode.has(tagName)) {
        const valueArray = new Array<T>()
        for(const item of xmlNode.get(tagName)) {
            valueArray.push(builderFunction(item))
        }

        optionalArray = Maybe.of(valueArray)
    }

    return optionalArray
}

export type BuilderFunction<T> = (xmlNode: XML) => T