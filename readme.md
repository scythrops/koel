Koel
===

Generates basic ORM information from templates.  Can be used to creates tables,
collections, views, feed an ORM (Joi is the main target right now), etc...  Built
for use in Scythrops for user defined collections.

Functional Version:

```js
{
  "required": string(),
  "optional": string(),
  "link": link("collection.key[=collection.display]"), // Example of a custom mapper
  "number": number(),
  "regex": /someregex/gi,
  "anything": any(),
  "date": date(),
  "object": {
    keys: {
      ...
    }
  } || object({keys: {...}}),
  "array": [
    string(), // Allow Strings
    number(), // Allow Numbers
    ...
  ] || array(type, type, ...),
  "default": string().default('value'),
  "enumeration": enumeration('some', 'value'), // Only 'some' or 'value' will be allowed
  "constant": "value"|0|true,
}
```

Long Version:

```js
{
  "key": {
    "type": "string",
    "min": 0,
    "max": 100,
    "regex": {
      "expression": "string",
      "options": "string"
    },
    "keys": {
      ...
    },
    "required": false, // Defaults to true
    "default": value, // Must be same type as type above
    "allows": [....], // Must be a string or a number
  }
}
```
