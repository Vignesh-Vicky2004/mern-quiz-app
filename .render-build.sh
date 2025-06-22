#!/usr/bin/env bash

# Step 1: Install and build React frontend
cd client
npm install
npm run build

# Step 2: Go to server and install backend dependencies
cd ../server
npm install
