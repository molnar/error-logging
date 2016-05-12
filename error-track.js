var service = "http://localhost:4017/app/errors";
console.log("listening at " + service);

//universal listner to errors
window.onerror = function (errorMsg, url, lineNumber, columnNumber, error) {
    console.log("you have errors", errorMsg)
    var errorObj = {};
    errorObj.errorMsg = errorMsg; 
    errorObj.url = url;
    errorObj.lineNumber = lineNumber;
    errorObj.columnNumber = columnNumber;
    errorObj.error = JSON.stringify(error);

    

    //send the error object to a data service
    var xhr = new XMLHttpRequest();
    xhr.open("POST", service, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(errorObj));
    
    //
    return false;
}

if (!('toJSON' in Error.prototype))
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true,
    writable: true
});