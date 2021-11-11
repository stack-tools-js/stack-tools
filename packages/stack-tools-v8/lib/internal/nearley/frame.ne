@{%
const { stringFrom, get } = require('./util.js');
const {
  lexer,
  buildFrame,
  buildEvalFrame,
  buildCallSite,
  buildCall,
  buildLocator
} = require('../frame-shared.js');
%}

@lexer lexer

## TODO
# URI in addition to path
# Text must not be allowed to begin or end with space

# Ambiguous frame grammar. Slow. Fall back to this if the unambiguous frame grammar fails!

# at foo (file.js:1:23)
Frame ->
  _ "at" __ (
    # evalOrigin (eval at evalmethod (file.js:1:23), <anonymous>:1:5)
    Text _ "(" _ "eval" __ "at" __ CallSite _ ("," _ Site):? _ ")"
      {% (d) => buildEvalFrame(d[0], get(d, 10, 2), d[8]) %}
    | CallSite {% (d) => buildFrame(d[0]) %}
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
  (Modifier __):? Text (__ AsMethod):?
  {% (d) => buildCall(get(d, 0, 0), d[1], get(d, 2, 1)) %}

Modifier ->
  ("new" | "async") {% (d) => d[0][0].text %}

# file.js:1:23
Site ->
  Locator _ Position
  {% (d) => ({ type: "FileSite", locator: d[0], position: d[2] }) %}
  | "<" "anonymous" ">"
  {% () => ({ type: "AnonymousSite" }) %}
  | "native"
  {% () => ({ type: "NativeSite" }) %}

# :1:23
Position -> ":" _ Number _ ":" _ Number
  {% (d) => ({ type: 'Position', line: d[2], column: d[6] }) %}

# [as methodName]
AsMethod -> "[" "as" __ Text "]" {% (d) => d[3] %}

Locator ->
  Text {% (d) => buildLocator(d[0]) %}
  | "<" "anonymous" ">" {% () => ({ type: "AnonymousLocator" }) %}

Text -> Fragment SpaceFragment:* {% (d) => d[0] + stringFrom(d[1]) %}

# Ensure that text never begins or ends with spaces.
SpaceFragment -> SP:? Fragment {% (d) => (d[0] || '') + d[1] %}

Fragment -> (%CN | %LB | %RB | %LP | %RP | %LA | %RA | %Number | %Fragment) {% (d) => d[0][0].text %}

SP -> %SP {% (d) => d[0].text %}

Number -> %Number {% (d) => d[0].value %}

_ -> __:? {% id %}

__ -> %SP {% (d) => d[0].text %}
