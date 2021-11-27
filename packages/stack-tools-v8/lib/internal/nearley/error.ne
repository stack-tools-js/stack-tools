@{%

const moo = require('moo');
const { stringFrom } = require('./util.js');

const lexer = moo.compile({
  // Don't even try to lex frames here
  Frame: /^[ \t]*at .*$/,
  NL: { match: '\n', lineBreaks: true },
  MessageLine: /^.+$/,
});

const buildErrorChain = (errors) => {
  return { type: 'ErrorChain', errors };
};

const buildError = (header, frames) => {
  return { type: 'Error', header, frames };
};

%}

@lexer lexer

ErrorStack ->
  CompleteError (NL CompleteError):*
  {% (d) => buildErrorChain([d[0], ...d[1].map((d) => d[1])]) %}
  | Header
  {% (d) => buildErrorChain([buildError(d[0])]) %}

Error ->
  CompleteError {% id %}
  | Header {% (d) => buildError(d[0]) %}

CompleteError -> Header NL:+ Stack
{% (d) => buildError(d[0], d[2]) %}

Header -> MessageLine (NL:+ MessageLine):* {% (d) => `${d[0]}${stringFrom(d[1].flat())}`.trimRight() %}

Stack -> Frame (NL Frame):* {% (d) => [d[0], ...d[1].map(d => d[1])] %}

Frame -> %Frame {% (d) => ({type: 'TextFrame', text: d[0].text}) %}

MessageLine -> %MessageLine {% (d) => d[0].text.trimRight() %}

NL -> %NL {% (d) => d[0].text %}
