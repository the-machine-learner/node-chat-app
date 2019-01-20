//moment takes in time in milli seconds
var moment = require('moment');

var date = moment(); // the value entered in the bracket is by default set to current time but you can enter any time you want

console.log(date.format('H:mm A'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);