const hljs = require("highlight.js");
const md = require('markdown-it')();

module.exports = {
    "build": [{
        "match": [/\.scss/i],
        "transformers": [{"name": "scss"}],
        "ext": ".css"
    }, {
        "match": [/\.md$/i, /\.markdown$/i],
        "transformers": [
            // Any jstransformer module
            {
                "name": "markdown-it",
                "options": {
                    highlight: function (str, lang) {
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return '<pre class="hljs"><code data-lang="' + lang.replace(/js/i, "javascript") + '">' +
                                        hljs.highlight(lang, str, true).value +
                                        '</code></pre>';
                            } catch (__) {}
                        }
                  
                      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
                    }
                  }
            }, {"name": "twemoji"}
        ]
    }]
}