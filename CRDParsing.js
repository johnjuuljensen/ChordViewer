function Song() {
    this.directives = {};
    this.namedSections = {};
    this.sections = [];
    this.usedChords = [];

    this.lastSection = function () {
        return this.sections[this.sections.length - 1];
    }
}

function VerseLine(section, rawLine, comment) {
    this.section = section;
    this.chords = [];
    this.rawLine = rawLine;
    this.lyrics = null;
    this.comment = comment;
    this.nextLine = null;
}

function Chord(value, index) {
    this.value = value.replace("H", "B");
    this.index = index;
}

function Section(song, repeatValue) {
    this.song = song;
    this.verseLines = [];
    this.repeatValue = repeatValue;

    this.includeSection = function (sectionToInclude) {
        sectionToInclude.verseLines.forEach(function (v) {
            this.verseLines.push(v);
        }, this);
    }

    this
}



function ParseLine(rawLine, currentSection, comment) {
    rawLine = rawLine.replace(/\s+$/, "").replace(/^\s+$/, "");

    var repeatValue = null;

    var directivesRegex = /{([^:]+)(?::(.*?))?}/g,
        directiveMatch = null,
        directives = [];

    while (directiveMatch = directivesRegex.exec(rawLine)) {
        var key = directiveMatch[1],
            value = true;
        if (directiveMatch.length > 2) {
            value = directiveMatch[2];
        }
        directives.push({ key: key, value: value });
    }

    rawLine = rawLine.replace(directivesRegex, "");

    var nextSection = currentSection;
    for (var i = 0; i < directives.length; i++) {
        var key = directives[i].key;
        var value = directives[i].value;

        switch (key) {
            case "start":
            case "begin":
                nextSection = currentSection.song.namedSections[value] = new Section(currentSection.song);
                break;
            case "end":
                {
                    var lastSection = currentSection.song.lastSection();
                    lastSection.includeSection(currentSection);
                    nextSection = lastSection;
                }
                break;
            case "reference":
            case "include":
            case "insert":
                var sectionToInclude = currentSection.song.namedSections[value];
                if (sectionToInclude) {
                    currentSection.includeSection(sectionToInclude);
                }
                break;
            case "repeat":
            case "|":
                if (rawLine.length == 0) {
                    currentSection.repeatValue = value;
                }
                break;
            case "//":
            case "comment":
            case "note":
                comment = value;
                break;
            default:
                currentSection.song.directives[key] = value;
                break;
        }
    }

    currentSection = nextSection;


    if (rawLine.length == 0 && !comment) {
        if (directives.length == 0 && currentSection.verseLines.length > 0 && !currentSection.name) {
            currentSection = new Section(currentSection.song);
            currentSection.song.sections.push(currentSection);
        }

        return currentSection;
    }

    var verseLine = new VerseLine(currentSection, rawLine, comment);

    if (currentSection.verseLines.length) {
        var lastLine = currentSection.verseLines[currentSection.verseLines.length - 1];
        lastLine.nextLine = verseLine;
    }

    currentSection.verseLines.push(verseLine);

    var chordsRegex = /\[(.*?)\]/g,
        chordMatch = null;

    while (chordMatch = chordsRegex.exec(rawLine)) {
        chordsRegex.lastIndex -= chordMatch[0].length;
        var chord = new Chord(chordMatch[1], chordMatch.index);
        verseLine.chords.push(chord);
        rawLine = rawLine.substr(0, chord.index) + rawLine.substr(chord.index + chord.value.length + 2);

        if (currentSection.song.usedChords.indexOf(chord.value) == -1) {
            currentSection.song.usedChords.push(chord.value);
        }
    }

    verseLine.lyrics = rawLine; // rawLine.replace(/\[(.*?)\]/gi, "");

    return currentSection;
}



function ConvertSectionToCRD(section) {
    var resultSection = new Section(section.song, section.repeatValue);

    var lineCount = section.verseLines.length;
    for (var lineIndex = 0; lineIndex < lineCount; lineIndex++) {
        var chordsRegex = /\b(([A-H](maj|sus2|sus4|#|♯|m|5|7|b|♭|\*)*)(\/)?)+(?=\s|$)/g,
            chordMatch = null,
            verseLine = section.verseLines[lineIndex];

        var chordMatches = verseLine.chordMatches = [];

        while (chordMatch = chordsRegex.exec(verseLine.rawLine)) {
            chordMatches.push(chordMatch);
        }
    }

    for (var lineIndex = 0; lineIndex < lineCount; lineIndex++) {
        var verseLine = section.verseLines[lineIndex];
        var rawLine = verseLine.rawLine;

        var crdLine = verseLine.rawLine;
        if (verseLine.chordMatches.length > 0) {
            var lyricsLine = " ";
            if (verseLine.nextLine != null && verseLine.nextLine.chordMatches.length == 0) {
                var lyricsLine = verseLine.nextLine.rawLine;
                lineIndex++;
            }

            while (lyricsLine.length < verseLine.rawLine.length) {
                lyricsLine += " ";
            }

            crdLine = verseLine.chordMatches.reverse().reduce(function (crdLine, chordMatch) {
                var before = crdLine.substr(0, chordMatch.index);
                var after = crdLine.substr(chordMatch.index);
                var systemChord = chordMatch[0];

                return before + "[" + systemChord + "]" + after;
            }, lyricsLine);
        }

        ParseLine(crdLine, resultSection, verseLine.comment);
    }

    return resultSection;
}

function ParseSong(rawSong) {
    var song = new Song();

    var currentSection = new Section(song);
    song.sections.push(currentSection);

    rawSong.split("\n").forEach(function (e) {
        currentSection = ParseLine(e, currentSection);
    });

    var totalChords = song.sections.reduce(function (songChordCount, section) {
        return songChordCount + section.verseLines.reduce(function (sectionChordCount, verseLine) {
            return sectionChordCount + verseLine.chords.length;
        }, 0);
    }, 0);

    if (totalChords == 0) {
        // Assume that chords are on seperate line
        for (var sectionIndex = 0; sectionIndex < song.sections.length; sectionIndex++) {
            song.sections[sectionIndex] = ConvertSectionToCRD(song.sections[sectionIndex]);
        }
    }

    return song;
}
