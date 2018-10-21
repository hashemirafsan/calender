class DB {

    constructor() {
        this.db_prefix = "joom_";
    }

    get = ( key ) => {
        return new Promise((resolve, reject) => {
            if ( key ) {
                resolve(window.localStorage.getItem(`${this.db_prefix}${key}`));
            } else {
                reject("Key is not defined!");
            }
        });
    }

    post = ( key, value ) => {
        return new Promise((resolve, reject) => {
            if (key && value) {
                resolve(window.localStorage.setItem(`${this.db_prefix}${key}`, value));
            } else {
                reject("Key and value required!");
            }
        });
    }

}

export default new DB();