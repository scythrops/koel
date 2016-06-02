Koel
===

Functional Version:

```js
{
  "required": string(),
  "*optional": string(),
  ">link": "collection.key[=collection.display]", // Example of a custom prefix
  "number": number(),
  "regex": /someregex/gi,
  "anything": any(),
  "date": date(),
  "object": {
    ...
  } || object({...}, {...}, ...),
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

Explicit Version:

```js
{
  "key": {
    "type": "string",
    "min": 0,
    "max": 0,
    "regex": {
      "expression": "string",
      "options": "string"
    },
    "default": value, // Must be same type as type above
    "allows": [....], // Must be a string or a number
  }
}
```
