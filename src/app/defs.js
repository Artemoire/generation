class MapArray {
    constructor(width, height, data) {
        this.width = width;
        this.height = height;
        this.data = data;
    }

    at(x, y) {
        return this.data[x + y * this.width];
    }
}

class Utils {
    static shallow(object) {
        var temp = {};
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                temp[key] = element;
            }
        }
        return temp;
    }
}

class Pipeline {
    constructor() {
        this.filters = [];
    }

    register(filter) {
        this.filters.push(filter);
    }

    process(obj) {
        for (const filter of this.filters) {
            obj = filter.execute(obj);
        }
        return obj;
    }
}

class VecBase {
    constructor() {
        if (this.abstract())
            throw new Error("Can't create object of type VecBase");
    }

    abstract() {
        return true;
    }

    mag() {
        return Math.sqrt(this.sqMag());
    }

    sqDist(v) {
        return v.copy().sub(this).sqMag();
    }

    dist(v) {
        return Math.sqrt(this.sqDist(v));
    }

    normalize() {
        var len = this.mag();
        // here we multiply by the reciprocal instead of calling 'div()'
        // since div duplicates this zero check.
        if (len !== 0) this.div(len);
        return this;
    }

    limit(max) {
        var mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)) //normalize it
                .mult(max);
        }
        return this;
    }

    setMag(n) {
        return this.normalize().mult(n);
    }
}

class Vec2 extends VecBase {
    constructor(x, y) {
        super();
        this.set(x, y);
    }

    abstract() {
        return false;
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    set(x, y) {
        if (x instanceof Vec2) {
            this.x = x.x || 0;
            this.y = x.y || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            return this;
        }
        this.x = x || 0;
        this.y = y || 0;
        return this;
    };

    add(x, y) {
        if (x instanceof Vec2) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            return this;
        }
        this.x += x || 0;
        this.y += y || 0;
        return this;
    }

    sub(x, y) {
        if (x instanceof Vec2) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            return this;
        }
        this.x -= x || 0;
        this.y -= y || 0;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }


    sqMag() {
        return this.x * this.x + this.y * this.y;
    }

    static random() {
        if (arguments.length == 0)
            return this.fromAngle(Math.random() * Math.PI * 2);
    }

    static fromAngle(angle, length) {
        if (typeof length === 'undefined') {
            length = 1;
        }
        return new Vec2(length * Math.cos(angle), length * Math.sin(angle));
    };
}