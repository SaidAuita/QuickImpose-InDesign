function parseSafeFloat(val) {
    if (typeof val === 'string') {
        return parseFloat(val.replace(/,/g, '.'));
    }
    return parseFloat(val);
}

// #target indesign
// PDF_Import.jsx
// Standalone PDF Import Script for Adobe InDesign with Multi-Language Support
// Automatically creates an InDesign document matching PDF dimensions and places all pages with Bleed setup.

(function () {
    var defaultTranslations = {
        ru: {
            open_dialog: "Выберите PDF для импорта",
            title: "Импорт PDF в InDesign",
            pnl_info: "Информация о файле",
            lbl_file: "Файл: ",
            lbl_pages: "Количество страниц: ",
            lbl_size: "Размер PDF: ",
            pnl_bleed: "Настройки вылета (Bleed)",
            lbl_bleed_input: "Вылет под обрез (мм): ",
            lbl_trim_calc: "Размер страницы (Trim): ",
            btn_cancel: "Отмена",
            btn_ok: "Создать документ",
            alert_success: "Документ успешно создан!\nСтраниц: {0}\nОбрезной размер: {1} × {2} {3}\nВылет: {4} {3}",
            unit_mm: "мм"
        },
        en: {
            open_dialog: "Select PDF file for import",
            title: "Import PDF to InDesign",
            pnl_info: "File Information",
            lbl_file: "File: ",
            lbl_pages: "Page Count: ",
            lbl_size: "PDF Size: ",
            pnl_bleed: "Bleed Settings",
            lbl_bleed_input: "Bleed (mm): ",
            lbl_trim_calc: "Page Size (Trim): ",
            btn_cancel: "Cancel",
            btn_ok: "Create Document",
            alert_success: "Document created successfully!\nPages: {0}\nTrim size: {1} × {2} {3}\nBleed: {4} {3}",
            unit_mm: "mm"
        },
        de: {
            open_dialog: "PDF-Datei für Import auswählen",
            title: "PDF in InDesign importieren",
            pnl_info: "Datei-Informationen",
            lbl_file: "Datei: ",
            lbl_pages: "Anzahl der Seiten: ",
            lbl_size: "PDF-Größe: ",
            pnl_bleed: "Anschnitt-Einstellungen (Bleed)",
            lbl_bleed_input: "Anschnitt (mm): ",
            lbl_trim_calc: "Seitengröße (Trim): ",
            btn_cancel: "Abbrechen",
            btn_ok: "Dokument erstellen",
            alert_success: "Dokument erfolgreich erstellt!\nSeiten: {0}\nEndformat: {1} × {2} {3}\nAnschnitt: {4} {3}",
            unit_mm: "mm"
        },
        es: {
            open_dialog: "Seleccionar archivo PDF para importar",
            title: "Importar PDF a InDesign",
            pnl_info: "Información del archivo",
            lbl_file: "Archivo: ",
            lbl_pages: "Número de páginas: ",
            lbl_size: "Tamaño de PDF: ",
            pnl_bleed: "Ajustes de sangrado (Bleed)",
            lbl_bleed_input: "Sangrado (mm): ",
            lbl_trim_calc: "Tamaño de página (Trim): ",
            btn_cancel: "Cancelar",
            btn_ok: "Crear documento",
            alert_success: "¡Documento creado con éxito!\nPáginas: {0}\nTamaño de corte: {1} × {2} {3}\nSangrado: {4} {3}",
            unit_mm: "mm"
        },
        fr: {
            open_dialog: "Sélectionner le fichier PDF à importer",
            title: "Importer PDF dans InDesign",
            pnl_info: "Informations sur le fichier",
            lbl_file: "Fichier : ",
            lbl_pages: "Nombre de pages : ",
            lbl_size: "Taille du PDF : ",
            pnl_bleed: "Réglages du fond perdu (Bleed)",
            lbl_bleed_input: "Fond perdu (mm) : ",
            lbl_trim_calc: "Taille de page (Trim) : ",
            btn_cancel: "Annuler",
            btn_ok: "Créer le document",
            alert_success: "Document créé avec succès !\nPages : {0}\nTaille de coupe : {1} × {2} {3}\nFond perdu : {4} {3}",
            unit_mm: "mm"
        },
        it: {
            open_dialog: "Seleziona file PDF da importare",
            title: "Importa PDF in InDesign",
            pnl_info: "Informazioni sul file",
            lbl_file: "File: ",
            lbl_pages: "Numero di pagine: ",
            lbl_size: "Dimensione PDF: ",
            pnl_bleed: "Impostazioni abbondanza (Bleed)",
            lbl_bleed_input: "Abbondanza (mm): ",
            lbl_trim_calc: "Dimensione pagina (Trim): ",
            btn_cancel: "Annulla",
            btn_ok: "Crea documento",
            alert_success: "Documento creato con successo!\nPagine: {0}\nFormato rifilato: {1} × {2} {3}\nAbbondanza: {4} {3}",
            unit_mm: "mm"
        },
        ja: {
            open_dialog: "インポート用 PDF ファイルを選択",
            title: "InDesign に PDF をインポート",
            pnl_info: "ファイル情報",
            lbl_file: "ファイル: ",
            lbl_pages: "ページ数: ",
            lbl_size: "PDF サイズ: ",
            pnl_bleed: "裁ち落とし設定 (Bleed)",
            lbl_bleed_input: "裁ち落とし (mm): ",
            lbl_trim_calc: "仕上がりサイズ (Trim): ",
            btn_cancel: "キャンセル",
            btn_ok: "ドキュメントを作成",
            alert_success: "ドキュメントが正常に作成されました！\nページ数: {0}\n仕上がりサイズ: {1} × {2} {3}\n裁ち落とし: {4} {3}",
            unit_mm: "mm"
        },
        pl: {
            open_dialog: "Wybierz plik PDF do importu",
            title: "Importuj PDF do InDesign",
            pnl_info: "Informacje o pliku",
            lbl_file: "Plik: ",
            lbl_pages: "Liczba stron: ",
            lbl_size: "Rozmiar PDF: ",
            pnl_bleed: "Ustawienia spadów (Bleed)",
            lbl_bleed_input: "Spad pod obcięcie (mm): ",
            lbl_trim_calc: "Rozmiar strony (Trim): ",
            btn_cancel: "Anuluj",
            btn_ok: "Utwórz dokument",
            alert_success: "Dokument został pomyślnie utworzony!\nStrony: {0}\nFormat netto: {1} × {2} {3}\nSpad: {4} {3}",
            unit_mm: "mm"
        },
        pt: {
            open_dialog: "Selecionar ficheiro PDF para importar",
            title: "Importar PDF para o InDesign",
            pnl_info: "Informação do ficheiro",
            lbl_file: "Ficheiro: ",
            lbl_pages: "Número de páginas: ",
            lbl_size: "Tamanho do PDF: ",
            pnl_bleed: "Definições de sangria (Bleed)",
            lbl_bleed_input: "Sangria (mm): ",
            lbl_trim_calc: "Tamanho da página (Trim): ",
            btn_cancel: "Cancelar",
            btn_ok: "Criar documento",
            alert_success: "Documento criado com sucesso!\nPáginas: {0}\nTamanho final: {1} × {2} {3}\nSangria: {4} {3}",
            unit_mm: "mm"
        },
        zh: {
            open_dialog: "选择要导入的 PDF 文件",
            title: "导入 PDF 到 InDesign",
            pnl_info: "文件信息",
            lbl_file: "文件: ",
            lbl_pages: "页数: ",
            lbl_size: "PDF 尺寸: ",
            pnl_bleed: "出血设置 (Bleed)",
            lbl_bleed_input: "出血 (mm): ",
            lbl_trim_calc: "页面尺寸 (Trim): ",
            btn_cancel: "取消",
            btn_ok: "创建文档",
            alert_success: "文档已成功创建！\n页数: {0}\n裁切尺寸: {1} × {2} {3}\n出血: {4} {3}",
            unit_mm: "mm"
        }
    };

    function getScriptFolder() {
        try {
            var sf = new File(app.activeScript);
            return sf.parent;
        } catch (e) {
            return null;
        }
    }

    var scriptFolder = getScriptFolder();

    function loadCurrentLang(folder) {
        var lang = "ru";
        if (folder) {
            try {
                var settingsFile = new File(folder + "/RESOURCES/Data/Settings.txt");
                if (settingsFile.exists) {
                    settingsFile.encoding = "UTF-8";
                    settingsFile.open("r");
                    var content = settingsFile.read();
                    settingsFile.close();
                    try {
                        var params = eval("(" + content + ")");
                        if (params && params.lang) {
                            lang = params.lang;
                        }
                    } catch (eEval) {}
                }
            } catch (eFile) {}
        }
        return lang;
    }

    function getTranslations(lang, folder) {
        var baseDict = defaultTranslations[lang] || defaultTranslations["ru"] || defaultTranslations["en"];
        var t = {};
        for (var k in baseDict) {
            if (baseDict.hasOwnProperty(k)) {
                t[k] = baseDict[k];
            }
        }

        if (folder) {
            try {
                var locFile = new File(folder + "/RESOURCES/Localization/" + lang + ".json");
                if (locFile.exists) {
                    locFile.encoding = "UTF-8";
                    locFile.open("r");
                    var content = locFile.read();
                    locFile.close();
                    try {
                        content = content.replace(/^\uFEFF/, "");
                        var parsed = eval("(" + content + ")");
                        if (parsed) {
                            if (parsed.select_pdf) t.open_dialog = parsed.select_pdf;
                            if (parsed.pdf_import_title) t.title = parsed.pdf_import_title;
                            if (parsed.pnl_pdf_info) t.pnl_info = parsed.pnl_pdf_info;
                            if (parsed.file) t.lbl_file = parsed.file;
                            if (parsed.pdf_pages_lbl) t.lbl_pages = parsed.pdf_pages_lbl;
                            if (parsed.pdf_size_lbl) t.lbl_size = parsed.pdf_size_lbl;
                            if (parsed.pnl_bleed_settings) t.pnl_bleed = parsed.pnl_bleed_settings;
                            if (parsed.bleed_input_lbl) t.lbl_bleed_input = parsed.bleed_input_lbl;
                            if (parsed.trim_calc_lbl) t.lbl_trim_calc = parsed.trim_calc_lbl;
                            if (parsed.btn_cancel) t.btn_cancel = parsed.btn_cancel;
                            if (parsed.btn_create_doc) t.btn_ok = parsed.btn_create_doc;
                            if (parsed.alert_doc_created) t.alert_success = parsed.alert_doc_created;
                            if (parsed.unit_mm) t.unit_mm = parsed.unit_mm;
                            if (parsed.chk_link_bleeds) t.chk_link_bleeds = parsed.chk_link_bleeds;
                            if (parsed.lbl_top) t.lbl_top = parsed.lbl_top;
                            if (parsed.lbl_bottom) t.lbl_bottom = parsed.lbl_bottom;
                            if (parsed.lbl_inside) t.lbl_inside = parsed.lbl_inside;
                            if (parsed.lbl_outside) t.lbl_outside = parsed.lbl_outside;
                            if (parsed.chk_uniform_after) t.chk_uniform_after = parsed.chk_uniform_after;
                        }
                    } catch (eJson) {}
                }
            } catch (eLoc) {}
        }
        return t;
    }

    var currentLang = loadCurrentLang(scriptFolder);
    var t = getTranslations(currentLang, scriptFolder);

    var langList = [
        { code: "ru", name: "Русский" },
        { code: "en", name: "English" },
        { code: "de", name: "Deutsch" },
        { code: "es", name: "Español" },
        { code: "fr", name: "Français" },
        { code: "it", name: "Italiano" },
        { code: "ja", name: "日本語" },
        { code: "pl", name: "Polski" },
        { code: "pt", name: "Português" },
        { code: "zh", name: "中文" }
    ];

    function formatString(template) {
        var str = template;
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
        }
        return str;
    }

    var filterPattern = (File.fs === "Windows") ? "*.pdf" : function (f) { return (f instanceof Folder) || /\.pdf$/i.test(f.name); };
    var selectedPdf = File.openDialog(t.open_dialog, filterPattern);
    if (!selectedPdf || !selectedPdf.exists) {
        return;
    }

    function cleanFileName(nameOrFile) {
        if (!nameOrFile) return "";
        var str = (typeof nameOrFile === "string") ? nameOrFile : nameOrFile.name;
        try { str = File.decode(str); } catch (e) { try { str = decodeURI(str); } catch (e2) { } }
        str = str.replace(/_qi(\.[a-zA-Z0-9]+)?$/i, function(m, ext) { return ext || ""; });
        return str;
    }

    function safePlacePDF(rect, file, pageNum) {
        try {
            app.pdfPlacePreferences.pdfCrop = PDFCrop.cropBleed;
            app.pdfPlacePreferences.pageNumber = pageNum;
            return rect.place(file)[0];
        } catch (e) {}

        try {
            app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
            app.pdfPlacePreferences.pageNumber = pageNum;
            return rect.place(file)[0];
        } catch (e) {}

        app.pdfPlacePreferences.pageNumber = pageNum;
        return rect.place(file)[0];
    }

    function getPDFSize(file) {
        var tempDoc = app.documents.add(false);
        var w = 210, h = 297;
        try {
            tempDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
            tempDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
            var tempPage = tempDoc.pages[0];
            var tempRect = tempPage.rectangles.add();
            var pdfItem = safePlacePDF(tempRect, file, 1);
            var bounds = pdfItem.geometricBounds;
            w = Math.round((bounds[3] - bounds[1]) * 10) / 10;
            h = Math.round((bounds[2] - bounds[0]) * 10) / 10;
        } catch (e) {}
        finally {
            try { tempDoc.close(SaveOptions.NO); } catch (err) {}
        }
        return { width: w, height: h };
    }

    function countPDFPagesBinary(file) {
        var count = 0;
        try {
            var f = (typeof file === "string") ? new File(file) : file;
            if (!f || !f.exists) return 0;
            f.encoding = "BINARY";
            f.open("r");
            var str = f.read(60000);
            var size = f.tell();
            if (size > 100000) {
                f.seek(Math.max(0, size - 80000), 0);
                str += " " + f.read(80000);
            }
            f.close();

            var matches = str.match(/\/Count\s+(\d+)/g);
            if (matches && matches.length > 0) {
                for (var i = 0; i < matches.length; i++) {
                    var m = matches[i].match(/\d+/);
                    if (m) {
                        var num = parseInt(m[0], 10);
                        if (num > count) count = num;
                    }
                }
            }
        } catch (e) { }
        return count;
    }

    function countPDFPages(file) {
        var tempDoc = app.documents.add(false);
        var totalPages = 1;
        try {
            var tempPage = tempDoc.pages[0];
            var tempRect = tempPage.rectangles.add();
            var pdfItem = safePlacePDF(tempRect, file, 1);
            var k = 1;
            while (true) {
                var testPage = k * 2;
                var testItem = safePlacePDF(tempRect, file, testPage);
                var r = testItem.pdfAttributes.pageNumber;
                if (r === testPage) {
                    k = testPage;
                } else {
                    break;
                }
            }
            var low = k;
            var high = k * 2;
            totalPages = low;
            while (low <= high) {
                var mid = Math.floor((low + high) / 2);
                if (mid === 1) { low = mid + 1; continue; }
                var testItemMid = safePlacePDF(tempRect, file, mid);
                var actualPage = testItemMid.pdfAttributes.pageNumber;
                if (actualPage === mid) {
                    totalPages = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        } catch (e) {
            var binCount = countPDFPagesBinary(file);
            if (binCount > 0) totalPages = binCount;
        } finally {
            try { tempDoc.close(SaveOptions.NO); } catch (err) {}
        }
        return totalPages;
    }

    // Analyze PDF
    var pdfDim = getPDFSize(selectedPdf);
    var pdfPageCount = countPDFPages(selectedPdf);

    // Build UI Dialog
    var win = new Window("dialog", t.title);
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 12;
    win.margins = 16;

    // Top bar for Language
    var topBar = win.add("group");
    topBar.orientation = "row";
    topBar.alignment = ["right", "top"];
    
    var langNames = [];
    var defaultLangIdx = 1;
    for (var l = 0; l < langList.length; l++) {
        langNames.push(langList[l].name);
        if (langList[l].code === currentLang) defaultLangIdx = l;
    }
    var langDropdown = topBar.add("dropdownlist", undefined, langNames);
    langDropdown.selection = defaultLangIdx;

    // PDF Info Panel
    var grpInfo = win.add("panel", undefined, t.pnl_info);
    grpInfo.orientation = "column";
    grpInfo.alignChildren = "left";
    grpInfo.spacing = 6;
    grpInfo.margins = 12;

    var lblFile = grpInfo.add("statictext", undefined, t.lbl_file + cleanFileName(selectedPdf.name));
    var lblPages = grpInfo.add("statictext", undefined, t.lbl_pages + pdfPageCount);
    var lblSize = grpInfo.add("statictext", undefined, t.lbl_size + pdfDim.width.toFixed(1) + " × " + pdfDim.height.toFixed(1) + " " + t.unit_mm);

    // Bleed Panel
    var pnlBleed = win.add("panel", undefined, t.pnl_bleed);
    pnlBleed.orientation = "column";
    pnlBleed.alignChildren = "left";
    pnlBleed.spacing = 8;
    pnlBleed.margins = 12;

    var chkLinkBleeds = pnlBleed.add("checkbox", undefined, t.chk_link_bleeds || "Link Bleeds");
    chkLinkBleeds.value = true;

    var grpInput1 = pnlBleed.add("group");
    grpInput1.orientation = "row";
    var lblTop = grpInput1.add("statictext", undefined, (t.lbl_top || "Top") + ":");
    var editTop = grpInput1.add("edittext", undefined, "3.0");
    editTop.characters = 5;
    var lblBottom = grpInput1.add("statictext", undefined, (t.lbl_bottom || "Bottom") + ":");
    var editBottom = grpInput1.add("edittext", undefined, "3.0");
    editBottom.characters = 5;

    var grpInput2 = pnlBleed.add("group");
    grpInput2.orientation = "row";
    var lblInside = grpInput2.add("statictext", undefined, (t.lbl_inside || "Inside") + ":");
    var editInside = grpInput2.add("edittext", undefined, "3.0");
    editInside.characters = 5;
    var lblOutside = grpInput2.add("statictext", undefined, (t.lbl_outside || "Outside") + ":");
    var editOutside = grpInput2.add("edittext", undefined, "3.0");
    editOutside.characters = 5;

    var chkUniformAfter = pnlBleed.add("checkbox", undefined, t.chk_uniform_after || "Make Uniform After Import");
    chkUniformAfter.value = true;

    var txtTrimCalc = pnlBleed.add("statictext", undefined, "");
    txtTrimCalc.preferredSize.width = 360;

    function updateBleedLinking() {
        var isLinked = chkLinkBleeds.value;
        editBottom.enabled = !isLinked;
        editInside.enabled = !isLinked;
        editOutside.enabled = !isLinked;
        if (isLinked) {
            editBottom.text = editTop.text;
            editInside.text = editTop.text;
            editOutside.text = editTop.text;
        }
        updateTrimCalc();
    }

    chkLinkBleeds.onClick = updateBleedLinking;

    function handleTopChange() {
        if (chkLinkBleeds.value) {
            editBottom.text = editTop.text;
            editInside.text = editTop.text;
            editOutside.text = editTop.text;
        }
        updateTrimCalc();
    }

    function updateTrimCalc() {
        var tB = parseSafeFloat(editTop.text) || 0;
        var bB = parseSafeFloat(editBottom.text) || 0;
        var iB = parseSafeFloat(editInside.text) || 0;
        var oB = parseSafeFloat(editOutside.text) || 0;

        var trimW = Math.max(1, pdfDim.width - iB - oB);
        var trimH = Math.max(1, pdfDim.height - tB - bB);
        txtTrimCalc.text = t.lbl_trim_calc + trimW.toFixed(1) + " × " + trimH.toFixed(1) + " " + t.unit_mm;
    }

    editTop.onChange = handleTopChange;
    editTop.onChanging = handleTopChange;
    editBottom.onChange = updateTrimCalc;
    editBottom.onChanging = updateTrimCalc;
    editInside.onChange = updateTrimCalc;
    editInside.onChanging = updateTrimCalc;
    editOutside.onChange = updateTrimCalc;
    editOutside.onChanging = updateTrimCalc;
    
    updateBleedLinking();

    // Buttons
    var grpBtns = win.add("group");
    grpBtns.alignment = ["right", "center"];
    grpBtns.spacing = 10;
    var btnCancel = grpBtns.add("button", undefined, t.btn_cancel, { name: "cancel" });
    var btnOK = grpBtns.add("button", undefined, t.btn_ok, { name: "ok" });


    function applyLanguage(lang) {
        t = getTranslations(lang, scriptFolder);
        win.text = t.title;
        grpInfo.text = t.pnl_info;
        lblFile.text = t.lbl_file + cleanFileName(selectedPdf.name);
        lblPages.text = t.lbl_pages + pdfPageCount;
        lblSize.text = t.lbl_size + pdfDim.width.toFixed(1) + " × " + pdfDim.height.toFixed(1) + " " + t.unit_mm;
        pnlBleed.text = t.pnl_bleed;
        chkLinkBleeds.text = t.chk_link_bleeds || "Link Bleeds";
        lblTop.text = (t.lbl_top || "Top") + ":";
        lblBottom.text = (t.lbl_bottom || "Bottom") + ":";
        lblInside.text = (t.lbl_inside || "Inside") + ":";
        lblOutside.text = (t.lbl_outside || "Outside") + ":";
        chkUniformAfter.text = t.chk_uniform_after || "Make Uniform After Import";
        updateTrimCalc();
        if (typeof btnCancel !== "undefined") btnCancel.text = t.btn_cancel;
        if (typeof btnOK !== "undefined") btnOK.text = t.btn_ok;
        
        try {
            var settingsFolder = new Folder(scriptFolder + "/RESOURCES/Data");
            if (!settingsFolder.exists) settingsFolder.create();
            var settingsFile = new File(settingsFolder + "/Settings.txt");
            var params = {};
            if (settingsFile.exists) {
                settingsFile.encoding = "UTF-8";
                settingsFile.open("r");
                var content = settingsFile.read();
                settingsFile.close();
                try { params = eval("(" + content + ")"); } catch(e) {}
            }
            params.lang = lang;
            settingsFile.encoding = "UTF-8";
            settingsFile.open("w");
            settingsFile.write(params.toSource());
            settingsFile.close();
        } catch(e) {}
    }

    langDropdown.onChange = function() {
        var newLang = langList[langDropdown.selection.index].code;
        if (newLang !== currentLang) {
            currentLang = newLang;
            applyLanguage(currentLang);
            
            var t = translations[currentLang] || translations["en"];
            var msg = t.msg_restart_lang || "Please restart the script for the language changes to take full effect.";
            alert(msg, t.title || "PDF Import");
        }
    };

    function replaceCommaOnFly() {
        if (this.text.indexOf(',') !== -1) {
            this.text = this.text.replace(/,/g, '.');
        }
    }
    function wrapCommaReplace(ctrl) {
        if (!ctrl) return;
        if (ctrl.type === "edittext") {
            var oldOnChange = ctrl.onChange;
            ctrl.onChange = function() {
                replaceCommaOnFly.call(this);
                if (oldOnChange) oldOnChange.call(this);
            };
        } else if (ctrl.children && ctrl.children.length > 0) {
            for (var i = 0; i < ctrl.children.length; i++) {
                wrapCommaReplace(ctrl.children[i]);
            }
        }
    }
    wrapCommaReplace(win);

    if (win.show() !== 1) {
        return;
    }

    var tB = parseSafeFloat(editTop.text) || 0;
    var bB = parseSafeFloat(editBottom.text) || 0;
    var iB = parseSafeFloat(editInside.text) || 0;
    var oB = parseSafeFloat(editOutside.text) || 0;

    var trimW = Math.max(1, pdfDim.width - iB - oB);
    var trimH = Math.max(1, pdfDim.height - tB - bB);

    // Create Document
    var srcDoc = app.documents.add(true);
    srcDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    srcDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    srcDoc.documentPreferences.pagesPerDocument = pdfPageCount;
    srcDoc.documentPreferences.pageWidth = trimW;
    srcDoc.documentPreferences.pageHeight = trimH;
    srcDoc.documentPreferences.facingPages = false;

    srcDoc.documentPreferences.documentBleedUniformSize = chkUniformAfter.value;
    if (chkUniformAfter.value) {
        var maxB = Math.max(tB, bB, iB, oB);
        srcDoc.documentPreferences.documentBleedTopOffset = maxB;
        srcDoc.documentPreferences.documentBleedBottomOffset = maxB;
        srcDoc.documentPreferences.documentBleedInsideOrLeftOffset = maxB;
        srcDoc.documentPreferences.documentBleedOutsideOrRightOffset = maxB;
    } else {
        srcDoc.documentPreferences.documentBleedTopOffset = tB;
        srcDoc.documentPreferences.documentBleedBottomOffset = bB;
        srcDoc.documentPreferences.documentBleedInsideOrLeftOffset = iB; // Left
        srcDoc.documentPreferences.documentBleedOutsideOrRightOffset = oB; // Right
    }

    app.scriptPreferences.enableRedraw = false;
    try {
        for (var p = 0; p < pdfPageCount; p++) {
            var page = srcDoc.pages.item(p);
            page.marginPreferences.top = 0;
            page.marginPreferences.bottom = 0;
            page.marginPreferences.left = 0;
            page.marginPreferences.right = 0;

            var pageNum = p + 1;
            var isOdd = (pageNum % 2 !== 0);
            var leftBleed = isOdd ? iB : oB;
            var rightBleed = isOdd ? oB : iB;

            var rectBounds = [-tB, -leftBleed, trimH + bB, trimW + rightBleed];
            var frame = page.rectangles.add({
                geometricBounds: rectBounds,
                strokeWeight: 0
            });
            try { frame.strokeColor = srcDoc.swatches.item("None"); } catch (e1) {}
            try { frame.fillColor = srcDoc.swatches.item("None"); } catch (e2) {}

            safePlacePDF(frame, selectedPdf, pageNum);
            try { frame.fit(FitOptions.CENTER_CONTENT); } catch (eFit) {}
        }
    } finally {
        app.scriptPreferences.enableRedraw = true;
    }

    var baseName = selectedPdf.name.replace(/\.[^.]+$/, "") + "_qi";
    var saveFolder = selectedPdf.parent.fsName;
    var saveFile = new File(saveFolder + "/" + baseName + ".indd");
    var counter = 1;
    while (saveFile.exists) {
        saveFile = new File(saveFolder + "/" + baseName + "_" + counter + ".indd");
        counter++;
    }
    try {
        srcDoc.save(saveFile);
    } catch (e) { }

    var bleedStrForAlert = chkLinkBleeds.value ? tB.toString() : (tB + "/" + bB + "/" + iB + "/" + oB);
    alert(formatString(t.alert_success, pdfPageCount, trimW.toFixed(1), trimH.toFixed(1), t.unit_mm, bleedStrForAlert));
})();
