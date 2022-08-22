export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidale;
        switch (validateMethod) {
            case "isRequired":
                statusValidale = data.trim() === "";
                break;

            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidale = !emailRegExp.test(data);
                break;
            }

            case "isCapitalSymbol": {
                const capitalSymbolRegExp = /[A-Z]/g;
                statusValidale = !capitalSymbolRegExp.test(data);
                break;
            }

            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidale = !digitRegExp.test(data);
                break;
            }

            case "min":
                statusValidale = data.length < config.value;
                break;

            default:
                break;
        }

        if (statusValidale) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
