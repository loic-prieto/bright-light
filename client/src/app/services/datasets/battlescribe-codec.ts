import {Injectable} from "@angular/core";
import {Either, Maybe} from "purify-ts";
import {UnitCatalogue} from "src/app/model/UnitCatalogue";
import {DatasetCodec} from "./dataset-reader.service";
import {BattleScribeCatalogue} from "./battlescribe/BattleScribeCatalogue";
import {CatalogueUnit} from "../../model/CatalogueUnit";
import {BattleScribeSelectionEntry} from "./battlescribe/BattleScribeSelectionEntry";

@Injectable()
export class BattlescribeDatasetCodec implements DatasetCodec {

    static COSTS_POINTS_TYPE = "pts"

    serializeDataset(catalogue: UnitCatalogue): Either<Error, string> {
        return Either.encase(() => {
            console.log(catalogue)
            throw new Error("Not implemented yet")
        })
    }

    deserializeDataset(dataset: string): Either<Error, UnitCatalogue> {
        return BattleScribeCatalogue.fromString(dataset)
            .map(bsDataset => {
                let units: Array<CatalogueUnit> = bsDataset.sharedSelectionEntries
                    .mapOrDefault(
                        units=> units.map(BattlescribeDatasetCodec.mapUnit),
                        new Array<CatalogueUnit>())

                return new UnitCatalogue(bsDataset.name, `${bsDataset.revision}`, units)
            })
    }

    private static mapUnit(bsUnit: BattleScribeSelectionEntry): CatalogueUnit {
        // If no costs are found, zero is assumed
        const costInPoints: number = bsUnit.costs
            .mapOrDefault(costs =>
                Maybe.fromNullable(
                    costs.find(cost=>cost.name==BattlescribeDatasetCodec.COSTS_POINTS_TYPE))
                    .mapOrDefault(cost=>+cost.value,0),
                0)
        // If no primary category is found, off to the Misc bag it goes
        // For now this method of extracting category is not able to handle weird names like "New CategoryLink"
        const mainCategory: string = bsUnit.categoryLinks
            .mapOrDefault(categories =>
                    Maybe.fromNullable(categories.find(category => category.primary))
                        .mapOrDefault(category=>category.name,"Misc")
                ,"Misc")

        return new CatalogueUnit(bsUnit.name,costInPoints,mainCategory)
    }
}