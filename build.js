const cmx = require("cmx2");
const fm = require("front-matter");
const fs = require("fs-extra");
const cheerio = require('cheerio');
const mdi = require('jstransformer')(require('jstransformer-markdown-it'))
const files = fs.readdirSync(__dirname + "/src/posts").sort().reverse();


const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function template(title, url, d, snippet) {
    return `# [${title}](/posts/${url.replace(/\.md$/i, ".html")})
_${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}_\n
${snippet}\n\n---\n\n`
}

var file = `---
template: home
---\n`

files.forEach(function(f) {
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
})

fs.writeFileSync(__dirname + "/src/index.md", file)

cmx(require("./.cmx"))