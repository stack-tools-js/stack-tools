// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo');
const { stringFrom } = require('./util.js');

const lexer = moo.compile({
  // Don't even try to lex frames here
  Frame: /^[ \t]*at .*$/,
  NL: { match: '\n', lineBreaks: true },
  MessageLine: /^.+$/,
});

const buildError = (header, frames) => {
  return { type: 'Error', header, frames };
};

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "ErrorStack$ebnf$1", "symbols": []},
    {"name": "ErrorStack$ebnf$1$subexpression$1", "symbols": ["NL", "CompleteError"]},
    {"name": "ErrorStack$ebnf$1", "symbols": ["ErrorStack$ebnf$1", "ErrorStack$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorStack", "symbols": ["CompleteError", "ErrorStack$ebnf$1"], "postprocess": (d) => [d[0], ...d[1].map((d) => d[1])]},
    {"name": "ErrorStack", "symbols": ["Header"], "postprocess": (d) => [buildError(d[0])]},
    {"name": "Error", "symbols": ["CompleteError"], "postprocess": id},
    {"name": "Error", "symbols": ["Header"], "postprocess": (d) => buildError(d[0])},
    {"name": "CompleteError$ebnf$1", "symbols": ["NL"]},
    {"name": "CompleteError$ebnf$1", "symbols": ["CompleteError$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CompleteError", "symbols": ["Header", "CompleteError$ebnf$1", "Stack"], "postprocess": (d) => buildError(d[0], d[2])},
    {"name": "Header$ebnf$1", "symbols": []},
    {"name": "Header$ebnf$1$subexpression$1", "symbols": ["NL", "MessageLine"]},
    {"name": "Header$ebnf$1", "symbols": ["Header$ebnf$1", "Header$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Header", "symbols": ["MessageLine", "Header$ebnf$1"], "postprocess": (d) => `${d[0]}${stringFrom(d[1].flat())}`.trimRight()},
    {"name": "Stack$ebnf$1", "symbols": []},
    {"name": "Stack$ebnf$1$subexpression$1", "symbols": ["NL", "Frame"]},
    {"name": "Stack$ebnf$1", "symbols": ["Stack$ebnf$1", "Stack$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Stack", "symbols": ["Frame", "Stack$ebnf$1"], "postprocess": (d) => [d[0], ...d[1].map(d => d[1])]},
    {"name": "Frame", "symbols": [(lexer.has("Frame") ? {type: "Frame"} : Frame)], "postprocess": (d) => d[0].text},
    {"name": "MessageLine", "symbols": [(lexer.has("MessageLine") ? {type: "MessageLine"} : MessageLine)], "postprocess": (d) => d[0].text.trimRight()},
    {"name": "NL", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].text}
]
  , ParserStart: "ErrorStack"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
