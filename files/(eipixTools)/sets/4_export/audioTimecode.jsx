﻿// audioTimecode.jsx
// 
// Name: audioTimecode
<<<<<<< HEAD
// Version: 3.6
=======
// Version: 3.5
>>>>>>> origin/deploy
// Author: Aleksandar Kocic
// 
// Description: Exports audio layers timecode.    
// 
//  


(function audioTimecode(thisObj) {

    if (app.project.file == null) {
        alert("Save the project first.");
        return;
    }

    if (app.project.activeItem == null) {
        alert("Please, select your composition.");
        return;
    }

    // Define main variables
    var atcData = new Object();

    atcData.scriptNameShort = "ATC";
    atcData.scriptName = "Audio Timecode";
<<<<<<< HEAD
    atcData.scriptVersion = "3.6";
=======
    atcData.scriptVersion = "3.5";
>>>>>>> origin/deploy

    atcData.strPathErr = {en: "Specified path could not be found. Reverting to project folder."};
    atcData.strKeyErr = {en: "Leyar %s has an unexpected number of keys."};
    atcData.strMinAE = {en: "This script requires Adobe After Effects CS4 or later."};
    atcData.strSaveProject = {en: "Save your project first.."};
    atcData.strActiveCompErr = {en: "Please select a composition."};
    atcData.strBrowse = {en: "Browse"};
    atcData.strExecute = {en: "Export"};
    atcData.strCancel = {en: "Cancel"};

    atcData.strHelp = {en: "?"};
    atcData.strHelpTitle = {en: "Help"};
    atcData.strErr = {en: "Something went wrong."};
    atcData.strNoAudioLayers = {en: "No audio layers were found."};
    atcData.strHelpText = {en: "This script exports timecode data related to audio files to the external .script or .text file."};

    atcData.strRenderSettings = {en: "Settings"};
    atcData.strOutputPath = {en: "Output Path"};
    atcData.strScript = {en: "Export as .script"};
    atcData.strText = {en: "Export as .txt"};

    // Define project variables
    atcData.projectName = app.project.file.name;
    atcData.projectNameNoExt = atcData.projectName.replace(".aepx", "").replace(".aep", "");

    atcData.projectFolder = app.project.file.parent;
    atcData.activeItem = app.project.activeItem;
    atcData.activeItemName = atcData.activeItem.name;
    atcData.audioLayersDataDirty = [];
    atcData.audioLayersData = [];
    atcData.engineLayersDataDirty = [];
    atcData.engineLayersData = [];
    atcData.textLayersDataDirty = [];
    atcData.textLayersData = [];

    atcData.usePath;

    // Localize
    function audioTimecode_localize(strVar) {
        return strVar["en"];
    }

    // Build UI
    function audioTimecode_buildUI(thisObj) {
        var pal = new Window("dialog", atcData.scriptName, undefined, {resizeable:false});
        if (pal !== null) {
            var res =
                "group { \
                    orientation:'column', alignment:['fill','fill'], \
                    header: Group { \
                        alignment:['fill','top'], \
                        title: StaticText { text:'" + atcData.scriptNameShort + " v" + atcData.scriptVersion + "', alignment:['fill','center'] }, \
                        help: Button { text:'" + audioTimecode_localize(atcData.strHelp) + "', maximumSize:[30,20], alignment:['right','center'] }, \
                    }, \
                    outputPath: Panel { \
                        alignment:['fill','top'], \
                        text: '" + audioTimecode_localize(atcData.strOutputPath) + "', alignment:['fill','top'], \
                        main: Group { \
                            alignment:['fill','top'], \
                            btn: Button { text:'" + audioTimecode_localize(atcData.strBrowse) + "', preferredSize:[50,20] }, \
                            box: EditText { alignment:['fill','center'], preferredSize:[-1,20] },  \
                        }, \
                    }, \
                    opts: Panel { \
                        alignment:['fill','top'], \
                        text: '" + audioTimecode_localize(atcData.strRenderSettings) + "', alignment:['fill','top'] \
                        rdio: Group { \
                            alignment:['fill','top'], \
                            script: RadioButton { text:'" + audioTimecode_localize(atcData.strScript) + "' }, \
                            text: RadioButton { text:'" + audioTimecode_localize(atcData.strText) + "', value:true }, \
                        }, \
                    }, \
                    sepr: Group { \
                        orientation:'row', alignment:['fill','top'], \
                        rule: Panel { height: 2, alignment:['fill','center'] }, \
                    }, \
                    cmds: Group { \
                        alignment:['fill','top'], \
                        executeBtn: Button { text:'" + audioTimecode_localize(atcData.strExecute) + "', alignment:['center','bottom'], preferredSize:[-1,20] }, \
                        cancelBtn: Button { text:'" + audioTimecode_localize(atcData.strCancel) + "', alignment:['center','bottom'], preferredSize:[-1,20] }, \
                    }, \
                }, \
            }";
            pal.grp = pal.add(res);

            pal.layout.layout(true);
            pal.grp.minimumSize = pal.grp.size;
            pal.layout.resize();
            pal.onResizing = pal.onResize = function() {
                this.layout.resize();
            }

            pal.grp.opts.rdio.script.enabled = false;

            pal.grp.header.help.onClick = function() {
                alert(atcData.scriptTitle + "\n" + audioTimecode_localize(atcData.strHelpText), audioTimecode_localize(atcData.strHelpTitle));
            }

            pal.grp.outputPath.main.btn.onClick = function() {
                audioTimecode_doBrowse();
            }

            pal.grp.cmds.executeBtn.onClick = audioTimecode_doExecute;
            pal.grp.cmds.cancelBtn.onClick = audioTimecode_doCancel;
        }

        return pal;
    }

    // Main Functions:
    //

    function audioTimecode_doBrowse() {
        var browseOutputPath = Folder.selectDialog();
        if (browseOutputPath != null) {
            atcPal.grp.outputPath.main.box.text = browseOutputPath.fsName.toString();
        }
    }

    // Remove apostrophe
    function removeApostrophe(str) {
        var string = str;
        string = string.replace(/'/g, '');
        return string;
    }

    // Remove newline
    function removeNewline(str) {
        var string = str;
        string = string.replace(/(\r\n|\n|\r)/gm,'');
        return string;
    }

    function audioTimecode_exportAsScript() {
        //code
    }

    function audioTimecode_exportAsText() { 
        var audioTimecode_text = new File(atcData.usePath + "/" + atcData.activeItemName + ".txt");
        audioTimecode_text.open("w");
        var nothingToWrite = false;
        if (atcData.audioLayersData != "") {
            for (var i = 0; i < atcData.audioLayersData.length; i++) {
                audioTimecode_text.writeln("Filename: " + atcData.audioLayersData[i][0]);
                audioTimecode_text.writeln("Timecode: " + atcData.audioLayersData[i][1] + " --> " + atcData.audioLayersData[i][2] + "\n");
            }
            audioTimecode_text.writeln("----------------------------------------" + "\n");
        } else {
            audioTimecode_text.writeln("Note: Could not find any active audio." + "\n");
            audioTimecode_text.writeln("----------------------------------------" + "\n");
        }
        if (atcData.engineLayersData != "") {
            for (var j = 0; j < atcData.engineLayersData.length; j++) {
                audioTimecode_text.writeln("Engine  : " + atcData.engineLayersData[j][0]);
                audioTimecode_text.writeln("Timecode: " + atcData.engineLayersData[j][1] + " --> " + atcData.engineLayersData[j][2] + "\n");
            }
            audioTimecode_text.writeln("----------------------------------------" + "\n");
        }
        if (atcData.textLayersData != "") {
            for (var j = 0; j < atcData.textLayersData.length; j++) {
                audioTimecode_text.writeln("Sound   : " + atcData.textLayersData[j][0]);
                audioTimecode_text.writeln("Timecode: " + atcData.textLayersData[j][1] + " --> " + atcData.textLayersData[j][2] + "\n");
            }
            audioTimecode_text.writeln("----------------------------------------" + "\n");
        } else {
            audioTimecode_text.writeln("Note: Could not find any active text." + "\n");
            audioTimecode_text.writeln("----------------------------------------" + "\n");
        }
        if (atcData.engineLayersData != "") {
            for (var j = 0; j < atcData.engineLayersData.length; j++) {
                var startkey = atcData.engineLayersData[j][3];
                var fadein = atcData.engineLayersData[j][4] - startkey;
                var stand = atcData.engineLayersData[j][5] - (startkey + fadein);
                var fadeout = atcData.engineLayersData[j][6] - (startkey + fadein + stand);

                audioTimecode_text.writeln("Engine: " + atcData.engineLayersData[j][0]);
                //audioTimecode_text.writeln("Timecode: " + atcData.engineLayersData[j][1] + " --> " + atcData.engineLayersData[j][2]);
                audioTimecode_text.writeln("Script:");
                audioTimecode_text.writeln("    after " + startkey + " {");
                audioTimecode_text.writeln("        fadein $element_name " + fadein);
                audioTimecode_text.writeln("        after " + stand + " {");
                audioTimecode_text.writeln("            fadeout $element_name " + fadeout);
                audioTimecode_text.writeln("        }");
                audioTimecode_text.writeln("    }" + "\n");
            }
        }
        audioTimecode_text.close();
    }

    function audioTimecode_getAudioTimeRecursively(currentComp, timeOffset) {
        var offsetFloat = parseFloat(timeOffset);
        var currentLayer;
        for (var i = 1; i <= currentComp.layers.length; i++) {
            currentLayer = currentComp.layers[i];
            if (!(currentLayer.source instanceof CompItem) && (currentLayer.source instanceof FootageItem) && (currentLayer instanceof AVLayer) && (currentLayer.source.hasAudio == true) && (currentLayer.audioEnabled == true) && (currentLayer.source.hasVideo == false)) {
                var sourceName = currentLayer.source.name;
                var startTime = parseFloat(currentLayer.startTime) + offsetFloat;
                var endTime = parseFloat(currentLayer.outPoint) + offsetFloat;
                atcData.audioLayersDataDirty.push([sourceName, startTime.toFixed(2), endTime.toFixed(2)]);
            } else if ((currentLayer.source instanceof CompItem) && (currentLayer.audioEnabled == true)) {
                var offset = currentLayer.startTime + timeOffset;
                audioTimecode_getAudioTimeRecursively(currentLayer.source, offset);
            }
        }
    }

    function audioTimecode_getTextTimeRecursively(currentComp, timeOffset) {
        var offsetFloat = parseFloat(timeOffset);
        var currentLayer;
        for (var i = 1; i <= currentComp.layers.length; i++) {
            currentLayer = currentComp.layers[i];
            if (currentLayer instanceof TextLayer) {
                var layerName = currentLayer.name;
                var sourceText = String(currentLayer.text.sourceText.value);
                var startTime = parseFloat(currentLayer.inPoint) + offsetFloat;
                var endTime = parseFloat(currentLayer.outPoint) + offsetFloat;
                if (layerName == "engine_text") {
<<<<<<< HEAD
                    //check if layer has "ADBE Solid Composite"
                    var composite = currentLayer.Effects.property("ADBE Solid Composite");
                    if (composite != null) {
                        //check if it has 4 keyframes
                        if (composite.property(1).numKeys == 4) {
                            //get keyTime for all 4 frames
                            var key1 = composite.property(1).keyTime(1);
                            var key2 = composite.property(1).keyTime(2);
                            var key3 = composite.property(1).keyTime(3);
                            var key4 = composite.property(1).keyTime(4);
                            //add data to engineLayersDataDirty
                            atcData.engineLayersDataDirty.push([removeNewline(sourceText), startTime.toFixed(2), endTime.toFixed(2), key1, key2, key3, key4]);
                        } else {
                            //dislay error if there are more or less keys than expected
                            var error_message = audioTimecode_localize(atcData.strKeyErr).replace('%s', '"' + removeNewline(sourceText) + '"');
                            alert(error_message);
                        }
                    }    
=======
                    atcData.engineLayersDataDirty.push([removeNewline(sourceText), startTime.toFixed(2), endTime.toFixed(2)]);
>>>>>>> origin/deploy
                } else {
                    atcData.textLayersDataDirty.push([removeNewline(sourceText), startTime.toFixed(2), endTime.toFixed(2)]);
                }
            } else if (currentLayer.source instanceof CompItem) {
                var offset = currentLayer.startTime + timeOffset;
                audioTimecode_getTextTimeRecursively(currentLayer.source, offset);
            }
        }
    }

    function audioTimecode_main() {
        //sorting function
        function compare(a, b) {
<<<<<<< HEAD
            return a[1] - b[1];
=======
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
>>>>>>> origin/deploy
        }

        //get audio layers information
        audioTimecode_getAudioTimeRecursively(atcData.activeItem, 0);
        var layersDataDirty = atcData.audioLayersDataDirty;
        var layersDataUnique = [];
        for (var i = 0; i < layersDataDirty.length; i++) {
            var flag = true;
            for (var j = 0; j < layersDataUnique.length; j++) {
                if (layersDataUnique[j][0] == layersDataDirty[i][0]) {
                    flag = false;
                }
            }
            if (flag == true) {
                layersDataUnique.push(layersDataDirty[i]);
            }
        }
        atcData.audioLayersData = layersDataUnique.sort(compare);

        //get text layers information
        audioTimecode_getTextTimeRecursively(atcData.activeItem, 0);
        var textLayersDataDirty = atcData.textLayersDataDirty;
        var textLayersDataUnique = [];
        for (var i = 0; i < textLayersDataDirty.length; i++) {
            var flag = true;
            for (var j = 0; j < textLayersDataUnique.length; j++) {
                if (textLayersDataUnique[j][0] == textLayersDataDirty[i][0]) {
                    flag = false;
                }
            }
            if (flag == true) {
                textLayersDataUnique.push(textLayersDataDirty[i]);
            }
        }
        atcData.textLayersData = textLayersDataUnique.sort(compare);

        //filter engine layers information
<<<<<<< HEAD
        var engineLayersDataDirty = atcData.engineLayersDataDirty;      
=======
        var engineLayersDataDirty = atcData.engineLayersDataDirty;
>>>>>>> origin/deploy
        var engineLayersDataUnique = [];
        for (var i = 0; i < engineLayersDataDirty.length; i++) {
            var flag = true;
            for (var j = 0; j < engineLayersDataUnique.length; j++) {
                if (engineLayersDataUnique[j][0] == engineLayersDataDirty[i][0]) {
                    flag = false;
                }
            }
            if (flag == true)
                engineLayersDataUnique.push(engineLayersDataDirty[i]);
<<<<<<< HEAD
        }
=======
        }      
>>>>>>> origin/deploy
        atcData.engineLayersData = engineLayersDataUnique.sort(compare);

        //get output path
        var editboxOutputPath = atcPal.grp.outputPath.main.box.text;
        if (editboxOutputPath == "") {
            atcData.usePath = atcData.projectFolder.fsName;
        } else {
            var usePathFolder = new Folder(editboxOutputPath);
            if (usePathFolder.exists == true) {
                atcData.usePath = editboxOutputPath;
            } else {
                alert(audioTimecode_localize(atcPal.strPathErr));
                atcData.usePath = atcData.projectFolder.fsName;
            }
        }

        //call export commands
        if (atcPal.grp.opts.rdio.script.value == true) {
            audioTimecode_exportAsScript();
        } else if (atcPal.grp.opts.rdio.text.value == true) {
            audioTimecode_exportAsText();
        } else {
            alert(audioTimecode_localize(atcData.strErr))
        }
    }

    // Button Functions:
    //

    // Execute
    function audioTimecode_doExecute() {
        app.beginUndoGroup(atcData.scriptName);
        audioTimecode_main()
        app.endUndoGroup();
        atcPal.close();
    }

    // Cancel
    function audioTimecode_doCancel() {
        atcPal.close();
    }

    // Main code:
    //

    // Warning
    if (parseFloat(app.version) < 9.0) {
        alert(audioTimecode_localize(atcData.strMinAE));
    } else {
        // Build and show the floating palette
        var atcPal = audioTimecode_buildUI(thisObj);
        if (atcPal !== null) {
            if (atcPal instanceof Window) {
                // Show the palette
                atcPal.center();
                atcPal.show();
            } else {
                atcPal.layout.layout(true);
            }
        }
    }
})(this);