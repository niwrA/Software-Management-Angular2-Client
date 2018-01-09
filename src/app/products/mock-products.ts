import { Product, ProductState } from './product';
import { ProductVersion } from './productversions/productversion';
import { ProductFeature } from './productfeatures/productfeature';
import { ProductIssue } from './productissues/productissue';
import { ProductConfigOption } from './productconfigoptions/productconfigoption';
export const PRODUCTS: ProductState[] = [
  {guid: 'product11', name: 'Nice Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product12', name: 'Narco Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product13', name: 'Bombasto Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product14', name: 'Celeritas Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product15', name: 'Magneta Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product16', name: 'RubberMan Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product17', name: 'Dynama Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product18', name: 'Dr IQ Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product19', name: 'Magma Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()},
  {guid: 'product20', name: 'Tornado Suite', description: 'description', businessCase: 'businesscase',
  versions: new Array<ProductVersion>(), features: new Array<ProductFeature>(), issues: new Array<ProductIssue>()
  , configoptions: new Array<ProductConfigOption>()}
];

export class ProductsServiceStub {
  products: Array<Product> = new Array<Product>();
  constructor() {
    PRODUCTS.forEach(element => {
      this.products.push(new Product(element));
    });
  }
  getProducts(searchText: string): Promise<Array<Product>> {
    return Promise.resolve(this.products);
  };
  getProduct(guid: string): Promise<Product> {
    return Promise.resolve(this.products.find(f => f.guid === guid));
  };
};
