import { ProductVersion, ProductVersionState } from './productversions/productversion';
import { ProductFeature, ProductFeatureState } from './productfeatures/productfeature';
import { ProductIssue, ProductIssueState } from './productissues/productissue';
import { ProductConfigOption, ProductConfigOptionState } from './productconfigoptions/productconfigoption';
import * as _ from 'lodash';

export class ProductState {
    name: string;
    guid: string;
    description: string;
    businessCase: string;
    versions: Array<ProductVersionState>;
    features: Array<ProductFeatureState>;
    issues: Array<ProductIssueState>;
    configOptions: Array<ProductConfigOptionState>;
}

export class Product {
    private _state: ProductState;
    private _sequenceCount;
    versions: Array<ProductVersion>;
    features: Array<ProductFeature>;
    issues: Array<ProductIssue>;
    configoptions: Array<ProductConfigOption>;

    constructor(state?: ProductState) {
        this._state = state;
        this.versions = new Array<ProductVersion>();
        this.features = new Array<ProductFeature>();
        this.issues = new Array<ProductIssue>();
        this.configoptions = new Array<ProductConfigOption>();
        this._sequenceCount = 0;

        if (!state) {
            this._state = new ProductState();
        } else {
            if (state.versions && state.versions.length > 0) {
                for (let i = 0; i < state.versions.length; i++) {
                    const version = new ProductVersion(state.versions[i]);
                    this.addVersion(version);
                }
            }
            if (state.features && state.features.length > 0) {
                for (let i = 0; i < state.features.length; i++) {
                    this.features.push(new ProductFeature(state.features[i]));
                }
            }
            if (state.issues && state.issues.length > 0) {
                for (let i = 0; i < state.issues.length; i++) {
                    this.issues.push(new ProductIssue(state.issues[i]));
                }
            }
            if (state.configOptions && state.configOptions.length > 0) {
                for (let i = 0; i < state.configOptions.length; i++) {
                    this.configoptions.push(new ProductConfigOption(state.configOptions[i]));
                }
            }
        }
    }

    addVersion(version: ProductVersion): void {
        version.sequence = this._sequenceCount;
        this._sequenceCount++;
        this.versions.push(version);
    }

    getVersionSequenceById(versionId: string): number {
        const version = _.find<ProductVersion>(this.versions, prj => (prj.guid === versionId));
        return version.sequence;
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get businessCase(): string { return this._state.businessCase; };
    set businessCase(value: string) { this._state.businessCase = value; };

    public clone(): Product {
        return new Product(_.clone(this._state));
    }
}


