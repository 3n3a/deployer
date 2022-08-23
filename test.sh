#!/bin/bash

wrangler dev &
sleep 20
curl -X POST -H "Content-Type: application/json" --data '{"part":"test","key":"1234"}' http://127.0.0.1:8787/api/trigger
killall wrangler