#!/usr/bin/env bash
set -euo pipefail

rm -rf docs
mkdir -p docs
cp -R src/* docs/
touch docs/.nojekyll
echo "Deployed src -> docs"
