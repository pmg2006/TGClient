export     class  Singleton {
    static instance<T extends {}>(this: new () => T): T {
        if (!(<any>this).s_inst) {
            (<any>this).s_inst = new this();
        }
        return (<any>this).s_inst;
    }
    static  destory(){
        if ((<any>this).s_inst) {
            (<any>this).s_inst =null ;
        }
    }
}

