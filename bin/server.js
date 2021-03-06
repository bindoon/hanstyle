#!/usr/bin/env node
'use strict';
var path = require('path'),
    recluster = require('recluster');

var cluster = recluster(path.join(__dirname, 'www'),{
        workers:1
    });
cluster.run();

process.on('SIGUSR2', function() {
    console.warn('Got SIGUSR2, reloading cluster...');
    cluster.reload();
});

console.warn('spawned cluster, kill -s SIGUSR2 ' + process.pid + ' to reload');
