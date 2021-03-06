/**
 * Animable.js
 *
 * https://github.com/JWhile/Animable.js
 *
 * version 1.5.3
 *
 * Animable.js
 */

var anime,stopAnime,smooth;

(function(){ // namespace

// class Animation
function Animation(id, from, to, time, update, smooth)
{
    this.id = id; // :int

    this.from = from; // :float
    this.diff = to - from; // :float

    this.start = Date.now(); // :long
    this.time = time; // :int

    this.update = update; // :function

    this.smooth = smooth; // :function
}
// function next(long now):boolean
Animation.prototype.next = function(now)
{
    var progression = (now - this.start) / this.time;

    if(progression >= 1)
    {
        this.update(this.diff + this.from);

        return true;
    }

    this.update(this.diff * this.smooth(progression) + this.from);

    return false;
};

var lastAnimId = 0; // :int
var animations = []; // :Array<Animation>
var loop = false; // :boolean

// function next():void
var next = function()
{
    loop = (animations.length > 0);

    if(loop)
    {
        newFrame(next);

        var now = Date.now();

        for(var i = 0; i < animations.length; ++i)
        {
            if(animations[i].next(now))
            {
                animations.splice(i, 1);

                --i;
            }
        }
    }
};

// var smooth:Map<String, function>
smooth = {

    // function(float progression):float
    'Line': function(progression)
    {
        return progression;
    },

    // function(float progression):float
    'In': function(progression)
    {
        return progression * progression;
    },

    // function(float progression):float
    'Out': function(progression)
    {
        return (progression - 2) * -progression;
    },

    // function(float progression):float
    'InOut': function(progression)
    {
        return ((progression *= 2) < 1)? 0.5 * progression * progression : -0.5 * (--progression * (progression - 2) - 1);
    },

    // function(float progression):float
    'Elastic': function(progression)
    {
        return Math.pow(2, -10 * progression) * Math.sin((progression - 0.075) * (Math.PI * 2) / 0.3) + 1;
    },

    // function(float progression):float
    'Bounce': function(progression)
    {
        progression = 1 - progression;

        for(var a = 0, b = 1; true; a += b, b /= 2)
        {
            if(progression >= ((7 - (4 * a)) / 11))
            {
                return 1 - (b * b - Math.pow((11 - (6 * a) - (11 * progression)) / 4, 2));
            }
        }
    }
};

// function anime(function update, float from, float to, int time, function userSmooth = null):int
anime = function(update, from, to, time, userSmooth)
{
    animations.push(new Animation(++lastAnimId, from, to, time, update, (typeof userSmooth === 'function')? userSmooth : smooth.Line));

    if(!loop)
    {
        newFrame(next);
    }

    return lastAnimId;
};

// function stopAnime(int id):void
stopAnime = function(id)
{
    for(var i = 0; i < animations.length; ++i)
    {
        if(animations[i].id === id)
        {
            animations.splice(i, 1);

            --i;
        }
    }
};

if(typeof Builder === 'function')
{
    // function anime(String property, int to, int time, function callback = null, function userSmooth = null):@Chainable
    Builder.prototype.anime = function(property, to, time, callback, userSmooth)
    {
        this.stopAnime(''+ property);

        var self = this;

        var style = Builder.getStyle(this.node, property);
        var unit = (style.match(/em$|px$|%$/i) || [''])[0];

        this._animations[property] = anime(function(value)
        {
            if(value === to)
            {
                delete self._animations[property];

                if(callback != null)
                {
                    callback();
                }
            }

            self.node.style[property] = value + unit;

        }, parseInt(style), to, time, userSmooth);

        return this;
    };

    // function stopAnime(String property = null):void
    Builder.prototype.stopAnime = function(property)
    {
        this._animations = this._animations || {}; // Map<String, int>

        if(typeof property === 'string')
        {
            if(this._animations[property])
            {
                stopAnime(this._animations[property]);

                delete this._animations[property];
            }
        }
        else
        {
            for(var key in this._animations)
            {
                if(this._animations.hasOwnProperty(key))
                {
                    stopAnime(this._animations[key]);
                }
            }

            this._animations = {};
        }
    };
}

})();
