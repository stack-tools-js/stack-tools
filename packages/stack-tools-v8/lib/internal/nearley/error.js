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
  EmptyLine: /^[ \t]+$/,
  MessageLine: /^.+$/,
});

const buildErrorChain = (errors) => {
  return { type: 'ErrorChain', errors };
};

const buildError = (header, frames) => {
  return { type: 'Error', header, frames };
};

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "ErrorChain$ebnf$1", "symbols": []},
    {"name": "ErrorChain$ebnf$1", "symbols": ["ErrorChain$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorChain$subexpression$1$ebnf$1", "symbols": []},
    {"name": "ErrorChain$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": ["NL"]},
    {"name": "ErrorChain$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": ["ErrorChain$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorChain$subexpression$1$ebnf$1$subexpression$1", "symbols": ["ErrorChain$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "CompleteError"]},
    {"name": "ErrorChain$subexpression$1$ebnf$1", "symbols": ["ErrorChain$subexpression$1$ebnf$1", "ErrorChain$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorChain$subexpression$1", "symbols": ["CompleteError", "ErrorChain$subexpression$1$ebnf$1"], "postprocess": (d) => buildErrorChain([d[0], ...d[1].map((d) => d[1])])},
    {"name": "ErrorChain$subexpression$1", "symbols": ["Header"], "postprocess": (d) => buildErrorChain([buildError(d[0])])},
    {"name": "ErrorChain$subexpression$1", "symbols": ["Stack"], "postprocess": (d) => buildErrorChain([buildError('', d[0])])},
    {"name": "ErrorChain$ebnf$2", "symbols": []},
    {"name": "ErrorChain$ebnf$2$subexpression$1", "symbols": ["NL"]},
    {"name": "ErrorChain$ebnf$2$subexpression$1", "symbols": ["EmptyLine"]},
    {"name": "ErrorChain$ebnf$2", "symbols": ["ErrorChain$ebnf$2", "ErrorChain$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorChain", "symbols": ["ErrorChain$ebnf$1", "ErrorChain$subexpression$1", "ErrorChain$ebnf$2"], "postprocess": (d) => d[1]},
    {"name": "Error$ebnf$1", "symbols": []},
    {"name": "Error$ebnf$1", "symbols": ["Error$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Error$subexpression$1", "symbols": ["CompleteError"], "postprocess": id},
    {"name": "Error$subexpression$1", "symbols": ["Header"], "postprocess": (d) => buildError(d[0])},
    {"name": "Error$subexpression$1", "symbols": ["Stack"], "postprocess": (d) => buildError('', d[0])},
    {"name": "Error$ebnf$2", "symbols": []},
    {"name": "Error$ebnf$2$subexpression$1", "symbols": ["NL"]},
    {"name": "Error$ebnf$2$subexpression$1", "symbols": ["EmptyLine"]},
    {"name": "Error$ebnf$2", "symbols": ["Error$ebnf$2", "Error$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Error", "symbols": ["Error$ebnf$1", "Error$subexpression$1", "Error$ebnf$2"], "postprocess": (d) => d[1]},
    {"name": "CompleteError$ebnf$1", "symbols": ["NL"]},
    {"name": "CompleteError$ebnf$1", "symbols": ["CompleteError$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CompleteError", "symbols": ["Header", "CompleteError$ebnf$1", "Stack"], "postprocess": (d) => buildError(d[0], d[2])},
    {"name": "Header$ebnf$1", "symbols": []},
    {"name": "Header$ebnf$1$subexpression$1$ebnf$1", "symbols": ["NL"]},
    {"name": "Header$ebnf$1$subexpression$1$ebnf$1", "symbols": ["Header$ebnf$1$subexpression$1$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Header$ebnf$1$subexpression$1", "symbols": ["Header$ebnf$1$subexpression$1$ebnf$1", "MessageLine"]},
    {"name": "Header$ebnf$1", "symbols": ["Header$ebnf$1", "Header$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Header", "symbols": ["MessageLine", "Header$ebnf$1"], "postprocess":  (d) => {
          return `${d[0]}${stringFrom(d[1].flatMap((d) => [...d[0], d[1]]))}`.trimRight()
        } },
    {"name": "Stack$ebnf$1", "symbols": []},
    {"name": "Stack$ebnf$1$subexpression$1", "symbols": ["NL", "Frame"]},
    {"name": "Stack$ebnf$1", "symbols": ["Stack$ebnf$1", "Stack$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Stack", "symbols": ["Frame", "Stack$ebnf$1"], "postprocess": (d) => [d[0], ...d[1].map(d => d[1])]},
    {"name": "Frame", "symbols": [(lexer.has("Frame") ? {type: "Frame"} : Frame)], "postprocess": (d) => ({type: 'TextFrame', text: d[0].text})},
    {"name": "MessageLine$subexpression$1", "symbols": [(lexer.has("MessageLine") ? {type: "MessageLine"} : MessageLine)]},
    {"name": "MessageLine$subexpression$1", "symbols": [(lexer.has("EmptyLine") ? {type: "EmptyLine"} : EmptyLine)]},
    {"name": "MessageLine", "symbols": ["MessageLine$subexpression$1"], "postprocess": (d) => d[0][0].text.trimRight()},
    {"name": "EmptyLine", "symbols": [(lexer.has("EmptyLine") ? {type: "EmptyLine"} : EmptyLine)], "postprocess": (d) => ''},
    {"name": "NL", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].text}
]
  , ParserStart: "ErrorChain"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
