'use strict';
/** Büyük havuzlarda eşleştirme hesabını ana (HTTP) iş parçacığını bloklamadan yapar. */
const { parentPort, workerData } = require('node:worker_threads');
const E = require('./engine');
parentPort.postMessage(E.runMatching(workerData.all, workerData.P, workerData.today, workerData.ictx));
