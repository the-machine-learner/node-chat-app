var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('USER 1','abc')
		expect(res.from).toBe('USER 1');
		expect(res.text).toBe('abc');
		expect(res.createdAt).toBeA('number');
	});
});