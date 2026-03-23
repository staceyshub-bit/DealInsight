#!/bin/bash
cd ~/Desktop/dealinsight

echo ""
echo "========================================="
echo "  Deal Insight - Save Snapshot"
echo "========================================="
echo ""
echo "What changed? (type a short note, then hit Enter)"
echo "Example: updated tracker, fixed dark mode, new Bible version"
echo ""
read -p "> " msg

if [ -z "$msg" ]; then
  msg="update"
fi

git add -A
git commit -m "$msg"

echo ""
echo "Done! Snapshot saved."
echo ""
read -p "Press Enter to close."
