export default class Producto{
    #id;
    #title;
    #price;
    #url

    constructor({id, title, price,url}){
        this.id=id,
        this.title = title,
        this.price = price,
        this.url = url
    }

    get id() {
        return this.#id
    }

    set id(id){
        if(!id) throw new Error ("id es un campo requerido");
        
        this.#id = id
    }

    get title(){
        return this.#title
    }

    set title(title){
        if(!title) throw new Error ("nombre es un campo requerido");
        this.#title = title
    }

    get price(){
        return this.#price
    }

    set price(price){
        if(!price) throw new Error ("precio es un campo requerido");
        this.#price = price
    }

    get url(){
        return this.#url
    }

    set url(url){
        if(!url) throw new Error ("url es un campo requerido");
        this.#url = url
    }
}