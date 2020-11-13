#!/usr/bin/env bash

# work in progress
# TODO: work this into the build scripts
# Add an assets directory, convert and place in dist
src="$PWD/src/assets"
dist="$PWD/dist/assets"

if ! which ffmpeg > /dev/null
then
  echo ffmpeg not installed
  exit 1
fi

# create directory if it doesn't exist
[[ ! -d $dist ]] && mkdir -pv $dist

convert_video () {
  local input=$1
  local basename=$(basename "$input")
  local output="$dist/${basename%.*}.mp4"

  # TODO: Can I not get x265 to work in the browser b/c of this or my system arch?
  ffmpeg -y -i $input -codec:v h264 -an -crf 23 $output
}

# TODO: this can be merged with the functions used  in convert_md.sh
# consider making one monolith script
# that way some of the longer NPM scripts can be put in the file, too
batch () {
  local function=$1
  local glob=$2
  for file in $2; do
    echo "INPUT: $file"
    $function $file
  done
}

if [[ -z $1 ]]
then
  batch convert_video "$src/*"
elif [[ -e $1 ]]
then
  convert_video $PWD/$1
else
  echo "Nothing to do.."
fi
