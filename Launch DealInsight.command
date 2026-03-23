#!/bin/bash
cd ~/Desktop/DealInsight
python3 dealinsight_server.py &
sleep 2
open -a "Google Chrome" http://localhost:8080/DealInsight_Pipeline_Demo.html
wait
