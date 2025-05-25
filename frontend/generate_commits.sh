#!/bin/bash

# Create a dummy file
touch log.txt

for i in {1..20}; do
  echo "update $i" >> log.txt
  git add log.txt

  # Generate a random date between May 23 and 26, 2025
  day=$((23 + RANDOM % 4))
  hour=$((8 + RANDOM % 10))   # Between 8 AM and 6 PM
  minute=$((RANDOM % 60))

  DATE="2025-05-${day}T${hour}:${minute}:00"

  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" git commit -m "update" --date="$DATE"

  echo "Committed: update at $DATE"
done
