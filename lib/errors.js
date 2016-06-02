export class TypeError extends Error{
  constructor(expected, got){
    const message = `Expected ${expected} but got ${got}`;
    super(message);
    this.message = message;
    this.name = 'TypeError';
    this.expected = expected;
    this.got = got;
  }
};

export class RangeError extends Error{
  constructor(msg, value, limit){
    const message = `Value ${value} ${msg} of ${limit}`;
    super(message);
    this.message = message;
    this.name = 'RangeError';
    this.value = value;
    this.limit = limit;
  }
};

export class UnallowedTypeError extends Error{
  constructor(typeName){
    const message = `Type ${typeName} is not allowed`;
    super(message);
    this.message = message;
    this.name = UnallowedTypeError;
    this.typeName = typeName;
  }
};
