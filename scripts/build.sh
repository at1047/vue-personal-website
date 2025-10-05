#!/usr/bin/env bash
set -euo pipefail

# Usage:
# ./build_and_push.sh [tag]
# Examples:
# ./build_and_push.sh           # builds and pushes :latest
# ./build_and_push.sh v1.0.0    # builds and pushes :v1.0.0 and :latest

IMAGE_NAME="at1047/vue-personal-website"
TAG="${1:-latest}"

# Platforms to build for (adjust as needed)
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"

# Ensure buildx is available
if ! docker buildx ls >/dev/null 2>&1; then
  echo "Docker buildx not found. Please install Docker Buildx."
  exit 1
fi

# Find an existing builder that already supports all required platforms; otherwise create one
find_and_use_builder() {
  local required="$PLATFORMS"
  IFS=',' read -r -a req_arr <<< "$required"

  # List builders that use docker-container driver (multi-arch capable)
  local candidates
  candidates=$(docker buildx ls 2>/dev/null | awk '/docker-container/ {print $1}') || true

  for name in $candidates; do
    # Clean possible leading '*' marker
    local clean
    clean=$(echo "$name" | tr -d '*')
    # Get platforms for this builder
    local plats
    plats=$(docker buildx inspect "$clean" 2>/dev/null | sed -n 's/^\s*Platforms: //p') || true
    # Verify all required platforms are present
    local ok=1
    for p in "${req_arr[@]}"; do
      if [[ "$plats" != *"$p"* ]]; then
        ok=0; break
      fi
    done
    if [[ $ok -eq 1 ]]; then
      docker buildx use "$clean" >/dev/null
      echo "Using existing builder '$clean' (Platforms: $plats)"
      return 0
    fi
  done

  # No suitable builder found; create a new one
  echo "No existing builder supports $PLATFORMS. Creating a new one..."
  docker run --privileged --rm tonistiigi/binfmt --install all >/dev/null
  docker buildx create \
    --driver docker-container \
    --platform "$PLATFORMS" \
    --use \
    --name temp-builder \
    >/dev/null
  docker buildx inspect --bootstrap >/dev/null
  docker buildx inspect 2>/dev/null | sed -n 's/^\s*Platforms: /Detected platforms: /p' || true
}

# Ensure a usable builder is active
if ! docker buildx inspect >/dev/null 2>&1; then
  find_and_use_builder
else
  # Even if a builder is active, ensure it matches required platforms; otherwise, find/create one
  current_plats=$(docker buildx inspect 2>/dev/null | sed -n 's/^\s*Platforms: //p') || true
  need_switch=0
  IFS=',' read -r -a req_arr_chk <<< "$PLATFORMS"
  for p in "${req_arr_chk[@]}"; do
    if [[ "$current_plats" != *"$p"* ]]; then need_switch=1; break; fi
  done
  if [[ $need_switch -eq 1 ]]; then
    find_and_use_builder
  fi
fi

# Login if needed (uncomment if you want to force login)
# echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# Build and push multi-arch image
if [ "$TAG" = "latest" ]; then
  docker buildx build \
    --platform "$PLATFORMS" \
    -t "$IMAGE_NAME:latest" \
    --push \
    .
else
  docker buildx build \
    --platform "$PLATFORMS" \
    -t "$IMAGE_NAME:$TAG" \
    -t "$IMAGE_NAME:latest" \
    --push \
    .
fi

echo "Pushed: $IMAGE_NAME:$TAG"
[ "$TAG" != "latest" ] && echo "Also pushed: $IMAGE_NAME:latest"