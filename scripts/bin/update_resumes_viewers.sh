#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/../lib/helper_functions.sh"
source "$(dirname "$0")/../lib/utils.sh"


ls ../../docs/latex/main
ls ../../docs/latex/main/output

cp ../../docs/latex/main/output/ahmedalimsoliman-dev-en.pdf ../../apps/typescript/aams-cvviewer-resume-dev/public/cv.pdf
cp ../../docs/latex/main/output/ahmedalimsoliman-devops-en.pdf ../../apps/typescript/aams-cvviewer-resume-devops/public/cv.pdf
cp ../../docs/latex/main/output/ahmedalimsoliman-ts-en.pdf ../../apps/typescript/aams-cvviewer-resume-ts/public/cv.pdf
cp ../../docs/latex/main/output/ahmedalimsoliman-data-en.pdf ../../apps/typescript/aams-cvviewer-resume-dataeng/public/cv.pdf


