import { uuid } from './../_helpers/uuid';

export class Post {
    // id?: string;
    // title?: string;
    // body?: string;
    // public categoryId?: string;
    // public comments?: Comment[];

    // constructor(obj?: any) {
    //     //this.id              = obj && obj.id              || '';
    //     this.title          = obj && obj.title          || '';
    //     this.body          = obj && obj.body          || '';
    //   }

    constructor( 
            public id?: string,
            public title?: string,
            public body?: string,
            public accountId?: string,
            public categoryId?: string,
            public comments?: Comment[]   
          ){}
}
