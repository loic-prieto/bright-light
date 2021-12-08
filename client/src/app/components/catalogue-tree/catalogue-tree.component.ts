import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'bl-catalogue-tree',
  templateUrl: './catalogue-tree.component.html',
  styleUrls: ['./catalogue-tree.component.css']
})
export class CatalogueTreeComponent implements OnInit {

  private catalogueTreeFlattener = new MatTreeFlattener(
    CatalogueTreeComponent._getFlattenerTransformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  catalogueTreeControl : FlatTreeControl<CatalogueUnitTreeControlNode> = new FlatTreeControl<CatalogueUnitTreeControlNode>(
    node => node.level,
    node => node.expandable,
  );
  catalogueTreeDatasource : MatTreeFlatDataSource<CatalogueUnitTreeNode<CatalogueUnitTreeNodeContent>,CatalogueUnitTreeControlNode> =
    new MatTreeFlatDataSource(this.catalogueTreeControl, this.catalogueTreeFlattener);

  constructor(private catalogService: CatalogueService) { }

  ngOnInit(): void {
    let catalogueData = this.catalogService.getFakeCatalogue();
    let adaptedCatalogueData = CatalogueTreeComponent._adaptCatalogueDataToTreeModel(catalogueData)
    this.catalogueTreeDatasource.data = adaptedCatalogueData;
  } 

  private static _adaptCatalogueDataToTreeModel(catalogueData: UnitCatalogue) : Array<CatalogueUnitTreeNode<CatalogUnitTreeCategoryContent>> {

    // First build the set of root categories from the unit catalogue
    // This assumes that categories are not nestable
    let categoryNodes: Array<CatalogueUnitTreeNode<CatalogUnitTreeCategoryContent>> = catalogueData.unitList
      .map(unit => unit.category )
      .filter((value,index,self) => self.indexOf(value) === index) //unique filter
      .map(category => { return {
          children: undefined,
          content: { name: category }
        }})
      
    // Add the units to the category nodes
    categoryNodes.forEach( categoryNode => {
      let children : Array<CatalogueUnitTreeNode<CatalogUnitTreeUnitContent>> = catalogueData.unitList
        .filter( unit => unit.category === categoryNode.content.name )
        .map( unit => {return {
          children: undefined,
          content: {
            type: unit.type,
            cost: unit.cost
          }
        }})

      categoryNode.children = children
    });

    return categoryNodes;
  }

  private static _getFlattenerTransformer = (node: CatalogueUnitTreeNode<CatalogueUnitTreeNodeContent>, level: number): CatalogueUnitTreeControlNode => {
    return {
      expandable: node.children?.length ? true : false,
      name: "name" in node.content ? node.content.name : node.content.type,
      level: level,
    };
  };

  hasChild = (_: number, node: CatalogueUnitTreeControlNode) => node.expandable;
}

interface CatalogueUnitTreeControlNode {
  expandable: boolean,
  name: string,
  level: number
}

type CatalogueUnitTreeNodeContent = CatalogUnitTreeCategoryContent | CatalogUnitTreeUnitContent

interface CatalogueUnitTreeNode<T extends CatalogueUnitTreeNodeContent> {
  content: T
  children?: Array<CatalogueUnitTreeNode<CatalogUnitTreeUnitContent>>
}

interface CatalogUnitTreeCategoryContent {
  name: string
}

interface CatalogUnitTreeUnitContent {
  type: string
  cost: number
}