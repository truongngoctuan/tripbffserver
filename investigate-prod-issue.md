2020-01-15 09:07:15ERR queueNotFound
2020-01-15 09:07:15attempting to create queue
2020-01-15 09:07:15Create error { ReplyError: READONLY You can't write against a read only slave.
2020-01-15 09:07:15at parseError (/home/node/app/node_modules/redis-parser/lib/parser.js:193:12)
2020-01-15 09:07:15at parseType (/home/node/app/node_modules/redis-parser/lib/parser.js:303:14)
2020-01-15 09:07:15command: 'SADD',
2020-01-15 09:07:15args: [ 'rsmq:QUEUES', 'myqueue' ],
2020-01-15 09:07:15code: 'READONLY' }
2020-01-15 09:07:15queue created


14:50:08
1:M 17 Jan 14:50:08.127 # Background saving error

14:50:14
1:M 17 Jan 14:50:14.053 * 1 changes in 900 seconds. Saving...

14:50:14
1:M 17 Jan 14:50:14.053 * Background saving started by pid 30785

14:50:14
30785:C 17 Jan 14:50:14.058 # Failed opening the RDB file dump.rdb (in server root dir /etc) for saving: Permission denied

14:50:14
1:M 17 Jan 14:50:14.154 # Background saving error

14:50:20
1:M 17 Jan 14:50:20.077 * 1 changes in 900 seconds. Saving...

14:50:20
1:M 17 Jan 14:50:20.077 * Background saving started by pid 30786

14:50:20
30786:C 17 Jan 14:50:20.082 # Failed opening the RDB file dump.rdb (in server root dir /etc) for saving: Permission denied

1:M 22 Nov 2019 04:34:50.011 * 1 changes in 3600 seconds. Saving...
1:M 22 Nov 2019 04:34:50.038 * Background saving started by pid 16
16:C 22 Nov 2019 04:34:50.056 * DB saved on disk
16:C 22 Nov 2019 04:34:50.060 * RDB: 0 MB of memory used by copy-on-write
1:M 22 Nov 2019 04:34:50.138 * Background saving terminated with success
1:signal-handler (1574430210) Received SIGTERM scheduling shutdown...

// https://stackoverflow.com/questions/54314795/redis-permission-denied-while-opening-dump-rdb
After an hour of inactivity Redis will try to dump the memory db to disk.

Redis from the official redis image tries to write the .rdb file in the containers /data folder, which is rather unfortunate, as it is a root-owned folder and it is a non-persistent location too (data written there will disappear if your container/pod crashes).

So after an hour of inactivity, if you have run your redis container as a non-root user (e.g. docker run -u 1007 rather than default docker run -u 0), you will get a nicely detailed error msg in your log (see docker logs redis):

https://github.com/docker-library/redis/issues/182
https://stackoverflow.com/questions/54314795/redis-permission-denied-while-opening-dump-rdb
https://redis.io/topics/persistence
https://github.com/docker-library/redis/issues/128