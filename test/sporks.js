'use strict';

var sinon = require('sinon');
var should = require('should');
var SporkController = require('../lib/sporks');

describe('Spork', function () {
	describe('/spork', function () {
		var SporkList = {
			"sporks": {
				"SPORK_1_INSTANTSEND_ENABLED": 4070908800,
				"SPORK_2_INSTANTSEND_BLOCK_FILTERING": 0,
				"SPORK_3_INSTANTSEND_MAX_VALUE": 20000,
				"SPORK_4_MASTERNODE_PAYMENT_ENFORCEMENT": 4070908800,
				"SPORK_5_SUPERBLOCKS_ENABLED": 4070908800,
				"SPORK_6_RECONSIDER_BLOCKS": 0,
				"SPORK_7_REQUIRE_SENTINEL_FLAG": 4070908800,
				"SPORK_8_MASTERNODE_PAY_PROTO_MIN": 70208
			}
		};
		var node = {
			services: {
				bitcoind: {
					getSpork: sinon.stub().callsArgWith(0, null, SporkList)
				}
			}
		};

		var sporks = new SporkController(node);

		it('get spork', function (done) {
			var req = {};
			var res = {
				jsonp: function (data) {
					console.log(data);
					should.exist(data.sporks);
					should.exist(data.sporks.SPORK_1_INSTANTSEND_ENABLED);
					should.exist(data.sporks.SPORK_2_INSTANTSEND_BLOCK_FILTERING);
					should.exist(data.sporks.SPORK_3_INSTANTSEND_MAX_VALUE);
					should.exist(data.sporks.SPORK_4_MASTERNODE_PAYMENT_ENFORCEMENT);
					should.exist(data.sporks.SPORK_5_SUPERBLOCKS_ENABLED);
					should.exist(data.sporks.SPORK_6_RECONSIDER_BLOCKS);
					should.exist(data.sporks.SPORK_7_REQUIRE_SENTINEL_FLAG);
					should.exist(data.sporks.SPORK_8_MASTERNODE_PAY_PROTO_MIN);
					done();
				}
			};

			sporks.list(req, res);
		});
	});
});
