#!/bin/bash

box_text() {
  local text="$1"
  local color="${2:-32}" # Default to green if no color is specified
  local padding=40

  # Calculate text length and total width of the box
  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}


rm pdfs/*.pdf

box_text "Make"
cd latex/main
make clean
make all

cd ../..

box_text "Copping To reumes"
cp latex/main/output/ahmedalimsoliman-data-en.pdf resume-data-eng-pdf/public
cp latex/main/output/ahmedalimsoliman-dev-en.pdf resume-dev-pdf/public
cp latex/main/output/ahmedalimsoliman-devops-en.pdf resume-devops-pdf/public
cp latex/main/output/ahmedalimsoliman-ts-en.pdf resume-ts-pdf/public

box_text "Copping To Single"
cp latex/main/output/ahmedalimsoliman-data-en.pdf pdfs
cp latex/main/output/ahmedalimsoliman-dev-en.pdf pdfs
cp latex/main/output/ahmedalimsoliman-devops-en.pdf pdfs
cp latex/main/output/ahmedalimsoliman-ts-en.pdf pdfs
cp latex/main/output/ahmedalimsoliman-it-en.pdf pdfs
box_text "Done"
