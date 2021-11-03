@{%

const moo = require('moo');
const { stringFrom } = require('./util.js');

const lexer = moo.compile({
  // Don't even try to lex frames here
  Frame: /^[ \t]*at .*$/,
  NL: { match: '\n', lineBreaks: true },
  MessageLine: /^.+$/,
});

%}

@lexer lexer

ErrorStack ->
  CompleteError (NL CompleteError):*
  {% (d) => [d[0], ...d[1].map((d) => d[1])] %}
  | Header
  {% (d) => [{ header: d[0], frames: [] }] %}

Error ->
  CompleteError {% id %}
  | Header {% (d) => ({ header: d[0], frames: [] }) %}

CompleteError -> Header NL:+ Stack
{% (d) => ({ header: d[0], frames: d[2] }) %}

Header -> MessageLine (NL MessageLine):* {% (d) => `${d[0]}${stringFrom(d[1].flat())}`.trimRight() %}

Stack -> Frame (NL Frame):* {% (d) => [d[0], ...d[1].map(d => d[1])] %}

Frame -> %Frame {% (d) => d[0].text %}

MessageLine -> %MessageLine {% (d) => d[0].text.trimRight() %}

NL -> %NL {% (d) => d[0].text %}
