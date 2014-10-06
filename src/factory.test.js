describe('Json Schema Factory', function () {

    var schema = {},
        createdValue;
    When(function () {
        createdValue = jsonSchemaFactory(schema);
    });

    describe('Schema is a string with no default, return undefined', function () {
        Given(function () {
            schema = createSchema({
                type: "string"
            });
        });
        Then(function () {
            expect(createdValue).toBeUndefined();
        });
    });
    describe('Schema is a string with default value, return that default', function () {
        Given(function () {
            schema = createSchema({
                type: "string",
                default: "wow"
            });
        });
        Then(function () {
            expect(createdValue).toBe('wow');
        });
    });


    describe('object with no defaults should assign "undefined" ', function () {
        Given(function () {
            schema = createSchema({
                    type: "object",
                    properties: {
                        userName: {
                            type: "string"
                        },
                        userId: {
                            type: "number"
                        },
                        married: {
                            type: "boolean"
                        },
                        children: {
                            type: "array"
                        },
                        subChild: {
                            type: "object",
                            properties: {
                                'childName': {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            );
        });
        Then(function () {
            expect(createdValue.hasOwnProperty('userName')).toBe(true);
            expect(createdValue.hasOwnProperty('userId')).toBe(true);
            expect(createdValue.hasOwnProperty('married')).toBe(true);
            expect(createdValue.hasOwnProperty('children')).toBe(true);
            expect(createdValue.subChild.hasOwnProperty('childName')).toBe(true);
            expect(createdValue).toEqual({userName: undefined,
                                          userId: undefined,
                                          married: undefined,
                                          children: [],
                                          subChild: {childName: undefined}
            }
            );
        });
    });

    describe('object with defaults should assign them ', function () {
        Given(function () {
            schema = createSchema({
                    type: "object",
                    properties: {
                        userName: {
                            type: "string",
                            default: "Shimon"
                        },
                        userId: {
                            type: "number",
                            default: 0
                        },
                        married: {
                            type: "boolean",
                            default: false
                        },
                        children: {
                            type: "array"
                        }
                    }
                }
            );
        });
        Then(function () {
            expect(createdValue).toEqual({userName: 'Shimon', userId: 0, married: false, children: []});
        });
    });

    function createSchema(schemaObj) {
        var finalSchema = {
            $schema: "http://json-schema.org/draft-04/schema"
        }
        return _.extend(finalSchema, schemaObj);
    }

});