#!/bin/bash

# Askwinn Project - GitHub Setup Commands
# Replace YOUR_USERNAME and REPO_NAME with your actual values

echo "🚀 Setting up Askwinn project on GitHub..."

# Step 1: Add remote repository
echo "Adding remote repository..."
git remote add origin https://github.com/bansodashish/askwinn_project.git

# Step 2: Push to GitHub
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Project successfully pushed to GitHub!"
echo "🌐 Visit: https://github.com/YOUR_USERNAME/REPO_NAME"

# Optional: Open GitHub repository in browser (macOS)
# open https://github.com/YOUR_USERNAME/REPO_NAME
