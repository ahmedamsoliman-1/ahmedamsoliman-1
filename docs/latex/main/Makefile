filename=ahmedalimsoliman-en.tex
SHELL=/bin/bash


clean:
	rm -f *.aux *.gz *.log *latexmk *.fls *.pdf
	rm -f output/$(MAIN)_$(DATE).pdf

all:
	pdflatex ahmedalimsoliman-data-en.tex
	pdflatex ahmedalimsoliman-dev-en.tex
	pdflatex ahmedalimsoliman-devops-en.tex
	pdflatex ahmedalimsoliman-en.tex
	pdflatex ahmedalimsoliman-ts-en.tex
	pdflatex ahmedalimsoliman-it-en.tex
	cp *.pdf output/
	rm -f *.aux *.gz *.log *latexmk *.fls *.pdf
