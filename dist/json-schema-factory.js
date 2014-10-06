(function (global) {

    var factory = function (schema) {
        var returnedValue;
        if (!schema.type) {
            return;
        }

        switch (schema.type) {
            case "string":
            case "number":
            case "boolean":
                if (schema.default !== undefined) {
                    returnedValue = schema.default;
                }
            break;
        }

        if (schema.type === "array"){
            returnedValue = [];
        }

        if (schema.type === "object"){
            returnedValue = {};
            if (schema.properties){
                Object.keys(schema.properties).forEach(function (key) {
                    var childSchema = schema.properties[key];
                    returnedValue[key] = factory(childSchema);
                });
            }
        }


        return returnedValue;
    };


    global.jsonSchemaFactory = factory;

})(window)