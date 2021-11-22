@{%
const { stringFrom, get } = require('./util.js');
const {
  lexer,
  buildFrame,
  buildEvalFrame,
  buildCallSite,
  buildCall,
  buildLocator,
} = require('../frame-shared.js');
%}

@lexer lexer

# Strict frame grammar. See FunctionName production for details

# at foo (file.js:1:23)
Frame ->
  _ "at" __ (
    # evalOrigin (eval at evalmethod (file.js:1:23), <anonymous>:1:5)
    FunctionName _ "(" _ "eval" __ "at" __ CallSite _ ( "," _ Site ):? _ ")"
      {% (d) => buildEvalFrame(d[0], get(d, 10, 2), d[8]) %}
    | CallSite {% (d) => buildFrame(d[0]) %}
    # stack-tools prints this when all frames are cleaned to avoid merging messages
    | "<" "omitted" ">" {% (d) => ({ type: 'OmittedFrame' }) %}
  ) _ {% (d) => d[3] %}

# file.js:1:23
# call (file.js:1:23)
CallSite ->
  Call __ "(" _ Site _ ")"
  {% (d) => buildCallSite(d[0], d[4]) %}
  | Call __ "(" _ "index" __ Number _ ")"
  {% (d) => buildCallSite(d[0], { type: "IndexSite", index: d[6] }) %}
  | Site
  {% (d) => buildCallSite(undefined, d[0]) %}

# foo
# async foo
# new Foo
# fnName [as methodName]
Call ->
  (Modifier __):? FunctionName (__ AsMethod):?
  {% (d) => buildCall(get(d, 0, 0), d[1], get(d, 2, 1)) %}


Modifier ->
  ("new" | "async") {% (d) => d[0][0].text %}

# file.js:1:23
Site ->
  Locator _ Position
  {% (d) => ({ type: "FileSite", locator: d[0], position: d[2] }) %}
  # Allow ourselves to require position when path is not anonymous
  | "<" "anonymous" ">"
  {% () => ({ type: "AnonymousSite" }) %}
  | "native"
  {% () => ({ type: "NativeSite" }) %}

# :1:23
Position -> ":" _ Number _ ":" _ Number
  {% (d) => ({ type: 'Position', line: d[2], column: d[6] }) %}

# [as methodName]
AsMethod -> "[" "as" __ FunctionName "]" {% (d) => d[3] %}

# file.js
# https://site.tld/file.js
Locator ->
  PathFragment SpacePathFragment:* {% (d) => buildLocator(d[0] + stringFrom(d[1])) %}
  | "<" "anonymous" ">" {% () => ({ type: "AnonymousLocator" }) %}

# Ensure that path never begins or ends with spaces.
SpacePathFragment -> SP:? PathFragment {% (d) => (d[0] || '') + d[1] %}

PathFragment -> (%Number | %CN | %Fragment) {% (d) => d[0][0].text %}

# This is the main difference in the strict parser
# We do not allow text to contain characters that would be ambiguous

FunctionName -> FunctionNameFragment:* {% (d) => stringFrom(d[0]) %}

FunctionNameFragment -> (%Number | %Fragment | %LB | %RB | %LA | %RA) {% (d) => d[0][0].text %}

Number -> %Number {% (d) => d[0].value %}

SP -> %SP {% (d) => d[0].text %}

_ -> __:? {% id %}

__ -> %SP {% (d) => d[0].text %}
