import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagepath: string;
    public info: string;
    public type: string;
    public ingredients: Ingredient[];

    constructor (name:string, desc: string, image:string, ingredients:Ingredient[] ) {
        this.name = name;
        this.imagepath = image;
        this.description = desc;
        this.ingredients = ingredients;
    }
}
