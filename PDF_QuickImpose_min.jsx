// #target indesign
// PDF_QuickImpose.jsx
// An open-source imposition script for Adobe InDesign with PDF import capabilities.

var uiLabels = {};

var translations = {
    ru: {
        title: "PDF QuickImpose v1.2 — Спуск полос из PDF",
        select_pdf: "Выберите PDF файл для спуска полос",
        bleed_title: "PDF QuickImpose — Настройка вылетов (Bleed)",
        pnl_pdf_info: "Информация о PDF",
        pnl_bleed_settings: "Настройка вылетов",
        file: "Файл: ",
        pages: " стр.",
        size: "Размер: ",
        bleeds: "Вылеты: ",
        pdf_size_lbl: "Размер PDF (с вылетами): ",
        pdf_pages_lbl: "Количество страниц: ",
        bleed_input_lbl: "Вылеты в PDF (Bleed, мм): ",
        trim_calc_lbl: "Обрезной размер (Trim): ",
        chk_ask_bleed: "Запрашивать вылеты каждый раз",
        btn_next: "Далее ->",
        about_text: "PDF QuickImpose v1.2\n\nПоддерживаются современные версии Adobe InDesign.\nТестировалось на версии 2026.\n\nАвтор: Said & Antigravity.",
        btn_about: "?",
        pnl_type_units: "Спуск и Единицы",
        lbl_imp_type: "Тип спуска:",
        lbl_units: "Единицы:",
        lbl_lang: "Язык / Lang:",
        pnl_grid: "Параметры сетки",
        lbl_cols: "Колонки (Across):",
        lbl_rows: "Строки (Down):",
        pnl_margins: "Поля области спуска",
        lbl_margin_left: "Левое:",
        lbl_margin_top: "Верхнее:",
        lbl_margin_right: "Правое:",
        lbl_margin_bottom: "Нижнее:",
        pnl_spacing: "Зазоры (Распорки)",
        lbl_spacing_horiz: "Горизонтальный:",
        lbl_spacing_vert: "Вертикальный:",
        pnl_imp_area: "Размер области спуска",
        lbl_imp_width: "Ширина области:",
        lbl_imp_height: "Высота области:",
        pnl_sheet: "Размер печатного листа",
        lbl_sheet_format: "Формат:",
        lbl_sheet_orient: "Ориент:",
        lbl_sheet_width: "Ширина листа:",
        lbl_sheet_height: "Высота листа:",
        sheet_area: "Область спуска",
        sheet_custom: "Вручную",
        orient_horiz: "Гориз.",
        orient_vert: "Верт.",
        pnl_presets: "Настройки",
        chk_load_last: "Загружать последние по умолчанию",
        lbl_preset_save: "Сохранить:",
        btn_preset_save: "Сохранить",
        lbl_preset_load: "Загрузить:",
        btn_preset_load: "Загрузить",
        pnl_creep: "Сползание (Creep)",
        chk_enable_creep: "Использовать сползание",
        lbl_sheets_per_sig: "Листов в тетради (0=Все):",
        lbl_creep_outer: "Внешний сдвиг:",
        lbl_creep_inner: "Внутренний сдвиг:",
        chk_rotate_backs: "Оборот на 180",
        lbl_cover: "Обложка:",
        lbl_block: "Блок:",
        lbl_creep_dir: "Направление:",
        creep_dir_options: ["Внутрь", "Наружу"],
        pnl_bleed_opts: "Параметры вылетов",
        chk_use_bleed: "Использовать вылеты из исходного документа",
        lbl_custom_bleed: "Свои вылеты:",
        pnl_marks: "Метки реза",
        chk_marks_on: "Отрисовывать метки реза",
        lbl_mark_length: "Длина:",
        lbl_mark_offset: "Отступ:",
        btn_cancel: "Отмена",
        btn_impose: "Спуск полос",
        lbl_author_link: "Автор: github.com/SaidAuita/QuickImpose-InDesign",
        lbl_more_scripts: "Другие скрипты: ph-cu-s.com/tools",
        alert_no_doc: "Пожалуйста, выберите PDF файл.",
        alert_preset_name: "Пожалуйста, введите название пресета.",
        alert_preset_saved: "Настройки успешно сохранены под именем: ",
        alert_preset_loaded: "Настройки успешно загружены: ",
        alert_preset_empty: "Нет сохраненных настроек для загрузки.",
        alert_file_not_found: "Файл базы бумаг не найден:\n",
        alert_success: "Спуск полос успешно завершен!\nСоздано Flats: ",
        alert_err_export: "Ошибка при экспорте во временный PDF:\n",
        imp_types: [
            "Saddle Stitch (Скрепка)", 
            "Perfect Bound (КБС)", 
            "N Up Consecutive (Сетка)", 
            "Cut Stack (Порезка стопой)",
            "Step & Repeat (Повтор)"
        ],
        tip_edit_paper_sizes: "Редактировать список форматов бумаги",
        tip_edit_paper_weights: "Редактировать список плотностей бумаги",
        chk_info_slug: "Инфо",
        tip_info_slug: "Выводить служебную информацию (имя файла, дата, тип спуска) в левом верхнем углу листа",
        tip_slug_font_size: "Размер шрифта инфо-строки (pt)",
        chk_compensate_thickness: "Компенсация толщины блока",
        tip_compensate_thickness: "Коэффициент компенсации толщины блока (K) для центрирования обложки. Сдвигает обложку наружу на величину: OffsetMax = (Толщина / 2) * K",
        chk_center_mark: "Центр (линия сгиба)",
        chk_reset_trim_bleed: "Сбросить Trim + Bleed",
        btn_example: "Пример",
        title_example: "Пример спуска",
        alert_no_example: "Изображения примера не найдены в папке:\n",
        lbl_autoplay: "Автопросмотр",
        lbl_interval: "Интервал:",
        btn_close: "Закрыть",
        lbl_sheet_nav: "Лист",
        lbl_of: "из",
        lbl_side: "Сторона",
        lbl_front: "Лицевая",
        lbl_back: "Оборотная",
        btn_preview: "Схема"
    },
    en: {
        title: "PDF QuickImpose v1.2 — Imposition from PDF",
        select_pdf: "Select PDF file for Imposition",
        bleed_title: "PDF QuickImpose — Bleed Setup",
        pnl_pdf_info: "PDF Information",
        pnl_bleed_settings: "Bleed Settings",
        file: "File: ",
        pages: " pages",
        size: "Size: ",
        bleeds: "Bleeds: ",
        pdf_size_lbl: "PDF Size (incl. bleeds): ",
        pdf_pages_lbl: "Page Count: ",
        bleed_input_lbl: "PDF Bleed (mm): ",
        trim_calc_lbl: "Trim Size: ",
        chk_ask_bleed: "Ask bleed every time",
        btn_next: "Next ->",
        about_text: "PDF QuickImpose v1.2\n\nSupports modern versions of Adobe InDesign.\nTested on version 2026.\n\nAuthor: Said & Antigravity.",
        btn_about: "?",
        pnl_type_units: "Imposition and Units",
        lbl_imp_type: "Imposition:",
        lbl_units: "Units:",
        lbl_lang: "Language / Язык:",
        pnl_grid: "Grid Parameters",
        lbl_cols: "Cols (Across):",
        lbl_rows: "Rows (Down):",
        pnl_margins: "Margins of Imposition Area",
        lbl_margin_left: "Left:",
        lbl_margin_top: "Top:",
        lbl_margin_right: "Right:",
        lbl_margin_bottom: "Bottom:",
        pnl_spacing: "Spacings (Gaps)",
        lbl_spacing_horiz: "Horizontal:",
        lbl_spacing_vert: "Vertical:",
        pnl_imp_area: "Imposition Area Size",
        lbl_imp_width: "Area Width:",
        lbl_imp_height: "Area Height:",
        pnl_sheet: "Print Sheet Size",
        lbl_sheet_format: "Format:",
        lbl_sheet_orient: "Orient:",
        lbl_sheet_width: "Sheet Width:",
        lbl_sheet_height: "Sheet Height:",
        sheet_area: "Imposition Area",
        sheet_custom: "Custom",
        orient_horiz: "Horiz.",
        orient_vert: "Vert.",
        pnl_presets: "Settings and Presets",
        chk_load_last: "Load last settings by default",
        lbl_preset_save: "Save as:",
        btn_preset_save: "Save",
        lbl_preset_load: "Load:",
        btn_preset_load: "Load",
        pnl_creep: "Creep Shift",
        chk_enable_creep: "Enable Creep",
        lbl_sheets_per_sig: "Sheets per sig (0=All):",
        lbl_creep_outer: "Outer creep:",
        lbl_creep_inner: "Inner creep:",
        chk_rotate_backs: "Rotate backs 180",
        lbl_cover: "Cover:",
        lbl_block: "Block:",
        lbl_creep_dir: "Direction:",
        creep_dir_options: ["Inwards", "Outwards"],
        pnl_bleed_opts: "Bleed Options",
        chk_use_bleed: "Use document bleed settings",
        lbl_custom_bleed: "Custom bleed:",
        pnl_marks: "Crop Marks",
        chk_marks_on: "Draw crop marks",
        lbl_mark_length: "Length:",
        lbl_mark_offset: "Offset:",
        btn_cancel: "Cancel",
        btn_impose: "Impose",
        lbl_author_link: "Author: github.com/SaidAuita/QuickImpose-InDesign",
        lbl_more_scripts: "More scripts: ph-cu-s.com/tools",
        alert_no_doc: "Please select a PDF file.",
        alert_preset_name: "Please enter preset name.",
        alert_preset_saved: "Settings successfully saved as: ",
        alert_preset_loaded: "Settings successfully loaded: ",
        alert_preset_empty: "No saved presets found to load.",
        alert_file_not_found: "Paper database file not found:\n",
        alert_success: "Imposition completed successfully!\nCreated Flats: ",
        alert_err_export: "Error exporting temporary PDF:\n",
        imp_types: [
            "Saddle Stitch", 
            "Perfect Bound", 
            "N Up Consecutive", 
            "Cut Stack", 
            "Step & Repeat (Labels)"
        ],
        tip_edit_paper_sizes: "Edit paper size format list",
        tip_edit_paper_weights: "Edit paper thickness list",
        chk_info_slug: "Info",
        tip_info_slug: "Output slug info (filename, date, type) in the top-left corner of the sheet",
        tip_slug_font_size: "Slug info line font size (pt)",
        chk_compensate_thickness: "Thickness Compensation",
        tip_compensate_thickness: "Thickness compensation coefficient (K) to center the cover. Shifts the cover outwards by: OffsetMax = (Thickness / 2) * K",
        chk_center_mark: "Center (fold line)",
        chk_reset_trim_bleed: "Reset Trim + Bleed",
        btn_example: "Example",
        title_example: "Imposition Example",
        alert_no_example: "No example images found in folder:\n",
        lbl_autoplay: "Auto-play",
        lbl_interval: "Interval:",
        btn_close: "Close",
        lbl_sheet_nav: "Sheet",
        lbl_of: "of",
        lbl_side: "Side",
        lbl_front: "Front",
        lbl_back: "Back",
        btn_preview: "Preview"
    }
};

// ==========================================================
// --- PDF IMPORT AND PAGE COUNTING HELPERS ---
// ==========================================================

function safePlacePDF(rect, file, pgNum) {
    app.pdfPlacePreferences.pageNumber = pgNum;
    
    try {
        app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;
        return rect.place(file)[0];
    } catch (e) {}

    try {
        app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_MEDIA;
        return rect.place(file)[0];
    } catch (e) {}

    try {
        app.pdfPlacePreferences.pdfCrop = PDFCrop.cropBleed;
        return rect.place(file)[0];
    } catch (e) {}

    try {
        app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
        return rect.place(file)[0];
    } catch (e) {}

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
    } catch(e) {}
    finally {
        try {
            tempDoc.close(SaveOptions.NO);
        } catch (err) {}
    }
    return { width: w, height: h };
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
            
            if (k > 9999) {
                break;
            }
        }
        
        var low = k;
        var high = k * 2 - 1;
        
        while (low <= high) {
            var mid = Math.floor((low + high) / 2);
            var testItem = safePlacePDF(tempRect, file, mid);
            var r = testItem.pdfAttributes.pageNumber;
            
            if (r === mid) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        totalPages = high;
    } catch (e) {
        totalPages = 1;
    } finally {
        try {
            tempDoc.close(SaveOptions.NO);
        } catch (err) {}
    }
    return totalPages;
}

function loadLangTrans(lang, resDir) {
    if (!translations[lang]) {
        translations[lang] = {};
    }
    if (resDir) {
        var locFile = new File(resDir + "/Localization/" + lang + ".json");
        if (locFile.exists) {
            locFile.encoding = "UTF-8";
            locFile.open("r");
            var content = locFile.read();
            locFile.close();
            try {
                content = content.replace(/^\uFEFF/, "");
                var parsed = eval("(" + content + ")");
                if (parsed) {
                    for (var k in parsed) {
                        if (parsed.hasOwnProperty(k)) {
                            translations[lang][k] = parsed[k];
                        }
                    }
                }
            } catch(e) {}
        }
    }
    var t = translations[lang] || translations["en"];
    var en = translations["en"];
    if (t !== en && en) {
        for (var key in en) {
            if (en.hasOwnProperty(key) && t[key] === undefined) {
                t[key] = en[key];
            }
        }
    }
    return t;
}

// ==========================================================
// --- MAIN ENTRY POINT ---
// ==========================================================

function main() {
    var initialLang = "en";
    try {
        if (app.locale == Locale.RUSSIAN_LOCALE) {
            initialLang = "ru";
        }
    } catch(e) {}

    var scriptFile = new File(app.activeScript);
    var resourcesDir = new Folder(scriptFile.parent + "/RESOURCES");

    // Load persistent settings
    var settingsFile = new File(resourcesDir + "/Data/Settings.txt");
    var lastParams = null;
    if (settingsFile.exists) {
        settingsFile.encoding = "UTF-8";
        settingsFile.open("r");
        var content = settingsFile.read();
        settingsFile.close();
        try {
            lastParams = eval(content);
        } catch(e) {}
    }

    var secondLang = initialLang;
    if (lastParams && lastParams.lang) {
        secondLang = lastParams.lang;
    }

    var tEn = loadLangTrans("en", resourcesDir);
    var tSecond = loadLangTrans(secondLang, resourcesDir);

    function bilingualText(strEn, strSecond) {
        if (!strSecond || secondLang === "en" || strEn === strSecond) {
            return strEn;
        }
        return strEn + " / " + strSecond;
    }

    function bilingualParens(strEn, strSecond) {
        if (!strSecond || secondLang === "en" || strEn.toLowerCase() === strSecond.toLowerCase()) {
            return strEn;
        }
        return strEn + " (" + strSecond + ")";
    }

    function getShort(key, defaultRu, fallbackEn) {
        if (tSecond && tSecond[key + "_short"]) {
            return tSecond[key + "_short"];
        }
        if (secondLang === "ru") {
            return defaultRu;
        }
        var raw = tSecond ? (tSecond[key] || tSecond["pdf_" + key + "_lbl"] || fallbackEn) : fallbackEn;
        if (!raw) return fallbackEn;
        return raw.replace(/:\s*$/, "").replace(/\(mm\)\s*$/i, "").replace(/\(мм\)\s*$/i, "").replace(/мм\s*$/i, "").replace(/\(.*?\)/g, "").replace(/^\s+|\s+$/g, "");
    }

    // 1. Prompt user to select PDF
    var filterPattern = (File.fs === "Windows") ? "*.pdf" : function(f) { return (f instanceof Folder) || /\.pdf$/i.test(f.name); };
    var openDialogTitle = bilingualText(tEn.select_pdf || "Select PDF file for Imposition", tSecond.select_pdf || (secondLang === "ru" ? "Выберите PDF файл для спуска полос" : "Select PDF file"));
    var selectedPdf = File.openDialog(openDialogTitle, filterPattern);
    if (!selectedPdf || !selectedPdf.exists) {
        return;
    }

    var defaultBleed = 3.0;
    var askPdfBleed = true;
    if (lastParams) {
        if (lastParams.pdfBleed !== undefined) defaultBleed = parseFloat(lastParams.pdfBleed) || 3.0;
        if (lastParams.askPdfBleed !== undefined) askPdfBleed = !!lastParams.askPdfBleed;
    }

    // 2. Read PDF size & page count
    var pdfDim = getPDFSize(selectedPdf);
    var pdfPageCount = countPDFPages(selectedPdf);

    var chosenBleed = defaultBleed;

    // 3. Bleed setup dialog
    if (askPdfBleed) {
        var winTitle = bilingualText("PDF QuickImpose — Bleed Setup", tSecond.bleed_title || "Bleed Setup");
        var winBleed = new Window("dialog", winTitle);
        winBleed.orientation = "column";
        winBleed.alignChildren = ["fill", "top"];
        winBleed.spacing = 12;
        winBleed.margins = 16;

        var pnlInfoTitle = bilingualText("PDF Information", tSecond.pnl_pdf_info || "PDF Information");
        var grpInfo = winBleed.add("panel", undefined, pnlInfoTitle);
        grpInfo.orientation = "column";
        grpInfo.alignChildren = "left";
        grpInfo.spacing = 6;
        grpInfo.margins = 12;

        var fileLbl = bilingualParens("File", getShort("file", "файл", "file"));
        grpInfo.add("statictext", undefined, fileLbl + ": " + selectedPdf.name);

        var pgsLbl = bilingualParens("Page count", getShort("pages", "количество страниц", "page count"));
        grpInfo.add("statictext", undefined, pgsLbl + ": " + pdfPageCount);

        var pdfSizeLbl = bilingualParens("PDF Size", getShort("size", "размер документа", "PDF size"));
        grpInfo.add("statictext", undefined, pdfSizeLbl + ": " + pdfDim.width.toFixed(1) + " x " + pdfDim.height.toFixed(1) + " mm");

        var pnlBleedTitle = bilingualText("Bleed Settings", tSecond.pnl_bleed_settings || "Bleed Settings");
        var pnlBleedInput = winBleed.add("panel", undefined, pnlBleedTitle);
        pnlBleedInput.orientation = "column";
        pnlBleedInput.alignChildren = "left";
        pnlBleedInput.spacing = 8;
        pnlBleedInput.margins = 12;

        var grpInput = pnlBleedInput.add("group");
        grpInput.orientation = "row";
        var bleedInputLbl = bilingualParens("PDF bleed", getShort("bleed", "вылеты в документе", "PDF bleed")) + ", mm ";
        grpInput.add("statictext", undefined, bleedInputLbl);
        var editBleedVal = grpInput.add("edittext", undefined, String(defaultBleed));
        editBleedVal.characters = 6;

        var txtTrimCalc = pnlBleedInput.add("statictext", undefined, "");
        txtTrimCalc.preferredSize.width = 360;

        function updateTrimCalc() {
            var b = parseFloat(editBleedVal.text) || 0;
            var trimW = Math.max(0, pdfDim.width - 2 * b);
            var trimH = Math.max(0, pdfDim.height - 2 * b);
            var trimCalcLbl = bilingualParens("Trim Size", getShort("trim", "Чистый размер", "trim size"));
            txtTrimCalc.text = trimCalcLbl + ": " + trimW.toFixed(1) + " x " + trimH.toFixed(1) + " mm";
        }
        editBleedVal.onChange = updateTrimCalc;
        updateTrimCalc();

        var chkAskBleedLbl = bilingualParens("ask bleed every time", getShort("chk_ask_bleed", "всегда спрашивать про вылеты", "ask bleed every time"));
        var chkAskBleed = winBleed.add("checkbox", undefined, chkAskBleedLbl);
        chkAskBleed.value = askPdfBleed;

        var grpBtns = winBleed.add("group");
        grpBtns.alignment = ["right", "center"];
        var btnCancelLbl = bilingualText("Cancel", tSecond.btn_cancel || "Cancel");
        var btnNextLbl = bilingualText("Next ->", tSecond.btn_next || "Next ->");
        var btnCancel = grpBtns.add("button", undefined, btnCancelLbl, {name: "cancel"});
        var btnNext = grpBtns.add("button", undefined, btnNextLbl, {name: "ok"});

        if (winBleed.show() !== 1) {
            return;
        }

        chosenBleed = parseFloat(editBleedVal.text) || 0;
        askPdfBleed = chkAskBleed.value;
    }

    var trimW = Math.max(1, pdfDim.width - 2 * chosenBleed);
    var trimH = Math.max(1, pdfDim.height - 2 * chosenBleed);

    var targetUnitStr = (lastParams && lastParams.unitStr) ? lastParams.unitStr : "mm";
    var targetUnits = MeasurementUnits.MILLIMETERS;
    if (targetUnitStr === "pt") targetUnits = MeasurementUnits.POINTS;
    else if (targetUnitStr === "in") targetUnits = MeasurementUnits.INCHES;

    var docTrimW = convertUnits(trimW, "mm", targetUnitStr);
    var docTrimH = convertUnits(trimH, "mm", targetUnitStr);
    var docBleedVal = convertUnits(chosenBleed, "mm", targetUnitStr);

    // 4. Create source document for QuickImpose from PDF
    var srcDoc = app.documents.add(false);
    srcDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    srcDoc.documentPreferences.pagesPerDocument = pdfPageCount;
    srcDoc.documentPreferences.pageWidth = docTrimW;
    srcDoc.documentPreferences.pageHeight = docTrimH;
    srcDoc.documentPreferences.facingPages = false;

    srcDoc.documentPreferences.documentBleedTopOffset = docBleedVal;
    srcDoc.documentPreferences.documentBleedBottomOffset = docBleedVal;
    srcDoc.documentPreferences.documentBleedInsideOrLeftOffset = docBleedVal;
    srcDoc.documentPreferences.documentBleedOutsideOrRightOffset = docBleedVal;

    app.scriptPreferences.enableRedraw = false;
    for (var p = 0; p < pdfPageCount; p++) {
        var page = srcDoc.pages.item(p);
        page.marginPreferences.top = 0;
        page.marginPreferences.bottom = 0;
        page.marginPreferences.left = 0;
        page.marginPreferences.right = 0;

        var rectBounds = [-docBleedVal, -docBleedVal, docTrimH + docBleedVal, docTrimW + docBleedVal];
        var frame = page.rectangles.add({
            geometricBounds: rectBounds,
            strokeWeight: 0,
            strokeColor: "None",
            fillColor: "None"
        });
        safePlacePDF(frame, selectedPdf, p + 1);
        try {
            frame.fit(FitOptions.CENTER_CONTENT);
        } catch(e) {}
    }
    app.scriptPreferences.enableRedraw = true;

    // Save PDF bleed settings into lastParams
    if (!lastParams) lastParams = {};
    lastParams.pdfBleed = chosenBleed;
    lastParams.askPdfBleed = askPdfBleed;

    // 5. Open QuickImpose UI with srcDoc
    runQuickImpose(srcDoc, selectedPdf, lastParams, resourcesDir);
}

function runQuickImpose(srcDoc, selectedPdf, initialLastParams, resourcesDir) {
    var initialLang = "en";
    try {
        if (app.locale == Locale.RUSSIAN_LOCALE) {
            initialLang = "ru";
        }
    } catch(e) {}

    var pdfName = selectedPdf.name;
    var docName = pdfName;
    var docPgsCount = srcDoc.pages.length;

    var lastParams = initialLastParams;
    
    function getInitVal(prop, fallback) {
        if (lastParams && lastParams[prop] !== undefined) {
            return lastParams[prop];
        }
        return fallback;
    }

    var currentLang = getInitVal("lang", initialLang);
    loadLangTrans(currentLang, resourcesDir);
    var currentUnit = getInitVal("unitStr", "mm");

    var targetUnits = MeasurementUnits.MILLIMETERS;
    if (currentUnit === "pt") targetUnits = MeasurementUnits.POINTS;
    else if (currentUnit === "in") targetUnits = MeasurementUnits.INCHES;

    // Apply target units to source document directly
    srcDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    var docWidth = srcDoc.documentPreferences.pageWidth;
    var docHeight = srcDoc.documentPreferences.pageHeight;
    var bleedTop = srcDoc.documentPreferences.documentBleedTopOffset;
    var bleedBottom = srcDoc.documentPreferences.documentBleedBottomOffset;
    var bleedLeft = srcDoc.documentPreferences.documentBleedInsideOrLeftOffset;
    var bleedRight = srcDoc.documentPreferences.documentBleedOutsideOrRightOffset;

    var defaultUnitStr = currentUnit;

    var paperSizes = [];
    function loadPaperSizes(unitSystem) {
        var filename = (unitSystem === "in") ? "PaperSizes_in.txt" : "PaperSizes.txt";
        var paperSizesFile = new File(resourcesDir + "/Data/" + filename);
        var sizes = [];
        var areaLabel = (currentLang === "ru") ? "Область спуска" : "Imposition Area";
        var customLabel = (currentLang === "ru") ? "Вручную" : "Custom";
        
        sizes.push({name: areaLabel, w: 0, h: 0});
        sizes.push({name: customLabel, w: -1, h: -1});

        if (paperSizesFile.exists) {
            paperSizesFile.encoding = "UTF-8";
            paperSizesFile.open("r");
            while (!paperSizesFile.eof) {
                var line = paperSizesFile.readln();
                if (line.replace(/^\s+|\s+$/g, "") === "" || line.indexOf("#") === 0 || line.indexOf("//") === 0) {
                    continue;
                }
                var parts = line.split(";");
                if (parts.length >= 3) {
                    var name = parts[0].replace(/^\s+|\s+$/g, "");
                    var w = parseFloat(parts[1]);
                    var h = parseFloat(parts[2]);
                    if (!isNaN(w) && !isNaN(h)) {
                        sizes.push({name: name, w: w, h: h});
                    }
                }
            }
            paperSizesFile.close();
        } else {
            var fallbackSizes;
            if (unitSystem === "in") {
                fallbackSizes = [
                    {name: "Tabloid Extra (13x19)", w: 13, h: 19},
                    {name: "Digital Press (12x18)", w: 12, h: 18},
                    {name: "Tabloid (11x17)", w: 11, h: 17},
                    {name: "Letter (8.5x11)", w: 8.5, h: 11}
                ];
            } else {
                fallbackSizes = [
                    {name: "SRA3 (320x450)", w: 320, h: 450},
                    {name: "SRA3+ (320x460)", w: 320, h: 460},
                    {name: "SRA3++ (320x464)", w: 320, h: 464},
                    {name: "SRA2 (450x640)", w: 450, h: 640},
                    {name: "A3 (297x420)", w: 297, h: 420},
                    {name: "A4 (210x297)", w: 210, h: 297}
                ];
            }
            for (var k = 0; k < fallbackSizes.length; k++) {
                sizes.push(fallbackSizes[k]);
            }
        }
        return sizes;
    }

    paperSizes = loadPaperSizes(currentUnit === "in" ? "in" : "mm");
    
    var paperNames = [];
    for (var i = 0; i < paperSizes.length; i++) {
        paperNames.push(paperSizes[i].name);
    }

    var paperWeightNames = [];
    var paperWeightThicknesses = [];
    
    function loadPaperWeights() {
        var paperWeightsFile = new File(resourcesDir + "/Data/PaperWeights.txt");
        var names = [];
        var thicknesses = [];
        
        if (paperWeightsFile.exists) {
            paperWeightsFile.encoding = "UTF-8";
            paperWeightsFile.open("r");
            while (!paperWeightsFile.eof) {
                var line = paperWeightsFile.readln();
                if (line.replace(/^\s+|\s+$/g, "") === "" || line.indexOf("#") === 0 || line.indexOf("//") === 0) {
                    continue;
                }
                var parts = line.split(";");
                if (parts.length >= 3) {
                    var name = parts[0].replace(/^\s+|\s+$/g, "");
                    var thick = parseFloat(parts[2]);
                    if (!isNaN(thick)) {
                        names.push(name);
                        thicknesses.push(thick);
                    }
                }
            }
            paperWeightsFile.close();
        }
        
        if (names.length === 0) {
            var fallbacks = (currentLang === "ru") ? [
                { name: "300 гр. (0.35 мм)", t: 0.35 },
                { name: "200 гр. (0.23 мм)", t: 0.23 },
                { name: "150 гр. (0.17 мм)", t: 0.17 },
                { name: "0 гр. (0.0 мм)", t: 0.0 }
            ] : [
                { name: "300 g (0.35 mm)", t: 0.35 },
                { name: "200 g (0.23 mm)", t: 0.23 },
                { name: "150 g (0.17 mm)", t: 0.17 },
                { name: "0 g (0.0 mm)", t: 0.0 }
            ];
            for (var k = 0; k < fallbacks.length; k++) {
                names.push(fallbacks[k].name);
                thicknesses.push(fallbacks[k].t);
            }
        }
        paperWeightNames = names;
        paperWeightThicknesses = thicknesses;
    }

    loadPaperWeights();

    var langList = [
        { code: "ru", name: "Русский" },
        { code: "en", name: "English" },
        { code: "de", name: "Deutsch" },
        { code: "fr", name: "Français" },
        { code: "es", name: "Español" },
        { code: "it", name: "Italiano" },
        { code: "pt", name: "Português" },
        { code: "pl", name: "Polski" },
        { code: "zh", name: "中文 (简体)" },
        { code: "ja", name: "日本語" }
    ];

    function getCleanPresetName(file) {
        var rawName = file.name.replace(/\.[a-zA-Z0-9]+$/, "");
        try {
            return decodeURI(rawName);
        } catch(e) {
            return rawName;
        }
    }

    function getPresetFile(dir, presetName) {
        var file = new File(dir + "/" + presetName + ".txt");
        if (!file.exists) {
            file = new File(dir + "/" + encodeURI(presetName) + ".txt");
        }
        return file;
    }

    function showExampleDialog(impIdx) {
        var exampleFolderNames = ["SaddleStitch", "PerfectBound", "Consecutive", "CutStack", "StepAndRepeat"];
        var folderName = exampleFolderNames[impIdx] || "SaddleStitch";
        var t = translations[currentLang] || translations["en"];
        var targetSize = 550;
        
        var folder = new Folder(resourcesDir + "/Example/" + folderName);
        if (!folder.exists) {
            folder = new Folder(resourcesDir + "/Example_Preview/" + folderName);
        }
        
        var rawFiles = folder.exists ? folder.getFiles() : null;
        var files = [];
        if (rawFiles) {
            for (var i = 0; i < rawFiles.length; i++) {
                var f = rawFiles[i];
                if ((f instanceof File) && /\.(png|jpg|jpeg)$/i.test(f.name)) {
                    files.push(f);
                }
            }
        }
        
        if (!files || files.length === 0) {
            var origFolder = new Folder(resourcesDir + "/Example/" + folderName);
            var oFiles = origFolder.exists ? origFolder.getFiles() : null;
            if (oFiles) {
                for (var i = 0; i < oFiles.length; i++) {
                    if ((oFiles[i] instanceof File) && /\.(png|jpg|jpeg)$/i.test(oFiles[i].name)) {
                        files.push(oFiles[i]);
                    }
                }
            }
        }
        
        if (!files || files.length === 0) {
            for (var k = 0; k < exampleFolderNames.length; k++) {
                if (k === impIdx) continue;
                var checkF = new Folder(resourcesDir + "/Example/" + exampleFolderNames[k]);
                if (checkF.exists) {
                    var cFiles = checkF.getFiles();
                    if (cFiles && cFiles.length > 0) {
                        for (var cf = 0; cf < cFiles.length; cf++) {
                            if ((cFiles[cf] instanceof File) && /\.(png|jpg|jpeg)$/i.test(cFiles[cf].name)) {
                                showExampleDialog(k);
                                return;
                            }
                        }
                    }
                }
            }
            alert((t.alert_no_example || "No example images found in folder:\n") + folder.fsName);
            return;
        }
        
        files.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        
        var currentImgIdx = 0;
        var impTypeName = (t.imp_types && t.imp_types[impIdx]) ? t.imp_types[impIdx] : folderName;
        
        var dlg = new Window("dialog", (t.title_example || "Example") + " — " + impTypeName);
        dlg.orientation = "column";
        dlg.alignChildren = ["center", "top"];
        dlg.spacing = 10;
        
        var lblCounter = dlg.add("statictext", undefined, "");
        lblCounter.alignment = ["center", "center"];
        
        var imgGroup = dlg.add("group");
        imgGroup.alignment = ["center", "center"];
        
        var imgCtrl = imgGroup.add("image", undefined, files[0]);
        imgCtrl.preferredSize = [targetSize, targetSize];
        
        var ctrlGroup = dlg.add("group");
        ctrlGroup.orientation = "row";
        ctrlGroup.alignChildren = ["center", "center"];
        ctrlGroup.spacing = 15;
        
        var btnPrev = ctrlGroup.add("button", undefined, "◀");
        btnPrev.preferredSize = [50, 30];
        
        var btnNext = ctrlGroup.add("button", undefined, "▶");
        btnNext.preferredSize = [50, 30];
        
        var btnClose = ctrlGroup.add("button", undefined, t.btn_close || "Close");
        btnClose.preferredSize = [100, 30];
        
        function updateDisplay() {
            var f = files[currentImgIdx];
            imgCtrl.image = f;
            var cleanName = getCleanPresetName ? getCleanPresetName(f) : f.name;
            lblCounter.text = (currentImgIdx + 1) + " / " + files.length + " (" + cleanName + ")";
        }
        
        btnPrev.onClick = function() {
            currentImgIdx = (currentImgIdx - 1 + files.length) % files.length;
            updateDisplay();
        };
        
        btnNext.onClick = function() {
            currentImgIdx = (currentImgIdx + 1) % files.length;
            updateDisplay();
        };
        
        btnClose.onClick = function() {
            dlg.close();
        };
        
        updateDisplay();
        dlg.show();
    }

    function bezierCurveTo(g, X, Y, x0, y0, cx1, cy1, cx2, cy2, x3, y3) {
        var steps = 8;
        for (var i = 1; i <= steps; i++) {
            var t = i / steps;
            var u = 1 - t;
            var tt = t * t;
            var uu = u * u;
            var uuu = uu * u;
            var ttt = tt * t;

            var px = uuu * x0 + 3 * uu * t * cx1 + 3 * u * tt * cx2 + ttt * x3;
            var py = uuu * y0 + 3 * uu * t * cy1 + 3 * u * tt * cy2 + ttt * y3;
            g.lineTo(X(px), Y(py));
        }
    }

    function drawVectorDigit(g, digit, x, y, scale, digitW, pen) {
        var baseW = 100;
        var sx = digitW / baseW;
        var sy = scale;

        function X(v) { return x + v * sx; }
        function Y(v) { return y + v * sy; }

        g.newPath();

        switch (digit) {
            case "0":
                g.moveTo(X(50), Y(5));
                bezierCurveTo(g, X, Y, 50, 5, 20, 5, 5, 30, 5, 80);
                bezierCurveTo(g, X, Y, 5, 80, 5, 130, 20, 155, 50, 155);
                bezierCurveTo(g, X, Y, 50, 155, 80, 155, 95, 130, 95, 80);
                bezierCurveTo(g, X, Y, 95, 80, 95, 30, 80, 5, 50, 5);
                break;

            case "1":
                g.moveTo(X(25), Y(35));
                g.lineTo(X(50), Y(5));
                g.lineTo(X(50), Y(155));
                g.moveTo(X(25), Y(155));
                g.lineTo(X(75), Y(155));
                break;

            case "2":
                g.moveTo(X(10), Y(35));
                bezierCurveTo(g, X, Y, 10, 35, 15, 15, 30, 5, 50, 5);
                bezierCurveTo(g, X, Y, 50, 5, 80, 5, 95, 25, 95, 50);
                bezierCurveTo(g, X, Y, 95, 50, 95, 75, 80, 90, 60, 110);
                g.lineTo(X(10), Y(155));
                g.lineTo(X(95), Y(155));
                break;

            case "3":
                g.moveTo(X(10), Y(15));
                bezierCurveTo(g, X, Y, 10, 15, 25, 5, 45, 5, 60, 5);
                bezierCurveTo(g, X, Y, 60, 5, 90, 5, 95, 25, 95, 45);
                bezierCurveTo(g, X, Y, 95, 45, 95, 65, 80, 78, 60, 80);
                bezierCurveTo(g, X, Y, 60, 80, 80, 82, 95, 95, 95, 120);
                bezierCurveTo(g, X, Y, 95, 120, 95, 145, 80, 155, 50, 155);
                bezierCurveTo(g, X, Y, 50, 155, 30, 155, 15, 150, 5, 140);
                break;

            case "4":
                g.moveTo(X(70), Y(5));
                g.lineTo(X(10), Y(100));
                g.lineTo(X(95), Y(100));
                g.moveTo(X(70), Y(5));
                g.lineTo(X(70), Y(155));
                break;

            case "5":
                g.moveTo(X(90), Y(5));
                g.lineTo(X(20), Y(5));
                g.lineTo(X(10), Y(75));
                bezierCurveTo(g, X, Y, 10, 75, 25, 65, 40, 60, 55, 60);
                bezierCurveTo(g, X, Y, 55, 60, 85, 60, 95, 80, 95, 110);
                bezierCurveTo(g, X, Y, 95, 110, 95, 140, 75, 155, 50, 155);
                bezierCurveTo(g, X, Y, 50, 155, 30, 155, 15, 150, 5, 140);
                break;

            case "6":
                g.moveTo(X(80), Y(10));
                bezierCurveTo(g, X, Y, 80, 10, 60, 5, 35, 15, 20, 40);
                bezierCurveTo(g, X, Y, 20, 40, 5, 65, 5, 105, 20, 130);
                bezierCurveTo(g, X, Y, 20, 130, 35, 155, 65, 160, 85, 145);
                bezierCurveTo(g, X, Y, 85, 145, 100, 130, 100, 100, 85, 85);
                bezierCurveTo(g, X, Y, 85, 85, 70, 70, 45, 70, 25, 85);
                break;

            case "7":
                g.moveTo(X(5), Y(5));
                g.lineTo(X(95), Y(5));
                g.lineTo(X(40), Y(155));
                break;

            case "8":
                // Upper loop
                g.moveTo(X(50), Y(5));
                bezierCurveTo(g, X, Y, 50, 5, 20, 5, 8, 20, 8, 42);
                bezierCurveTo(g, X, Y, 8, 42, 8, 62, 22, 75, 50, 80);
                bezierCurveTo(g, X, Y, 50, 80, 78, 75, 92, 62, 92, 42);
                bezierCurveTo(g, X, Y, 92, 42, 92, 20, 80, 5, 50, 5);
                // Lower loop
                g.moveTo(X(50), Y(80));
                bezierCurveTo(g, X, Y, 50, 80, 20, 85, 8, 100, 8, 122);
                bezierCurveTo(g, X, Y, 8, 122, 8, 145, 22, 155, 50, 155);
                bezierCurveTo(g, X, Y, 50, 155, 78, 155, 92, 145, 92, 122);
                bezierCurveTo(g, X, Y, 92, 122, 92, 100, 80, 85, 50, 80);
                break;

            case "9":
                // Exact 180° inversion of digit "6"
                g.moveTo(X(20), Y(150));
                bezierCurveTo(g, X, Y, 20, 150, 40, 155, 65, 145, 80, 120);
                bezierCurveTo(g, X, Y, 80, 120, 95, 95, 95, 55, 80, 30);
                bezierCurveTo(g, X, Y, 80, 30, 65, 5, 35, 0, 15, 15);
                bezierCurveTo(g, X, Y, 15, 15, 0, 30, 0, 60, 15, 75);
                bezierCurveTo(g, X, Y, 15, 75, 30, 90, 55, 90, 75, 75);
                break;

            default:
                g.moveTo(X(15), Y(80));
                g.lineTo(X(85), Y(80));
                break;
        }

        g.strokePath(pen);
    }

    function drawVectorNumber(g, numberStr, cX, cY, cW, cH, isLandscape) {
        var str = String(numberStr);
        var numberHeight;
        var startX;
        var startY;

        var digitWidthRatio = 0.62;
        var spacingRatio = 0.12;

        if (isLandscape) {
            // Landscape: Right 52% of cell width, vertically centered
            numberHeight = Math.max(22, Math.min(80, cH * 0.52));
            var digitW = numberHeight * digitWidthRatio;
            var gap = numberHeight * spacingRatio;
            var totalWidth = str.length * digitW + (str.length - 1) * gap;

            var rLeft = cX + (cW * 0.44);
            var rWidth = cW * 0.52;
            startX = rLeft + (rWidth - totalWidth) / 2;
            startY = cY + (cH - numberHeight) / 2;
        } else {
            // Portrait: Centered horizontally, lower 32% of cell height
            numberHeight = Math.max(28, Math.min(85, cH * 0.28));
            var digitW = numberHeight * digitWidthRatio;
            var gap = numberHeight * spacingRatio;
            var totalWidth = str.length * digitW + (str.length - 1) * gap;

            startX = cX + (cW - totalWidth) / 2;
            startY = cY + (cH * 0.68);
        }

        var digitW = numberHeight * digitWidthRatio;
        var gap = numberHeight * spacingRatio;
        var scale = numberHeight / 160;

        var numPen = g.newPen(g.PenType.SOLID_COLOR, [0.05, 0.05, 0.05, 1], Math.max(2.5, Math.min(6.5, numberHeight * 0.08)));

        var currentX = startX;
        for (var i = 0; i < str.length; i++) {
            var digit = str.charAt(i);
            drawVectorDigit(g, digit, currentX, startY, scale, digitW, numPen);
            currentX += digitW + gap;
        }
    }

    function showPreviewDialog(params) {
        var t = translations[currentLang] || translations["en"];
        var sheetTitle = (params.sheetW ? (params.sheetW.toFixed(1) + " x " + params.sheetH.toFixed(1) + " " + params.unitStr) : "");
        var dlg = new Window("dialog", (t.btn_preview || "Preview") + " — " + sheetTitle);
        dlg.orientation = "column";
        dlg.alignChildren = ["center", "top"];
        dlg.spacing = 8;

        var totalPgs = params.docPgsCount || docPgsCount || 16;
        var cols = params.cols || 1;
        var rows = params.rows || 1;
        var impIdx = (params.impTypeSelectionIndex !== undefined) ? params.impTypeSelectionIndex : 0;
        var sheetsPerSig = params.sheetsPerSig || 0;

        var sequence;
        if (impIdx === 0 || impIdx === 1) { // Saddle Stitch or Perfect Bound
            sequence = generateSaddleStitchSequence(totalPgs, sheetsPerSig);
            cols = sequence.pagesAcross;
            rows = sequence.pagesDown;
        } else if (impIdx === 2) {
            sequence = generateConsecutiveSequence(totalPgs, cols, rows);
        } else if (impIdx === 3) {
            sequence = generateCutStackSequence(totalPgs, cols, rows);
        } else if (impIdx === 4) {
            sequence = generateStepAndRepeatSequence(totalPgs, cols, rows);
        } else {
            sequence = generateConsecutiveSequence(totalPgs, cols, rows);
        }

        var activeSheets = [];
        if (sequence && sequence.sheets) {
            for (var i = 0; i < sequence.sheets.length; i++) {
                var sh = sequence.sheets[i];
                var grid = sh.front || sh.back;
                var hasPgs = false;
                if (grid) {
                    for (var r = 0; r < grid.length; r++) {
                        for (var c = 0; c < grid[r].length; c++) {
                            if (grid[r][c] && grid[r][c].pageNum > 0 && grid[r][c].pageNum <= totalPgs) {
                                hasPgs = true;
                                break;
                            }
                        }
                        if (hasPgs) break;
                    }
                }
                if (hasPgs || i < 2) {
                    activeSheets.push(sh);
                }
            }
        }
        if (activeSheets.length === 0 && sequence && sequence.sheets) {
            activeSheets = sequence.sheets;
        }

        var currentSheetIdx = 0;

        var colsLabel = (t.lbl_cols || "Cols").replace(/:\s*$/, "");
        var infoHeader = dlg.add("statictext", undefined, 
            (t.pnl_sheet || "Sheet") + ": " + params.sheetW.toFixed(1) + " x " + params.sheetH.toFixed(1) + " " + params.unitStr + 
            "   |   " + (t.pnl_imp_area || "Imp. Area") + ": " + params.impW.toFixed(1) + " x " + params.impH.toFixed(1) + " " + params.unitStr +
            "   |   " + colsLabel + ": " + cols + " × " + rows
        );

        var canvasSize = 440;
        var canvasGroup = dlg.add("group");
        canvasGroup.preferredSize = [canvasSize, canvasSize];
        canvasGroup.size = [canvasSize, canvasSize];

        canvasGroup.onDraw = function () {
            var g = this.graphics;
            var w = canvasSize;
            var h = canvasSize;

            // 1. Clear Canvas BG
            g.newPath();
            var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.18, 0.18, 0.18, 1]);
            g.rectPath(0, 0, w, h);
            g.fillPath(bgBrush);

            var sheetW = params.sheetW || 1;
            var sheetH = params.sheetH || 1;
            var impW = params.impW || sheetW;
            var impH = params.impH || sheetH;

            var margin = 30;
            var maxW = w - (margin * 2);
            var maxH = h - (margin * 2);
            var scale = Math.min(maxW / sheetW, maxH / sheetH);

            var sW = sheetW * scale;
            var sH = sheetH * scale;
            var sX = (w - sW) / 2;
            var sY = (h - sH) / 2;

            // 2. Paper Shadow
            g.newPath();
            var shadowBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.08, 0.08, 0.08, 0.5]);
            g.rectPath(sX + 3, sY + 3, sW, sH);
            g.fillPath(shadowBrush);

            // 3. Paper Sheet (Pure White)
            g.newPath();
            var paperBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1.0, 1.0, 1.0, 1]);
            var paperPen = g.newPen(g.PenType.SOLID_COLOR, [0.4, 0.4, 0.4, 1], 1);
            g.rectPath(sX, sY, sW, sH);
            g.fillPath(paperBrush);
            g.strokePath(paperPen);

            // 4. Imposition Area Bounding Box (Cyan)
            var iW = impW * scale;
            var iH = impH * scale;
            var iX = sX + (sW - iW) / 2;
            var iY = sY + (sH - iH) / 2;

            g.newPath();
            var impPen = g.newPen(g.PenType.SOLID_COLOR, [0.0, 0.55, 0.85, 1], 1.5);
            g.rectPath(iX, iY, iW, iH);
            g.strokePath(impPen);

            // 5. Render Page Cells for active sheet side
            var sheetObj = activeSheets[currentSheetIdx] || (sequence ? sequence.sheets[0] : null);
            var grid = sheetObj ? (sheetObj.front || sheetObj.back) : null;
            var isBack = sheetObj ? sheetObj.isBack : false;

            var docW = params.docW || (impW / cols);
            var docH = params.docH || (impH / rows);
            var mLeft = params.mLeft || 0;
            var mTop = params.mTop || 0;
            var sHoriz = params.sHoriz || 0;
            var sVert = params.sVert || 0;

            var cellBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.90, 0.94, 1.0, 0.7]);
            var emptyCellBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.95, 0.95, 0.95, 0.4]);
            var cellPen = g.newPen(g.PenType.SOLID_COLOR, [0.25, 0.5, 0.85, 1], 1);
            var emptyTextPen = g.newPen(g.PenType.SOLID_COLOR, [0.65, 0.65, 0.65, 1], 1);

            var textPen = g.newPen(g.PenType.SOLID_COLOR, [0.05, 0.05, 0.05, 1], 1);
            var rotTextPen = g.newPen(g.PenType.SOLID_COLOR, [0.85, 0.25, 0.05, 1], 1);

            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    var cell = (grid && grid[r]) ? grid[r][c] : null;
                    var pageNum = cell ? cell.pageNum : 0;
                    var cellRotated = cell ? cell.rotated : false;
                    if (isBack && params.rotateBacks) {
                        cellRotated = !cellRotated;
                    }

                    var cX = iX + (mLeft + c * (docW + sHoriz)) * scale;
                    var cY = iY + (mTop + r * (docH + sVert)) * scale;
                    var cW = docW * scale;
                    var cH = docH * scale;

                    // 1. Draw Cell Background & Border
                    g.newPath();
                    g.rectPath(cX, cY, cW, cH);
                    if (pageNum > 0 && pageNum <= totalPgs) {
                        g.fillPath(cellBrush);
                    } else {
                        g.fillPath(emptyCellBrush);
                    }
                    g.strokePath(cellPen);

                    if (pageNum > 0 && pageNum <= totalPgs) {
                        var isLandscape = (cW > cH * 1.15);
                        var aThickness = Math.max(2.0, Math.min(4.5, (isLandscape ? cH : cW) * 0.035));
                        var aPen = g.newPen(g.PenType.SOLID_COLOR, [0.28, 0.35, 0.48, 0.9], aThickness);

                        if (isLandscape) {
                            // LANDSCAPE: Letter A in LEFT half (0% to 40% of cell width)
                            var tL = cX + (cW * 0.05);
                            var tR = cX + (cW * 0.39);
                            var tT = cY + (cH * 0.12);
                            var tB = cY + (cH * 0.88);

                            var apexX = (tL + tR) / 2;
                            var apexY = cellRotated ? tB : tT;
                            var bLeftX = tL;
                            var bLeftY = cellRotated ? tT : tB;
                            var bRightX = tR;
                            var bRightY = cellRotated ? tT : tB;

                            var crossY = !cellRotated ? (tT + (tB - tT) * 0.60) : (tT + (tB - tT) * 0.40);
                            var ratio = !cellRotated ? ((crossY - apexY) / (bLeftY - apexY)) : ((apexY - crossY) / (apexY - bLeftY));
                            var crossL = apexX + (bLeftX - apexX) * ratio;
                            var crossR = apexX + (bRightX - apexX) * ratio;

                            // Legs
                            g.newPath();
                            g.moveTo(bLeftX, bLeftY);
                            g.lineTo(apexX, apexY);
                            g.lineTo(bRightX, bRightY);
                            g.strokePath(aPen);

                            // Crossbar
                            g.newPath();
                            g.moveTo(crossL, crossY);
                            g.lineTo(crossR, crossY);
                            g.strokePath(aPen);
                        } else {
                            // PORTRAIT: Letter A in TOP half (0% to 60% of cell height)
                            var padW = cW * 0.12;
                            var padH = cH * 0.08;
                            var tL = cX + padW;
                            var tR = cX + cW - padW;
                            var tT = cY + padH;
                            var tB = cY + (cH * 0.60);

                            var apexX = cX + cW / 2;
                            var apexY = cellRotated ? tB : tT;
                            var bLeftX = tL;
                            var bLeftY = cellRotated ? tT : tB;
                            var bRightX = tR;
                            var bRightY = cellRotated ? tT : tB;

                            var crossY = !cellRotated ? (tT + (tB - tT) * 0.60) : (tT + (tB - tT) * 0.40);
                            var ratio = !cellRotated ? ((crossY - apexY) / (bLeftY - apexY)) : ((apexY - crossY) / (apexY - bLeftY));
                            var crossL = apexX + (bLeftX - apexX) * ratio;
                            var crossR = apexX + (bRightX - apexX) * ratio;

                            // Legs
                            g.newPath();
                            g.moveTo(bLeftX, bLeftY);
                            g.lineTo(apexX, apexY);
                            g.lineTo(bRightX, bRightY);
                            g.strokePath(aPen);

                            // Crossbar
                            g.newPath();
                            g.moveTo(crossL, crossY);
                            g.lineTo(crossR, crossY);
                            g.strokePath(aPen);
                        }

                        // 3. Vector Page Number (In Right Half for Landscape, Lower Section for Portrait)
                        var numStr = pageNum.toString();
                        drawVectorNumber(g, numStr, cX, cY, cW, cH, isLandscape);
                    } else {
                        var isLandscape = (cW > cH * 1.15);
                        drawVectorNumber(g, "-", cX, cY, cW, cH, isLandscape);
                    }
                }
            }
        };

        // Navigation Controls
        var navGroup = dlg.add("group");
        navGroup.orientation = "row";
        navGroup.alignChildren = ["center", "center"];
        navGroup.spacing = 15;

        var btnPrevSheet = navGroup.add("button", undefined, "◀");
        btnPrevSheet.preferredSize = [45, 28];

        var lblSheetNav = navGroup.add("statictext", undefined, "");
        lblSheetNav.preferredSize.width = 350;
        lblSheetNav.justify = "center";

        var btnNextSheet = navGroup.add("button", undefined, "▶");
        btnNextSheet.preferredSize = [45, 28];

        function updateNav() {
            var curSheet = activeSheets[currentSheetIdx];
            var isBackSide = (curSheet && curSheet.isBack);
            var sideNum = isBackSide ? 2 : 1;
            var sideNameStr = isBackSide ? (t.lbl_back || "Back") : (t.lbl_front || "Front");
            var sheetNum = Math.floor(currentSheetIdx / 2) + 1;
            var totalSheetsCount = Math.ceil(activeSheets.length / 2);

            var sheetLabelStr = t.lbl_sheet_nav || t.pnl_sheet || "Sheet";
            var ofStr = t.lbl_of || "of";
            var sideLabelStr = t.lbl_side || "Side";

            lblSheetNav.text = sheetLabelStr + " " + sheetNum + " " + ofStr + " " + totalSheetsCount + "  —  " + sideLabelStr + " " + sideNum + " (" + sideNameStr + ")";
            btnPrevSheet.enabled = (currentSheetIdx > 0);
            btnNextSheet.enabled = (currentSheetIdx < activeSheets.length - 1);
        }

        btnPrevSheet.onClick = function () {
            if (currentSheetIdx > 0) {
                currentSheetIdx--;
                updateNav();
                canvasGroup.hide();
                canvasGroup.show();
            }
        };

        btnNextSheet.onClick = function () {
            if (currentSheetIdx < activeSheets.length - 1) {
                currentSheetIdx++;
                updateNav();
                canvasGroup.hide();
                canvasGroup.show();
            }
        };

        updateNav();

        var btnClose = dlg.add("button", undefined, t.btn_close || "Close");
        btnClose.preferredSize = [100, 30];
        btnClose.onClick = function () {
            dlg.close();
        };

        dlg.show();
    }

    var presetsDir = new Folder(resourcesDir + "/Data/Presets");
    if (!presetsDir.exists) {
        presetsDir.create();
    }
    var presetFiles = presetsDir.getFiles("*.txt");
    var presetNames = [];
    for (var pIdx = 0; pIdx < presetFiles.length; pIdx++) {
        var pName = getCleanPresetName(presetFiles[pIdx]);
        presetNames.push(pName);
    }

    // ----------------------------------------------------
    // BUILD USER INTERFACE (ScriptUI)
    // ----------------------------------------------------
    uiLabels = {};

    var win = new Window("dialog", translations[currentLang].title || "PDF QuickImpose — Imposition");
    win.alignChildren = "fill";
    
    var headerGroup = win.add("group");
    headerGroup.orientation = "row";
    headerGroup.alignChildren = ["fill", "center"];
    
    var infoText = translations[currentLang].file + docName + " (" + docPgsCount + translations[currentLang].pages + ")   |   " + translations[currentLang].size + docWidth.toFixed(1) + " x " + docHeight.toFixed(1) + " " + defaultUnitStr + " (" + translations[currentLang].bleeds + bleedLeft.toFixed(1) + ")";
    var txtDocInfo = headerGroup.add("statictext", undefined, infoText);
    txtDocInfo.alignment = ["left", "center"];
    
    var grpLang = headerGroup.add("group");
    grpLang.alignment = ["right", "center"];
    uiLabels.lblLang = grpLang.add("statictext", undefined, translations[currentLang].lbl_lang);
    
    var langDropdownNames = [];
    for (var l = 0; l < langList.length; l++) {
        langDropdownNames.push(langList[l].name);
    }
    var langDropdown = grpLang.add("dropdownlist", undefined, langDropdownNames);
    
    var defaultLangIdx = 1;
    for (var l = 0; l < langList.length; l++) {
        if (langList[l].code === currentLang) {
            defaultLangIdx = l;
            break;
        }
    }
    langDropdown.selection = defaultLangIdx;

    var mainGroup = win.add("group");
    mainGroup.orientation = "row";
    mainGroup.alignChildren = ["fill", "top"];
    mainGroup.spacing = 15;
    
    var leftCol = mainGroup.add("group");
    leftCol.orientation = "column";
    leftCol.alignChildren = "fill";
    leftCol.spacing = 10;
    leftCol.preferredSize.width = 380;
    
    var rightCol = mainGroup.add("group");
    rightCol.orientation = "column";
    rightCol.alignChildren = "fill";
    rightCol.spacing = 10;
    rightCol.preferredSize.width = 380;

    // --- LEFT COLUMN PANELS ---
    var pnlTypeUnits = leftCol.add("panel", undefined, "Imposition & Units / Спуск и Единицы                                ");
    pnlTypeUnits.alignChildren = "fill";
    
    var grpImpType = pnlTypeUnits.add("group");
    grpImpType.orientation = "row";
    grpImpType.alignChildren = ["fill", "center"];
    var impTypeDropdown = grpImpType.add("dropdownlist", undefined, translations[currentLang].imp_types);
    impTypeDropdown.preferredSize.width = 195;
    impTypeDropdown.selection = 0;
    
    var btnExample = grpImpType.add("button", undefined, translations[currentLang].btn_example || "Пример");
    btnExample.preferredSize.width = 68;
    btnExample.alignment = ["right", "center"];
    btnExample.onClick = function() {
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        showExampleDialog(selIdx);
    };

    var btnPreview = grpImpType.add("button", undefined, translations[currentLang].btn_preview || "Схема");
    btnPreview.preferredSize.width = 68;
    btnPreview.alignment = ["right", "center"];
    btnPreview.onClick = function() {
        var params = collectUIParameters();
        params.sheetW = parseFloat(editSheetWidth.text) || docWidth;
        params.sheetH = parseFloat(editSheetHeight.text) || docHeight;
        params.impW = parseFloat(editImpAreaWidth.text) || docWidth;
        params.impH = parseFloat(editImpAreaHeight.text) || docHeight;
        params.cols = parseInt(editCols.text, 10) || 1;
        params.rows = parseInt(editRows.text, 10) || 1;
        params.docW = docWidth;
        params.docH = docHeight;
        params.mLeft = parseFloat(editMarginLeft.text) || 0;
        params.mTop = parseFloat(editMarginTop.text) || 0;
        params.mRight = parseFloat(editMarginRight.text) || 0;
        params.mBottom = parseFloat(editMarginBottom.text) || 0;
        params.sHoriz = parseFloat(editSpacingHoriz.text) || 0;
        params.sVert = parseFloat(editSpacingVert.text) || 0;
        params.unitStr = unitsDropdown.selection.text;
        showPreviewDialog(params);
    };
    
    var grpUnits = pnlTypeUnits.add("group");
    grpUnits.spacing = 5;
    uiLabels.units = grpUnits.add("statictext", undefined, translations[currentLang].lbl_units);
    uiLabels.units.characters = 7;
    var unitsDropdown = grpUnits.add("dropdownlist", undefined, ["mm", "pt", "in"]);
    unitsDropdown.preferredSize.width = 50;
    var defaultUnitsIndex = (currentUnit === "pt" ? 1 : (currentUnit === "in" ? 2 : 0));
    unitsDropdown.selection = defaultUnitsIndex;
    
    var chkRotateBacks = grpUnits.add("checkbox", undefined, translations[currentLang].chk_rotate_backs);
    chkRotateBacks.preferredSize.width = 146;
    chkRotateBacks.value = false;
    
    var chkInfoSlug = grpUnits.add("checkbox", undefined, translations[currentLang].chk_info_slug);
    chkInfoSlug.preferredSize.width = 60;
    chkInfoSlug.value = true;
    chkInfoSlug.helpTip = translations[currentLang].tip_info_slug;
    
    var editSlugFontSize = grpUnits.add("edittext", undefined, "7");
    editSlugFontSize.preferredSize.width = 22;
    editSlugFontSize.helpTip = translations[currentLang].tip_slug_font_size;
    
    var pnlGrid = leftCol.add("panel", undefined, "Grid Parameters / Параметры сетки спуска                                ");
    pnlGrid.alignChildren = "left";
    
    var editCols = addLabelAndEdit(pnlGrid, translations[currentLang].lbl_cols, "2", 5, "cols");
    var editRows = addLabelAndEdit(pnlGrid, translations[currentLang].lbl_rows, "1", 5, "rows");
    editCols.enabled = false;
    editRows.enabled = false;
    
    var pnlMargins = leftCol.add("panel", undefined, "Margins of Imposition Area / Поля области спуска                        ");
    pnlMargins.alignChildren = "fill";
    var grpMarg1 = pnlMargins.add("group");
    var editMarginLeft = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_left, bleedLeft.toFixed(1), 5, "marginLeft");
    var editMarginTop = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_top, bleedTop.toFixed(1), 5, "marginTop");
    var grpMarg2 = pnlMargins.add("group");
    var editMarginRight = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_right, bleedRight.toFixed(1), 5, "marginRight");
    var editMarginBottom = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_bottom, bleedBottom.toFixed(1), 5, "marginBottom");
    
    var pnlSpacing = leftCol.add("panel", undefined, "Spacings (Gaps) / Зазоры и распорки                                     ");
    pnlSpacing.alignChildren = "fill";
    var grpSpc = pnlSpacing.add("group");
    var editSpacingHoriz = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_horiz, "0.0", 5, "spacingHoriz");
    var editSpacingVert = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_vert, "0.0", 5, "spacingVert");
    
    var pnlImpArea = leftCol.add("panel", undefined, "Imposition Area Size / Размер области спуска                           ");
    pnlImpArea.alignChildren = "fill";
    var grpImpArea = pnlImpArea.add("group");
    var editImpAreaWidth = addLabelAndEditInline(grpImpArea, translations[currentLang].lbl_imp_width, "0", 5, "impAreaWidth");
    var editImpAreaHeight = addLabelAndEditInline(grpImpArea, translations[currentLang].lbl_imp_height, "0", 5, "impAreaHeight");
    editImpAreaWidth.enabled = false;
    editImpAreaHeight.enabled = false;
    
    var grpResetTrim = pnlImpArea.add("group");
    grpResetTrim.orientation = "column";
    grpResetTrim.alignChildren = "left";
    grpResetTrim.spacing = 2;
    var chkResetTrimBleed = grpResetTrim.add("checkbox", undefined, translations[currentLang].chk_reset_trim_bleed || "Reset Trim + Bleed");
    chkResetTrimBleed.value = false;
    var lblResetInfo = grpResetTrim.add("statictext", undefined, "");
    lblResetInfo.characters = 25;
    chkResetTrimBleed.onClick = updateSheetSize;
    
    var pnlSheet = leftCol.add("panel", undefined, "Print Sheet Size / Размер печатного листа                             ");
    pnlSheet.alignChildren = "fill";
    
    var grpSheetDropdown = pnlSheet.add("group");
    grpSheetDropdown.spacing = 5;
    uiLabels.sheetFormat = grpSheetDropdown.add("statictext", undefined, translations[currentLang].lbl_sheet_format);
    var sheetDropdown = grpSheetDropdown.add("dropdownlist", undefined, paperNames);
    sheetDropdown.selection = 0;
    sheetDropdown.preferredSize.width = 152;
    
    var btnEditPaperSizes = grpSheetDropdown.add("button", undefined, "\uD83D\uDCC4");
    btnEditPaperSizes.preferredSize = [22, 22];
    btnEditPaperSizes.helpTip = "Редактировать список форматов бумаги";
    btnEditPaperSizes.onClick = function() {
        var filename = (unitsDropdown.selection.text === "in") ? "PaperSizes_in.txt" : "PaperSizes.txt";
        var paperSizesFile = new File(resourcesDir + "/Data/" + filename);
        if (paperSizesFile.exists) {
            paperSizesFile.execute();
        } else {
            alert(translations[currentLang].alert_file_not_found + paperSizesFile.fsName);
        }
    };
    
    uiLabels.sheetOrient = grpSheetDropdown.add("statictext", undefined, translations[currentLang].lbl_sheet_orient);
    var orientationDropdown = grpSheetDropdown.add("dropdownlist", undefined, [translations[currentLang].orient_horiz, translations[currentLang].orient_vert]);
    orientationDropdown.selection = 0;
    orientationDropdown.preferredSize.width = 72;
    orientationDropdown.enabled = false;
    
    var grpSheetCustom = pnlSheet.add("group");
    var editSheetWidth = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_width, "0", 5, "sheetWidth");
    var editSheetHeight = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_height, "0", 5, "sheetHeight");
    editSheetWidth.enabled = false;
    editSheetHeight.enabled = false;

    // --- RIGHT COLUMN PANELS ---
    var pnlPresets = rightCol.add("panel", undefined, "Settings & Presets / Настройки и пресеты                                ");
    pnlPresets.alignChildren = "fill";
    
    var chkLoadLast = pnlPresets.add("checkbox", undefined, translations[currentLang].chk_load_last);
    chkLoadLast.value = true;
    
    var grpSavePreset = pnlPresets.add("group");
    uiLabels.savePreset = grpSavePreset.add("statictext", undefined, translations[currentLang].lbl_preset_save);
    uiLabels.savePreset.characters = 8;
    var editSaveName = grpSavePreset.add("edittext", undefined, "");
    editSaveName.preferredSize.width = 130;
    var btnSavePreset = grpSavePreset.add("button", undefined, translations[currentLang].btn_preset_save);
    btnSavePreset.preferredSize.width = 80;
    
    var grpLoadPreset = pnlPresets.add("group");
    uiLabels.loadPreset = grpLoadPreset.add("statictext", undefined, translations[currentLang].lbl_preset_load);
    uiLabels.loadPreset.characters = 8;
    var loadDropdown = grpLoadPreset.add("dropdownlist", undefined, presetNames);
    loadDropdown.preferredSize.width = 110;
    if (presetNames.length > 0) loadDropdown.selection = 0;
    var btnLoadPreset = grpLoadPreset.add("button", undefined, translations[currentLang].btn_preset_load);
    btnLoadPreset.preferredSize.width = 70;
    var btnDeletePreset = grpLoadPreset.add("button", undefined, "\uD83D\uDDD1");
    btnDeletePreset.preferredSize = [26, 24];
    btnDeletePreset.helpTip = translations[currentLang].tip_preset_delete || "Удалить выбранный пресет";

    var pnlCreep = rightCol.add("panel", undefined, "Creep Shift / Сползание фальцовки                                      ");
    pnlCreep.alignChildren = "fill";
    
    var chkEnableCreep = pnlCreep.add("checkbox", undefined, translations[currentLang].chk_enable_creep);
    chkEnableCreep.value = true;
    
    var grpCompensate = pnlCreep.add("group");
    grpCompensate.orientation = "row";
    var chkCompensateThickness = grpCompensate.add("checkbox", undefined, translations[currentLang].chk_compensate_thickness || "Thickness Compensation");
    chkCompensateThickness.value = false;
    var editCompensateCoeff = grpCompensate.add("edittext", undefined, "1.0");
    editCompensateCoeff.preferredSize.width = 35;
    editCompensateCoeff.helpTip = translations[currentLang].tip_compensate_thickness || "Thickness compensation coefficient (K)";
    
    var editSheetsPerSig = addLabelAndEdit(pnlCreep, translations[currentLang].lbl_sheets_per_sig, "0", 5, "sheetsPerSig");
    
    var grpCover = pnlCreep.add("group");
    grpCover.orientation = "row";
    uiLabels.lblCover = grpCover.add("statictext", undefined, translations[currentLang].lbl_cover);
    uiLabels.lblCover.characters = 12;
    var coverDropdown = grpCover.add("dropdownlist", undefined, paperWeightNames);
    coverDropdown.selection = 0;
    coverDropdown.preferredSize.width = 150;
    
    var grpBlock = pnlCreep.add("group");
    grpBlock.orientation = "row";
    uiLabels.lblBlock = grpBlock.add("statictext", undefined, translations[currentLang].lbl_block);
    uiLabels.lblBlock.characters = 12;
    var blockDropdown = grpBlock.add("dropdownlist", undefined, paperWeightNames);
    blockDropdown.selection = 1;
    blockDropdown.preferredSize.width = 150;
    
    var btnEditPaperWeights = grpBlock.add("button", undefined, "\uD83D\uDCC4");
    btnEditPaperWeights.preferredSize = [22, 22];
    btnEditPaperWeights.helpTip = "Редактировать список плотностей бумаги";
    btnEditPaperWeights.onClick = function() {
        var paperWeightsFile = new File(resourcesDir + "/Data/PaperWeights.txt");
        if (paperWeightsFile.exists) {
            paperWeightsFile.execute();
        } else {
            alert(translations[currentLang].alert_file_not_found + paperWeightsFile.fsName);
        }
    };
    
    var grpCreepDir = pnlCreep.add("group");
    grpCreepDir.orientation = "row";
    uiLabels.lblCreepDir = grpCreepDir.add("statictext", undefined, translations[currentLang].lbl_creep_dir);
    uiLabels.lblCreepDir.characters = 12;
    var creepDirDropdown = grpCreepDir.add("dropdownlist", undefined, translations[currentLang].creep_dir_options);
    creepDirDropdown.selection = 0;
    creepDirDropdown.preferredSize.width = 150;
    
    var grpCreepVals = pnlCreep.add("group");
    var editCreepOuter = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_outer, "0.0", 5, "creepOuter");
    var editCreepInner = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_inner, "0.6", 5, "creepInner");
    
    var pnlBleedOpts = rightCol.add("panel", undefined, "Bleed Options / Параметры вылетов                                      ");
    pnlBleedOpts.alignChildren = "fill";
    var chkUseBleed = pnlBleedOpts.add("checkbox", undefined, translations[currentLang].chk_use_bleed);
    chkUseBleed.value = true;
    
    var grpBleeds = pnlBleedOpts.add("group");
    var editBleedVal = addLabelAndEditInline(grpBleeds, translations[currentLang].lbl_custom_bleed, bleedLeft.toFixed(1), 5, "customBleed");
    editBleedVal.enabled = false;

    function syncMarginsWithDocBleed() {
        if (!chkUseBleed || !chkUseBleed.value) return;
        var activeUnit = (unitsDropdown && unitsDropdown.selection) ? unitsDropdown.selection.text : currentUnit;
        var bL = convertUnits(bleedLeft, currentUnit, activeUnit);
        var bT = convertUnits(bleedTop, currentUnit, activeUnit);
        var bR = convertUnits(bleedRight, currentUnit, activeUnit);
        var bB = convertUnits(bleedBottom, currentUnit, activeUnit);
        
        var decimals = getDecimalsForUnit(activeUnit);
        editMarginLeft.text = bL.toFixed(decimals);
        editMarginTop.text = bT.toFixed(decimals);
        editMarginRight.text = bR.toFixed(decimals);
        editMarginBottom.text = bB.toFixed(decimals);
    }
    
    chkUseBleed.onClick = function() {
        editBleedVal.enabled = !chkUseBleed.value;
        if (chkUseBleed.value) {
            syncMarginsWithDocBleed();
        }
        updateSheetSize();
    };
    editBleedVal.onChange = updateSheetSize;
    
    var pnlMarks = rightCol.add("panel", undefined, "Crop Marks / Метки реза                                               ");
    pnlMarks.alignChildren = "fill";
    var chkMarksOn = pnlMarks.add("checkbox", undefined, translations[currentLang].chk_marks_on);
    chkMarksOn.value = true;
    
    var chkDrawCenterMark = pnlMarks.add("checkbox", undefined, translations[currentLang].chk_center_mark || "Center (fold line)");
    chkDrawCenterMark.value = false;
    
    var grpMarks = pnlMarks.add("group");
    var editMarkLength = addLabelAndEditInline(grpMarks, translations[currentLang].lbl_mark_length, "3.0", 5, "markLength");
    var editMarkOffset = addLabelAndEditInline(grpMarks, translations[currentLang].lbl_mark_offset, "3.0", 5, "markOffset");
    editMarkLength.enabled = true;
    editMarkOffset.enabled = true;
    chkDrawCenterMark.enabled = true;
    
    chkMarksOn.onClick = function() {
        var state = chkMarksOn.value;
        editMarkLength.enabled = state;
        editMarkOffset.enabled = state;
        chkDrawCenterMark.enabled = state;
    };

    function openURL(url) {
        try {
            var tempFile = new File(Folder.temp + "/imposition_redirect.html");
            tempFile.open("w");
            tempFile.write('<html><head><title>Redirecting...</title><script>window.location.replace("' + url + '");</script></head><body></body></html>');
            tempFile.close();
            tempFile.execute();
        } catch(e) {}
    }
    
    function makeHyperlink(parent, labelText, url) {
        var link = parent.add("statictext", undefined, labelText);
        link.preferredSize.height = 16;
        link.justify = "left";
        link.onDraw = function() {
            var g = this.graphics;
            var textPen = g.newPen(g.PenType.SOLID_COLOR, [0.75, 0.745, 0.75, 1], 1);
            var h = this.size.height || this.size[1];
            var textDim = g.measureString(this.text, g.font);
            var y = Math.max(0, (h - textDim.height) / 2);
            g.drawString(this.text, textPen, 0, y, g.font);
        };
        link.addEventListener("click", function() {
            openURL(url);
        });
        return link;
    }
    
    var footerGroup = win.add("group");
    footerGroup.orientation = "row";
    footerGroup.alignment = ["fill", "bottom"];
    footerGroup.alignChildren = ["fill", "bottom"];
    
    var leftFooter = footerGroup.add("group");
    leftFooter.orientation = "column";
    leftFooter.alignment = ["left", "bottom"];
    leftFooter.alignChildren = ["left", "bottom"];
    leftFooter.spacing = 6;
    
    uiLabels.lblAuthorLink = makeHyperlink(leftFooter, translations[currentLang].lbl_author_link, "https://github.com/SaidAuita/QuickImpose-InDesign");
    uiLabels.lblMoreScripts = makeHyperlink(leftFooter, translations[currentLang].lbl_more_scripts, "http://ph-cu-s.com/tools");
    
    var rightFooter = footerGroup.add("group");
    rightFooter.alignment = ["right", "bottom"];
    rightFooter.spacing = 10;
    
    var btnCancel = rightFooter.add("button", undefined, translations[currentLang].btn_cancel, {name: "cancel"});
    var btnImpose = rightFooter.add("button", undefined, translations[currentLang].btn_impose, {name: "ok"});
    
    // --- REACTIVE EVENTS & SHEET CALCULATION ---
    function updateSheetSize() {
        var cols = parseInt(editCols.text, 10) || 1;
        var rows = parseInt(editRows.text, 10) || 1;
        var w = parseFloat(docWidth) || 0;
        var h = parseFloat(docHeight) || 0;
        var mLeft = parseFloat(editMarginLeft.text) || 0;
        var mTop = parseFloat(editMarginTop.text) || 0;
        var mRight = parseFloat(editMarginRight.text) || 0;
        var mBottom = parseFloat(editMarginBottom.text) || 0;
        var sHoriz = parseFloat(editSpacingHoriz.text) || 0;
        var sVert = parseFloat(editSpacingVert.text) || 0;
        
        var bL = 0, bR = 0, bT = 0, bB = 0;
        if (chkUseBleed.value) {
            var activeUnit = (unitsDropdown && unitsDropdown.selection) ? unitsDropdown.selection.text : currentUnit;
            bL = convertUnits(bleedLeft, currentUnit, activeUnit);
            bR = convertUnits(bleedRight, currentUnit, activeUnit);
            bT = convertUnits(bleedTop, currentUnit, activeUnit);
            bB = convertUnits(bleedBottom, currentUnit, activeUnit);
        } else {
            var val = parseFloat(editBleedVal.text) || 0;
            bL = val;
            bR = val;
            bT = val;
            bB = val;
        }
        
        var impTypeIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        var actualSHoriz = sHoriz;
        var actualSVert = sVert;
        if (impTypeIdx !== 0 && impTypeIdx !== 1) {
            actualSHoriz += (bL + bR);
            actualSVert += (bT + bB);
        }
        
        var impW = mLeft + mRight + cols * w + (cols - 1) * actualSHoriz;
        var impH = mTop + mBottom + rows * h + (rows - 1) * actualSVert;
        
        editImpAreaWidth.text = impW.toFixed(2);
        editImpAreaHeight.text = impH.toFixed(2);
        
        if (sheetDropdown.selection && sheetDropdown.selection.index === 0) {
            editSheetWidth.text = impW.toFixed(2);
            editSheetHeight.text = impH.toFixed(2);
        }
        
        if (typeof chkResetTrimBleed !== "undefined" && typeof lblResetInfo !== "undefined") {
            var trimW = impW - (bL + bR);
            var trimH = impH - (bT + bB);
            var bleedX = bL + bR;
            var bleedY = bT + bB;
            
            var resetLabelText = (currentLang === "ru") ? "Сброс: " : "Reset: ";
            lblResetInfo.text = resetLabelText + trimW.toFixed(1) + "+" + bleedX.toFixed(1) + " / " + trimH.toFixed(1) + "+" + bleedY.toFixed(1);
        }
    }
    
    function getBlockLabelText(count, lang) {
        if (lang === "ru") {
            var word = "листов";
            var lastDigit = count % 10;
            var lastTwoDigits = count % 100;
            if (lastDigit === 1 && lastTwoDigits !== 11) {
                word = "лист";
            } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
                word = "листа";
            }
            return "Блок (" + count + " " + word + "):";
        } else {
            var word = count === 1 ? "sheet" : "sheets";
            return "Block (" + count + " " + word + "):";
        }
    }

    function updateBlockLabel() {
        if (!uiLabels.lblBlock) return;
        var paddedPages = Math.ceil(docPgsCount / 4) * 4;
        var sheetsPerSigVal = parseInt(editSheetsPerSig.text, 10) || 0;
        var N = (sheetsPerSigVal > 0) ? sheetsPerSigVal : (paddedPages / 4);
        var blockSheets = Math.max(0, N - 1);
        uiLabels.lblBlock.text = getBlockLabelText(blockSheets, currentLang);
    }

    function toggleCreepPanel() {
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        var isSaddleStitch = (selIdx === 0);
        var isPerfectBound = (selIdx === 1);
        
        chkEnableCreep.enabled = isSaddleStitch;
        
        var state = isSaddleStitch && chkEnableCreep.value;
        
        editSheetsPerSig.enabled = state || isPerfectBound;
        if (uiLabels.lblSheetsPerSig) {
            uiLabels.lblSheetsPerSig.enabled = state || isPerfectBound;
        }
        
        coverDropdown.enabled = state;
        blockDropdown.enabled = state;
        creepDirDropdown.enabled = state;
        btnEditPaperWeights.enabled = state;
        chkCompensateThickness.enabled = state;
        editCompensateCoeff.enabled = state && chkCompensateThickness.value;
        editCreepOuter.enabled = state;
        editCreepInner.enabled = state;
        
        if (state) {
            updateCreepValues();
        } else {
            editCreepOuter.text = "0.0";
            editCreepInner.text = "0.0";
        }
    }
    
    function toggleResetTrimBleed() {
        var isSaddleStitch = (impTypeDropdown.selection && impTypeDropdown.selection.index === 0);
        chkResetTrimBleed.enabled = isSaddleStitch;
        if (!isSaddleStitch) {
            chkResetTrimBleed.value = false;
        }
    }

    function updateCreepValues() {
        updateBlockLabel();
        if (isApplyingParams) return;
        var isSaddleStitch = (impTypeDropdown.selection && impTypeDropdown.selection.index === 0);
        if (!isSaddleStitch || !chkEnableCreep.value) {
            editCreepInner.text = "0.0";
            editCreepOuter.text = "0.0";
            return;
        }
        if (!coverDropdown.selection || !blockDropdown.selection || !creepDirDropdown.selection) return;
        
        var tCover = paperWeightThicknesses[coverDropdown.selection.index];
        var tBlock = paperWeightThicknesses[blockDropdown.selection.index];
        var isInwards = (creepDirDropdown.selection.index === 0);
        
        var paddedPages = Math.ceil(docPgsCount / 4) * 4;
        var sheetsPerSigVal = parseInt(editSheetsPerSig.text, 10) || 0;
        var N = (sheetsPerSigVal > 0) ? sheetsPerSigVal : (paddedPages / 4);
        
        var creepVal = 0;
        if (N > 1) {
            creepVal = tCover + (N - 1) * tBlock;
        }
        
        var activeUnit = unitsDropdown.selection.text;
        var convertedCreep = convertUnits(creepVal, "mm", activeUnit);
        var decimals = getDecimalsForUnit(activeUnit);
        
        if (isInwards) {
            if (chkCompensateThickness.value) {
                var K = parseFloat(editCompensateCoeff.text);
                if (isNaN(K)) K = 1.0;
                var offsetMax = (convertedCreep / 2) * K;
                editCreepInner.text = convertedCreep.toFixed(decimals);
                editCreepOuter.text = (-offsetMax).toFixed(decimals);
            } else {
                editCreepInner.text = convertedCreep.toFixed(decimals);
                editCreepOuter.text = (0.0).toFixed(decimals);
            }
        } else {
            if (chkCompensateThickness.value) {
                var K = parseFloat(editCompensateCoeff.text);
                if (isNaN(K)) K = 1.0;
                var offsetMax = (convertedCreep / 2) * K;
                editCreepInner.text = offsetMax.toFixed(decimals);
                editCreepOuter.text = (-convertedCreep).toFixed(decimals);
            } else {
                editCreepInner.text = (0.0).toFixed(decimals);
                editCreepOuter.text = (-convertedCreep).toFixed(decimals);
            }
        }
    }
    
    var list = [editCols, editRows, editMarginLeft, editMarginTop, editMarginRight, editMarginBottom, editSpacingHoriz, editSpacingVert];
    for (var j = 0; j < list.length; j++) {
        list[j].onChange = updateSheetSize;
    }
    
    chkEnableCreep.onClick = toggleCreepPanel;
    chkCompensateThickness.onClick = function() {
        editCompensateCoeff.enabled = chkEnableCreep.value && chkCompensateThickness.value;
        updateCreepValues();
    };
    editCompensateCoeff.onChange = updateCreepValues;
    coverDropdown.onChange = updateCreepValues;
    blockDropdown.onChange = updateCreepValues;
    creepDirDropdown.onChange = updateCreepValues;
    editSheetsPerSig.onChange = function() {
        updateCreepValues();
        updateSheetSize();
    };
    
    function updateFinalSheetSizeFromSelection() {
        if (!sheetDropdown.selection) return;
        var idx = sheetDropdown.selection.index;
        var paper = paperSizes[idx];
        
        if (paper.w === 0) {
            editSheetWidth.text = editImpAreaWidth.text;
            editSheetHeight.text = editImpAreaHeight.text;
            editSheetWidth.enabled = false;
            editSheetHeight.enabled = false;
            orientationDropdown.enabled = false;
        } else if (paper.w === -1) {
            editSheetWidth.enabled = true;
            editSheetHeight.enabled = true;
            orientationDropdown.enabled = true;
        } else {
            orientationDropdown.enabled = true;
            var currentUnit = unitsDropdown.selection.text;
            
            var fileUnit = (currentUnit === "in") ? "in" : "mm";
            var wConverted = convertUnits(paper.w, fileUnit, currentUnit);
            var hConverted = convertUnits(paper.h, fileUnit, currentUnit);
            
            var isHoriz = (orientationDropdown.selection.index === 0);
            var finalW = isHoriz ? Math.max(wConverted, hConverted) : Math.min(wConverted, hConverted);
            var finalH = isHoriz ? Math.min(wConverted, hConverted) : Math.max(wConverted, hConverted);
            
            editSheetWidth.text = finalW.toFixed(2);
            editSheetHeight.text = finalH.toFixed(2);
            editSheetWidth.enabled = false;
            editSheetHeight.enabled = false;
        }
    }
    
    sheetDropdown.onChange = updateFinalSheetSizeFromSelection;
    orientationDropdown.onChange = function() {
        var idx = sheetDropdown.selection.index;
        var paper = paperSizes[idx];
        if (paper.w === -1) {
            var w = parseFloat(editSheetWidth.text) || 0;
            var h = parseFloat(editSheetHeight.text) || 0;
            var isHoriz = (orientationDropdown.selection.index === 0);
            if (isHoriz && w < h) {
                editSheetWidth.text = h.toString();
                editSheetHeight.text = w.toString();
            } else if (!isHoriz && w > h) {
                editSheetWidth.text = h.toString();
                editSheetHeight.text = w.toString();
            }
        } else {
            updateFinalSheetSizeFromSelection();
        }
    };

    impTypeDropdown.onChange = function() {
        var selIdx = impTypeDropdown.selection.index;
        if (selIdx === 0 || selIdx === 1) {
            editCols.text = "2";
            editRows.text = "1";
            editCols.enabled = false;
            editRows.enabled = false;
        } else if (selIdx === 2 || selIdx === 3 || selIdx === 4) {
            editCols.text = "2";
            editRows.text = "2";
            editCols.enabled = true;
            editRows.enabled = true;
        }
        toggleCreepPanel();
        toggleResetTrimBleed();
        updateSheetSize();
    };
    
    var isApplyingParams = false;

    function getDecimalsForUnit(unit) {
        if (unit === "in") return 3;
        if (unit === "pt") return 1;
        return 2;
    }

    function convertField(field, fromUnit, toUnit) {
        var val = parseFloat(field.text);
        if (isNaN(val)) return;
        var decimals = getDecimalsForUnit(toUnit);
        var converted = convertUnits(val, fromUnit, toUnit);
        var factor = Math.pow(10, decimals);
        converted = Math.round(converted * factor) / factor;
        field.text = converted.toFixed(decimals);
    }

    unitsDropdown.onChange = function() {
        if (isApplyingParams) return;
        var oldUnit = currentUnit;
        var newUnit = unitsDropdown.selection.text;
        if (oldUnit === newUnit) return;
        
        currentUnit = newUnit;
        
        docWidth = convertUnits(docWidth, oldUnit, newUnit);
        docHeight = convertUnits(docHeight, oldUnit, newUnit);
        bleedLeft = convertUnits(bleedLeft, oldUnit, newUnit);
        bleedRight = convertUnits(bleedRight, oldUnit, newUnit);
        bleedTop = convertUnits(bleedTop, oldUnit, newUnit);
        bleedBottom = convertUnits(bleedBottom, oldUnit, newUnit);
        
        convertField(editMarginLeft, oldUnit, newUnit);
        convertField(editMarginTop, oldUnit, newUnit);
        convertField(editMarginRight, oldUnit, newUnit);
        convertField(editMarginBottom, oldUnit, newUnit);
        
        convertField(editSpacingHoriz, oldUnit, newUnit);
        convertField(editSpacingVert, oldUnit, newUnit);
        
        convertField(editImpAreaWidth, oldUnit, newUnit);
        convertField(editImpAreaHeight, oldUnit, newUnit);
        
        convertField(editSheetWidth, oldUnit, newUnit);
        convertField(editSheetHeight, oldUnit, newUnit);
        
        convertField(editBleedVal, oldUnit, newUnit);
        convertField(editMarkLength, oldUnit, newUnit);
        convertField(editMarkOffset, oldUnit, newUnit);
        
        updateCreepValues();
        
        var system = (newUnit === "in") ? "in" : "mm";
        paperSizes = loadPaperSizes(system);
        
        var prevSelIndex = sheetDropdown.selection ? sheetDropdown.selection.index : 0;
        sheetDropdown.removeAll();
        for (var i = 0; i < paperSizes.length; i++) {
            sheetDropdown.add("item", paperSizes[i].name);
        }
        if (prevSelIndex < paperSizes.length) {
            sheetDropdown.selection = prevSelIndex;
        } else {
            sheetDropdown.selection = 0;
        }
        
        updateSheetSize();
        if (sheetDropdown.onChange) sheetDropdown.onChange();
    };

    langDropdown.onChange = function() {
        if (isApplyingParams) return;
        var lang = langList[langDropdown.selection.index].code;
        applyLanguage(lang);
    };
    
    btnSavePreset.onClick = function() {
        var pName = editSaveName.text.replace(/^\s+|\s+$/g, "");
        if (pName === "") {
            alert(translations[currentLang].alert_preset_name);
            return;
        }
        var currentParams = collectUIParameters();
        try {
            if (!presetsDir.exists) presetsDir.create();
            var pFile = new File(presetsDir + "/" + pName + ".txt");
            pFile.encoding = "UTF-8";
            pFile.open("w");
            pFile.write(currentParams.toSource());
            pFile.close();
            
            loadDropdown.removeAll();
            var files = presetsDir.getFiles("*.txt");
            var selectIdx = 0;
            for (var k = 0; k < files.length; k++) {
                var fName = getCleanPresetName(files[k]);
                loadDropdown.add("item", fName);
                if (fName === pName) {
                    selectIdx = k;
                }
            }
            loadDropdown.selection = selectIdx;
            editSaveName.text = "";
            alert(translations[currentLang].alert_preset_saved + pName);
        } catch(e) {
            alert("Error saving preset:\n" + e);
        }
    };
    
    btnLoadPreset.onClick = function() {
        if (!loadDropdown.selection) {
            alert(translations[currentLang].alert_preset_empty);
            return;
        }
        var pName = loadDropdown.selection.text;
        var pFile = getPresetFile(presetsDir, pName);
        if (pFile.exists) {
            pFile.encoding = "UTF-8";
            pFile.open("r");
            var content = pFile.read();
            pFile.close();
            try {
                var loadedParams = eval(content);
                applyParametersToUI(loadedParams);
                updateSheetSize();
                if (sheetDropdown.onChange) sheetDropdown.onChange();
                alert(translations[currentLang].alert_preset_loaded + "\"" + pName + "\"");
            } catch(e) {
                alert("Error loading preset:\n" + e);
            }
        }
    };

    btnDeletePreset.onClick = function () {
        var t = translations[currentLang] || translations["en"];
        if (!loadDropdown.selection) {
            alert(t.alert_preset_empty || "Нет сохраненных настроек для удаления.");
            return;
        }
        var pName = loadDropdown.selection.text;
        var confirmPattern = t.alert_preset_delete_confirm || "Вы действительно хотите удалить пресет \"{0}\"?\nЭто действие нельзя отменить.";
        var confirmMsg = confirmPattern.replace("{0}", pName);
        if (confirm(confirmMsg)) {
            try {
                var pFile = getPresetFile(presetsDir, pName);
                if (pFile.exists) {
                    pFile.remove();
                }
                loadDropdown.removeAll();
                var files = presetsDir.getFiles("*.txt");
                for (var k = 0; k < files.length; k++) {
                    var fName = getCleanPresetName(files[k]);
                    loadDropdown.add("item", fName);
                }
                if (files.length > 0) {
                    loadDropdown.selection = 0;
                }
                var deletedMsg = (t.alert_preset_deleted || "Пресет успешно удален: ") + pName;
                alert(deletedMsg);
            } catch (e) {
                alert("Error deleting preset:\n" + e);
            }
        }
    };
 
    function collectUIParameters() {
        return {
            lang: currentLang,
            impTypeSelectionIndex: impTypeDropdown.selection.index,
            unitStr: unitsDropdown.selection.text,
            unitsSelectionIndex: unitsDropdown.selection.index,
            rotateBacks: chkRotateBacks.value,
            infoSlug: chkInfoSlug.value,
            slugFontSize: parseInt(editSlugFontSize.text, 10) || 7,
            enableCreep: (impTypeDropdown.selection && impTypeDropdown.selection.index === 0) && chkEnableCreep.value,
            compensateThickness: chkCompensateThickness.value,
            compensateCoeff: parseFloat(editCompensateCoeff.text) || 1.0,
            coverPaperIndex: coverDropdown.selection ? coverDropdown.selection.index : 0,
            blockPaperIndex: blockDropdown.selection ? blockDropdown.selection.index : 1,
            creepDirectionIndex: creepDirDropdown.selection ? creepDirDropdown.selection.index : 0,
            cols: parseInt(editCols.text, 10) || 2,
            rows: parseInt(editRows.text, 10) || 1,
            marginLeft: parseFloat(editMarginLeft.text) || 0,
            marginTop: parseFloat(editMarginTop.text) || 0,
            marginRight: parseFloat(editMarginRight.text) || 0,
            marginBottom: parseFloat(editMarginBottom.text) || 0,
            spacingHoriz: parseFloat(editSpacingHoriz.text) || 0,
            spacingVert: parseFloat(editSpacingVert.text) || 0,
            impWidth: parseFloat(editImpAreaWidth.text) || 0,
            impHeight: parseFloat(editImpAreaHeight.text) || 0,
            resetTrimBleed: chkResetTrimBleed.value,
            
            sheetSelectionIndex: sheetDropdown.selection.index,
            orientationIndex: orientationDropdown.selection.index,
            sheetWidth: parseFloat(editSheetWidth.text) || 0,
            sheetHeight: parseFloat(editSheetHeight.text) || 0,
            
            sheetsPerSig: parseInt(editSheetsPerSig.text, 10) || 0,
            creepOuter: parseFloat(editCreepOuter.text) || 0,
            creepInner: parseFloat(editCreepInner.text) || 0,
            useDocBleed: chkUseBleed.value,
            customBleed: parseFloat(editBleedVal.text) || 0,
            
            drawMarks: chkMarksOn.value,
            drawCenterMark: chkDrawCenterMark.value,
            markLength: parseFloat(editMarkLength.text) || 3.0,
            markOffset: parseFloat(editMarkOffset.text) || 3.0,
            
            loadLastByDefault: chkLoadLast.value,
            
            pdfBleed: lastParams ? lastParams.pdfBleed : 3.0,
            askPdfBleed: lastParams ? lastParams.askPdfBleed : true
        };
    }

    function applyParametersToUI(params) {
        if (!params) return;
        isApplyingParams = true;

        if (params.lang !== undefined) {
            var foundIdx = -1;
            for (var l = 0; l < langList.length; l++) {
                if (langList[l].code === params.lang) {
                    foundIdx = l;
                    break;
                }
            }
            if (foundIdx !== -1) {
                langDropdown.selection = foundIdx;
            }
            applyLanguage(params.lang);
        }
        
        if (params.impTypeSelectionIndex !== undefined) {
            impTypeDropdown.selection = params.impTypeSelectionIndex;
        }

        if (params.unitsSelectionIndex !== undefined) {
            unitsDropdown.selection = params.unitsSelectionIndex;
            currentUnit = unitsDropdown.selection.text;
        }
        if (params.rotateBacks !== undefined) {
            chkRotateBacks.value = params.rotateBacks;
        }
        if (params.infoSlug !== undefined) {
            chkInfoSlug.value = params.infoSlug;
        }
        if (params.slugFontSize !== undefined) {
            editSlugFontSize.text = params.slugFontSize.toString();
        }
        if (params.enableCreep !== undefined) {
            chkEnableCreep.value = params.enableCreep;
        }
        if (params.compensateThickness !== undefined) {
            chkCompensateThickness.value = params.compensateThickness;
        }
        if (params.compensateCoeff !== undefined) {
            editCompensateCoeff.text = params.compensateCoeff.toString();
        }
        if (params.coverPaperIndex !== undefined) {
            coverDropdown.selection = params.coverPaperIndex;
        }
        if (params.blockPaperIndex !== undefined) {
            blockDropdown.selection = params.blockPaperIndex;
        }
        if (params.creepDirectionIndex !== undefined) {
            creepDirDropdown.selection = params.creepDirectionIndex;
        }
        toggleCreepPanel();
        
        var selIdx = impTypeDropdown.selection.index;
        if (selIdx === 0 || selIdx === 1) {
            editCols.text = "2";
            editRows.text = "1";
            editCols.enabled = false;
            editRows.enabled = false;
        } else {
            if (params.cols !== undefined) editCols.text = params.cols.toString();
            if (params.rows !== undefined) editRows.text = params.rows.toString();
            editCols.enabled = true;
            editRows.enabled = true;
        }
        if (params.marginLeft !== undefined) editMarginLeft.text = params.marginLeft.toString();
        if (params.marginTop !== undefined) editMarginTop.text = params.marginTop.toString();
        if (params.marginRight !== undefined) editMarginRight.text = params.marginRight.toString();
        if (params.marginBottom !== undefined) editMarginBottom.text = params.marginBottom.toString();
        if (params.spacingHoriz !== undefined) editSpacingHoriz.text = params.spacingHoriz.toString();
        if (params.spacingVert !== undefined) editSpacingVert.text = params.spacingVert.toString();
        
        if (params.sheetSelectionIndex !== undefined) sheetDropdown.selection = params.sheetSelectionIndex;
        if (params.orientationIndex !== undefined) orientationDropdown.selection = params.orientationIndex;
        if (params.sheetWidth !== undefined) editSheetWidth.text = params.sheetWidth.toString();
        if (params.sheetHeight !== undefined) editSheetHeight.text = params.sheetHeight.toString();
        
        if (params.sheetsPerSig !== undefined) editSheetsPerSig.text = params.sheetsPerSig.toString();
        if (params.creepOuter !== undefined) editCreepOuter.text = params.creepOuter.toString();
        if (params.creepInner !== undefined) editCreepInner.text = params.creepInner.toString();
        
        if (params.useDocBleed !== undefined) {
            chkUseBleed.value = params.useDocBleed;
            editBleedVal.enabled = !params.useDocBleed;
        }
        if (params.customBleed !== undefined) editBleedVal.text = params.customBleed.toString();
        
        if (params.drawMarks !== undefined) {
            chkMarksOn.value = params.drawMarks;
            editMarkLength.enabled = params.drawMarks;
            editMarkOffset.enabled = params.drawMarks;
            chkDrawCenterMark.enabled = params.drawMarks;
        }
        if (params.drawCenterMark !== undefined) {
            chkDrawCenterMark.value = params.drawCenterMark;
        }
        if (params.markLength !== undefined) editMarkLength.text = params.markLength.toString();
        if (params.markOffset !== undefined) editMarkOffset.text = params.markOffset.toString();
        if (params.resetTrimBleed !== undefined) chkResetTrimBleed.value = params.resetTrimBleed;
        
        toggleResetTrimBleed();
        
        if (params.loadLastByDefault !== undefined) chkLoadLast.value = params.loadLastByDefault;
        
        isApplyingParams = false;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        
        if (!translations[lang]) {
            translations[lang] = {};
        }
        
        var locFile = new File(resourcesDir + "/Localization/" + lang + ".json");
        if (locFile.exists) {
            locFile.encoding = "UTF-8";
            locFile.open("r");
            var content = locFile.read();
            locFile.close();
            try {
                content = content.replace(/^\uFEFF/, "");
                var parsed = eval("(" + content + ")");
                if (parsed) {
                    for (var k in parsed) {
                        if (parsed.hasOwnProperty(k)) {
                            translations[lang][k] = parsed[k];
                        }
                    }
                }
            } catch(e) {}
        }
        
        var t = translations[lang] || translations["en"];
        
        var en = translations["en"];
        if (t !== en && en) {
            for (var key in en) {
                if (en.hasOwnProperty(key) && t[key] === undefined) {
                    t[key] = en[key];
                }
            }
        }
        
        var titleText = t.title || "PDF QuickImpose v1.2 — Спуск полос из PDF";
        if (titleText.indexOf("v1.2") === -1) {
            titleText = titleText.replace(/^PDF QuickImpose/i, "PDF QuickImpose v1.2").replace(/^QuickImpose/i, "PDF QuickImpose v1.2");
        }
        win.text = titleText;
        
        var infoText = t.file + docName + " (" + docPgsCount + t.pages + ")   |   " + t.size + docWidth.toFixed(1) + " x " + docHeight.toFixed(1) + " " + unitsDropdown.selection.text + " (" + t.bleeds + bleedLeft.toFixed(1) + " " + unitsDropdown.selection.text + ")";
        txtDocInfo.text = infoText;
        pnlTypeUnits.text = t.pnl_type_units;
        pnlGrid.text = t.pnl_grid;
        pnlMargins.text = t.pnl_margins;
        pnlSpacing.text = t.pnl_spacing;
        pnlImpArea.text = t.pnl_imp_area;
        pnlSheet.text = t.pnl_sheet;
        pnlPresets.text = t.pnl_presets;
        pnlCreep.text = t.pnl_creep;
        pnlBleedOpts.text = t.pnl_bleed_opts;
        pnlMarks.text = t.pnl_marks;
        
        uiLabels.lblLang.text = t.lbl_lang;
        if (uiLabels.impType) uiLabels.impType.text = t.lbl_imp_type;
        uiLabels.units.text = t.lbl_units;
        uiLabels.cols.text = t.lbl_cols;
        uiLabels.rows.text = t.lbl_rows;
        uiLabels.marginLeft.text = t.lbl_margin_left;
        uiLabels.marginTop.text = t.lbl_margin_top;
        uiLabels.marginRight.text = t.lbl_margin_right;
        uiLabels.marginBottom.text = t.lbl_margin_bottom;
        uiLabels.spacingHoriz.text = t.lbl_spacing_horiz;
        uiLabels.spacingVert.text = t.lbl_spacing_vert;
        uiLabels.impAreaWidth.text = t.lbl_imp_width;
        uiLabels.impAreaHeight.text = t.lbl_imp_height;
        
        uiLabels.sheetWidth.text = t.lbl_sheet_width;
        uiLabels.sheetHeight.text = t.lbl_sheet_height;
        uiLabels.sheetsPerSig.text = t.lbl_sheets_per_sig;
        uiLabels.creepOuter.text = t.lbl_creep_outer;
        uiLabels.creepInner.text = t.lbl_creep_inner;
        uiLabels.customBleed.text = t.lbl_custom_bleed;
        uiLabels.markLength.text = t.lbl_mark_length;
        uiLabels.markOffset.text = t.lbl_mark_offset;
        
        uiLabels.lblCover.text = t.lbl_cover;
        uiLabels.lblCreepDir.text = t.lbl_creep_dir;
        updateBlockLabel();
        
        var prevCoverSel = coverDropdown.selection ? coverDropdown.selection.index : 0;
        coverDropdown.removeAll();
        for (var i = 0; i < paperWeightNames.length; i++) {
            coverDropdown.add("item", paperWeightNames[i]);
        }
        coverDropdown.selection = prevCoverSel;
        
        var prevBlockSel = blockDropdown.selection ? blockDropdown.selection.index : 1;
        blockDropdown.removeAll();
        for (var i = 0; i < paperWeightNames.length; i++) {
            blockDropdown.add("item", paperWeightNames[i]);
        }
        blockDropdown.selection = prevBlockSel;
        
        var prevDirSel = creepDirDropdown.selection ? creepDirDropdown.selection.index : 0;
        creepDirDropdown.removeAll();
        for (var i = 0; i < t.creep_dir_options.length; i++) {
            creepDirDropdown.add("item", t.creep_dir_options[i]);
        }
        creepDirDropdown.selection = prevDirSel;
        
        uiLabels.sheetFormat.text = t.lbl_sheet_format;
        uiLabels.sheetOrient.text = t.lbl_sheet_orient;
        
        chkLoadLast.text = t.chk_load_last;
        uiLabels.savePreset.text = t.lbl_preset_save;
        btnSavePreset.text = t.btn_preset_save;
        uiLabels.loadPreset.text = t.lbl_preset_load;
        btnLoadPreset.text = t.btn_preset_load;
        if (typeof btnDeletePreset !== "undefined" && btnDeletePreset) {
            btnDeletePreset.helpTip = t.tip_preset_delete || "Удалить выбранный пресет";
        }
        btnExample.text = t.btn_example || "Пример";
        btnPreview.text = t.btn_preview || "Схема";
        
        var activeUnit = (unitsDropdown && unitsDropdown.selection) ? unitsDropdown.selection.text : currentUnit;
        var activeBleedVal = convertUnits(bleedLeft, currentUnit, activeUnit);
        var unitLabel = activeUnit;
        if (lang === "ru" && activeUnit === "mm") {
            unitLabel = "мм";
        }
        var bleedStr = (Math.round(activeBleedVal * 1000) / 1000) + " " + unitLabel;
        chkUseBleed.text = t.chk_use_bleed + " (" + bleedStr + ")";
        chkMarksOn.text = t.chk_marks_on;
        chkDrawCenterMark.text = t.chk_center_mark || "Center (fold line)";
        chkResetTrimBleed.text = t.chk_reset_trim_bleed || "Reset Trim + Bleed";
        chkRotateBacks.text = t.chk_rotate_backs;
        chkRotateBacks.preferredSize.width = 146;
        chkInfoSlug.text = t.chk_info_slug;
        chkInfoSlug.preferredSize.width = 60;
        chkInfoSlug.helpTip = t.tip_info_slug;
        editSlugFontSize.helpTip = t.tip_slug_font_size;
        chkEnableCreep.text = t.chk_enable_creep;
        chkCompensateThickness.text = t.chk_compensate_thickness || "Thickness Compensation";
        editCompensateCoeff.helpTip = t.tip_compensate_thickness || "Thickness compensation coefficient (K)";
        
        btnCancel.text = t.btn_cancel;
        btnImpose.text = t.btn_impose;
        
        if (uiLabels.lblAuthorLink) uiLabels.lblAuthorLink.text = t.lbl_author_link;
        if (uiLabels.lblMoreScripts) uiLabels.lblMoreScripts.text = t.lbl_more_scripts;
        
        if (t.tip_edit_paper_sizes) {
            btnEditPaperSizes.helpTip = t.tip_edit_paper_sizes;
        }
        if (t.tip_edit_paper_weights) {
            btnEditPaperWeights.helpTip = t.tip_edit_paper_weights;
        }
        
        var prevImpSel = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        impTypeDropdown.removeAll();
        for (var i = 0; i < t.imp_types.length; i++) {
            impTypeDropdown.add("item", t.imp_types[i]);
        }
        impTypeDropdown.selection = prevImpSel;
        
        var prevOrientSel = orientationDropdown.selection ? orientationDropdown.selection.index : 0;
        orientationDropdown.removeAll();
        orientationDropdown.add("item", t.orient_horiz);
        orientationDropdown.add("item", t.orient_vert);
        orientationDropdown.selection = prevOrientSel;
        
        var prevPaperSel = sheetDropdown.selection ? sheetDropdown.selection.index : 0;
        paperSizes = loadPaperSizes(unitsDropdown.selection.text === "in" ? "in" : "mm");
        sheetDropdown.removeAll();
        for (var i = 0; i < paperSizes.length; i++) {
            sheetDropdown.add("item", paperSizes[i].name);
        }
        if (prevPaperSel < paperSizes.length) {
            sheetDropdown.selection = prevPaperSel;
        } else {
            sheetDropdown.selection = 0;
        }
        
        if (win.visible) {
            win.layout.layout(true);
            win.center();
        }
    }

    var shouldLoadLast = getInitVal("loadLastByDefault", true);
    chkLoadLast.value = shouldLoadLast;
    if (shouldLoadLast && lastParams) {
        applyParametersToUI(lastParams);
    } else {
        applyLanguage(currentLang);
    }

    if (chkUseBleed.value) {
        syncMarginsWithDocBleed();
    }
    updateSheetSize();
    toggleCreepPanel();
    toggleResetTrimBleed();

    if (win.show() === 1) {
        var userParams = collectUIParameters();
        
        try {
            var settingsFolder = new Folder(resourcesDir + "/Data");
            if (!settingsFolder.exists) {
                settingsFolder.create();
            }
            var sFile = new File(settingsFolder + "/Settings.txt");
            sFile.encoding = "UTF-8";
            sFile.open("w");
            sFile.write(userParams.toSource());
            sFile.close();
        } catch(e) {}
        
        executeImposition(srcDoc, userParams, pdfName);
    } else {
        try {
            srcDoc.close(SaveOptions.NO);
        } catch(e) {}
    }
}

// ----------------------------------------------------
// IMPOSITION EXECUTION ENGINE
// ----------------------------------------------------
function executeImposition(srcDoc, params, pdfName) {
    function getFormattedDate() {
        var d = new Date();
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = days[d.getDay()];
        var month = months[d.getMonth()];
        var date = d.getDate();
        var year = d.getFullYear();
        var hrs = d.getHours();
        var mins = d.getMinutes();
        var secs = d.getSeconds();
        
        if (hrs < 10) hrs = "0" + hrs;
        if (mins < 10) mins = "0" + mins;
        if (secs < 10) secs = "0" + secs;
        
        return day + " " + month + " " + date + " " + year + " " + hrs + ":" + mins + ":" + secs;
    }

    var initialLang = params.lang || "ru";

    var savedUnitsH = srcDoc.viewPreferences.horizontalMeasurementUnits;
    var savedUnitsV = srcDoc.viewPreferences.verticalMeasurementUnits;
    var savedRuler = srcDoc.viewPreferences.rulerOrigin;
    
    var targetUnits = MeasurementUnits.MILLIMETERS;
    if (params.unitStr === "pt") targetUnits = MeasurementUnits.POINTS;
    else if (params.unitStr === "in") targetUnits = MeasurementUnits.INCHES;
    
    srcDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    var docName = pdfName || srcDoc.name;
    var docWidth = srcDoc.documentPreferences.pageWidth;
    var docHeight = srcDoc.documentPreferences.pageHeight;
    var docPgsCount = srcDoc.pages.length;

    var pdfFolder = new Folder(Folder.temp + "/_pdf_tmp");
    if (!pdfFolder.exists) {
        pdfFolder.create();
    }
    var docNameWithoutExt = docName.replace(/\.[a-zA-Z0-9]+$/, "");
    var tempPDF = new File(pdfFolder + "/" + docNameWithoutExt + ".pdf");
    
    var savedBleedWithPDF = app.pdfExportPreferences.useDocumentBleedWithPDF;
    var savedExportBleedTop = app.pdfExportPreferences.bleedTop;
    var savedExportBleedBottom = app.pdfExportPreferences.bleedBottom;
    var savedExportBleedInside = app.pdfExportPreferences.bleedInside;
    var savedExportBleedOutside = app.pdfExportPreferences.bleedOutside;
    var savedExportReaderSpreads = app.pdfExportPreferences.exportReaderSpreads;
    var savedAcrobatCompatibility = app.pdfExportPreferences.acrobatCompatibility;
    var savedPageRange = app.pdfExportPreferences.pageRange;
    
    try { app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES; } catch(e) {}
    app.pdfExportPreferences.useDocumentBleedWithPDF = params.useDocBleed;
    if (!params.useDocBleed) {
        app.pdfExportPreferences.bleedTop = params.customBleed;
        app.pdfExportPreferences.bleedBottom = params.customBleed;
        app.pdfExportPreferences.bleedInside = params.customBleed;
        app.pdfExportPreferences.bleedOutside = params.customBleed;
    }
    
    try { app.pdfExportPreferences.exportReaderSpreads = false; } catch(e){}
    try { app.pdfExportPreferences.acrobatCompatibility = AcrobatCompatibility.ACROBAT_5; } catch(e){}
    
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
    try {
        srcDoc.exportFile(ExportFormat.PDF_TYPE, tempPDF, false);
    } catch(e) {
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
        alert((translations[initialLang] ? translations[initialLang].alert_err_export : "Error exporting temporary PDF:\n") + e);
        return;
    }
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    
    try {
        srcDoc.close(SaveOptions.NO);
    } catch(e) {}

    app.pdfExportPreferences.useDocumentBleedWithPDF = savedBleedWithPDF;
    app.pdfExportPreferences.bleedTop = savedExportBleedTop;
    app.pdfExportPreferences.bleedBottom = savedExportBleedBottom;
    app.pdfExportPreferences.bleedInside = savedExportBleedInside;
    app.pdfExportPreferences.bleedOutside = savedExportBleedOutside;
    app.pdfExportPreferences.exportReaderSpreads = savedExportReaderSpreads;
    app.pdfExportPreferences.acrobatCompatibility = savedAcrobatCompatibility;
    try { app.pdfExportPreferences.pageRange = savedPageRange; } catch(e) {}
    
    var testDoc = app.documents.add(false);
    testDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    testDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    testDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    
    app.pdfPlacePreferences.pageNumber = 1;
    app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_TRIM;
    var placedTrim = testDoc.pages.item(0).place(tempPDF, [0, 0])[0];
    var trimBounds = placedTrim.parent.geometricBounds;
    placedTrim.parent.remove();
    
    app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;
    var placedBleed = testDoc.pages.item(0).place(tempPDF, [0, 0])[0];
    var bleedBounds = placedBleed.parent.geometricBounds;
    placedBleed.parent.remove();
    testDoc.close(SaveOptions.NO);
    
    var bleedHeight = bleedBounds[2] - bleedBounds[0];
    var trimHeight = trimBounds[2] - trimBounds[0];
    var bleedWidth = bleedBounds[3] - bleedBounds[1];
    var trimWidth = trimBounds[3] - trimBounds[1];
    
    var bValY = (bleedHeight - trimHeight) / 2;
    var bValX = (bleedWidth - trimWidth) / 2;
    
    var bTop = bValY;
    var bBottom = bValY;
    var bLeft = bValX;
    var bRight = bValX;
    
    var totalPgs = docPgsCount;
    var W = docWidth;
    var H = docHeight;
    
    var impIdx = params.impTypeSelectionIndex;
    
    var mLeft = params.marginLeft;
    var mTop = params.marginTop;
    var mRight = params.marginRight;
    var mBottom = params.marginBottom;
    var sHoriz = params.spacingHoriz;
    var sVert = params.spacingVert;
    
    if (impIdx !== 0 && impIdx !== 1) {
        sHoriz += (bLeft + bRight);
        sVert += (bTop + bBottom);
    }
    
    var creepOuterVal = params.enableCreep ? params.creepOuter : 0.0;
    var creepInnerVal = params.enableCreep ? params.creepInner : 0.0;
    
    var sequence;
    if (impIdx === 0) {
        sequence = generateSaddleStitchSequence(totalPgs, params.sheetsPerSig);
    } else if (impIdx === 1) {
        sequence = generateSaddleStitchSequence(totalPgs, params.sheetsPerSig);
    } else if (impIdx === 2) {
        sequence = generateConsecutiveSequence(totalPgs, params.cols, params.rows);
    } else if (impIdx === 3) {
        sequence = generateCutStackSequence(totalPgs, params.cols, params.rows);
    } else if (impIdx === 4) {
        sequence = generateStepAndRepeatSequence(totalPgs, params.cols, params.rows);
    } else {
        sequence = generateConsecutiveSequence(totalPgs, params.cols, params.rows);
    }
    
    var activeSheets = [];
    for (var i = 0; i < sequence.sheets.length; i++) {
        var sh = sequence.sheets[i];
        var grid = sh.isBack ? sh.back : sh.front;
        var hasPages = false;
        for (var r = 0; r < grid.length; r++) {
            for (var c = 0; c < grid[r].length; c++) {
                if (grid[r][c] && grid[r][c].pageNum > 0 && grid[r][c].pageNum <= totalPgs) {
                    hasPages = true;
                    break;
                }
            }
            if (hasPages) break;
        }
        if (hasPages) {
            activeSheets.push(sh);
        }
    }
    sequence.sheets = activeSheets;
    
    var targetSheetW = mLeft + mRight + sequence.pagesAcross * W + (sequence.pagesAcross - 1) * sHoriz;
    var targetSheetH = mTop + mBottom + sequence.pagesDown * H + (sequence.pagesDown - 1) * sVert;
    
    var showingWindow = false;
    var targetDoc = app.documents.add(showingWindow);
    
    targetDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    
    targetDoc.documentPreferences.facingPages = false;
    targetDoc.documentPreferences.pageWidth = targetSheetW;
    targetDoc.documentPreferences.pageHeight = targetSheetH;
    
    for (var p = 0; p < targetDoc.pages.length; p++) {
        var pg = targetDoc.pages.item(p);
        pg.marginPreferences.top = 0;
        pg.marginPreferences.bottom = 0;
        pg.marginPreferences.left = 0;
        pg.marginPreferences.right = 0;
    }
    
    var totalFlats = sequence.sheets.length;
    for (var fIdx = 0; fIdx < totalFlats; fIdx++) {
        var sheetObj = sequence.sheets[fIdx];
        var markItems = [];
        
        var targetPage;
        if (fIdx === 0) {
            targetPage = targetDoc.pages.item(0);
        } else {
            targetPage = targetDoc.pages.add(LocationOptions.AT_END);
            targetPage.marginPreferences.top = 0;
            targetPage.marginPreferences.bottom = 0;
            targetPage.marginPreferences.left = 0;
            targetPage.marginPreferences.right = 0;
        }
        
        var grid = sheetObj.front;
        var isBack = false;
        if (sheetObj.isBack) {
            grid = sheetObj.back;
            isBack = true;
        }
        
        var totalSigSheets = sequence.sheetsPerSignature;
        var sheetSigIdx = sheetObj.sheetIndex;
        var creepVal = 0;
        if (totalSigSheets > 1) {
            creepVal = creepOuterVal + (sheetSigIdx / (totalSigSheets - 1)) * (creepInnerVal - creepOuterVal);
        } else {
            creepVal = creepOuterVal;
        }
        
        for (var r = 0; r < sequence.pagesDown; r++) {
            for (var c = 0; c < sequence.pagesAcross; c++) {
                var cell = grid[r][c];
                if (!cell || cell.pageNum <= 0 || cell.pageNum > totalPgs) continue;
                
                var X = mLeft + c * (W + sHoriz);
                var Y = mTop + r * (H + sVert);
                
                var shiftX = 0;
                if ((impIdx === 0 || impIdx === 1) && sequence.pagesAcross === 2) {
                    if (c === 0) {
                        shiftX = creepVal;
                    } else if (c === 1) {
                        shiftX = -creepVal;
                    }
                }
                
                var frame = targetPage.rectangles.add();
                
                var frameTop = Y - bTop;
                var frameBottom = Y + H + bBottom;
                var frameLeft = X - bLeft + shiftX;
                var frameRight = X + W + bRight + shiftX;
                
                frame.geometricBounds = [frameTop, frameLeft, frameBottom, frameRight];
                
                frame.strokeWeight = 0;
                frame.strokeColor = "None";
                frame.fillColor = "None";
                
                app.pdfPlacePreferences.pageNumber = cell.pageNum;
                app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;
                
                var placedPDF = frame.place(tempPDF)[0];
                
                try {
                    frame.fit(FitOptions.CENTER_CONTENT);
                } catch(e) {}
                
                try {
                    placedPDF.geometricBounds = [frameTop, frameLeft, frameBottom, frameRight];
                } catch(e) {}
                
                if (cell.rotated) {
                    placedPDF.rotationAngle = 180;
                }
                
                var clipLeft = frameLeft;
                var clipRight = frameRight;
                if ((impIdx === 0 || impIdx === 1) && sequence.pagesAcross === 2) {
                    if (c === 0) {
                        clipRight = X + W;
                    } else if (c === 1) {
                        clipLeft = X;
                    }
                }
                frame.geometricBounds = [frameTop, clipLeft, frameBottom, clipRight];
            }
        }
        
        if (params.drawMarks) {
            var gridWidth = sequence.pagesAcross * W + (sequence.pagesAcross - 1) * sHoriz;
            var gridHeight = sequence.pagesDown * H + (sequence.pagesDown - 1) * sVert;
            var outset = params.markOffset;
            var len = params.markLength;
            
            var xCoords, yCoords;
            
            var isBooklet = (impIdx === 0 || impIdx === 1);
            if (isBooklet) {
                xCoords = [mLeft, mLeft + gridWidth];
                yCoords = [mTop, mTop + gridHeight];
            } else {
                xCoords = [mLeft];
                for (var c = 0; c < sequence.pagesAcross; c++) {
                    var xL = mLeft + c * (W + sHoriz);
                    var xR = xL + W;
                    if (c > 0 && sHoriz > 0) {
                        xCoords.push(xL);
                    }
                    xCoords.push(xR);
                }
                
                yCoords = [mTop];
                for (var r = 0; r < sequence.pagesDown; r++) {
                    var yT = mTop + r * (H + sVert);
                    var yB = yT + H;
                    if (r > 0 && sVert > 0) {
                        yCoords.push(yT);
                    }
                    yCoords.push(yB);
                }
            }
            
            var regColor = targetPage.parent.parent.colors.item("Registration");
            var strokeW = 0.25;
            
            function drawPageLine(y1, x1, y2, x2, strokeWidth) {
                var line = targetPage.graphicLines.add();
                line.strokeColor = regColor;
                line.strokeWeight = strokeWidth || strokeW;
                line.geometricBounds = [y1, x1, y2, x2];
                markItems.push(line);
            }
            
            // Draw vertical marks in top and bottom margins
            for (var i = 0; i < xCoords.length; i++) {
                var x = xCoords[i];
                drawPageLine(mTop - outset - len, x, mTop - outset, x);
                drawPageLine(mTop + gridHeight + outset, x, mTop + gridHeight + outset + len, x);
            }
            
            // Draw horizontal marks in left and right margins
            for (var i = 0; i < yCoords.length; i++) {
                var y = yCoords[i];
                drawPageLine(y, mLeft - outset - len, y, mLeft - outset);
                drawPageLine(y, mLeft + gridWidth + outset, y, mLeft + gridWidth + outset + len);
            }

            // Draw crop marks inside gaps between columns if space allows
            if (!isBooklet && sHoriz > 2 * outset) {
                var hAvail = (sHoriz - 2 * outset) / 2;
                var hMarkLen = Math.min(len, hAvail);
                if (hMarkLen > 0) {
                    for (var c = 0; c < sequence.pagesAcross - 1; c++) {
                        var xR = mLeft + c * (W + sHoriz) + W;
                        var xL = xR + sHoriz;
                        
                        for (var r = 0; r < sequence.pagesDown; r++) {
                            var yT = mTop + r * (H + sVert);
                            var yB = yT + H;
                            
                            drawPageLine(yT, xR + outset, yT, xR + outset + hMarkLen);
                            drawPageLine(yT, xL - outset - hMarkLen, yT, xL - outset);
                            
                            drawPageLine(yB, xR + outset, yB, xR + outset + hMarkLen);
                            drawPageLine(yB, xL - outset - hMarkLen, yB, xL - outset);
                        }
                    }
                }
            }

            // Draw crop marks inside gaps between rows if space allows
            if (!isBooklet && sVert > 2 * outset) {
                var vAvail = (sVert - 2 * outset) / 2;
                var vMarkLen = Math.min(len, vAvail);
                if (vMarkLen > 0) {
                    for (var r = 0; r < sequence.pagesDown - 1; r++) {
                        var yB = mTop + r * (H + sVert) + H;
                        var yT = yB + sVert;
                        
                        for (var c = 0; c < sequence.pagesAcross; c++) {
                            var xL = mLeft + c * (W + sHoriz);
                            var xR = xL + W;
                            
                            drawPageLine(yB + outset, xL, yB + outset + vMarkLen, xL);
                            drawPageLine(yT - outset - vMarkLen, xL, yT - outset, xL);
                            
                            drawPageLine(yB + outset, xR, yB + outset + vMarkLen, xR);
                            drawPageLine(yT - outset - vMarkLen, xR, yT - outset, xR);
                        }
                    }
                }
            }
            
            // Draw center fold lines if checked
            if (params.drawCenterMark) {
                var foldStrokeW = 1.0;
                if (isBooklet) {
                    var centerX = mLeft + gridWidth / 2;
                    drawPageLine(mTop - outset - len, centerX, mTop - outset, centerX, foldStrokeW);
                    drawPageLine(mTop + gridHeight + outset, centerX, mTop + gridHeight + outset + len, centerX, foldStrokeW);
                } else {
                    for (var c = 0; c < sequence.pagesAcross; c++) {
                        var xCenter = mLeft + c * (W + sHoriz) + W / 2;
                        drawPageLine(mTop - outset - len, xCenter, mTop - outset, xCenter, foldStrokeW);
                        drawPageLine(mTop + gridHeight + outset, xCenter, mTop + gridHeight + outset + len, xCenter, foldStrokeW);
                    }
                }
            }
        }
        
        var pageItems = targetPage.pageItems.everyItem().getElements();
        if (markItems.length > 0) {
            pageItems = pageItems.concat(markItems);
        }
        if (pageItems.length > 0) {
            var grp = targetPage.groups.add(pageItems);
            if (params.rotateBacks && sheetObj.isBack) {
                grp.rotationAngle = 180;
            }
        }
    }
    
    if (params.resetTrimBleed) {
        targetDoc.documentPreferences.pageWidth = targetSheetW - (bLeft + bRight);
        targetDoc.documentPreferences.pageHeight = targetSheetH - (bTop + bBottom);
        
        targetDoc.documentPreferences.documentBleedTopOffset = bTop;
        targetDoc.documentPreferences.documentBleedBottomOffset = bBottom;
        targetDoc.documentPreferences.documentBleedInsideOrLeftOffset = bLeft;
        targetDoc.documentPreferences.documentBleedOutsideOrRightOffset = bRight;
    } else {
        targetDoc.documentPreferences.pageWidth = params.sheetWidth;
        targetDoc.documentPreferences.pageHeight = params.sheetHeight;
    }
    
    for (var p = 0; p < targetDoc.pages.length; p++) {
        var pg = targetDoc.pages.item(p);
        if (!params.resetTrimBleed) {
            pg.marginPreferences.top = bTop;
            pg.marginPreferences.bottom = bBottom;
            pg.marginPreferences.left = bLeft;
            pg.marginPreferences.right = bRight;
        }
        
        var moveX = 0;
        var moveY = 0;
        var postBounds = null;
        var groups = pg.groups.everyItem().getElements();
        if (groups.length > 0) {
            var grp = groups[0];
            var grpBounds = grp.geometricBounds;
            var grpW = grpBounds[3] - grpBounds[1];
            var grpH = grpBounds[2] - grpBounds[0];
            var grpCenterX = grpBounds[1] + grpW / 2;
            var grpCenterY = grpBounds[0] + grpH / 2;
            
            moveX = (targetDoc.documentPreferences.pageWidth / 2) - grpCenterX;
            moveY = (targetDoc.documentPreferences.pageHeight / 2) - grpCenterY;
            
            grp.move(undefined, [moveX, moveY]);
            postBounds = grp.geometricBounds;
        }
        
        if (params.infoSlug) {
            var fontSizePt = params.slugFontSize || 7;
            var offsetTop, offsetLeft, hFrame, wFrame;
            
            hFrame = convertUnits(fontSizePt + 5, "pt", params.unitStr);
            
            var halfSheetW = targetDoc.documentPreferences.pageWidth / 2;
            var max180mm = convertUnits(180, "mm", params.unitStr);
            wFrame = Math.min(halfSheetW, max180mm);
            
            var shift3mm = convertUnits(3, "mm", params.unitStr);
            var outsetVal = convertUnits(params.drawMarks ? (params.markOffset || 3) : 0, "mm", params.unitStr);
            var lenVal = convertUnits(params.drawMarks ? (params.markLength || 3) : 0, "mm", params.unitStr);
            
            if (params.resetTrimBleed) {
                offsetLeft = shift3mm;
                offsetTop = -outsetVal - lenVal - hFrame;
            } else if (postBounds) {
                // Position X at top-left crop mark line (postBounds[1] + outset + len) + 3mm shift
                offsetLeft = postBounds[1] + outsetVal + lenVal + shift3mm;
                // Position Y at postBounds[0] (top tip of top-left crop mark)
                offsetTop = postBounds[0];
                
                var minTop = convertUnits(2, "mm", params.unitStr);
                if (offsetTop < minTop) {
                    offsetTop = minTop;
                }
            } else {
                offsetTop = convertUnits(5, "mm", params.unitStr);
                offsetLeft = convertUnits(5, "mm", params.unitStr);
            }
            
            var impTypeNameEn = "SaddleStitch";
            if (params.impTypeSelectionIndex === 1) impTypeNameEn = "PerfectBound";
            else if (params.impTypeSelectionIndex === 2) impTypeNameEn = "Consecutive";
            else if (params.impTypeSelectionIndex === 3) impTypeNameEn = "CutStack";
            else if (params.impTypeSelectionIndex === 4) impTypeNameEn = "StepAndRepeat";
            
            var infoText = docName + " (" + docWidth.toFixed(1) + " x " + docHeight.toFixed(1) + " " + params.unitStr + ") -- Surface " + (p + 1) + " of " + targetDoc.pages.length + " -- " + getFormattedDate() + " -- " + impTypeNameEn;
            
            var textFrame = pg.textFrames.add();
            textFrame.geometricBounds = [offsetTop, offsetLeft, offsetTop + hFrame, offsetLeft + wFrame];
            textFrame.contents = infoText;
            
            var textPara = textFrame.parentStory.paragraphs.item(0);
            textPara.pointSize = fontSizePt;
            try {
                textPara.appliedFont = app.fonts.item("Arial");
            } catch(e) {
                try {
                    textPara.appliedFont = app.fonts.item("Minion Pro");
                } catch(e2) {}
            }
            textFrame.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
        }
    }
    
    targetDoc.windows.add();
    
    try {
        app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
    } catch(e) {}
    
    alert((translations[initialLang] ? translations[initialLang].alert_success : "Imposition completed successfully!\nCreated Flats: ") + totalFlats);
}

// ----------------------------------------------------
// DYNAMIC SEQUENCE GENERATION ALGORITHMS
// ----------------------------------------------------
function generateSaddleStitchSequence(totalPages, sheetsPerSig) {
    var paddedPages = Math.ceil(totalPages / 4) * 4;
    var sigPages = sheetsPerSig > 0 ? sheetsPerSig * 4 : paddedPages;
    var sigCount = Math.ceil(paddedPages / sigPages);
    
    var seq = {
        pagesAcross: 2,
        pagesDown: 1,
        sheetsPerSignature: sigPages / 4,
        sheets: []
    };
    
    for (var sigIdx = 0; sigIdx < sigCount; sigIdx++) {
        var startPg = sigIdx * sigPages;
        var sheetsInSig = sigPages / 4;
        
        for (var s = 0; s < sheetsInSig; s++) {
            var leftFront = startPg + sigPages - 2 * s;
            var rightFront = startPg + 2 * s + 1;
            var leftBack = startPg + 2 * s + 2;
            var rightBack = startPg + sigPages - 2 * s - 1;
            
            seq.sheets.push({
                sheetIndex: s,
                isBack: false,
                front: [[
                    { pageNum: leftFront, rotated: false },
                    { pageNum: rightFront, rotated: false }
                ]]
            });
            
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                back: [[
                    { pageNum: leftBack, rotated: false },
                    { pageNum: rightBack, rotated: false }
                ]]
            });
        }
    }
    return seq;
}

function generateConsecutiveSequence(totalPages, cols, rows) {
    var perPageSide = cols * rows;
    var perSheet = perPageSide * 2;
    var totalSheets = Math.ceil(totalPages / perSheet);
    
    var seq = {
        pagesAcross: cols,
        pagesDown: rows,
        sheetsPerSignature: totalSheets,
        sheets: []
    };
    
    for (var s = 0; s < totalSheets; s++) {
        var frontGrid = [];
        var backGrid = [];
        var startFront = s * perSheet + 1;
        var startBack = s * perSheet + perPageSide + 1;
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: startFront + r * cols + c, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var mirroredCol = cols - 1 - c;
                rowCells.push({ pageNum: startBack + r * cols + mirroredCol, rotated: false });
            }
            backGrid.push(rowCells);
        }
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            front: frontGrid
        });
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: true,
            back: backGrid
        });
    }
    return seq;
}

function generateCutStackSequence(totalPages, cols, rows) {
    var perPageSide = cols * rows;
    var perSheet = perPageSide * 2;
    var totalSheets = Math.ceil(totalPages / perSheet);
    
    var seq = {
        pagesAcross: cols,
        pagesDown: rows,
        sheetsPerSignature: totalSheets,
        sheets: []
    };
    
    for (var s = 0; s < totalSheets; s++) {
        var frontGrid = [];
        var backGrid = [];
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var pileIdx = r * cols + c;
                var pageNum = pileIdx * (2 * totalSheets) + 2 * s + 1;
                rowCells.push({ pageNum: pageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var mirroredCol = cols - 1 - c;
                var pileIdx = r * cols + mirroredCol;
                var pageNum = pileIdx * (2 * totalSheets) + 2 * s + 2;
                rowCells.push({ pageNum: pageNum, rotated: false });
            }
            backGrid.push(rowCells);
        }
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            front: frontGrid
        });
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: true,
            back: backGrid
        });
    }
    return seq;
}

function generateStepAndRepeatSequence(totalPages, cols, rows) {
    var perSheet = 2;
    var totalSheets = Math.ceil(totalPages / perSheet);
    
    var seq = {
        pagesAcross: cols,
        pagesDown: rows,
        sheetsPerSignature: totalSheets,
        sheets: []
    };
    
    for (var s = 0; s < totalSheets; s++) {
        var frontGrid = [];
        var backGrid = [];
        var frontPageNum = s * 2 + 1;
        var backPageNum = s * 2 + 2;
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: frontPageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var actualPage = (backPageNum <= totalPages) ? backPageNum : 0;
                rowCells.push({ pageNum: actualPage, rotated: false });
            }
            backGrid.push(rowCells);
        }
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            front: frontGrid
        });
        
        seq.sheets.push({
            sheetIndex: s,
            isBack: true,
            back: backGrid
        });
    }
    return seq;
}

// ----------------------------------------------------
// UNIT CONVERSION & DRAW HELPERS
// ----------------------------------------------------
function idUnitsToStringUnits(idUnits) {
    switch(idUnits) {
        case MeasurementUnits.POINTS: return "pt";
        case MeasurementUnits.INCHES: return "in";
        case MeasurementUnits.MILLIMETERS: return "mm";
        default: return "mm";
    }
}

function convertUnits(value, from, to) {
    if (from === to) return value;
    
    var ptVal = 0;
    if (from === "pt") ptVal = value;
    else if (from === "mm") ptVal = value * (72 / 25.4);
    else if (from === "in") ptVal = value * 72;
    
    if (to === "pt") return ptVal;
    if (to === "mm") return ptVal / (72 / 25.4);
    if (to === "in") return ptVal / 72;
    
    return value;
}

function addLabelAndEdit(parent, labelText, value, width, labelKey) {
    var grp = parent.add("group");
    grp.orientation = "row";
    grp.alignment = "left";
    grp.alignChildren = ["left", "center"];
    var lbl = grp.add("statictext", undefined, labelText);
    lbl.characters = 15;
    if (labelKey) uiLabels[labelKey] = lbl;
    var edit = grp.add("edittext", undefined, value.toString());
    edit.characters = width || 8;
    return edit;
}

function addLabelAndEditInline(parent, labelText, value, width, labelKey) {
    var grp = parent.add("group");
    grp.orientation = "row";
    var lbl = grp.add("statictext", undefined, labelText);
    if (labelKey) uiLabels[labelKey] = lbl;
    var edit = grp.add("edittext", undefined, value.toString());
    edit.characters = width || 6;
    return edit;
}

// Start Script
main();
