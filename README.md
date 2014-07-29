ChordViewer
===========

The primary purpose of this project is to have a simple way to display song with guitar chords in a multi-column view.

The secondary purpose is to parse the songs, chords and directives to enable song transformation, color coding and simple markup.

Currently supported transformations include transposition and named sections, which can be referenced and reused.

Named sections, comments, meta data, repeat blocks and other things are inserted using directives.

The general format for directives is:
{directive:parameters}

See crd-format.txt for more info on the supported directives.

There are two suported formats for chords in songs. 
- The first is the standard "chords on a seperate line" line format.
- The second is the inline chord format used in crd files.

Chords on a seperate line
-------------------------

    {title:House of the rising sun}
     
    {//:This is a comment and so is the "Intro:" text on the next line.}
    {//:Intro:} Am C D F Am E Am E
    
    {//:This verse is written in the common "chords on seperate lines notation}
          Am   C        D           F
    There is a house in New Orleans
         Am       C      E   E
    They call the Risin' Sun
             Am       C       D           F
    And it's been the ruin of many a poor boy.
        Am     E        Am
    And God, I know I'm one.
    {//:These passing chord are put in a named block, which is reused after the next verse}
    {start:passing}
    C D F Am E Am E
    {end:}
    
       Am     C     D           F
    My mother was a tailor.
        Am       C        E     E
    She sewed my new blue jeans.
       Am     C     D        F
    My father was a gamblin' man
    Am      E      Am
    Down in New Or-leans.
    {insert:passing}
    
    {//:Skipped the remaining verse}
    
    {|:rep fade}
    C D F Am E 
    Am D


Inline chords
-------------

    {title:House of the rising sun}
     
    {//:This verse is written in CRD inline format}
    My [Am]mother [C]was a [D]tailor. [F]
    She [Am]sewed my [C]new blue [E]jeans. [E]
    My [Am]father [C]was a [D]gamblin' [F]man
    [Am]Down in [E]New Or-[Am]leans. [E]


How to use
----------

- Download and open ChordViewer.html in your favourite browser. 
- Open one or more song files (some examples are included in the project). 
- Select the song you want to view.

Furter notes
------------

This is a quick-n-dirty project for me, so keeping it clean and tight is not a priority.

Future plans:
- Extract js into files, possibly something which can be run via node.js, to enable song transformations from command line.
- Better UI
- Appending loaded files instead of replacing already loaded files.
- Export song with chords on seperate lines as crd format and vice versa
- Visualizing the chords used in a song
- Add keyboard commands





