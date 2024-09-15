export interface IPropertyType {

    propertTypeId: number;
    propertyType: string
}

export interface IAPIResponseModel {

    result: boolean;
    message: string;
    data: any
}

export interface IProperty {
    propertyId: number;
    propertyNo: number;
    facing: string;
    totalArea: string;
    rate: number;
    siteId: number;
  }
export class Site {
    siteId: number;
    siteTitle: string;
    location: string;
    propertyTypeId: string;
    city: string;
    pincode: string;
    state: string;
    totalProperties: string;
    createdDate: Date;
    lastUpdatedDate: Date;

    constructor() {
        this.city = '';
        this.siteId = 0;
        this.createdDate =  new Date();
        this.siteTitle = '';
        this.lastUpdatedDate = new Date();
        this.state = '';
        this.location = '';
        this.propertyTypeId = '';
        this.pincode = '';
        this.totalProperties = '';
    }
  }