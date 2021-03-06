# Animable

_v1.5.3_

Make Builder Animable !

_Animable.js_ requière [RequestFrame.js](https://github.com/JWhile/RequestFrame.js).

_Animable.js_ requière [Builder.js](https://github.com/JWhile/Builder.js) **Optionnel !** _Pour ajouter les methodes Builder::anime() & Builder::stopAnime()_

### Exemple

[Exemple](http://jwhile.github.io/#Animable)

### Références

##### function anime(update, from, to, time, smooth)

Exécute `update` a 60 fps en lui transmettant la valeur actuelle en 1er paramètre.
Renvois l'_id_ (_int_) de l'animation.

* `update` _function_ Fonction exécutée à chaque frame.
* `from` _Number_ Nombre de départ.
* `to` _Number_ Nombre de fin.
* `time` _int_ Durée de l'animation.
* `smooth` _function_ Fonction d'accélération de l'animation. Par défault `smooth.Line`. _(Optionnel)_

##### function stopAnime(id)

Arrête l'animation correspondant à l'_id_.

* `id` _int_ Identifiant unique renvoyé par `function anime()`.

##### Builder::anime(property, to, time, callback, smooth)

Anime la `property` CSS de l'élément.
Détecte automatiquement la valeur de départ et l'unité.
`callback` est exécuté une fois l'animation terminée.

* `property` _String_ Propriété CSS.
* `to` _int_ Valeur de fin (sans l'unité).
* `time` _int_ Durée de l'animation.
* `callback` _function_ Fonction exécutée à la fin de l'animation. Par défault `null`. _(Optionnel)_
* `smooth` _function_ Fonction d'accélération de l'animation. Par défault `smooth.Line`. _(Optionnel)_

_Note: Créer une propriété `_animations` dans le `Builder`._

##### Builder::stopAnime(property)

Annule une ou plusieurs animations sur un _Builder_.
Si `property` n'est pas défini, arrête toute les animations lié à ce _Builder_.

* `property` _String_ Propriété animée à stoppper. _(Optionnel)_

_Note: Créer une propriété `_animations` dans le `Builder`._

##### var smooth

Contiens les effects d'accélération de base qui peuvent être transmis à `anime()`.

_Smooth effects_ de base:

* `smooth.Line`
* `smooth.In`
* `smooth.Out`
* `smooth.InOut`

_Smooth effects_ avancés (basés sur les _Easing Equations_ de _[Robert Penner](http://robertpenner.com/easing/)_):

_Note: Pour utiliser les smooth effects suivant, vous devez inclure le fichier easing.js après Animable.js_

* `smooth.CubicIn`
* `smooth.CubicOut`
* `smooth.CubicInOut`
* `smooth.QuartIn`
* `smooth.QuartOut`
* `smooth.QuartInOut`
* `smooth.QuintIn`
* `smooth.QuintOut`
* `smooth.QuintInOut`
* `smooth.SineIn`
* `smooth.SineOut`
* `smooth.SineInOut`
* `smooth.ExpoIn`
* `smooth.ExpoOut`
* `smooth.ExpoInOut`
* `smooth.CircIn`
* `smooth.CircOut`
* `smooth.CircInOut`

### License

> The MIT License (MIT)
> 
> Copyright (c) 2014 juloo
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
> the Software, and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
