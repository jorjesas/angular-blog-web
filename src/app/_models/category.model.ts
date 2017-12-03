import { Post } from './post.model';

export class Category {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public posts?: Post[]
    ) {}
}
