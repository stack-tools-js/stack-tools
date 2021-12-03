@{%

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

%}

@lexer lexer

ErrorChain ->
  NL:* (
    CompleteError (NL:+ CompleteError):*
    {% (d) => buildErrorChain([d[0], ...d[1].map((d) => d[1])]) %}
    | Header
    {% (d) => buildErrorChain([buildError(d[0])]) %}
    | Stack
    {% (d) => buildErrorChain([buildError('', d[0])]) %}
  ) (NL | EmptyLine):* {% (d) => d[1] %}

Error ->
  NL:* (
    CompleteError {% id %}
    | Header {% (d) => buildError(d[0]) %}
    | Stack {% (d) => buildError('', d[0]) %}
  ) (NL | EmptyLine):* {% (d) => d[1] %}

CompleteError -> Header NL:+ Stack
{% (d) => buildError(d[0], d[2]) %}

Header -> MessageLine (NL:+ MessageLine):* {% (d) => {
  return `${d[0]}${stringFrom(d[1].flatMap((d) => [...d[0], d[1]]))}`.trimRight()
} %}

Stack -> Frame (NL Frame):* {% (d) => [d[0], ...d[1].map(d => d[1])] %}

Frame -> %Frame {% (d) => ({type: 'TextFrame', text: d[0].text}) %}

MessageLine -> (%MessageLine | %EmptyLine) {% (d) => d[0][0].text.trimRight() %}
EmptyLine -> %EmptyLine {% (d) => '' %}

NL -> %NL {% (d) => d[0].text %}
