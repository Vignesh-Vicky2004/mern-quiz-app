#!/usr/bin/env bash

# Step 1: Build frontend
cd client
npm install
npm run build

# Step 2: Install backend
cd ../server
npm install
