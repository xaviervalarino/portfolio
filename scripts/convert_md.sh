#!/usr/bin/env bash

src="$PWD/src"
dist="$PWD/dist"
template="$src/templates/default.html"

if ! which pandoc > /dev/null
then
  echo pandoc is not installed
  exit 1
fi

timestamp() {
 date +"%T"
}
log() {
  #log with style
  # red='\033[1;31m'
  blue='\033[1;34m'
  nc='\033[0m'
  echo -e "${blue}$1${nc}"
}

convert() {
  log "Processing ${1#$PWD/}"

  # strip basename of the `.md` file extension
  base=$(basename "$1")
  base="${base%.*}"

  # keep the directory structure used in `src`
  subdir=$(dirname "$1")
  #set the subdirectory as a forward slash if the file is in root
  subdir="${subdir#"$src"}/"
  outdir="$dist$subdir"
 
  # create the subdirectory in `dist` if it doesn't exist
  [[ ! -d "$outdir" ]] && mkdir -pv $outdir

  # convert the markdown to HTML
  pandoc \
    --template "src/templates/default.html" "$1"\
    --lua-filter $PWD/scripts/links-filter.lua \
    --strip-comments \
    --output "$outdir$base.html"

  echo -e "Created ${outdir#$PWD}$base.html\n$(timestamp)\n"
}

batch_convert() {
  find $src -name "*.md" | while read file
  do
    echo "INPUT $file" 
    convert "$file"
  done
}

# batch convert all markdown files if no path arg is supplied
if [[ -z $1 ]]
then
  batch_convert
elif [[ -e $1 ]]
then
  convert $PWD/$1
else
  echo "Nothing to do..."
fi
