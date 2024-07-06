#!/bin/bash
cd backend
python app.py &
cd ../frontend
http-server &