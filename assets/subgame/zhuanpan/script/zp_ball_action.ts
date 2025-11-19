const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_ball_action extends cc.DelayTime {
      
    private _c: cc.Vec2 = cc.v2(0, 0);
    private _r: number = 0;
    private _a: number = 0;
    private _w: boolean = false;
    private _s: number = 0;
    private _t: number = 0;

    constructor(t: number, o: any, n: number, i: number, r: boolean = true, a: number = 360, c: number = 0) {
        super();
        this._c = cc.v2(o, n);
        this._r = i;
        this._s = t;
        this._w = r;
        this._a = a;
        this._duration = t;
        this._t = c;
    }

    update(e) {
        if (e.getTarget()) {
            if (this._t === 1) {
                e = (e === 0 || e === 1) ? e : Math.sin(e * Math.PI / 2);
            }

            let t = (this._s + this._a * e) / 180 * Math.PI;
            let o: cc.Vec2 = cc.v2(0, 0);
            if (this._w) {
                o.x = this._r * Math.sin(t) + this._c.x;
                o.y = this._r * Math.cos(t) + this._c.y;
            } else {
                t += Math.PI / 2;
                o.x = this._r * Math.cos(t) + this._c.x;
                o.y = this._r * Math.sin(t) + this._c.y;
            }

            e.getTarget().setPosition(o);
        }
    }
}