---
title: "Things Python sucks at #1/∞: Rendering"
date: 11 Feb 2019
author:
    name: George Fischer
    image: george.jpg
template: post
tags: python,rendering,ascii,node.js
---
Python is not fast. Low speed isn't good for doing lots of things in a short amount of time (like rendering).

This is a bit of a problem, as my game is going to need to write a lot of characters to the screen, many of which you can't even see. We're going to need to do something else here. It's time to cheat (some more)(oops).

You know what is faster than python? Node.js. Node.js is really fast. It also has the added bonus that I can compile many other languages, like Dart, to it, and I can package it into a binary using `pkg`. 

```js
// Print a rainbow
for(let y = 1; y < d.y; y += 2) {
	var str = []
	for(let x = 0; x < d.x; ++x) {
		const c1 = hsl(x / d.x, 1, (d.y - y + 1) / d.y);
		const c2 = hsl(x / d.x, 1, (d.y - y) / d.y);
		str.push(/* String with ansi control chars */)
	}
	console.log(str.join("")+ "\u001b[m")
}
```

This is definitely cheating. I have no idea if I'll get away with it. What I do know is that it's way faster, and implementing the renderer in python will kill the the frametime. On another note, writing it in c++ or something would improve it further, but I'm far too lazy to learn them