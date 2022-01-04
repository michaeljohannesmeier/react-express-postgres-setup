#!/bin/sh
# ensure lf line ending
psql << EOF
    CREATE DATABASE $POSTGRES_DB_BACKEND;
EOF