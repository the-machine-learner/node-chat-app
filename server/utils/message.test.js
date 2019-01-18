var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('USER 1','abc')
		expect(res.from).toBe('USER 1');
		expect(res.text).toBe('abc');
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateMessageLocation',()=>{
	it('should generate correct location object',()=>{
		var res = generateLocationMessage('user1',1.3223,4.3434);
		expect(res.from).toBe('user1');
		expect(res.url).toBe("https://www.google.com/maps?q=1.3223,4.3434");
		expect(res.createdAt).toBeA('number');		
	});
});