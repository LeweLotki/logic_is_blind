#!/bin/bash

PID=$(ps -ef | grep 'logic-is-blind' | grep -v 'grep' | awk '{print $2}')
PROJECT_HOME="/home/lewelotki/Desktop/logic_is_blind"

if [ ! -z "$PID" ]; then
  kill $PID
  sleep 2
fi

cd $PROJECT_HOME;
poetry run gunicorn wsgi:app > wsgi.log 2>&1 &
