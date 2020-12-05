#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
	.option('graph', {
		alias: 'g',
		description: 'Your graph name',
		type: 'string',
	})
	.command(
		'$0',
		'Download a full export from Roam',
		() => { },
		(argv) => {
			const RoamPrivateApi = require('../');
			const secrets = require( '../secrets.json' );
			const api = new RoamPrivateApi(argv.graph, secrets.email, secrets.password, {
				headless: false,
				folder: './tmp/',
				nodownload: false,
			});

			api.getExportData().then(data => console.log('success', data));
		})
		.help()
		.alias('help', 'h')
		.demandOption(
			['graph'],
			'You need to provide graph'
		).argv;
