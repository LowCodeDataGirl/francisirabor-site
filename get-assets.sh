#!/usr/bin/env bash
# Downloads every image and video the site uses from the current Canva site
# into ./assets. Run once from this folder BEFORE moving the domain off Canva.
set -e
cd "$(dirname "$0")"
while read -r p; do
  [ -z "$p" ] && continue
  mkdir -p "assets/$(dirname "$p")"
  [ -s "assets/$p" ] && { echo "have  $p"; continue; }
  echo "get   $p"
  curl -fsSL "https://francisirabor.com/_assets/$p" -o "assets/$p"
done < assets.txt
echo "Done. Open index.html to check."
