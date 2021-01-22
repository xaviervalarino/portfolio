#!/usr/bin/env bash

# check if installed 
for program in "pandoc" "ffmpeg"; do
  if ! which $program > /dev/null; then
    printf '%s\n%s' "$0" "ERROR: \`$program\` is not installed" >&2
    exit 1
  fi
done

# run from project root
cd "$(dirname -- "$0")/.." || return 1

USAGE() {
cat <<EOF
$0

Project Build Script
  Tell the script to run a specific filetype pipeline,
  or give it a filepath and it will figure it out

usage: 
  $0 [commands...|files...] [--opts]

commands:
          all  Run all commands
         lean  Only run css, html, js
               (exlude long-running and less frequently used commands)
          css  Concatenate all CSS files to single file in output directory
          img  Optimize image files
         html  Convert markdown and templates files into HTML
  collections  Build project "collections" -- ordered lists of project files
               Used as metadata for Pandoc Lua filters
               See \`./scripts/collections.js\` for implementation
        video  Process video file(s), convert them to MP4,
               ouput them to assets folder in output directory 
      favicon  Copy favicon files to output directory
        fonts  Copy font files to output directory
           js  Contcatenate all javascript files into a single file

options:
 --help, -h  Show this message
    --clean  Delete output dir before building 

examples:
  $0 all --clean
  $0 css 
  $0 src/index.md src/work.md
  $0 src/index.md css
  $0 html css
EOF
}

# Setup
## Make sure globs (**/*) recurse into directories
shopt -s globstar

## Get paths 
source ".paths"

## helper funtions
output() {
  local path ext subdir basename outdir
  path=$1
  ext=$2
  subdir=$(dirname -- "$path")
  subdir="${subdir#$src_dir/}"
  # file doesn't have a subdir
  [[ "$subdir" == "$src_dir" ]] && subdir=""
  basename=$(basename -- "$path")
  basename="${basename%.*}"
  [[ -n $ext ]] && basename="$basename.$ext"
  outdir="$dist_dir/$subdir"
  # make sure subdir exits
  [[ ! -d $outdir ]] && mkdir -p $outdir
  echo $outdir/"$basename" | sed "s#//*#/#g"
}

# build functions 
clean_dir() {
  printf "Deleting files\n---\n"
  rm -rv "$dist_dir"
}
build_dir() {
  mkdir -vp "$dist_dir"
}

## filetype specific commands
css() {
  # if file, lint for sanity
  [[ -n $1 ]] && ./node_modules/stylelint/bin/stylelint.js "$1"
  printf "\n%-15s %s\n" "Building CSS:" "$css_dir/*.css > $dist_dir/stylesheet.cssn"
  cat "$css_dir/"*.css > "$dist_dir/stylesheet.css"
}
fonts() {
  local output
  output=$(output $fonts_dir)
  # TODO: save this for a less verbose version
  # printf "Copying Fonts:\n$fonts_dir --> $output\n"
  cp -rfv "$fonts_dir"  "$output"
}
favicon() {
  local output
  output=$(output $favicon_dir)
  # printf "Copying favicon folder:\n$favicon_dir --> $output\n"
  cp -rfv "$favicon_dir" "$output"
}

## Get metadata value from file
### A bit of a work-around
### https://github.com/jgm/pandoc/issues/4627
### 1st arg: filename
### 2nd arg: YAML key
_metavalue () {
  sed -n "s/^$2:[ ][ ]*\(.*\)/\1/p" "$1"
}

_convert_md() {
  local params\
        template_file\
        metafile\
        lua_filter\
        outfile

  # Check file metadata for more input
  ## Read template file value, or set to default
  template_file=$(_metavalue "$1" "template")
  template_file="${template_file:-$src_dir/templates/default.html}"

  ## Check if file specifies metadata file
  metafile=$(_metavalue "$1" "metadata")

  ## Check if file specifies Lua filter 
  lua_filter=$(_metavalue "$1" "filter")

  outfile=$(output "$1" "html")

  params=("$1")
  # params+=("--verbose")
  params+=("--strip-comments")
  params+=("--template" "$template_file")
  params+=("--variable" "date=$(date +%m-%d-%Y%n)")
  [[ ${#metafile} -gt 0 ]] && params+=("--metadata-file" "$metafile")
  params+=("--lua-filter" "scripts/filters/absolute-links.lua")
  [[ ${#lua_filter} -gt 0 ]] && params+=("--lua-filter" "$lua_filter")
  params+=("--output" "$outfile")

  printf "\n%-15s %s\n" "Processing:" "$1"
  pandoc "${params[@]}" &&\
  printf "%-15s %s\n" "Created:" "$outfile"
}

html () {
  if  [[ -z $1 ]]; then
    for input in "$src_dir"/**/*.md; do
      _convert_md "$input"
    done
  else
    _convert_md "$1"
  fi
}

collections() {
  printf "%-15s %s\n" "Running:" "./scripts/collections.js"
  ./scripts/collections.js all
}

img() {
  local params outfile
  outfile=$(output $img_dir)
  params=()
  # use $1=filename or default to image directory
  params+=("${1:-$img_dir/*}")
  params+=("--out-dir=$outfile")
  printf "\n%-15s %s\n" "Minifying image(s):" "${params[0]}"
  # Not sure why, but NPM doesn't always create the `.bin` directory
  ./node_modules/imagemin-cli/cli.js "${params[@]}"
}

js() {
  printf "\n%-15s %s\n" "Building JS:" "$js_dir/*.js > $dist_dir/bundle.js"
  cat "$js_dir"/*.js > "$dist_dir/bundle.js"
}

_ffmpeg() {
  local outfile
  outfile=$(output "$1" "mp4")
  printf "\n%-15s %s\n" "Processing:" "$1"
  ffmpeg -y -loglevel warning -i "$1" -codec:v h264 -an -crf 23 "$outfile"
  printf "%-15s %s\n" "Created:" "$outfile"
}

video() {
  if  [[ -z $1 ]]; then
    for input in "$video_dir"/**/*; do
      _ffmpeg "$input"
    done
  else
    _ffmpeg "$1"
  fi
}

# Match approriate command based on location or filetype
## Note: some of these commands pass the file as an argument
##       so that they can be can be tranformed individually
##       (ex. img, md, video).
##       Others simply run the function as if it had
##       been called as a command
get_cmd () {
  local dir ext
  dir="$(dirname -- "$1")"
  ext="${1##*.}"

  # check directory
  case $dir in
    "$css_dir")     echo "css $1"     ; shift ;;
    "$favicon_dir") echo "favicon $1" ; shift ;;
    "$img_dir")     echo "img $1"     ; shift ;;
    "$js_dir")      echo "js"         ; shift ;;
    "$video_dir")   echo "video $1"   ; shift ;;
  esac
  # Special cases; check extension
  ## template.html -> rebuild all the files
  case $ext in
    md)   echo "html $1" ; shift ;;
    html) echo "html"    ; shift ;;
  esac
}

declare -a func_array

# no arguments supplied
if [[ $# -eq 0 ]]; then 
  USAGE >&2
  exit 1
fi

# iterate through arg list
# the "meat and potatoes"
while [[ "$#" -ne 0 ]]; do
  arg=$1
  count=$#
  if [[ $arg = "-h" || $arg = "--help" ]]; then
    USAGE # don't redirect to sterr (for pager)
    exit 1;
  fi
  if [[ $arg = "--clean" ]]; then
    CLEAN=1
    shift
  fi

  ## combos commands
  if [[ "$arg" == "lean" ]] || [[ "$arg" == "all" ]]; then
    func_array=("css" "html" "js")
    shift $#
  fi
  if [[ "$arg" == "all" ]]; then
    func_array+=("collections" "favicon" "fonts" "img" "video")
    shift $#
  fi

  # check if file(s) provided
  if [[ -f $arg ]]; then
    func_array+=( "$(get_cmd "$arg")" )
    shift
  fi
  # check for commands 

  ## individual cmds
  # TODO: should filename name short circuit the loop?
  case $arg in
    css)          func_array+=(css);          shift ;;
    html)         func_array+=(html);         shift ;;
    js)           func_array+=(js);           shift ;;
    collections)  func_array+=(collections);  shift ;;
    favicon)      func_array+=(favicon);      shift ;;
    fonts)        func_array+=(fonts);        shift ;;
    img)          func_array+=(img);          shift ;;
    video)        func_array+=(video);        shift ;;
  esac
  # arg didn't shift the list, so...
  if [[ $count -eq $#  ]]; then
    printf "%s\n%s" "$0" "ERROR: '$arg' is not a valid parameter" >&2
    exit 1
  fi
done

# pre-check
[[ $CLEAN ]] && clean_dir
[[ ! -d $dist_dir ]] && [[ ${#func_array} -gt 0 ]] && mkdir -p "$dist_dir"

for function in "${func_array[@]}"; do
  $function
done
