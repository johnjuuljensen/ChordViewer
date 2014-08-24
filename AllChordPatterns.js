﻿function GetAllChordPatterns() {
    return {
        A: ["x02220", "577655"],
        B: ["x24442"],
        C: ["x32010", "8AA988"],
        D: ["xx0232"],
        E: ["022100"],
        F: ["133211"],
        G: ["320003", "355433"],

        Am: ["X02210"],
        Bm: ["X24432"],
        Cm: ["x35543"],
        Dm: ["XX0231", "X57765"],
        Em: ["022000"],
        Fm: ["133111"],
        Gm: ["355333"],

        A6: ["002222", "0x4220", "2x2220", "x04220", "xx2222"],
        B6: ["xx4444"],
        C6: ["x02010", "002013", "x02213", "x05558"],
        D6: ["xx0202", "x04432", "x20202", "x20232", "x24232"],
        E6: ["022120", "x46454"],
        F6: ["x57565", "xx0211", "xx0565"],
        G6: ["020000", "020030", "022030", "022033", "xx0987", "xx2433", "0x0000"],

        A7: ["X02020"],
        B7: ["X21202"],
        C7: ["x32310"],
        D7: ["XX0212"],
        E7: ["020100"],
        G7: ["320001"],
        F7: ["131211"],

        Am7: ["X02010"],
        Bm7: ["X20202"],
        Cm7: ["X35343"],
        Dm7: ["XX0211"],
        Em7: ["020000"],
        Fm7: ["131111"],
        Gm7: ["353333"],

        Amaj7: ["X02120"],
        Bmaj7: ["X2434X"],
        Cmaj7: ["X32000"],
        Dmaj7: ["XX0222"],
        Emaj7: ["021100"],
        Fmaj7: ["103210"],
        Gmaj7: ["320002"],

        Asus4: ["x02230", "002230", "5577x0", "x00230"],
        Bsus4: ["x244x0", "799xx0"],
        Csus4: ["x33011", "xx3011"],
        Dsus4: ["xx0233", "x00033", "300033", "5x0035"],
        Esus4: ["002200", "002400", "022200", "x02200", "xx2200"],
        Fsus4: ["xx3311"],
        Gsus4: ["x30033", "x35533", "x55533"],

        Asus2: ["x02200", "002200", "002400", "022200", "xx2200"],
        Bsus2: ["xx4422", "x444x2"],
        Csus2: ["x30033", "x555x3", "x35533"],
        Dsus2: ["xx0230", "x02230", "002230", "x00230", "5577x0"],
        Esus2: ["x244x0", "799xx0"],
        Fsus2: ["x33011", "xx3011"],
        Gsus2: ["300033", "5x0035", "x00033", "xx0233"],

        // G
        "G#": ["466544"],
        Ab:   ["466544"],
        // A
        "A#": ["113331","x13331","xx0331"],
        Bb:   ["113331","x13331","xx0331"],
        // B == Cb
        // C == B#
        "C#": ["446664","x43121","x46664","xx3121","xx6664"],
        Db:   ["446664","x43121","x46664","xx3121","xx6664"],
        // D
        "D#": ["x11343", "xx1343", "xx5343"],
        Eb: ["x11343", "xx1343", "xx5343"],
        // E == Fb
        // F == E#
        "F#": ["244322", "x44322", "xx4322"],
        Gb:   ["244322","x44322","xx4322"]
        // G

    }
}