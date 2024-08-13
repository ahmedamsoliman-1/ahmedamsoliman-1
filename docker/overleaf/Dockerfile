FROM sharelatex/sharelatex:latest

# RUN tlmgr install titlesec enumitem charter xkeyval fontaxes xcolor lastpage mdframed needspace titling lettrine lineno microtype footmisc

# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/fullpage
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/lastpage
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/CormorantGaramond
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/xkeyval
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/fontawesome5
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/fontspec

# COPY packages/collected/fullpage.sty /usr/local/texlive/texmf-local/tex/latex/fullpage/fullpage.sty
# COPY packages/collected/lastpage.sty /usr/local/texlive/texmf-local/tex/latex/lastpage/lastpage.sty
# COPY packages/collected/CormorantGaramond.sty /usr/local/texlive/texmf-local/tex/latex/CormorantGaramond/CormorantGaramond.sty
# COPY packages/collected/xkeyval.sty /usr/local/texlive/texmf-local/tex/latex/xkeyval/xkeyval.sty
# COPY packages/tex/* /usr/local/texlive/texmf-local/tex/latex/fontawesome5/
# COPY packages/zip/fontawesome5/* /usr/local/texlive/texmf-local/tex/latex/fontawesome5/
# COPY packages/thesis/fontspec/* /usr/local/texlive/texmf-local/tex/latex/fontspec/


# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/extarticle
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/tgbonum
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/size9
# RUN mkdir -p /usr/local/texlive/texmf-local/tex/latex/zref

# COPY packages/collected/extarticle.cls /usr/local/texlive/texmf-local/tex/latex/extarticle/extarticle.cls
# COPY packages/collected/tgbonum.sty /usr/local/texlive/texmf-local/tex/latex/tgbonum/tgbonum.sty
# COPY packages/collected/size9.clo /usr/local/texlive/texmf-local/tex/latex/size9/size9.clo

# COPY packages/collected/zref-thepage.sty /usr/local/texlive/texmf-local/tex/latex/zref/zref-thepage.sty
# COPY packages/collected/zref-base.sty /usr/local/texlive/texmf-local/tex/latex/zref/zref-base.sty
# COPY packages/collected/zref-abspage.sty /usr/local/texlive/texmf-local/tex/latex/zref/zref-abspage.sty


# RUN tlmgr install xifthen ifmtarg adforn 
# RUN tlmgr install adjustbox
# RUN tlmgr install booktabs caption setspace listings lipsum
# RUN tlmgr install chemfig pgf simplekv supertabular 

# RUN tlmgr install circuitikz csquotes ragged2e ccicons
# RUN tlmgr install matlab-prettifier imakeidx
# RUN tlmgr install sttools preprint here float
# RUN tlmgr install tcolorbox mathtools
# RUN tlmgr install stix2-type1 xurl cleveref 


# RUN tlmgr install biber biblatex biblatex-ieee 
# RUN tlmgr install helvetic t1utils
# RUN tlmgr update --all
# RUN tlmgr update --self --all
# RUN tlmgr install babel-spanish hyphen-spanish
# RUN tlmgr install fontawesome5
# RUN ls /usr/local/texlive/texmf-local/tex/latex/fontawesome5/
# RUN updmap-sys --enable Map=fontawesome5.map


# RUN texhash /usr/local/share/texmf
# RUN mktexlsr

# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
