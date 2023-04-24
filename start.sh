#!/bin/bash

cd tools
chmod +x ./start_database.sh & ./start_database.sh
cd ..

npm i

npm run dev -w api &
P1=$!
npm run dev -w frontend &
P2=$!
wait $P1 $P2
