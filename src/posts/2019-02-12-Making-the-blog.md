---
template: post
title: Making the blog
date: Feb 24 2019
---
This blog is pretty simple. It can't even have multiple pages for the post list (watch this space maybe 🤷)
The way that it works is also pretty simple. I write *markdown*, run the `cmx` command and it spits out a bunch of html that I can host just like any other website. This is great for me, because it means I can host it basically anywhere, but it does have some downsides.

# Downsides
As I just said, the way this blog works has some downsides. For starters, I have to build it whenever I want to see an update. This is great for website speed, but for testing out changes it's not great. Another issue is its simplicity, meaning I had to make a bit of stuff specially for this blog. 

# Making the thing
## Starting out
When I set out making this blog, I had only a very simple vision for it. I wanted to put a bunch of files in a folder, run a program and have it all formatted nicely. Aaron did this with jekyll, but I wanted to do it with something I was more familiar with: cmx, something I made myself. cmx is *really* simple. It doesn't have features Jekyll has like built-in blog support, so I would have to do that myself. The way that I've done that is weird and hacky, but it works. Essentially, what happens is a separate program iterates over all the files in the posts directory, then spits out a file with all the post links in it

## The code
```js
const files = fs.readDirSync(__dirname + "/posts")
/* ... */
files.forEach(function(f) {
```
Get all the files in the `posts` directory and iterate over them
```js
const df = fs.statSync(__dirname + "/src/posts/" + f)
if(!df.isDirectory()) {
    const rawdata = fs.readFileSync(__dirname + "/src/posts/" + f, "utf-8");
    const data = fm(rawdata);
    const $ = cheerio.load(mdi.render(data.body).body)
    var snippet = "";
    try {
        snippet = $("p:first-of-type").text().replace(/\. ?$/, "") + "…"
    } catch(err) {}
    file += template(data.attributes.title, f, new Date(data.attributes.date), snippet);
}
```
Check if the  current file is actually a folder, and if it isn't first get the title, date and content, then send it to `template()`
```js
function template(title, url, d, snippet) {
    return `# [${title}](/posts/${url.replace(/\.md$/i, ".html")})
_${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}_\n
${snippet}\n\n---\n\n`
```
This one looks a bit confusing, it's essentially just a template string which substitutes the markers given with data given into it