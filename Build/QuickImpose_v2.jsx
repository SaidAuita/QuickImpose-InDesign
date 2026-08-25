function parseSafeFloat(val) {
    if (typeof val === 'string') {
        return parseFloat(val.replace(/,/g, '.'));
    }
    return parseFloat(val);
}

function cleanFileName(nameOrFile) {
    if (!nameOrFile) return "";
    var str = (typeof nameOrFile === "string") ? nameOrFile : nameOrFile.name;
    try {
        str = File.decode(str);
    } catch (e) {
        try {
            str = decodeURI(str);
        } catch (e2) { }
    }
    str = str.replace(/_qi(\.[a-zA-Z0-9]+)?$/i, function (m, ext) {
        return ext || "";
    });
    return str;
}

function getQiDocName(selectedPdf, srcDoc) {
    var rawName = "";
    if (selectedPdf && selectedPdf.name) {
        rawName = selectedPdf.name;
    } else if (srcDoc && srcDoc.name) {
        rawName = srcDoc.name;
    } else {
        rawName = "Document";
    }
    return cleanFileName(rawName);
}

function getPdfPresetNames() {
    var list = [];
    try {
        if (typeof app !== "undefined" && app.pdfExportPresets) {
            var names = app.pdfExportPresets.everyItem().name;
            for (var i = 0; i < names.length; i++) {
                list.push(names[i]);
            }
        }
    } catch (e) { }
    if (list.length === 0) {
        list = ["[High Quality Print]", "[Press Quality]", "[Smallest File Size]"];
    }
    return list;
}

function findDefaultPdfPresetIndex(names) {
    if (!names || names.length === 0) return 0;
    for (var i = 0; i < names.length; i++) {
        var n = names[i];
        if (n.indexOf("High Quality Print") !== -1 || n.indexOf("Высокое качество печати") !== -1) {
            return i;
        }
    }
    return 0;
}

function getSelectedPdfPreset(presetName) {
    var pdfPreset = null;
    if (presetName && typeof app !== "undefined" && app.pdfExportPresets) {
        try {
            pdfPreset = app.pdfExportPresets.itemByName(presetName);
            if (pdfPreset && pdfPreset.isValid) return pdfPreset;
        } catch (e) { }
    }
    try {
        pdfPreset = app.pdfExportPresets.itemByName("[High Quality Print]");
        if (pdfPreset && pdfPreset.isValid) return pdfPreset;
    } catch (e) { }
    try {
        pdfPreset = app.pdfExportPresets.itemByName("High Quality Print");
        if (pdfPreset && pdfPreset.isValid) return pdfPreset;
    } catch (e) { }
    try {
        pdfPreset = app.pdfExportPresets.itemByName("[Высокое качество печати]");
        if (pdfPreset && pdfPreset.isValid) return pdfPreset;
    } catch (e) { }
    try {
        pdfPreset = app.pdfExportPresets[0];
        if (pdfPreset && pdfPreset.isValid) return pdfPreset;
    } catch (e) { }
    return null;
}

// #target indesign
// QuickImpose.jsx
// An open-source imposition script for Adobe InDesign.
// Replaces expired IDImposer plugins on modern InDesign versions.

var uiLabels = {};

var translations = {
    ru: {
        title: "QuickImpose v2.2 — Спуск полос",
        file: "Файл: ",
        pages: " стр.",
        size: "Размер: ",
        bleeds: "Вылеты: ",
        about_text: "QuickImpose v2.2\n\nПоддерживаются современные версии Adobe InDesign.\nТестировалось на версии 2026.\n\nАвтор: Said & Antigravity.",
        btn_about: "?",
        pnl_type_units: "Спуск и Единицы",
        lbl_imp_type: "Тип спуска:",
        lbl_units: "Единицы:",
        lbl_lang: "Язык / Lang:",
        pnl_grid: "Параметры сетки",
        lbl_cols: "Колонки:",
        lbl_rows: "Строки:",
        pnl_margins: "Поля области спуска",
        chk_link_margins: "Одинаковые поля",
        tip_link_margins: "Связать все 4 поля (одинаковые)",
        lbl_margin_left: "Левое:",
        lbl_margin_top: "Верхнее:",
        lbl_margin_right: "Правое:",
        lbl_margin_bottom: "Нижнее:",
        pnl_spacing: "Зазоры (Распорки)",
        lbl_spacing_horiz: "Горизонтальный:",
        lbl_spacing_vert: "Вертикальный:",
        pnl_imp_area: "Размер области спуска",
        lbl_imp_width: "Ширина:        ",
        lbl_imp_height: "Высота:        ",
        pnl_sheet: "Размер печатного листа",
        lbl_sheet_format: "Формат:",
        lbl_sheet_orient: "Ориент:",
        lbl_sheet_width: "Ширина:        ",
        lbl_sheet_height: "Высота:        ",
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
        lbl_mark_length: "Длинна",
        lbl_mark_thickness: "Толщина, pt:",
        lbl_mark_offset_tb: "Отступ верх, низ",
        lbl_mark_offset_lr: "право, лево",
        pnl_pdf_export: "Экспорт в PDF",
        lbl_pdf_preset: "PDF Пресет:",
        chk_job_report: "Создавать технический отчет (Job Report .txt)",
        msg_job_report_saved: "Отчет о спуске сохранен в файл:\n",
        msg_open_job_report: "Открыть созданный отчет сейчас?",
        btn_cancel: "Отмена",
        btn_impose: "Спуск полос",
        lbl_author_link: "Автор: github.com/SaidAuita/QuickImpose-InDesign",
        lbl_more_scripts: "Другие скрипты: ph-cu-s.com/tools",
        alert_no_doc: "Пожалуйста, откройте документ InDesign перед запуском скрипта.",
        alert_doc_not_saved: "Внимание: Для выполнения спуска и сохранения временных PDF файлов исходный документ должен быть сохранен. Пожалуйста, сохраните файл.",
        alert_err_save_preset: "Ошибка при сохранении пресета:\n",
        alert_err_load_preset: "Ошибка при загрузке пресета:\n",
        alert_err_delete_preset: "Ошибка при удалении пресета:\n",
        alert_preset_empty_del: "Нет сохраненных настроек для удаления.",
        alert_preset_delete_confirm: "Вы действительно хотите удалить пресет \"{0}\"?\nЭто действие нельзя отменить.",
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
        fold_schemes: [
            "Авто (2 полосы на разворот)",
            "8 полос (2 сгиба - 2x2)"
        ],
        lbl_pur_hinge: "PUR (мм):",
        lbl_fold_scheme: "Схема фальцовки:",
        lbl_bleed_trim: "под обрезные",
        tip_edit_paper_sizes: "Редактировать список форматов бумаги",
        tip_edit_paper_weights: "Редактировать список плотностей бумаги",
        chk_info_slug: "Инфо",
        tip_info_slug: "Выводить служебную информацию (имя файла, дата, тип спуска) в левом верхнем углу листа",
        tip_slug_font_size: "Размер шрифта инфо-строки (pt)",
        chk_compensate_thickness: "Компенсация толщины блока",
        tip_compensate_thickness: "Коэффициент компенсации толщины блока (K) для центрирования обложки. Сдвигает обложку наружу на величину: OffsetMax = (Толщина / 2) * K",
        chk_center_mark: "Центр",
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
        btn_preview: "Схема",
        lbl_preview_theme: "Тема превью:",
        theme_dark: "Темная",
        theme_light: "Светлая",
        lbl_auto_rotate: "Автоповорот:",
        opt_rotate_ccw: "Против часовой (–90°)",
        opt_rotate_cw: "По часовой (+90°)",
        opt_rotate_off: "Отключено"
    },
    en: {
        title: "QuickImpose v2.2 — Imposition",
        file: "File: ",
        pages: " pages",
        size: "Size: ",
        bleeds: "Bleeds: ",
        about_text: "QuickImpose v2.2\n\nSupports modern versions of Adobe InDesign.\nTested on version 2026.\n\nAuthor: Said & Antigravity.",
        btn_about: "?",
        pnl_type_units: "Imposition and Units",
        lbl_imp_type: "Imposition:",
        lbl_units: "Units:",
        lbl_lang: "Language / Язык:",
        pnl_grid: "Grid Parameters",
        lbl_cols: "Cols:",
        lbl_rows: "Rows:",
        pnl_margins: "Margins of Imposition Area",
        chk_link_margins: "Uniform Margins",
        tip_link_margins: "Link all 4 margins (uniform values)",
        lbl_margin_left: "Left:",
        lbl_margin_top: "Top:",
        lbl_margin_right: "Right:",
        lbl_margin_bottom: "Bottom:",
        pnl_spacing: "Spacings (Gaps)",
        lbl_spacing_horiz: "Horizontal:",
        lbl_spacing_vert: "Vertical:",
        pnl_imp_area: "Imposition Area Size",
        lbl_imp_width: "Width:         ",
        lbl_imp_height: "Height:        ",
        pnl_sheet: "Print Sheet Size",
        lbl_sheet_format: "Format:",
        lbl_sheet_orient: "Orient:",
        lbl_sheet_width: "Width:         ",
        lbl_sheet_height: "Height:        ",
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
        lbl_mark_length: "Length",
        lbl_mark_thickness: "Thickness, pt:",
        lbl_mark_offset_tb: "Offset Top/Bottom",
        lbl_mark_offset_lr: "Right/Left",
        pnl_pdf_export: "PDF Export",
        lbl_pdf_preset: "PDF Preset:",
        chk_job_report: "Generate Imposition Job Report (.txt)",
        msg_job_report_saved: "Imposition Job Report saved to:\n",
        msg_open_job_report: "Open Job Report now?",
        btn_cancel: "Cancel",
        btn_impose: "Impose",
        lbl_author_link: "Author: github.com/SaidAuita/QuickImpose-InDesign",
        lbl_more_scripts: "More scripts: ph-cu-s.com/tools",
        alert_no_doc: "Please open an InDesign document before running the script.",
        alert_doc_not_saved: "Warning: The source document must be saved to perform imposition and save temporary PDF files. Please save the file.",
        alert_err_save_preset: "Error saving preset:\n",
        alert_err_load_preset: "Error loading preset:\n",
        alert_err_delete_preset: "Error deleting preset:\n",
        alert_preset_empty_del: "No saved presets found to delete.",
        alert_preset_delete_confirm: "Are you sure you want to delete the preset \"{0}\"?\nThis action cannot be undone.",
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
        fold_schemes: [
            "Auto (2 pages per spread)",
            "8 pages (2 folds - 2x2)"
        ],
        lbl_pur_hinge: "PUR (mm):",
        lbl_fold_scheme: "Fold Scheme:",
        lbl_bleed_trim: "+3mm Bleed",
        tip_edit_paper_sizes: "Edit paper size format list",
        tip_edit_paper_weights: "Edit paper thickness list",
        chk_info_slug: "Info",
        tip_info_slug: "Output slug info (filename, date, type) in the top-left corner of the sheet",
        tip_slug_font_size: "Slug info line font size (pt)",
        chk_compensate_thickness: "Thickness Compensation",
        tip_compensate_thickness: "Thickness compensation coefficient (K) to center the cover. Shifts the cover outwards by: OffsetMax = (Thickness / 2) * K",
        chk_center_mark: "Center",
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
        btn_preview: "Preview",
        lbl_preview_theme: "Preview Theme:",
        theme_dark: "Dark",
        theme_light: "Light",
        lbl_auto_rotate: "Auto-rotate:",
        opt_rotate_ccw: "Counter-clockwise (–90°)",
        opt_rotate_cw: "Clockwise (+90°)",
        opt_rotate_off: "Off"
    }
};

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
                content = content.replace(/^/, "");
                var parsed = eval("(" + content + ")");
                if (parsed) {
                    for (var k in parsed) {
                        if (parsed.hasOwnProperty(k)) {
                            translations[lang][k] = parsed[k];
                        }
                    }
                }
            } catch (e) { }
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

var FOLD_MATRICES = {
    8: {
        cols: 2, rows: 2,
        front: [
            [{ p: 5, r: true }, { p: 4, r: true }],
            [{ p: 8, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 3, r: true }, { p: 6, r: true }],
            [{ p: 2, r: false }, { p: 7, r: false }]
        ]
    },
    163: {
        cols: 4, rows: 2,
        front: [
            [{ p: 5, r: true }, { p: 12, r: true }, { p: 9, r: true }, { p: 8, r: true }],
            [{ p: 4, r: false }, { p: 13, r: false }, { p: 16, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 7, r: true }, { p: 10, r: true }, { p: 11, r: true }, { p: 6, r: true }],
            [{ p: 2, r: false }, { p: 15, r: false }, { p: 14, r: false }, { p: 3, r: false }]
        ]
    },
    164: {
        cols: 4, rows: 2,
        front: [
            [{ p: 4, r: true }, { p: 13, r: true }, { p: 16, r: true }, { p: 1, r: true }],
            [{ p: 5, r: false }, { p: 12, r: false }, { p: 9, r: false }, { p: 8, r: false }]
        ],
        back: [
            [{ p: 2, r: true }, { p: 15, r: true }, { p: 14, r: true }, { p: 3, r: true }],
            [{ p: 7, r: false }, { p: 10, r: false }, { p: 11, r: false }, { p: 6, r: false }]
        ]
    },
    32: {
        cols: 4, rows: 4,
        front: [
            [{ p: 13, r: true }, { p: 20, r: true }, { p: 17, r: true }, { p: 16, r: true }],
            [{ p: 12, r: false }, { p: 21, r: false }, { p: 28, r: false }, { p: 5, r: false }],
            [{ p: 9, r: true }, { p: 24, r: true }, { p: 25, r: true }, { p: 8, r: true }],
            [{ p: 4, r: false }, { p: 29, r: false }, { p: 32, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 15, r: true }, { p: 18, r: true }, { p: 19, r: true }, { p: 14, r: true }],
            [{ p: 6, r: false }, { p: 27, r: false }, { p: 22, r: false }, { p: 11, r: false }],
            [{ p: 7, r: true }, { p: 26, r: true }, { p: 23, r: true }, { p: 10, r: true }],
            [{ p: 2, r: false }, { p: 31, r: false }, { p: 30, r: false }, { p: 3, r: false }]
        ]
    }
};

function generateFoldSchemeSequence(totalPages, sheetsPerSig, foldSchemeIdx, workStyleIdx, isSaddleStitch) {
    if (!isSaddleStitch) { // Perfect Bound (КБС)
        var is1x1 = (foldSchemeIdx === 1);
        if (is1x1) {
            var is40 = (workStyleIdx === 1 || workStyleIdx === 3); // 4+0 (Односторонний 1x1)
            if (is40) {
                var seq = {
                    pagesAcross: 1,
                    pagesDown: 1,
                    sheetsPerSignature: sheetsPerSig > 0 ? sheetsPerSig : totalPages,
                    sheets: []
                };
                for (var p = 1; p <= totalPages; p++) {
                    seq.sheets.push({
                        sheetIndex: p - 1,
                        isBack: false,
                        workStyle: 3,
                        front: [[{ pageNum: p, rotated: false }]]
                    });
                }
                return seq;
            } else { // 4+4 (Двусторонний 1x1): Sheet 1 (Page 1 Front, Page 2 Back)...
                var totalSheets = Math.ceil(totalPages / 2);
                var seq = {
                    pagesAcross: 1,
                    pagesDown: 1,
                    sheetsPerSignature: sheetsPerSig > 0 ? sheetsPerSig : totalSheets,
                    sheets: []
                };
                for (var s = 0; s < totalSheets; s++) {
                    var fPage = 2 * s + 1;
                    var bPage = 2 * s + 2;
                    if (bPage > totalPages) bPage = -1;

                    seq.sheets.push({
                        sheetIndex: s,
                        isBack: false,
                        workStyle: 0,
                        front: [[{ pageNum: fPage, rotated: false }]]
                    });
                    if (bPage > 0) {
                        seq.sheets.push({
                            sheetIndex: s,
                            isBack: true,
                            workStyle: 0,
                            back: [[{ pageNum: bPage, rotated: false }]]
                        });
                    }
                }
                return seq;
            }
        } else { // foldSchemeIdx === 0 (2x1 Grid)
            if (workStyleIdx === 3) { // 4+0 (2x1)
                var half = Math.ceil(totalPages / 2);
                var seq = { pagesAcross: 2, pagesDown: 1, sheetsPerSignature: half, sheets: [] };
                for (var s = 0; s < half; s++) {
                    var rightPg = s + 1;
                    var leftPg = half + s + 1;
                    if (leftPg > totalPages) leftPg = -1;
                    seq.sheets.push({ sheetIndex: s, isBack: false, workStyle: 3, front: [[{ pageNum: leftPg, rotated: false }, { pageNum: rightPg, rotated: false }]] });
                }
                return seq;
            } else {
                return generateSaddleStitchSequence(totalPages, sheetsPerSig, workStyleIdx);
            }
        }
    }
    if (!foldSchemeIdx || foldSchemeIdx === 0) {
        return generateSaddleStitchSequence(totalPages, sheetsPerSig, workStyleIdx);
    }

    var matKey = 8;
    if (foldSchemeIdx === 1) matKey = 8;
    else if (foldSchemeIdx === 2) matKey = 163;
    else if (foldSchemeIdx === 3) matKey = 164;
    else if (foldSchemeIdx === 4) matKey = 32;

    var matrix = FOLD_MATRICES[matKey];
    var pagesPerSheet = matrix.cols * matrix.rows * 2;

    var numSheetsInSig = 1;
    if (sheetsPerSig > 0) {
        numSheetsInSig = sheetsPerSig;
    } else if (isSaddleStitch) {
        numSheetsInSig = Math.max(1, Math.ceil(totalPages / pagesPerSheet));
    }

    var pagesPerSig = pagesPerSheet * numSheetsInSig;
    var paddedPages = Math.ceil(totalPages / pagesPerSig) * pagesPerSig;
    var sigCount = Math.ceil(paddedPages / pagesPerSig);

    var cols = matrix.cols;
    var rows = matrix.rows;

    var seq = {
        pagesAcross: cols,
        pagesDown: rows,
        sheetsPerSignature: numSheetsInSig,
        sheets: []
    };

    for (var sigIdx = 0; sigIdx < sigCount; sigIdx++) {
        var startSigPg = sigIdx * pagesPerSig;

        for (var sIdx = 0; sIdx < numSheetsInSig; sIdx++) {
            var getFoldPageNum = function (matrixP) {
                var half = pagesPerSheet / 2;
                if (matrixP <= half) {
                    return startSigPg + sIdx * half + matrixP;
                } else {
                    return startSigPg + pagesPerSig - (sIdx + 1) * half + (matrixP - half);
                }
            };

            var frontGrid = [];
            for (var r = 0; r < rows; r++) {
                frontGrid[r] = [];
                for (var c = 0; c < cols; c++) {
                    var cell = matrix.front[r][c];
                    var pNum = getFoldPageNum(cell.p);
                    frontGrid[r][c] = { pageNum: pNum, rotated: cell.r };
                }
            }

            var backGrid = [];
            for (var r = 0; r < rows; r++) {
                backGrid[r] = [];
                for (var c = 0; c < cols; c++) {
                    var srcR = r;
                    var srcC = c;
                    var rot = matrix.back[r][c].r;

                    if (workStyleIdx === 1) { // Work-and-Turn (Horizontal flip: Left <-> Right)
                        srcC = cols - 1 - c;
                        rot = matrix.back[srcR][srcC].r;
                    } else if (workStyleIdx === 2) { // Work-and-Tumble (Vertical flip: Top <-> Bottom)
                        srcR = rows - 1 - r;
                        rot = !matrix.back[srcR][srcC].r;
                    }

                    var cell = matrix.back[srcR][srcC];
                    var pNum = getFoldPageNum(cell.p);
                    backGrid[r][c] = { pageNum: pNum, rotated: rot };
                }
            }

            seq.sheets.push({
                sheetIndex: sIdx,
                isBack: false,
                workStyle: workStyleIdx,
                front: frontGrid
            });

            seq.sheets.push({
                sheetIndex: sIdx,
                isBack: true,
                workStyle: workStyleIdx,
                back: backGrid
            });
        }
    }

    return seq;
}

function generateConsecutiveSequence(totalPages, cols, rows, isSimplex) {
    var perPageSide = cols * rows;
    var perSheet = isSimplex ? perPageSide : (perPageSide * 2);
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
        var startBack = isSimplex ? 0 : (s * perSheet + perPageSide + 1);

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: startFront + r * cols + c, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid (Horizontally mirrored column c -> cols - 1 - c)
            for (var r = 0; r < rows; r++) {
                var rowCells = [];
                for (var c = 0; c < cols; c++) {
                    var mirroredCol = cols - 1 - c;
                    rowCells.push({ pageNum: startBack + r * cols + mirroredCol, rotated: false });
                }
                backGrid.push(rowCells);
            }
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

function generateCutStackSequence(totalPages, cols, rows, isSimplex) {
    var perPageSide = cols * rows;
    var perSheet = isSimplex ? perPageSide : (perPageSide * 2);
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

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var pileIdx = r * cols + c;
                var pageNum = pileIdx * (isSimplex ? totalSheets : (2 * totalSheets)) + (isSimplex ? (s + 1) : (2 * s + 1));
                rowCells.push({ pageNum: pageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid (Horizontally mirrored column c -> cols - 1 - c)
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
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

function generateStepAndRepeatSequence(totalPages, cols, rows, isSimplex) {
    var perSheet = isSimplex ? 1 : 2;
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
        var frontPageNum = isSimplex ? (s + 1) : (s * 2 + 1);
        var backPageNum = isSimplex ? 0 : (s * 2 + 2);

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: frontPageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid
            for (var r = 0; r < rows; r++) {
                var rowCells = [];
                for (var c = 0; c < cols; c++) {
                    var actualPage = (backPageNum <= totalPages) ? backPageNum : 0;
                    rowCells.push({ pageNum: actualPage, rotated: false });
                }
                backGrid.push(rowCells);
            }
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

// ----------------------------------------------------
// UNIT CONVERSION & DRAW HELPERS
// ----------------------------------------------------
function idUnitsToStringUnits(idUnits) {
    switch (idUnits) {
        case MeasurementUnits.POINTS: return "pt";
        case MeasurementUnits.INCHES: return "in";
        case MeasurementUnits.MILLIMETERS: return "mm";
        default: return "mm";
    }
}

function convertUnits(value, from, to) {
    if (from === to) return value;

    // First convert to points
    var ptVal = 0;
    if (from === "pt") ptVal = value;
    else if (from === "mm") ptVal = value * (72 / 25.4);
    else if (from === "in") ptVal = value * 72;

    // Then convert points to target unit
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
runQuickImpose();


function runQuickImpose() {
    var initialLang = "en";
    try {
        if (app.locale == Locale.RUSSIAN_LOCALE) {
            initialLang = "ru";
        }
    } catch (e) { }

    var isTempImportedDoc = false;
    var selectedPdfFile = null;
    var srcDoc = null;
    var isApplyingParams = false;
    var btnFirstSheet, btnPrevSheet, btnNextSheet, btnLastSheet, lblSheetNav;
    var mainGroup, leftCol, rightCol, previewCol;
    var lblSheetInfo, lblImpAreaInfo, lblGridInfo, canvasGroup;
    var editCols, editRows, editSheetWidth, editSheetHeight, editImpAreaWidth, editImpAreaHeight;
    var unitsDropdown, langDropdown, impTypeDropdown, foldSchemeDropdown, workStyleDropdown;
    var coverDropdown, blockDropdown, creepDirDropdown;
    var chkEnableCreep, chkShiftHinge, chkCompensateThickness, editCompensateCoeff;
    var editSheetsPerSig, editPurHinge, chkRotateBacks, chkResetTrimBleed;
    var pnlPdfExport, pdfExportPresetDropdown, chkJobReport;
    try {
        if (app.documents.length > 0) {
            try {
                srcDoc = app.activeDocument;
            } catch (eDoc) {
                srcDoc = app.documents[0];
            }
        }
    } catch (eAll) { }

    if (!srcDoc || !srcDoc.isValid) {
        var filterPattern = (File.fs === "Windows") ? "*.pdf" : function (f) { return (f instanceof Folder) || /\.pdf$/i.test(f.name); };
        var openDialogTitle = (translations[currentLang] && translations[currentLang].select_pdf) ? translations[currentLang].select_pdf : "Select PDF file for imposition";
        var selectedPdf = File.openDialog(openDialogTitle, filterPattern);
        if (!selectedPdf || !selectedPdf.exists) {
            return;
        }
        var res = importPdfAndCreateDoc(selectedPdf, lastParams, resourcesDir);
        if (!res || !res.srcDoc) return;
        srcDoc = res.srcDoc;
        isTempImportedDoc = true;
        selectedPdfFile = res.selectedPdf;
    }
    var docName = getQiDocName(selectedPdfFile, srcDoc);
    var docPgsCount = srcDoc ? srcDoc.pages.length : 0;

    // Save original units and ruler settings of source document
    var savedUnitsH = srcDoc.viewPreferences.horizontalMeasurementUnits;
    var savedUnitsV = srcDoc.viewPreferences.verticalMeasurementUnits;
    var savedRuler = srcDoc.viewPreferences.rulerOrigin;

    // Standardize to points internally to read dimensions correctly
    srcDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
    srcDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    var docWidthPt = srcDoc.documentPreferences.pageWidth;
    var docHeightPt = srcDoc.documentPreferences.pageHeight;

    // Bleed from source document
    var docBleedTop = srcDoc.documentPreferences.documentBleedTopOffset;
    var docBleedBottom = srcDoc.documentPreferences.documentBleedBottomOffset;
    var docBleedLeft = srcDoc.documentPreferences.documentBleedInsideOrLeftOffset;
    var docBleedRight = srcDoc.documentPreferences.documentBleedOutsideOrRightOffset;

    // Restore original settings
    srcDoc.viewPreferences.horizontalMeasurementUnits = savedUnitsH;
    srcDoc.viewPreferences.verticalMeasurementUnits = savedUnitsV;
    srcDoc.viewPreferences.rulerOrigin = savedRuler;

    var defaultUnitStr = idUnitsToStringUnits(savedUnitsH) || "mm";

    // Convert page dimensions to target unit for UI
    var docWidth = convertUnits(docWidthPt, "pt", defaultUnitStr);
    var docHeight = convertUnits(docHeightPt, "pt", defaultUnitStr);
    var bleedTop = convertUnits(docBleedTop, "pt", defaultUnitStr);
    var bleedBottom = convertUnits(docBleedBottom, "pt", defaultUnitStr);
    var bleedLeft = convertUnits(docBleedLeft, "pt", defaultUnitStr);
    var bleedRight = convertUnits(docBleedRight, "pt", defaultUnitStr);

    var scriptFile = new File(app.activeScript);
    var resourcesDir = new Folder(scriptFile.parent + "/RESOURCES");

    // ----------------------------------------------------
    // LOAD LAST PERSISTED SETTINGS & PRESETS
    // ----------------------------------------------------
    var settingsFile = new File(resourcesDir + "/Data/Settings.txt");
    var lastParams = null;
    if (settingsFile.exists) {
        settingsFile.encoding = "UTF-8";
        settingsFile.open("r");
        var content = settingsFile.read();
        settingsFile.close();
        try {
            lastParams = eval(content);
        } catch (e) { }
    }

    function getInitVal(prop, fallback) {
        if (lastParams && lastParams[prop] !== undefined) {
            return lastParams[prop];
        }
        return fallback;
    }

    var currentLang = getInitVal("lang", initialLang);
    loadLangTrans(currentLang, resourcesDir);
    var currentUnit = getInitVal("unitStr", defaultUnitStr);

    var paperSizes = [];
    function loadPaperSizes(unitSystem) {
        var filename = (unitSystem === "in") ? "PaperSizes_in.txt" : "PaperSizes.txt";
        var paperSizesFile = new File(resourcesDir + "/Data/" + filename);
        var sizes = [];
        var areaLabel = (currentLang === "ru") ? "Область спуска" : "Imposition Area";
        var customLabel = (currentLang === "ru") ? "Вручную" : "Custom";

        sizes.push({ name: areaLabel, w: 0, h: 0 });
        sizes.push({ name: customLabel, w: -1, h: -1 });

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
                    var w = parseSafeFloat(parts[1]);
                    var h = parseSafeFloat(parts[2]);
                    if (!isNaN(w) && !isNaN(h)) {
                        sizes.push({ name: name, w: w, h: h });
                    }
                }
            }
            paperSizesFile.close();
        } else {
            // Fallback formats
            var fallbackSizes;
            if (unitSystem === "in") {
                fallbackSizes = [
                    { name: "Tabloid Extra (13x19)", w: 13, h: 19 },
                    { name: "Digital Press (12x18)", w: 12, h: 18 },
                    { name: "Tabloid (11x17)", w: 11, h: 17 },
                    { name: "Letter (8.5x11)", w: 8.5, h: 11 }
                ];
            } else {
                fallbackSizes = [
                    { name: "SRA3 (320x450)", w: 320, h: 450 },
                    { name: "SRA3+ (320x460)", w: 320, h: 460 },
                    { name: "SRA3++ (320x464)", w: 320, h: 464 },
                    { name: "SRA2 (450x640)", w: 450, h: 640 },
                    { name: "A3 (297x420)", w: 297, h: 420 },
                    { name: "A4 (210x297)", w: 210, h: 297 }
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
                    var thick = parseSafeFloat(parts[2]);
                    if (!isNaN(thick)) {
                        names.push(name);
                        thicknesses.push(thick);
                    }
                }
            }
            paperWeightsFile.close();
        }

        // Fallbacks if empty or file doesn't exist
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
        } catch (e) {
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

        files.sort(function (a, b) {
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

        btnPrev.onClick = function () {
            currentImgIdx = (currentImgIdx - 1 + files.length) % files.length;
            updateDisplay();
        };

        btnNext.onClick = function () {
            currentImgIdx = (currentImgIdx + 1) % files.length;
            updateDisplay();
        };

        btnClose.onClick = function () {
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

    var win = new Window("dialog", translations[currentLang].title);
    win.alignChildren = "fill";

    // Header Group (Document Info, Language)
    // Header Group (Document Info, Language, Import PDF)
    var headerGroup = win.add("group");
    headerGroup.orientation = "row";
    headerGroup.alignChildren = ["left", "center"];
    headerGroup.spacing = 10;

    var btnImportPDF = headerGroup.add("button", undefined, translations[currentLang].btn_import_pdf || "Import PDF / Импорт PDF");
    btnImportPDF.preferredSize = [110, 26];

    btnImportPDF.preferredSize = [95, 26];
    var infoText = formatHeaderDocInfoText(docName, docPgsCount, docWidth, docHeight, defaultUnitStr, bleedLeft, currentLang);
    var txtDocInfo = headerGroup.add("statictext", undefined, infoText);
    txtDocInfo.preferredSize = [780, 24];
    txtDocInfo.alignment = ["left", "center"];

    btnImportPDF.onClick = function () {
        var filterPattern = (File.fs === "Windows") ? "*.pdf" : function (f) { return (f instanceof Folder) || /\.pdf$/i.test(f.name); };
        var openDialogTitle = translations[currentLang].select_pdf || "Select PDF file for imposition";
        var selectedPdf = File.openDialog(openDialogTitle, filterPattern);
        if (!selectedPdf || !selectedPdf.exists) return;

        var res = importPdfAndCreateDoc(selectedPdf, lastParams, resourcesDir);
        if (!res || !res.srcDoc) return;

        if (isTempImportedDoc && srcDoc) {
            try { srcDoc.close(SaveOptions.NO); } catch (e) { }
        }

        srcDoc = res.srcDoc;
        isTempImportedDoc = true;
        selectedPdfFile = res.selectedPdf;
        docName = getQiDocName(res.selectedPdf, res.srcDoc);
        docPgsCount = res.pdfPageCount;

        var savedH = srcDoc.viewPreferences.horizontalMeasurementUnits;
        var savedV = srcDoc.viewPreferences.verticalMeasurementUnits;
        var savedRuler = srcDoc.viewPreferences.rulerOrigin;
        srcDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        srcDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
        srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

        docWidthPt = srcDoc.documentPreferences.pageWidth;
        docHeightPt = srcDoc.documentPreferences.pageHeight;
        docBleedTop = srcDoc.documentPreferences.documentBleedTopOffset;
        docBleedBottom = srcDoc.documentPreferences.documentBleedBottomOffset;
        docBleedLeft = srcDoc.documentPreferences.documentBleedInsideOrLeftOffset;
        docBleedRight = srcDoc.documentPreferences.documentBleedOutsideOrRightOffset;

        srcDoc.viewPreferences.horizontalMeasurementUnits = savedH;
        srcDoc.viewPreferences.verticalMeasurementUnits = savedV;
        srcDoc.viewPreferences.rulerOrigin = savedRuler;

        var activeUnit = (typeof unitsDropdown !== "undefined" && unitsDropdown.selection) ? unitsDropdown.selection.text : currentUnit;
        docWidth = convertUnits(docWidthPt, "pt", activeUnit);
        docHeight = convertUnits(docHeightPt, "pt", activeUnit);
        bleedLeft = convertUnits(docBleedLeft, "pt", activeUnit);
        bleedRight = convertUnits(docBleedRight, "pt", activeUnit);
        bleedTop = convertUnits(docBleedTop, "pt", activeUnit);
        bleedBottom = convertUnits(docBleedBottom, "pt", activeUnit);

        txtDocInfo.text = formatHeaderDocInfoText(docName, docPgsCount, docWidth, docHeight, activeUnit, bleedLeft, currentLang);
        txtDocInfo.preferredSize = [780, 24];

        if (typeof editMarginLeft !== "undefined") editMarginLeft.text = bleedLeft.toFixed(getDecimalsForUnit(activeUnit));
        if (typeof editMarginTop !== "undefined") editMarginTop.text = bleedTop.toFixed(getDecimalsForUnit(activeUnit));
        if (typeof editMarginRight !== "undefined") editMarginRight.text = bleedRight.toFixed(getDecimalsForUnit(activeUnit));
        if (typeof editMarginBottom !== "undefined") editMarginBottom.text = bleedBottom.toFixed(getDecimalsForUnit(activeUnit));

        currentSheetIdx = 0;
        if (typeof updateWorkStyleOptions === "function") updateWorkStyleOptions();
        if (typeof recalculateSequence === "function") recalculateSequence();
        if (typeof updateSheetSize === "function") updateSheetSize();
        if (typeof updateNav === "function") updateNav();
    };
    // Language selection
    var grpLang = headerGroup.add("group");
    grpLang.alignment = ["right", "center"];
    uiLabels.lblLang = grpLang.add("statictext", undefined, translations[currentLang].lbl_lang);

    var langDropdownNames = [];
    for (var l = 0; l < langList.length; l++) {
        langDropdownNames.push(langList[l].name);
    }
    var langDropdown = grpLang.add("dropdownlist", undefined, langDropdownNames);

    var defaultLangIdx = 1; // English default
    for (var l = 0; l < langList.length; l++) {
        if (langList[l].code === currentLang) {
            defaultLangIdx = l;
            break;
        }
    }
    langDropdown.selection = defaultLangIdx;

    // Main Columns Layout
    mainGroup = win.add("group");
    mainGroup.orientation = "row";
    mainGroup.alignChildren = ["fill", "top"];
    mainGroup.spacing = 15;

    // --- COLUMN 1: LIVE PREVIEW COLUMN (FAR LEFT) ---
    if (!mainGroup || !mainGroup.add) { mainGroup = win.add("group"); mainGroup.orientation = "row"; mainGroup.alignChildren = ["fill", "top"]; mainGroup.spacing = 15; }
    var previewCol = mainGroup.add("group");
    previewCol.orientation = "column";
    previewCol.alignChildren = ["fill", "top"];
    previewCol.spacing = 6;
    previewCol.preferredSize.width = 430;

    var grpPreviewHeader = previewCol.add("group");
    grpPreviewHeader.orientation = "column";
    grpPreviewHeader.alignChildren = ["left", "top"];
    grpPreviewHeader.spacing = 2;

    var lblSheetInfo = grpPreviewHeader.add("statictext", undefined, "");
    lblSheetInfo.preferredSize.width = 430;
    var lblImpAreaInfo = grpPreviewHeader.add("statictext", undefined, "");
    lblImpAreaInfo.preferredSize.width = 430;
    var lblGridInfo = grpPreviewHeader.add("statictext", undefined, "");
    lblGridInfo.preferredSize.width = 430;

    var canvasW = 430;
    var canvasH = 490;
    var canvasGroup = previewCol.add("group");
    canvasGroup.preferredSize = [canvasW, canvasH];
    canvasGroup.minimumSize = [canvasW, canvasH];
    canvasGroup.maximumSize = [canvasW, canvasH];
    canvasGroup.size = [canvasW, canvasH];
    canvasGroup.alignment = ["center", "top"];

    // Navigation Controls
    var navGroup = previewCol.add("group");
    navGroup.orientation = "row";
    navGroup.alignChildren = ["center", "center"];
    navGroup.spacing = 15;
    navGroup.alignment = ["center", "top"];

    btnFirstSheet = navGroup.add("button", undefined, "«");
    btnFirstSheet.preferredSize = [30, 26];

    btnPrevSheet = navGroup.add("button", undefined, "◀");
    btnPrevSheet.preferredSize = [30, 26];

    lblSheetNav = navGroup.add("statictext", undefined, "");
    lblSheetNav.preferredSize.width = 270;
    lblSheetNav.justify = "center";

    btnNextSheet = navGroup.add("button", undefined, "▶");
    btnNextSheet.preferredSize = [30, 26];

    btnLastSheet = navGroup.add("button", undefined, "»");
    btnLastSheet.preferredSize = [30, 26];

    btnFirstSheet.onClick = function () {
        if (currentSheetIdx > 0) {
            currentSheetIdx = 0;
            updateNav();
        }
    };
    btnPrevSheet.onClick = function () {
        if (currentSheetIdx > 0) {
            currentSheetIdx--;
            updateNav();
        }
    };
    btnNextSheet.onClick = function () {
        if (currentSheetIdx < activeSheets.length - 1) {
            currentSheetIdx++;
            updateNav();
        }
    };
    btnLastSheet.onClick = function () {
        if (activeSheets.length > 0 && currentSheetIdx < activeSheets.length - 1) {
            currentSheetIdx = activeSheets.length - 1;
            updateNav();
        }
    };

    // Preview Theme Selection Control (Dark / Light)
    var grpTheme = previewCol.add("group");
    grpTheme.orientation = "row";
    grpTheme.alignChildren = ["center", "center"];
    grpTheme.spacing = 8;
    grpTheme.alignment = ["center", "top"];

    var trObj = translations[currentLang] || translations["ru"] || translations["en"] || {};
    var lblPreviewTheme = grpTheme.add("statictext", undefined, (trObj.lbl_preview_theme || "Тема превью:"));
    ddlPreviewTheme = grpTheme.add("dropdownlist", undefined, [(trObj.theme_dark || "Темная"), (trObj.theme_light || "Светлая")]);
    ddlPreviewTheme.preferredSize = [130, 24];

    var initThemeIdx = getInitVal("previewThemeIdx", 0);
    ddlPreviewTheme.selection = (initThemeIdx === 1) ? 1 : 0;

    ddlPreviewTheme.onChange = function () {
        if (typeof canvasGroup !== "undefined" && typeof canvasGroup.hide !== "undefined") {
            canvasGroup.hide();
            canvasGroup.show();
        }
        try {
            var settingsFolder = new Folder(resourcesDir + "/Data");
            if (!settingsFolder.exists) settingsFolder.create();
            var sFile = new File(settingsFolder + "/Settings.txt");
            var params = (typeof collectUIParameters === "function") ? collectUIParameters() : {};
            params.previewThemeIdx = ddlPreviewTheme.selection ? ddlPreviewTheme.selection.index : 0;
            sFile.encoding = "UTF-8";
            sFile.open("w");
            sFile.write(params.toSource());
            sFile.close();
        } catch (eThemeSave) { }
    };

    function getSystemBgColor(winContainer) {
        try {
            if (winContainer && winContainer.graphics && winContainer.graphics.backgroundColor) {
                var bgc = winContainer.graphics.backgroundColor;
                if (bgc.color && bgc.color.length >= 3) {
                    return [bgc.color[0], bgc.color[1], bgc.color[2], (bgc.color.length > 3 ? bgc.color[3] : 1)];
                }
            }
        } catch (e1) {}

        try {
            if (typeof app !== "undefined" && app.properties && app.properties.kuiBrightnessLevel !== undefined) {
                var kui = String(app.properties.kuiBrightnessLevel).toLowerCase();
                if (kui.indexOf("light") !== -1) return [0.941, 0.941, 0.941, 1];
                if (kui.indexOf("dark") !== -1) return [0.212, 0.212, 0.212, 1];
            }
        } catch (e2) {}

        try {
            if (typeof app !== "undefined" && app.generalPreferences && app.generalPreferences.uiBrightnessPreference !== undefined) {
                var pref = app.generalPreferences.uiBrightnessPreference;
                if (typeof UIBrightnessPreference !== "undefined") {
                    if (pref === UIBrightnessPreference.LIGHT) return [0.941, 0.941, 0.941, 1];
                    if (pref === UIBrightnessPreference.MEDIUM_LIGHT) return [0.8, 0.8, 0.8, 1];
                    if (pref === UIBrightnessPreference.MEDIUM_DARK) return [0.325, 0.325, 0.325, 1];
                    if (pref === UIBrightnessPreference.DARK) return [0.212, 0.212, 0.212, 1];
                }
                var pStr = String(pref).toLowerCase();
                if (pStr.indexOf("light") !== -1) return [0.941, 0.941, 0.941, 1];
                if (pStr.indexOf("dark") !== -1) return [0.212, 0.212, 0.212, 1];
            }
        } catch (e3) {}

        return [0.941, 0.941, 0.941, 1];
    }

    // Live Preview Drawing Logic
    canvasGroup.onDraw = function () {
        var g = this.graphics;
        var w = canvasW;
        var h = canvasH;

        // 1. Clear Canvas BG with selected theme background color (Dark or Light)
        g.newPath();
        var isDarkTheme = (!ddlPreviewTheme || !ddlPreviewTheme.selection || ddlPreviewTheme.selection.index === 0);
        var themeBgColor = isDarkTheme ? [0.2706, 0.2706, 0.2706, 1] : [0.941, 0.941, 0.941, 1]; // #454545
        var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, themeBgColor);
        g.rectPath(0, 0, w, h);
        g.fillPath(bgBrush);

        var sheetW = parseSafeFloat(editSheetWidth.text) || docWidth;
        var sheetH = parseSafeFloat(editSheetHeight.text) || docHeight;
        var impW = parseSafeFloat(editImpAreaWidth.text) || docWidth;
        var impH = parseSafeFloat(editImpAreaHeight.text) || docHeight;
        var cols = parseInt(editCols.text, 10) || 1;
        var rows = parseInt(editRows.text, 10) || 1;
        var mLeft = (typeof editMarginLeft !== "undefined" && editMarginLeft) ? (parseSafeFloat(editMarginLeft.text) || 0) : 0;
        var mTop = (typeof editMarginTop !== "undefined" && editMarginTop) ? (parseSafeFloat(editMarginTop.text) || 0) : 0;
        var mRight = (typeof editMarginRight !== "undefined" && editMarginRight) ? (parseSafeFloat(editMarginRight.text) || 0) : 0;
        var mBottom = (typeof editMarginBottom !== "undefined" && editMarginBottom) ? (parseSafeFloat(editMarginBottom.text) || 0) : 0;
        var sHoriz = (typeof editSpacingHoriz !== "undefined" && editSpacingHoriz) ? (parseSafeFloat(editSpacingHoriz.text) || 0) : 0;
        var sVert = (typeof editSpacingVert !== "undefined" && editSpacingVert) ? (parseSafeFloat(editSpacingVert.text) || 0) : 0;

        var margin = 25;
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

        // 5. Active Sheet Sequence & Grid
        var sheetObj = activeSheets[currentSheetIdx] || (activeSequence ? activeSequence.sheets[0] : null);
        var grid = sheetObj ? (sheetObj.front || sheetObj.back) : null;
        var isBack = sheetObj ? sheetObj.isBack : false;
        var impIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var rotateBacks = (typeof chkRotateBacks !== "undefined" && chkRotateBacks.value);

        if (activeSequence && activeSequence.pagesAcross && activeSequence.pagesDown) {
            cols = activeSequence.pagesAcross;
            rows = activeSequence.pagesDown;
        }

        var totalPgs = docPgsCount || 16;
        var docW = parseSafeFloat(docWidth) || 210;
        var docH = parseSafeFloat(docHeight) || 297;

        var cellBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.90, 0.94, 1.0, 0.7]);
        var emptyCellBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.95, 0.95, 0.95, 0.4]);
        var cellPen = g.newPen(g.PenType.SOLID_COLOR, [0.25, 0.5, 0.85, 1], 1);

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var cell = (grid && grid[r]) ? grid[r][c] : null;
                var pageNum = cell ? cell.pageNum : 0;
                var cellRotated = cell ? cell.rotated : false;
                if (isBack && rotateBacks) {
                    cellRotated = !cellRotated;
                }

                var bL = 0, bR = 0, bT = 0, bB = 0;
                if (typeof chkUseBleed !== "undefined" && chkUseBleed.value) {
                    var activeUnitStr = (typeof unitsDropdown !== "undefined" && unitsDropdown.selection) ? unitsDropdown.selection.text : defaultUnitStr;
                    bL = convertUnits(docBleedLeft, "pt", activeUnitStr);
                    bR = convertUnits(docBleedRight, "pt", activeUnitStr);
                    bT = convertUnits(docBleedTop, "pt", activeUnitStr);
                    bB = convertUnits(docBleedBottom, "pt", activeUnitStr);
                } else {
                    var valBleed = (typeof editBleedVal !== "undefined" && editBleedVal) ? (parseSafeFloat(editBleedVal.text) || 0) : 0;
                    bL = valBleed;
                    bR = valBleed;
                    bT = valBleed;
                    bB = valBleed;
                }

                var actualSHoriz = sHoriz;
                var actualSVert = sVert;
                var previewMTop = 0;
                var previewMLeft = 0;

                var isTwoPassPreview = (impIdx === 0 && typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection && foldSchemeDropdown.selection.index > 0);

                if (impIdx !== 0 && impIdx !== 1) {
                    actualSHoriz += (bL + bR);
                    actualSVert += (bT + bB);
                } else if (isTwoPassPreview) {
                    previewMTop = bT;
                    previewMLeft = bL;
                    actualSVert += (bT + bB);
                }

                var purHingeVal = (impIdx === 1 && typeof editPurHinge !== "undefined") ? (parseSafeFloat(editPurHinge.text) || 0) : 0;
                var spinesBefore = Math.floor(c / 2) + ((c % 2 === 1) ? 1 : 0);
                var extraShiftX = 0;
                if (impIdx === 1) {
                    if (cols === 1) {
                        var isBackPreview = (typeof isBack !== "undefined" && isBack);
                        extraShiftX = isBackPreview ? 0 : purHingeVal;
                    }
                    else {
                        var spinesBefore = Math.floor(c / 2) + ((c % 2 === 1) ? 1 : 0);
                        extraShiftX = spinesBefore * 2 * purHingeVal;
                    }
                }
                var gapsBefore = (impIdx === 0 || impIdx === 1) ? Math.floor(c / 2) : c;
                var canvasShiftX = 0;
                var calcShiftX = 0;
                if (typeof chkEnableCreep !== "undefined" && chkEnableCreep.value) {
                    var isOutward = (typeof creepDirDropdown !== "undefined" && creepDirDropdown.selection) ? (creepDirDropdown.selection.index === 1) : true;
                    var curShObj = (activeSheets && activeSheets[currentSheetIdx]) ? activeSheets[currentSheetIdx] : null;
                    var isDoubleSided = false;
                    if (activeSheets) {
                        for (var _i = 0; _i < activeSheets.length; _i++) {
                            if (activeSheets[_i].isBack) { isDoubleSided = true; break; }
                        }
                    }
                    var rawTotalSheetsCount = (activeSheets && activeSheets.length > 0) ? activeSheets.length : 1;
                    var totalSheetsCount = isDoubleSided ? Math.ceil(rawTotalSheetsCount / 2) : rawTotalSheetsCount;
                    var sigSize = (parseInt(editSheetsPerSig.text, 10) || 0);
                    if (sigSize <= 0) sigSize = totalSheetsCount;
                    var rawIdx = currentSheetIdx;
                    var sheetInSig = (curShObj && curShObj.sheetIndex !== undefined) ? curShObj.sheetIndex : (isDoubleSided ? Math.floor(currentSheetIdx / 2) : rawIdx);
                    if (sigSize > 0) sheetInSig = sheetInSig % sigSize;
                    var outerVal = (typeof editCreepOuter !== "undefined") ? (parseSafeFloat(editCreepOuter.text) || 0) : 0;

                    if (impIdx === 1) { // Perfect Bound logic
                        var kbcSigSize = (parseInt(editSheetsPerSig.text, 10) > 0) ? parseInt(editSheetsPerSig.text, 10) : totalSheetsCount;
                        var kbcSheetInSig = (kbcSigSize > 0) ? (sheetInSig % kbcSigSize) : sheetInSig;

                        if (cols === 1) {
                            var step = (outerVal !== 0 && kbcSigSize > 1) ? (outerVal / (kbcSigSize - 1)) : 0;
                            calcShiftX = kbcSheetInSig * step;
                            canvasShiftX = calcShiftX;
                            if (typeof isBack !== "undefined" && isBack) canvasShiftX = -canvasShiftX;
                        } else if (cols === 2) {
                            var pagesPerSig = kbcSigSize * 4;
                            var pNum = pageNum > 0 ? pageNum : 1;
                            var relPNum = ((pNum - 1) % pagesPerSig) + 1;
                            var maxUnits = (2 * kbcSigSize - 1);
                            var step = (outerVal !== 0 && maxUnits > 0) ? (outerVal / maxUnits) : 0;
                            var resetMode = (typeof chkResetTrimBleed !== "undefined" && chkResetTrimBleed.value);
                            if (c % 2 === 0) { // left page
                                canvasShiftX = -((relPNum - 2) / 2) * step;
                            } else { // right page
                                canvasShiftX = ((relPNum - 1) / 2) * step;
                            }
                            if (!isOutward) canvasShiftX = -canvasShiftX;
                        }
                    } else { // Saddle Stitch logic
                        var cInner = (typeof editCreepInner !== "undefined") ? (parseSafeFloat(editCreepInner.text) || 0) : 0;
                        var cOuter = (typeof editCreepOuter !== "undefined") ? (parseSafeFloat(editCreepOuter.text) || 0) : 0;
                        var currentCreep = 0;
                        if (cols >= 2) {
                            var pagesPerSig = sigSize * cols * rows * 2;
                            var pNum = pageNum > 0 ? pageNum : 1;
                            var relPNum = ((pNum - 1) % pagesPerSig) + 1;
                            var layer = (relPNum <= pagesPerSig / 2) ? Math.floor((relPNum - 1) / 2) : Math.floor((pagesPerSig - relPNum) / 2);
                            var maxLayer = (pagesPerSig / 4) - 1;
                            currentCreep = (maxLayer > 0) ? cOuter + (layer / maxLayer) * (cInner - cOuter) : cOuter;
                        } else {
                            if (sigSize > 1) {
                                currentCreep = cOuter + (sheetInSig / (sigSize - 1)) * (cInner - cOuter);
                            } else {
                                currentCreep = cOuter;
                            }
                        }
                        
                        if (c % 2 === 0) { // left page
                            canvasShiftX = currentCreep;
                        } else { // right page
                            canvasShiftX = -currentCreep;
                        }
                    }
                }

                var cX = iX + (previewMLeft + c * docW + gapsBefore * actualSHoriz + extraShiftX + canvasShiftX) * scale;
                var cY = iY + (previewMTop + r * (docH + actualSVert)) * scale;
                var cW = docW * scale;
                var cH = docH * scale;



                g.newPath();
                g.rectPath(cX, cY, cW, cH);
                if (pageNum > 0 && pageNum <= totalPgs) {
                    g.fillPath(cellBrush);
                } else {
                    g.fillPath(emptyCellBrush);
                }
                g.strokePath(cellPen);

                // Draw 2 PUR Hinge Glue Strip Overlay rectangles if active (Perfect Bound)
                var purHingeVal = (impIdx === 1 && typeof editPurHinge !== "undefined") ? (parseSafeFloat(editPurHinge.text) || 0) : 0;
                if (impIdx === 1 && purHingeVal > 0 && pageNum > 0 && pageNum <= totalPgs) {
                    var hingeW = purHingeVal * scale;
                    var isBackPreview = (typeof isBack !== "undefined" && isBack);
                    var hingeX = (cols === 1) ? (isBackPreview ? (cX + cW) : (cX - hingeW)) : ((c % 2 === 0) ? (cX + cW) : (cX - hingeW));
                    g.newPath();
                    g.rectPath(hingeX, cY, hingeW, cH);
                    var hingeBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1.0, 0.45, 0.15, 0.45]);
                    g.fillPath(hingeBrush);
                    var hingePen = g.newPen(g.PenType.SOLID_COLOR, [0.9, 0.3, 0.05, 0.9], 1.5);
                    g.strokePath(hingePen);
                }

                if (pageNum > 0 && pageNum <= totalPgs) {
                    var isLandscape = (cW > cH * 1.15);
                    var aThickness = Math.max(2.0, Math.min(4.5, (isLandscape ? cH : cW) * 0.035));
                    var aPen = g.newPen(g.PenType.SOLID_COLOR, [0.28, 0.35, 0.48, 0.9], aThickness);

                    if (isLandscape) {
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

                        g.newPath();
                        g.moveTo(bLeftX, bLeftY);
                        g.lineTo(apexX, apexY);
                        g.lineTo(bRightX, bRightY);
                        g.strokePath(aPen);

                        g.newPath();
                        g.moveTo(crossL, crossY);
                        g.lineTo(crossR, crossY);
                        g.strokePath(aPen);
                    } else {
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

                        g.newPath();
                        g.moveTo(bLeftX, bLeftY);
                        g.lineTo(apexX, apexY);
                        g.lineTo(bRightX, bRightY);
                        g.strokePath(aPen);

                        g.newPath();
                        g.moveTo(crossL, crossY);
                        g.lineTo(crossR, crossY);
                        g.strokePath(aPen);
                    }

                    var numStr = pageNum.toString();
                    drawVectorNumber(g, numStr, cX, cY, cW, cH, isLandscape);
                } else {
                    var isLandscape = (cW > cH * 1.15);
                    drawVectorNumber(g, "-", cX, cY, cW, cH, isLandscape);
                }
            }
        }

        // Draw red center line for KBC and Saddle Stitch 2-pages to visualize creep
        if ((impIdx === 1 || impIdx === 0) && cols === 2) {
            var centerX = iX + iW / 2;
            g.newPath();
            g.moveTo(centerX, sY);
            g.lineTo(centerX, sY + sH);
            var centerPen = g.newPen(g.PenType.SOLID_COLOR, [0.95, 0.15, 0.15, 1.0], 1.5);
            g.strokePath(centerPen);
        }
    };

    var activeSequence = null;
    var activeSheets = [];
    var currentSheetIdx = 0;

    function recalculateSequence() {
        var totalPgs = docPgsCount || 16;
        var cols = (typeof editCols !== "undefined") ? (parseInt(editCols.text, 10) || 1) : 1;
        var rows = (typeof editRows !== "undefined") ? (parseInt(editRows.text, 10) || 1) : 1;
        var impIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var sheetsPerSig = (typeof editSheetsPerSig !== "undefined") ? (parseInt(editSheetsPerSig.text, 10) || 0) : 0;

        if (impIdx === 0 || impIdx === 1) { // Saddle Stitch or Perfect Bound
            var foldScheme = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            activeSequence = generateFoldSchemeSequence(totalPgs, sheetsPerSig, foldScheme, (typeof workStyleDropdown !== "undefined" && workStyleDropdown.selection ? workStyleDropdown.selection.index : 0), (impIdx === 0));
        } else if (impIdx === 2) {
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            activeSequence = generateConsecutiveSequence(totalPgs, cols, rows, fsIdx === 1);
        } else if (impIdx === 3) {
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            activeSequence = generateCutStackSequence(totalPgs, cols, rows, fsIdx === 1);
        } else if (impIdx === 4) {
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            activeSequence = generateStepAndRepeatSequence(totalPgs, cols, rows, fsIdx === 1);
        } else {
            activeSequence = generateConsecutiveSequence(totalPgs, cols, rows, false);
        }

        activeSheets = [];
        if (activeSequence && activeSequence.sheets) {
            for (var i = 0; i < activeSequence.sheets.length; i++) {
                var sh = activeSequence.sheets[i];
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
        if (activeSheets.length === 0 && activeSequence && activeSequence.sheets) {
            activeSheets = activeSequence.sheets;
        }

        if (currentSheetIdx >= activeSheets.length) {
            currentSheetIdx = 0;
        }
    }

    function logPreview(msg) { }

    function updateNav() {
        if (!lblSheetNav || typeof editSheetWidth === "undefined") return;
        recalculateSequence();
        var t = (typeof translations !== "undefined" && typeof currentLang !== "undefined" && translations[currentLang]) ? translations[currentLang] : (translations ? translations["en"] : {});
        var curSheet = activeSheets[currentSheetIdx];
        var isBackSide = (curSheet && curSheet.isBack);
        var sideNum = isBackSide ? 2 : 1;
        var sideNameStr = isBackSide ? ((t && t.lbl_back) || "Оборотная") : ((t && t.lbl_front) || "Лицевая");

        var isSimplexMode = true;
        if (activeSheets && activeSheets.length > 0) {
            for (var k = 0; k < activeSheets.length; k++) {
                if (activeSheets[k] && activeSheets[k].isBack) {
                    isSimplexMode = false;
                    break;
                }
            }
        }

        var sheetNum, totalSheetsCount;
        if (isSimplexMode) {
            sheetNum = currentSheetIdx + 1;
            totalSheetsCount = Math.max(1, activeSheets.length);
        } else {
            sheetNum = Math.floor(currentSheetIdx / 2) + 1;
            totalSheetsCount = Math.max(1, Math.ceil(activeSheets.length / 2));
        }

        var sheetLabelStr = (t && t.lbl_sheet_nav) || (t && t.pnl_sheet) || "Лист";
        var ofStr = (t && t.lbl_of) || "из";
        var sideLabelStr = (t && t.lbl_side) || "Сторона";

        if (isSimplexMode) {
            lblSheetNav.text = sheetLabelStr + " " + sheetNum + " " + ofStr + " " + totalSheetsCount + "  —  " + sideLabelStr + " 1 (" + sideNameStr + ")";
        } else {
            lblSheetNav.text = sheetLabelStr + " " + sheetNum + " " + ofStr + " " + totalSheetsCount + "  —  " + sideLabelStr + " " + sideNum + " (" + sideNameStr + ")";
        }
        btnFirstSheet.enabled = (currentSheetIdx > 0);
        btnPrevSheet.enabled = (currentSheetIdx > 0);
        btnNextSheet.enabled = (currentSheetIdx < activeSheets.length - 1);
        btnLastSheet.enabled = (currentSheetIdx < activeSheets.length - 1);

        var sW = (parseSafeFloat(editSheetWidth.text) || docWidth).toFixed(1);
        var sH = (parseSafeFloat(editSheetHeight.text) || docHeight).toFixed(1);
        var iW = (parseSafeFloat(editImpAreaWidth.text) || docWidth).toFixed(1);
        var iH = (parseSafeFloat(editImpAreaHeight.text) || docHeight).toFixed(1);
        var cVal = parseInt(editCols.text, 10) || 1;
        var rVal = parseInt(editRows.text, 10) || 1;
        var uStr = unitsDropdown.selection ? unitsDropdown.selection.text : "mm";

        var pnlSheetText = (t.pnl_sheet || "Размер печатного листа").replace(/\s*\/.*$/, "");
        var pnlImpAreaText = (t.pnl_imp_area || "Размер области спуска").replace(/\s*\/.*$/, "");
        var colsText = (t.lbl_cols || "Колонки (Across)").replace(/:\s*$/, "");

        lblSheetInfo.text = pnlSheetText + ": " + sW + " × " + sH + " " + uStr;
        lblImpAreaInfo.text = pnlImpAreaText + ": " + iW + " × " + iH + " " + uStr;
        if (rVal > 1) {
            var gridLabelText = (t.pnl_grid || "Сетка").replace(/\s*\/.*$/, "");
            lblGridInfo.text = gridLabelText + " (Across × Down): " + cVal + " × " + rVal;
        } else {
            lblGridInfo.text = colsText + ": " + cVal + " × " + rVal;
        }

        try { canvasGroup.hide(); canvasGroup.show(); } catch (e) { }
        try { win.update(); } catch (e2) { }
    }

    // --- COLUMN 2: MIDDLE COLUMN ---
    if (!mainGroup || !mainGroup.add) { mainGroup = win.add("group"); mainGroup.orientation = "row"; mainGroup.alignChildren = ["fill", "top"]; mainGroup.spacing = 15; }
    var leftCol = mainGroup.add("group");
    leftCol.orientation = "column";
    leftCol.alignChildren = "fill";
    leftCol.spacing = 10;
    leftCol.preferredSize.width = 380;

    // --- COLUMN 3: RIGHT COLUMN ---
    if (!mainGroup || !mainGroup.add) { mainGroup = win.add("group"); mainGroup.orientation = "row"; mainGroup.alignChildren = ["fill", "top"]; mainGroup.spacing = 15; }
    var rightCol = mainGroup.add("group");
    rightCol.orientation = "column";
    rightCol.alignChildren = "fill";
    rightCol.spacing = 10;
    rightCol.preferredSize.width = 380;

    // --- MIDDLE COLUMN PANELS ---
    var pnlTypeUnits = leftCol.add("panel", undefined, "Imposition & Units / Спуск и Единицы                                ");
    pnlTypeUnits.alignChildren = "fill";

    var grpImpType = pnlTypeUnits.add("group");
    grpImpType.orientation = "row";
    grpImpType.alignChildren = ["fill", "center"];
    var impTypeDropdown = grpImpType.add("dropdownlist", undefined, translations[currentLang].imp_types);
    impTypeDropdown.preferredSize.width = 270;
    impTypeDropdown.selection = 0;

    var grpFoldScheme = pnlTypeUnits.add("group");
    grpFoldScheme.orientation = "row";
    grpFoldScheme.alignChildren = ["fill", "center"];
    var foldSchemeDropdown = grpFoldScheme.add("dropdownlist", undefined, translations[currentLang].fold_schemes);
    foldSchemeDropdown.preferredSize.width = 270;
    var initFoldScheme = getInitVal("foldScheme", 0);
    if (translations[currentLang].fold_schemes && initFoldScheme < translations[currentLang].fold_schemes.length) {
        foldSchemeDropdown.selection = initFoldScheme;
    } else {
        foldSchemeDropdown.selection = 0;
    }

    foldSchemeDropdown.onChange = function () {
        if (!foldSchemeDropdown.selection) return;
        var fsIdx = foldSchemeDropdown.selection.index;
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        if (selIdx === 0) { // Saddle Stitch
            if (fsIdx === 1) { editCols.text = "2"; editRows.text = "2"; }
            else if (fsIdx === 2 || fsIdx === 3) { editCols.text = "4"; editRows.text = "2"; }
            else if (fsIdx === 4) { editCols.text = "4"; editRows.text = "4"; }
            else { editCols.text = "2"; editRows.text = "1"; }
            editCols.enabled = false;
            editRows.enabled = false;
            editSpacingHoriz.enabled = false;
            editSpacingVert.enabled = (fsIdx > 0);
        } else if (selIdx === 1) { // Perfect Bound (КБС)
            if (fsIdx === 1) { editCols.text = "1"; editRows.text = "1"; }
            else { editCols.text = "2"; editRows.text = "1"; }
        }
        currentSheetIdx = 0;
        if (typeof updateWorkStyleOptions === "function") updateWorkStyleOptions();
        if (typeof recalculateSequence === "function") recalculateSequence();
        if (typeof toggleCreepPanel === "function") toggleCreepPanel();
        if (typeof toggleResetTrimBleed === "function") toggleResetTrimBleed();
        updateSheetSize();
        updateNav();
        if (typeof canvasGroup !== "undefined" && typeof canvasGroup.hide !== "undefined") {
            canvasGroup.hide();
            canvasGroup.show();
        }
    };

    var workStyleNames = [
        translations[currentLang].work_style_sheetwise || "Sheetwise (Свой-чужой оборот)",
        translations[currentLang].work_style_turn || "Work-and-Turn (Свой оборот)",
        translations[currentLang].work_style_tumble || "Work-and-Tumble (Свой клапан)"
    ];
    var grpWorkStyle = pnlTypeUnits.add("group");
    grpWorkStyle.orientation = "row";
    grpWorkStyle.alignChildren = ["fill", "center"];
    var workStyleDropdown = grpWorkStyle.add("dropdownlist", undefined, workStyleNames);
    workStyleDropdown.preferredSize.width = 270;
    var initWorkStyle = getInitVal("workStyle", 0);
    if (initWorkStyle < workStyleNames.length) {
        workStyleDropdown.selection = initWorkStyle;
    } else {
        workStyleDropdown.selection = 0;
    }
    workStyleDropdown.onChange = function () {
        updateNav();
        if (typeof updateCreepValues === "function") updateCreepValues();
        if (typeof canvasGroup !== "undefined" && typeof canvasGroup.hide !== "undefined") {
            canvasGroup.hide();
            canvasGroup.show();
        }
    };

    var btnExample = grpImpType.add("button", undefined, translations[currentLang].btn_example || "Пример");
    btnExample.preferredSize.width = 85;
    btnExample.alignment = ["right", "center"];
    btnExample.onClick = function () {
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        showExampleDialog(selIdx);
    };

    var grpUnits = pnlTypeUnits.add("group");
    grpUnits.spacing = 5;
    uiLabels.units = grpUnits.add("statictext", undefined, translations[currentLang].lbl_units);
    uiLabels.units.characters = 7;
    var unitsDropdown = grpUnits.add("dropdownlist", undefined, ["mm", "pt", "in"]);
    unitsDropdown.preferredSize.width = 75;
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

    var grpGridRow = pnlGrid.add("group");
    grpGridRow.orientation = "row";
    var editCols = addLabelAndEditInline(grpGridRow, translations[currentLang].lbl_cols, "2", 5, "cols");
    var editRows = addLabelAndEditInline(grpGridRow, translations[currentLang].lbl_rows, "1", 5, "rows");
    editCols.enabled = false;
    editRows.enabled = false;

    var pnlMargins = leftCol.add("panel", undefined, (translations[currentLang] && translations[currentLang].pnl_margins ? translations[currentLang].pnl_margins : "Margins of Imposition Area"));
    pnlMargins.alignChildren = "fill";

    var chkLinkMargins = pnlMargins.add("checkbox", undefined, (translations[currentLang] && translations[currentLang].chk_link_margins ? translations[currentLang].chk_link_margins : "Uniform Margins"));
    chkLinkMargins.value = getInitVal("linkMargins", true);
    chkLinkMargins.helpTip = (translations[currentLang] && translations[currentLang].tip_link_margins ? translations[currentLang].tip_link_margins : "Link all 4 margins (uniform values)");

    var grpMarg1 = pnlMargins.add("group");
    var editMarginLeft = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_left, bleedLeft.toFixed(1), 5, "marginLeft");
    var editMarginTop = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_top, bleedTop.toFixed(1), 5, "marginTop");
    var grpMarg2 = pnlMargins.add("group");
    var editMarginRight = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_right, bleedRight.toFixed(1), 5, "marginRight");
    var editMarginBottom = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_bottom, bleedBottom.toFixed(1), 5, "marginBottom");

    function updateMarginLinking() {
        var isLinked = chkLinkMargins.value;
        editMarginTop.enabled = !isLinked;
        editMarginRight.enabled = !isLinked;
        editMarginBottom.enabled = !isLinked;

        if (isLinked) {
            var valStr = editMarginLeft.text;
            editMarginTop.text = valStr;
            editMarginRight.text = valStr;
            editMarginBottom.text = valStr;
            if (typeof updateSheetSize === "function" && typeof editSpacingHoriz !== "undefined" && editSpacingHoriz) {
                updateSheetSize();
            }
        }
    }

    chkLinkMargins.onClick = updateMarginLinking;

    editMarginLeft.onChanging = function () {
        if (chkLinkMargins.value) {
            var valStr = editMarginLeft.text;
            editMarginTop.text = valStr;
            editMarginRight.text = valStr;
            editMarginBottom.text = valStr;
            if (typeof updateSheetSize === "function" && typeof editSpacingHoriz !== "undefined" && editSpacingHoriz) {
                updateSheetSize();
            }
        }
    };

    editMarginLeft.onChange = function () {
        if (chkLinkMargins.value) {
            var valStr = editMarginLeft.text;
            editMarginTop.text = valStr;
            editMarginRight.text = valStr;
            editMarginBottom.text = valStr;
        }
        if (typeof updateSheetSize === "function" && typeof editSpacingHoriz !== "undefined" && editSpacingHoriz) {
            updateSheetSize();
        }
    };

    updateMarginLinking();
    var grpMarg3 = pnlMargins.add("group");
    var editPurHinge = addLabelAndEditInline(grpMarg3, translations[currentLang].lbl_pur_hinge || "PUR:", "0.0", 5, "purHinge");

    // Bind editPurHinge onChange
    editPurHinge.onChange = updateSheetSize;

    var pnlSpacing = leftCol.add("panel", undefined, "Spacings (Gaps) / Зазоры и распорки                                     ");
    pnlSpacing.alignChildren = "fill";
    var grpSpc = pnlSpacing.add("group");
    var editSpacingHoriz = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_horiz, "0.0", 5, "spacingHoriz");
    var editSpacingVert = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_vert, "0.0", 5, "spacingVert");

    // Imposition Area size
    var pnlImpArea = leftCol.add("panel", undefined, "Imposition Area Size / Размер области спуска                           ");
    pnlImpArea.alignChildren = "fill";
    var grpImpArea = pnlImpArea.add("group");
    var editImpAreaWidth = addLabelAndEditInline(grpImpArea, translations[currentLang].lbl_imp_width, "0", 5, "impAreaWidth");
    var editImpAreaHeight = addLabelAndEditInline(grpImpArea, translations[currentLang].lbl_imp_height, "0", 5, "impAreaHeight");
    editImpAreaWidth.enabled = false;
    editImpAreaHeight.enabled = false;

    var grpResetTrim = pnlImpArea.add("group");
    grpResetTrim.orientation = "row";
    grpResetTrim.alignChildren = "left";
    grpResetTrim.spacing = 2;
    var chkResetTrimBleed = grpResetTrim.add("checkbox", undefined, translations[currentLang].chk_reset_trim_bleed || "Reset Trim + Bleed");
    chkResetTrimBleed.value = false;
    chkResetTrimBleed.onClick = function () {
        if (chkResetTrimBleed.value) {
            if (typeof chkInfoSlug !== "undefined") chkInfoSlug.value = false;
            if (typeof chkMarksOn !== "undefined") {
                chkMarksOn.value = false;
                if (typeof chkMarksOn.onClick === "function") {
                    try { chkMarksOn.onClick(); } catch (e) { }
                }
            }
            if (typeof chkSheetBleed !== "undefined") chkSheetBleed.value = false;
        }
        toggleResetTrimBleed();
        updateSheetSize();
    };

    // Target sheet size
    var pnlSheet = leftCol.add("panel", undefined, "Print Sheet Size / Размер печатного листа                             ");
    pnlSheet.alignChildren = "fill";

    var grpSheetDropdown = pnlSheet.add("group");
    grpSheetDropdown.spacing = 5;
    uiLabels.sheetFormat = grpSheetDropdown.add("statictext", undefined, translations[currentLang].lbl_sheet_format);
    var sheetDropdown = grpSheetDropdown.add("dropdownlist", undefined, paperNames);
    sheetDropdown.selection = 0;
    sheetDropdown.preferredSize.width = 152;

    var btnEditPaperSizes = grpSheetDropdown.add("button", undefined, "\uD83D\uDCC4"); // 📄 icon
    btnEditPaperSizes.preferredSize = [22, 22];
    btnEditPaperSizes.helpTip = "Редактировать список форматов бумаги";
    btnEditPaperSizes.onClick = function () {
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
    grpSheetCustom.spacing = 3;
    var editSheetWidth = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_width, "0", 5, "sheetWidth");
    var editSheetHeight = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_height, "0", 5, "sheetHeight");
    editSheetWidth.preferredSize.width = 46;
    editSheetHeight.preferredSize.width = 46;
    editSheetWidth.enabled = false;
    editSheetHeight.enabled = false;

    var bleedLabelStr = (translations[currentLang] && translations[currentLang].chk_sheet_bleed) ? translations[currentLang].chk_sheet_bleed : "+ отступ";
    var chkSheetBleed = grpSheetCustom.add("checkbox", undefined, bleedLabelStr);
    chkSheetBleed.preferredSize.width = 125;
    chkSheetBleed.value = getInitVal("addSheetBleed", false);
    chkSheetBleed.onClick = updateSheetSize;

    // --- RIGHT COLUMN PANELS ---
    // Presets Panel
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

    // Creep Panel
    var pnlCreep = rightCol.add("panel", undefined, "Creep Shift / Сползание фальцовки                                      ");
    pnlCreep.alignChildren = "fill";

    var grpCreepTop = pnlCreep.add("group");
    grpCreepTop.orientation = "row";
    grpCreepTop.alignChildren = ["left", "center"];
    grpCreepTop.spacing = 15;
    var chkEnableCreep = grpCreepTop.add("checkbox", undefined, translations[currentLang].chk_enable_creep);
    chkEnableCreep.value = true;
    var chkShiftHinge = grpCreepTop.add("checkbox", undefined, translations[currentLang].chk_shift_hinge || "Сдвиг биговки");
    chkShiftHinge.value = true;
    chkShiftHinge.visible = false;

    var grpCompensate = pnlCreep.add("group");
    grpCompensate.orientation = "row";
    var chkCompensateThickness = grpCompensate.add("checkbox", undefined, translations[currentLang].chk_compensate_thickness || "Компенсировать толщину блока");
    chkCompensateThickness.value = false;
    var editCompensateCoeff = grpCompensate.add("edittext", undefined, "1.0");
    editCompensateCoeff.characters = 4;
    var editSheetsPerSig = addLabelAndEdit(pnlCreep, translations[currentLang].lbl_sheets_per_sig, "0", 5, "sheetsPerSig");

    var grpCover = pnlCreep.add("group");
    grpCover.orientation = "row";
    uiLabels.lblCover = grpCover.add("statictext", undefined, translations[currentLang].lbl_cover);
    uiLabels.lblCover.characters = 12;
    var coverDropdown = grpCover.add("dropdownlist", undefined, paperWeightNames);
    coverDropdown.selection = 0; // 300 g default
    coverDropdown.preferredSize.width = 150;

    var grpBlock = pnlCreep.add("group");
    grpBlock.orientation = "row";
    uiLabels.lblBlock = grpBlock.add("statictext", undefined, translations[currentLang].lbl_block);
    uiLabels.lblBlock.characters = 12;
    var blockDropdown = grpBlock.add("dropdownlist", undefined, paperWeightNames);
    blockDropdown.selection = 1; // 200 g default
    blockDropdown.preferredSize.width = 150;

    var btnEditPaperWeights = grpBlock.add("button", undefined, "\uD83D\uDCC4"); // 📄 icon
    btnEditPaperWeights.preferredSize = [22, 22];
    btnEditPaperWeights.helpTip = "Редактировать список плотностей бумаги";
    btnEditPaperWeights.onClick = function () {
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
    creepDirDropdown.selection = 0; // Inward default
    creepDirDropdown.preferredSize.width = 150;

    var grpCreepVals = pnlCreep.add("group");
    var editCreepOuter = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_outer, "0.0", 5, "creepOuter");
    var editCreepInner = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_inner, "0.6", 5, "creepInner");

    // Bleed Panel
    var pnlBleedOpts = rightCol.add("panel", undefined, "Bleed Options / Параметры вылетов                                      ");
    pnlBleedOpts.alignChildren = "fill";
    var chkUseBleed = pnlBleedOpts.add("checkbox", undefined, translations[currentLang].chk_use_bleed);
    chkUseBleed.value = true;

    var grpBleeds = pnlBleedOpts.add("group");
    var editBleedVal = addLabelAndEditInline(grpBleeds, translations[currentLang].lbl_custom_bleed, bleedLeft.toFixed(1), 5, "customBleed");
    editBleedVal.enabled = false;

    chkUseBleed.onClick = function () {
        editBleedVal.enabled = !chkUseBleed.value;
        updateSheetSize();
    };
    editBleedVal.onChange = updateSheetSize;

    // Crop Marks Panel
    var pnlMarks = rightCol.add("panel", undefined, "Crop Marks / Метки реза                                               ");
    pnlMarks.alignChildren = "fill";
    var grpMarksChecks = pnlMarks.add("group");
    var chkMarksOn = grpMarksChecks.add("checkbox", undefined, translations[currentLang].chk_marks_on);
    chkMarksOn.value = true;
    var chkDrawCenterMark = grpMarksChecks.add("checkbox", undefined, translations[currentLang].chk_center_mark || "Center");
    chkDrawCenterMark.value = false;

    var grpMarksLen = pnlMarks.add("group");
    var editMarkLength = addLabelAndEditInline(grpMarksLen, translations[currentLang].lbl_mark_length, "3.0", 5, "markLength");
    var editMarkThickness = addLabelAndEditInline(grpMarksLen, translations[currentLang].lbl_mark_thickness || "Thickness, pt:", "0.25", 5, "markThickness");

    var grpMarksOffset = pnlMarks.add("group");
    var editMarkOffsetTB = addLabelAndEditInline(grpMarksOffset, translations[currentLang].lbl_mark_offset_tb, "3.0", 5, "markOffsetTB");
    var editMarkOffsetLR = addLabelAndEditInline(grpMarksOffset, translations[currentLang].lbl_mark_offset_lr, "3.0", 5, "markOffsetLR");

    editMarkLength.enabled = true;
    editMarkThickness.enabled = true;
    editMarkOffsetTB.enabled = true; 
    editMarkOffsetLR.enabled = true; 
    chkDrawCenterMark.enabled = true;

    chkMarksOn.onClick = function () {
        var state = chkMarksOn.value;
        editMarkLength.enabled = state;
        editMarkThickness.enabled = state;
        var selIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        editMarkOffsetTB.enabled = state && selIdx !== 4; 
        editMarkOffsetLR.enabled = state && selIdx !== 4; 
        chkDrawCenterMark.enabled = state;
        if (typeof updateSheetSize === "function") updateSheetSize();
    };

    // PDF Export Preset Panel
    var pnlPdfExport = rightCol.add("panel", undefined, translations[currentLang].pnl_pdf_export || "PDF Export / Экспорт в PDF");
    pnlPdfExport.alignChildren = "fill";

    var grpPdfExportPreset = pnlPdfExport.add("group");
    grpPdfExportPreset.orientation = "row";
    grpPdfExportPreset.alignChildren = ["left", "center"];
    uiLabels.pdfExportPreset = grpPdfExportPreset.add("statictext", undefined, translations[currentLang].lbl_pdf_preset || "PDF Preset:");
    uiLabels.pdfExportPreset.characters = 10;

    var pdfPresetNamesList = getPdfPresetNames();
    var pdfExportPresetDropdown = grpPdfExportPreset.add("dropdownlist", undefined, pdfPresetNamesList);
    pdfExportPresetDropdown.preferredSize.width = 220;
    pdfExportPresetDropdown.selection = findDefaultPdfPresetIndex(pdfPresetNamesList);

    var chkJobReport = pnlPdfExport.add("checkbox", undefined, translations[currentLang].chk_job_report || "Создавать технический отчет (Job Report .txt)");
    chkJobReport.value = true;

    // Hyperlink helper
    function openURL(url) {
        try {
            var tempFile = new File(Folder.temp + "/imposition_redirect.html");
            tempFile.open("w");
            tempFile.write('<html><head><title>Redirecting...</title><script>window.location.replace("' + url + '");</script></head><body></body></html>');
            tempFile.close();
            tempFile.execute();
        } catch (e) { }
    }

    function makeHyperlink(parent, labelText, url) {
        var link = parent.add("statictext", undefined, labelText);
        link.preferredSize.height = 16;
        link.justify = "left";
        link.onDraw = function () {
            var g = this.graphics;
            var textPen = g.newPen(g.PenType.SOLID_COLOR, [0.75, 0.745, 0.75, 1], 1);
            var h = this.size.height || this.size[1];
            var textDim = g.measureString(this.text, g.font);
            var y = Math.max(0, (h - textDim.height) / 2);
            g.drawString(this.text, textPen, 0, y, g.font);
        };
        link.addEventListener("click", function () {
            openURL(url);
        });
        return link;
    }

    // Bottom Footer Group (Links on the left, Buttons on the right)
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

    var btnCancel = rightFooter.add("button", undefined, translations[currentLang].btn_cancel, { name: "cancel" });
    var btnImpose = rightFooter.add("button", undefined, translations[currentLang].btn_impose, { name: "ok" });

    // --- REACTIVE EVENTS & SHEET CALCULATION ---
    function updateSheetSize() {
        if (typeof editCols === "undefined" || !editCols || typeof editSpacingHoriz === "undefined" || !editSpacingHoriz || typeof editImpAreaWidth === "undefined" || !editImpAreaWidth) return;
        var cols = parseInt(editCols.text, 10) || 1;
        var rows = parseInt(editRows.text, 10) || 1;
        var w = parseSafeFloat(docWidth) || 0;
        var h = parseSafeFloat(docHeight) || 0;
        var mLeft = parseSafeFloat(editMarginLeft.text) || 0;
        var mTop = parseSafeFloat(editMarginTop.text) || 0;
        var mRight = parseSafeFloat(editMarginRight.text) || 0;
        var mBottom = parseSafeFloat(editMarginBottom.text) || 0;
        var sHoriz = parseSafeFloat(editSpacingHoriz.text) || 0;
        var sVert = parseSafeFloat(editSpacingVert.text) || 0;

        // Calculate bleed values in active unit
        var bL = 0, bR = 0, bT = 0, bB = 0;
        if (chkUseBleed.value) {
            var activeUnit = unitsDropdown.selection.text;
            bL = convertUnits(docBleedLeft, "pt", activeUnit);
            bR = convertUnits(docBleedRight, "pt", activeUnit);
            bT = convertUnits(docBleedTop, "pt", activeUnit);
            bB = convertUnits(docBleedBottom, "pt", activeUnit);
        } else {
            var val = parseSafeFloat(editBleedVal.text) || 0;
            bL = val;
            bR = val;
            bT = val;
            bB = val;
        }

        // For non-booklet modes, we inflate the spacing by the document bleeds
        // so the final visual gap matches the user's input.
        var impTypeIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var actualSHoriz = sHoriz;
        var actualSVert = sVert;
        if (impTypeIdx !== 0 && impTypeIdx !== 1) {
            actualSHoriz += (bL + bR);
            actualSVert += (bT + bB);
        }

        var purHinge = parseSafeFloat(editPurHinge.text) || 0;
        var impIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
        var colsVal = (typeof editCols !== "undefined") ? (parseInt(editCols.text, 10) || 1) : 1;
        var purHingeAdd = (impIdx === 1) ? (colsVal === 1 ? purHinge : purHinge * 2) : 0;

        var gapsBeforeTotal = (impIdx === 0 || impIdx === 1) ? Math.floor((cols - 1) / 2) : (cols - 1);
        var impW = cols * w + gapsBeforeTotal * actualSHoriz + purHingeAdd;
        var impH = rows * h + (rows - 1) * actualSVert;

        var isTwoPass = (impIdx === 0 && fsIdx > 0);
        if (isTwoPass) {
            var spreadW = (typeof interW !== "undefined" && interW > 0) ? interW : (2 * w + bL + bR);
            var spreadH = (typeof interH !== "undefined" && interH > 0) ? interH : (h + bT + bB);
            impW = (cols / 2) * spreadW + ((cols / 2) - 1) * actualSHoriz + purHingeAdd;
            impH = rows * spreadH + (rows - 1) * actualSVert;
        }

        editImpAreaWidth.text = impW.toFixed(2);
        editImpAreaHeight.text = impH.toFixed(2);

        // Update Sheet size if "Область спуска" is active
        if (sheetDropdown.selection && sheetDropdown.selection.index === 0) {
            var finalSheetW = impW;
            var finalSheetH = impH;
            if (impTypeIdx !== 0 && impTypeIdx !== 1 || (typeof chkResetTrimBleed !== "undefined" && !chkResetTrimBleed.value)) {
                finalSheetW += mLeft + mRight;
                finalSheetH += mTop + mBottom;
            }
            var expandSheet = chkSheetBleed.value || (typeof chkResetTrimBleed !== "undefined" && !chkResetTrimBleed.value && chkMarksOn.value);
            if (expandSheet) {
                var extraX = 0;
                var extraY = 0;
                var sBleedLR = (typeof editMarkOffsetLR !== "undefined") ? (parseSafeFloat(editMarkOffsetLR.text) || 3) : 3;
                var sBleedTB = (typeof editMarkOffsetTB !== "undefined") ? (parseSafeFloat(editMarkOffsetTB.text) || 3) : 3;
                
                if (chkSheetBleed.value) {
                    extraX += Math.max(sBleedLR, bL);
                    extraY += Math.max(sBleedTB, bT);
                }
                if (typeof chkResetTrimBleed !== "undefined" && !chkResetTrimBleed.value && chkMarksOn.value) {
                    var lenVal = parseSafeFloat(editMarkLength.text) || 3;
                    extraX += lenVal;
                    extraY += lenVal;
                }
                finalSheetW += (extraX * 2);
                finalSheetH += (extraY * 2);
            }
            updateSheetBleedLabel();
            editSheetWidth.text = finalSheetW.toFixed(2);
            editSheetHeight.text = finalSheetH.toFixed(2);
        }

        // Update Reset Trim + Bleed preview text
        if (typeof chkResetTrimBleed !== "undefined") {
            var trimW = impW;
            var trimH = impH;
            var bleedX = bL + bR; // Use actual bleed values instead of margins
            var bleedY = bT + bB;

            var baseText = (typeof translations !== "undefined" && translations[currentLang] && translations[currentLang].chk_reset_trim_bleed) ? translations[currentLang].chk_reset_trim_bleed : "Reset Trim + Bleed";
            chkResetTrimBleed.text = baseText + " (" + trimW.toFixed(1) + "+" + bleedX.toFixed(1) + " / " + trimH.toFixed(1) + "+" + bleedY.toFixed(1) + ")";
        }
        updateNav();
    }

    function getBlockLabelText(count, lang, is1x1KBC) {
        var t = (typeof translations !== "undefined" && translations && translations[lang]) ? translations[lang] : {};
        if (is1x1KBC) {
            if (lang === "ru") {
                var word = "полос";
                var lastDigit = count % 10;
                var lastTwoDigits = count % 100;
                if (lastDigit === 1 && lastTwoDigits !== 11) word = "полоса";
                else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) word = "полосы";
                return "Блок (" + count + " " + word + "):";
            }
            if (count === 1 && t.lbl_block_single) {
                return t.lbl_block_single.replace("{0}", count);
            } else if (t.lbl_block_multi) {
                return t.lbl_block_multi.replace("{0}", count);
            }
            var word = count === 1 ? "page" : "pages";
            return (t.lbl_block ? t.lbl_block.replace(":", "") : "Block") + " (" + count + " " + word + "):";
        }
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
        }
        if (count === 1 && t.lbl_block_sheet_single) {
            return t.lbl_block_sheet_single.replace("{0}", count);
        } else if (t.lbl_block_sheet_multi) {
            return t.lbl_block_sheet_multi.replace("{0}", count);
        }
        var word = count === 1 ? "sheet" : "sheets";
        return (t.lbl_block ? t.lbl_block.replace(":", "") : "Block") + " (" + count + " " + word + "):";
    }







    function formatHeaderDocInfoText(dName, dPgs, dW, dH, uStr, bVal, lang) {
        var tObj = (typeof translations !== "undefined" && translations && translations[lang]) ? translations[lang] : {};
        var fileLabel = tObj.file || "File: ";
        var pgsLabel = tObj.pages || " p.";
        var sizeLabel = tObj.size || "Size: ";
        var bleedsLabel = tObj.bleeds || "Bleed ";

        var safeW = (typeof dW === "number" && !isNaN(dW)) ? dW : (parseSafeFloat(dW) || 0);
        var safeH = (typeof dH === "number" && !isNaN(dH)) ? dH : (parseSafeFloat(dH) || 0);
        var safeB = (typeof bVal === "number" && !isNaN(bVal)) ? bVal : (parseSafeFloat(bVal) || 0);
        var safePgs = (dPgs !== undefined && dPgs !== null) ? dPgs : 0;
        var safeUnit = uStr || "mm";

        return fileLabel + (dName || "") + " (" + safePgs + pgsLabel + ")   |   " + sizeLabel + safeW.toFixed(1) + " × " + safeH.toFixed(1) + " " + safeUnit + " (" + bleedsLabel + safeB.toFixed(1) + ")";
    }

    function cleanFileName(nameOrFile) {
        if (!nameOrFile) return "";
        var str = (typeof nameOrFile === "string") ? nameOrFile : nameOrFile.name;
        try {
            str = File.decode(str);
        } catch (e) {
            try {
                str = decodeURI(str);
            } catch (e2) { }
        }
        str = str.replace(/_qi(\.[a-zA-Z0-9]+)?$/i, function (m, ext) {
            return ext || "";
        });
        return str;
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

    function safePlacePDF(rect, file, pageNum) {
        try {
            app.pdfPlacePreferences.pdfCrop = PDFCrop.cropBleed;
            app.pdfPlacePreferences.pageNumber = pageNum;
            return rect.place(file)[0];
        } catch (e) { }

        try {
            app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
            app.pdfPlacePreferences.pageNumber = pageNum;
            return rect.place(file)[0];
        } catch (e) { }

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
        } catch (e) { }
        finally {
            try {
                tempDoc.close(SaveOptions.NO);
            } catch (err) { }
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
            } catch (err) { }
        }
        return totalPages;
    }

    function importPdfAndCreateDoc(selectedPdf, lastParams, resourcesDir) {
        var lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "ru";
        if (typeof translations === "undefined" || !translations || !translations[lang]) {
            if (typeof loadLangTrans === "function") {
                loadLangTrans(lang, resourcesDir);
            }
        }
        var tObj = (typeof translations !== "undefined" && translations && translations[lang]) ? translations[lang] : {};

        var pdfDim = getPDFSize(selectedPdf);
        var pdfPageCount = countPDFPages(selectedPdf);

        var askPdfBleed = true;
        if (lastParams && lastParams.askPdfBleed !== undefined) {
            askPdfBleed = lastParams.askPdfBleed;
        }

        var tB = 3.0, bB = 3.0, iB = 3.0, oB = 3.0;
        var makeUniform = true;

        if (askPdfBleed) {
            var winBleed = new Window("dialog", tObj.title || "PDF Import Options");
            winBleed.orientation = "column";
            winBleed.alignChildren = ["fill", "top"];
            winBleed.spacing = 12;
            winBleed.margins = 16;

            var grpInfo = winBleed.add("panel", undefined, tObj.pnl_pdf_info || tObj.pnl_info || "PDF Information");
            grpInfo.orientation = "column";
            grpInfo.alignChildren = "left";
            grpInfo.spacing = 6;
            grpInfo.margins = 12;

            grpInfo.add("statictext", undefined, (tObj.lbl_file || "File: ") + cleanFileName(selectedPdf.name));
            grpInfo.add("statictext", undefined, (tObj.lbl_pages || "Pages: ") + pdfPageCount);
            grpInfo.add("statictext", undefined, (tObj.lbl_size || "Size: ") + pdfDim.width.toFixed(1) + " × " + pdfDim.height.toFixed(1) + " " + (tObj.unit_mm || "mm"));

            var pnlBleedInput = winBleed.add("panel", undefined, tObj.pnl_bleed_settings || tObj.pnl_bleed || "Bleed Settings");
            pnlBleedInput.orientation = "column";
            pnlBleedInput.alignChildren = "left";
            pnlBleedInput.spacing = 8;
            pnlBleedInput.margins = 12;

            var chkLinkBleeds = pnlBleedInput.add("checkbox", undefined, tObj.chk_link_bleeds || "Link Bleeds");
            chkLinkBleeds.value = true;

            var grpInput1 = pnlBleedInput.add("group");
            grpInput1.orientation = "row";
            grpInput1.add("statictext", undefined, (tObj.lbl_top || "Top") + ":");
            var editTop = grpInput1.add("edittext", undefined, "3.0");
            editTop.characters = 5;
            grpInput1.add("statictext", undefined, (tObj.lbl_bottom || "Bottom") + ":");
            var editBottom = grpInput1.add("edittext", undefined, "3.0");
            editBottom.characters = 5;

            var grpInput2 = pnlBleedInput.add("group");
            grpInput2.orientation = "row";
            grpInput2.add("statictext", undefined, (tObj.lbl_inside || "Inside") + ":");
            var editInside = grpInput2.add("edittext", undefined, "3.0");
            editInside.characters = 5;
            grpInput2.add("statictext", undefined, (tObj.lbl_outside || "Outside") + ":");
            var editOutside = grpInput2.add("edittext", undefined, "3.0");
            editOutside.characters = 5;

            var chkUniformAfter = pnlBleedInput.add("checkbox", undefined, tObj.chk_uniform_after || "Make Uniform After Import");
            chkUniformAfter.value = true;

            var grpInset = pnlBleedInput.add("group");
            grpInset.orientation = "row";
            grpInset.alignChildren = ["left", "center"];
            grpInset.spacing = 6;
            var chkInset = grpInset.add("checkbox", undefined, tObj.chk_fit_inset || "Fit with Inset:");
            chkInset.value = (lastParams && lastParams.pdfUseInset !== undefined) ? lastParams.pdfUseInset : false;
            var editInset = grpInset.add("edittext", undefined, String((lastParams && lastParams.pdfInsetVal !== undefined) ? lastParams.pdfInsetVal : "5.0"));
            editInset.characters = 4;
            editInset.enabled = chkInset.value;
            var lblInsetCalc = grpInset.add("statictext", undefined, "");
            lblInsetCalc.characters = 28;

            function updateInsetCalc() {
                var iVal = parseSafeFloat(editInset.text) || 0;
                var topB = parseSafeFloat(editTop.text) || 0;
                var diff = Math.round((iVal - topB) * 100) / 100;
                lblInsetCalc.text = " (" + iVal + " - " + topB + " = " + diff + " " + (tObj.unit_mm || "mm") + ")";
            }

            chkInset.onClick = function () {
                editInset.enabled = chkInset.value;
                lblInsetCalc.enabled = chkInset.value;
            };
            editInset.onChange = updateInsetCalc;
            editInset.onChanging = updateInsetCalc;

            var grpRotate = pnlBleedInput.add("group");
            grpRotate.orientation = "row";
            grpRotate.alignChildren = ["left", "center"];
            grpRotate.add("statictext", undefined, (tObj.lbl_auto_rotate || "Auto-rotate:"));
            var ddlRotate = grpRotate.add("dropdownlist", undefined, [
                tObj.opt_rotate_ccw || "Counter-clockwise (-90°)",
                tObj.opt_rotate_cw || "Clockwise (+90°)",
                tObj.opt_rotate_off || "Off"
            ]);
            var savedRotateIdx = 0;
            if (lastParams && lastParams.pdfAutoRotate !== undefined) {
                savedRotateIdx = lastParams.pdfAutoRotate;
            }
            ddlRotate.selection = savedRotateIdx;

            var txtTrimCalc = pnlBleedInput.add("statictext", undefined, "");
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
                var topB = parseSafeFloat(editTop.text) || 0;
                var botB = parseSafeFloat(editBottom.text) || 0;
                var insB = parseSafeFloat(editInside.text) || 0;
                var outB = parseSafeFloat(editOutside.text) || 0;

                var trimW = Math.max(1, pdfDim.width - insB - outB);
                var trimH = Math.max(1, pdfDim.height - topB - botB);
                txtTrimCalc.text = (tObj.lbl_trim_calc || "Trim: ") + trimW.toFixed(1) + " × " + trimH.toFixed(1) + " " + (tObj.unit_mm || "mm");
                updateInsetCalc();
            }

            editTop.onChange = handleTopChange;
            editBottom.onChange = updateTrimCalc;
            editInside.onChange = updateTrimCalc;
            editOutside.onChange = updateTrimCalc;

            updateBleedLinking();

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
            wrapCommaReplace(winBleed);

            var chkAskBleed = winBleed.add("checkbox", undefined, tObj.chk_ask_bleed || "Ask bleed every time");
            chkAskBleed.value = askPdfBleed;

            var grpBtns = winBleed.add("group");
            grpBtns.alignment = ["right", "center"];
            var btnCancel = grpBtns.add("button", undefined, tObj.btn_cancel || "Cancel", { name: "cancel" });
            var btnNext = grpBtns.add("button", undefined, tObj.btn_next || "Next ->", { name: "ok" });

            if (winBleed.show() !== 1) {
                return null;
            }

            tB = parseSafeFloat(editTop.text) || 0;
            bB = parseSafeFloat(editBottom.text) || 0;
            iB = parseSafeFloat(editInside.text) || 0;
            oB = parseSafeFloat(editOutside.text) || 0;
            makeUniform = chkUniformAfter.value;
            askPdfBleed = chkAskBleed.value;

            var rotateIdx = (ddlRotate && ddlRotate.selection) ? ddlRotate.selection.index : 0;
            if (!lastParams) lastParams = {};
            lastParams.pdfAutoRotate = rotateIdx;
            lastParams.pdfUseInset = chkInset.value;
            lastParams.pdfInsetVal = editInset.text;
        }

        var autoRotateMode = "ccw";
        if (lastParams && lastParams.pdfAutoRotate !== undefined) {
            if (lastParams.pdfAutoRotate === 1) autoRotateMode = "cw";
            else if (lastParams.pdfAutoRotate === 2) autoRotateMode = "off";
        }

        var applyInset = (typeof chkInset !== "undefined") ? (chkInset.value && parseSafeFloat(editInset.text) > 0) : ((lastParams && lastParams.pdfUseInset) || false);
        var insetVal = (typeof editInset !== "undefined") ? (parseSafeFloat(editInset.text) || 0) : ((lastParams && parseSafeFloat(lastParams.pdfInsetVal)) || 0);

        var trimW = Math.max(1, pdfDim.width - iB - oB);
        var trimH = Math.max(1, pdfDim.height - tB - bB);
        var targetUnitStr = (lastParams && lastParams.unitStr) ? lastParams.unitStr : "mm";
        var targetUnits = MeasurementUnits.MILLIMETERS;
        if (targetUnitStr === "pt") targetUnits = MeasurementUnits.POINTS;
        else if (targetUnitStr === "in") targetUnits = MeasurementUnits.INCHES;

        var docTrimW = convertUnits(trimW, "mm", targetUnitStr);
        var docTrimH = convertUnits(trimH, "mm", targetUnitStr);
        var d_inset = convertUnits(insetVal, "mm", targetUnitStr);
        
        var d_tB = convertUnits(tB, "mm", targetUnitStr);
        var d_bB = convertUnits(bB, "mm", targetUnitStr);
        var d_iB = convertUnits(iB, "mm", targetUnitStr);
        var d_oB = convertUnits(oB, "mm", targetUnitStr);

        var srcDoc = app.documents.add(false);
        srcDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
        srcDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
        srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

        srcDoc.documentPreferences.pagesPerDocument = pdfPageCount;
        srcDoc.documentPreferences.pageWidth = docTrimW;
        srcDoc.documentPreferences.pageHeight = docTrimH;
        srcDoc.documentPreferences.facingPages = false;

        srcDoc.documentPreferences.documentBleedUniformSize = makeUniform;
        if (makeUniform) {
            var maxB = Math.max(d_tB, d_bB, d_iB, d_oB);
            srcDoc.documentPreferences.documentBleedTopOffset = maxB;
            srcDoc.documentPreferences.documentBleedBottomOffset = maxB;
            srcDoc.documentPreferences.documentBleedInsideOrLeftOffset = maxB;
            srcDoc.documentPreferences.documentBleedOutsideOrRightOffset = maxB;
        } else {
            srcDoc.documentPreferences.documentBleedTopOffset = d_tB;
            srcDoc.documentPreferences.documentBleedBottomOffset = d_bB;
            srcDoc.documentPreferences.documentBleedInsideOrLeftOffset = d_iB;
            srcDoc.documentPreferences.documentBleedOutsideOrRightOffset = d_oB;
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
                var leftBleed = isOdd ? d_iB : d_oB;
                var rightBleed = isOdd ? d_oB : d_iB;

                var rectBounds = (applyInset && (docTrimW > d_inset * 2) && (docTrimH > d_inset * 2))
                    ? [d_inset, d_inset, docTrimH - d_inset, docTrimW - d_inset]
                    : [-d_tB, -leftBleed, docTrimH + d_bB, docTrimW + rightBleed];

                var frame = page.rectangles.add({
                    geometricBounds: rectBounds,
                    strokeWeight: 0,
                    strokeColor: "None",
                    fillColor: "None"
                });
                var pdfItem = safePlacePDF(frame, selectedPdf, pageNum);

                if (!pdfItem && frame.allGraphics && frame.allGraphics.length > 0) {
                    pdfItem = frame.allGraphics[0];
                }
                if (!pdfItem && frame.pdfs && frame.pdfs.length > 0) {
                    pdfItem = frame.pdfs[0];
                }

                if (pdfItem && autoRotateMode !== "off") {
                    var b = pdfItem.geometricBounds;
                    var itemW = Math.abs(b[3] - b[1]);
                    var itemH = Math.abs(b[2] - b[0]);

                    var isSlotLandscape = docTrimW > docTrimH;
                    var isPageLandscape = itemW > itemH;

                    if (Math.abs(itemW - itemH) > 0.5 && isSlotLandscape !== isPageLandscape) {
                        if (autoRotateMode === "cw") {
                            pdfItem.rotationAngle = -90;
                        } else {
                            // "ccw" default (counter-clockwise)
                            pdfItem.rotationAngle = 90;
                        }
                    }
                }

                if (applyInset && (docTrimW > d_inset * 2) && (docTrimH > d_inset * 2)) {
                    try {
                        frame.fit(FitOptions.PROPORTIONALLY);
                        frame.fit(FitOptions.CENTER_CONTENT);
                        frame.geometricBounds = [-d_tB, -leftBleed, docTrimH + d_bB, docTrimW + rightBleed];
                    } catch (eFit) {}
                } else {
                    try { frame.fit(FitOptions.CENTER_CONTENT); } catch (e) { }
                }
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

        if (!lastParams) lastParams = {};
        lastParams.pdfBleed = tB; // Save top bleed as reference if needed
        lastParams.askPdfBleed = askPdfBleed;

        return {
            srcDoc: srcDoc,
            selectedPdf: selectedPdf,
            pdfPageCount: pdfPageCount
        };
    }

    function updateSheetBleedLabel() {
        if (typeof chkSheetBleed === "undefined" || !chkSheetBleed) return;
        var bleedLabelStr = (translations[currentLang] && translations[currentLang].chk_sheet_bleed) ? translations[currentLang].chk_sheet_bleed : "+ отступ";
        chkSheetBleed.text = bleedLabelStr;
        chkSheetBleed.preferredSize.width = 120;
    }

    function updateBlockLabel() {
        if (!uiLabels.lblBlock) return;
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        var fsIdx = foldSchemeDropdown.selection ? foldSchemeDropdown.selection.index : 0;
        var is1x1KBC = (selIdx === 1 && fsIdx === 1);
        var sheetsPerSigVal = parseInt(editSheetsPerSig.text, 10) || 0;
        var count = 0;
        if (is1x1KBC) {
            count = (sheetsPerSigVal > 0) ? sheetsPerSigVal : Math.max(0, docPgsCount - 2);
        } else {
            var paddedPages = Math.ceil(docPgsCount / 4) * 4;
            var N = (sheetsPerSigVal > 0) ? sheetsPerSigVal : (paddedPages / 4);
            count = Math.max(0, N - 1);
        }
        uiLabels.lblBlock.text = getBlockLabelText(count, currentLang, is1x1KBC);
    }

    function toggleCreepPanel() {
        var selIdx = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        var isSaddleStitch = (selIdx === 0);
        var isPerfectBound = (selIdx === 1);
        var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
        var is1x1KBC = (selIdx === 1 && fsIdx === 1);
        var isClassicSaddleStitch = (selIdx === 0 && fsIdx === 0);

        chkEnableCreep.enabled = isSaddleStitch || isPerfectBound;

        var isBookletMode = (isSaddleStitch || isPerfectBound);
        var canResetTrimBleed = isBookletMode;
        if (selIdx === 0 && fsIdx === 1) { // Disable for Saddle Stitch 2x2
            canResetTrimBleed = false;
        }

        if (typeof chkResetTrimBleed !== "undefined") {
            chkResetTrimBleed.enabled = canResetTrimBleed;
            if (!canResetTrimBleed && chkResetTrimBleed.value) {
                chkResetTrimBleed.value = false;
                if (typeof updateSheetSize === "function") updateSheetSize();
            }
        }

        var state = (isSaddleStitch || isPerfectBound) && chkEnableCreep.value;

        editSheetsPerSig.enabled = isBookletMode;
        if (uiLabels.lblSheetsPerSig) {
            uiLabels.lblSheetsPerSig.enabled = isBookletMode;
        }

        coverDropdown.enabled = state;
        blockDropdown.enabled = state;
        if (isPerfectBound) {
            creepDirDropdown.selection = 1;
            creepDirDropdown.enabled = false;
        } else {
            creepDirDropdown.enabled = state;
        }
        btnEditPaperWeights.enabled = state;
        var is2x1KBC = (selIdx === 1 && fsIdx === 0);
        var isStackKBC = (is1x1KBC || is2x1KBC);

        chkCompensateThickness.enabled = state && !isStackKBC;
        chkCompensateThickness.visible = true;
        if (isStackKBC) chkCompensateThickness.value = false;
        editCompensateCoeff.enabled = state && chkCompensateThickness.value && !isStackKBC;
        editCompensateCoeff.visible = true;
        if (typeof chkShiftHinge !== "undefined") {
            chkShiftHinge.enabled = state && isStackKBC;
            chkShiftHinge.visible = isStackKBC;
        }
        editCreepOuter.enabled = state;
        editCreepInner.enabled = state && !isStackKBC;

        if (state) {
            updateCreepValues();
        } else {
            editCreepOuter.text = "0.0";
            editCreepInner.text = "0.0";
        }
    }

    function toggleResetTrimBleed() {
        var selIdx = (impTypeDropdown.selection ? impTypeDropdown.selection.index : 0);
        var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
        var isBookletMode = (selIdx === 0 || selIdx === 1);
        var canResetTrimBleed = isBookletMode;
        if (selIdx === 0 && fsIdx === 1) { // Disable for Saddle Stitch 2x2
            canResetTrimBleed = false;
        }
        
        chkResetTrimBleed.enabled = canResetTrimBleed;
        if (!canResetTrimBleed && chkResetTrimBleed.value) {
            chkResetTrimBleed.value = false;
        }

        if (chkResetTrimBleed.value) {
            if (typeof chkMarksOn !== "undefined") chkMarksOn.enabled = false;
            if (typeof chkUseBleed !== "undefined") chkUseBleed.enabled = false;
            if (typeof editBleedVal !== "undefined") editBleedVal.enabled = false;
            if (typeof chkInfoSlug !== "undefined") chkInfoSlug.enabled = false;
        } else {
            if (typeof chkMarksOn !== "undefined") chkMarksOn.enabled = true;
            if (typeof chkInfoSlug !== "undefined") chkInfoSlug.enabled = true;
            if (typeof chkUseBleed !== "undefined") {
                if (selIdx === 4) { // Step And Repeat
                    chkUseBleed.enabled = false;
                    if (typeof editBleedVal !== "undefined") editBleedVal.enabled = false;
                } else {
                    chkUseBleed.enabled = true;
                    if (typeof editBleedVal !== "undefined") editBleedVal.enabled = !chkUseBleed.value;
                }
            }
        }
    }

    function updateCreepValues() {
        updateBlockLabel();
        if (typeof isApplyingParams !== "undefined" && isApplyingParams) return;
        var selIdx = (impTypeDropdown.selection ? impTypeDropdown.selection.index : 0);
        var fsIdx = (foldSchemeDropdown && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
        var isSaddleStitch = (selIdx === 0);
        var isPerfectBound = (selIdx === 1);
        var is1x1KBC = (selIdx === 1 && fsIdx === 1);

        if ((!isSaddleStitch && !isPerfectBound) || !chkEnableCreep.value) {
            editCreepInner.text = "0.0";
            editCreepOuter.text = "0.0";
            return;
        }
        if (!coverDropdown.selection || !blockDropdown.selection || !creepDirDropdown.selection) return;

        var tCover = paperWeightThicknesses[coverDropdown.selection.index];
        var tBlock = paperWeightThicknesses[blockDropdown.selection.index];
        var isInwards = (creepDirDropdown.selection.index === 0);
        var activeUnit = unitsDropdown.selection.text;
        var decimals = getDecimalsForUnit(activeUnit);

        var is2x1KBC = (selIdx === 1 && fsIdx === 0);
        var isStackKBC = (is1x1KBC || is2x1KBC);

        if (isStackKBC) {
            var sheetsPerSigVal = parseInt(editSheetsPerSig.text, 10) || 0;
            var isDoubleSided = (typeof workStyleDropdown !== "undefined" && workStyleDropdown.selection && workStyleDropdown.selection.index === 0);
            var pagesPerPhysicalSheet = (is1x1KBC) ? (isDoubleSided ? 2 : 1) : (isDoubleSided ? 4 : 2);
            var actualTotalSheets = Math.ceil(docPgsCount / pagesPerPhysicalSheet);
            var totalSheetsCount = (sheetsPerSigVal > 0) ? sheetsPerSigVal : actualTotalSheets;
            var creepVal = (totalSheetsCount > 1) ? (totalSheetsCount - 1) * tBlock : 0;
            var convertedCreep = convertUnits(creepVal, "mm", activeUnit);
            editCreepInner.text = (0.0).toFixed(decimals);
            editCreepOuter.text = Math.abs(convertedCreep).toFixed(decimals);
            return;
        }

        var paddedPages = Math.ceil(docPgsCount / 4) * 4;
        var sheetsPerSigVal = parseInt(editSheetsPerSig.text, 10) || 0;
        var N = (sheetsPerSigVal > 0) ? sheetsPerSigVal : (paddedPages / 4);

        var creepVal = 0;
        if (N > 1) {
            creepVal = tCover + (N - 1) * tBlock;
        }

        var convertedCreep = convertUnits(creepVal, "mm", activeUnit);

        if (isInwards) {
            if (chkCompensateThickness.value) {
                var K = parseSafeFloat(editCompensateCoeff.text);
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
                var K = parseSafeFloat(editCompensateCoeff.text);
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

    // Hook layout changes
    var list = [editCols, editRows, editMarginLeft, editMarginTop, editMarginRight, editMarginBottom, editSpacingHoriz, editSpacingVert, editMarkOffsetTB, editMarkOffsetLR, editMarkLength, editMarkThickness];
    for (var j = 0; j < list.length; j++) {
        list[j].onChange = updateSheetSize;
    }

    chkEnableCreep.onClick = toggleCreepPanel;
    chkCompensateThickness.onClick = function () {
        editCompensateCoeff.enabled = chkEnableCreep.value && chkCompensateThickness.value;
        updateCreepValues();
    };
    editCompensateCoeff.onChange = updateCreepValues;
    editCreepOuter.onChanging = updateSheetSize;
    editCreepOuter.onChange = updateSheetSize;
    editCreepInner.onChanging = updateSheetSize;
    editCreepInner.onChange = updateSheetSize;
    coverDropdown.onChange = updateCreepValues;
    blockDropdown.onChange = updateCreepValues;
    creepDirDropdown.onChange = updateCreepValues;
    editSheetsPerSig.onChange = function () {
        updateCreepValues();
        updateSheetSize();
    };

    function updateFinalSheetSizeFromSelection() {
        if (!sheetDropdown.selection) return;
        var idx = sheetDropdown.selection.index;
        var paper = paperSizes[idx];

        if (paper.w === 0) { // "Область спуска" / "Imposition Area"
            editSheetWidth.enabled = false;
            editSheetHeight.enabled = false;
            orientationDropdown.enabled = false;
            if (typeof updateSheetSize === "function") updateSheetSize();
        } else if (paper.w === -1) { // "Вручную" / "Custom"
            editSheetWidth.enabled = true;
            editSheetHeight.enabled = true;
            orientationDropdown.enabled = true;
        } else { // Standard format loaded from file
            orientationDropdown.enabled = true;
            var currentUnit = unitsDropdown.selection.text;

            // Note: sizes in PaperSizes.txt are in mm, while in PaperSizes_in.txt they are in inches.
            var fileUnit = (currentUnit === "in") ? "in" : "mm";
            var wConverted = convertUnits(paper.w, fileUnit, currentUnit);
            var hConverted = convertUnits(paper.h, fileUnit, currentUnit);

            // Swap if Horizontal (first is wide side) or Vertical (first is narrow side)
            var isHoriz = (orientationDropdown.selection.index === 0);
            var finalW = isHoriz ? Math.max(wConverted, hConverted) : Math.min(wConverted, hConverted);
            var finalH = isHoriz ? Math.min(wConverted, hConverted) : Math.max(wConverted, hConverted);

            editSheetWidth.text = finalW.toFixed(2);
            editSheetHeight.text = finalH.toFixed(2);
            editSheetWidth.enabled = false;
            editSheetHeight.enabled = false;
        }
        updateNav();
    }

    sheetDropdown.onChange = updateFinalSheetSizeFromSelection;
    orientationDropdown.onChange = function () {
        var idx = sheetDropdown.selection.index;
        var paper = paperSizes[idx];
        if (paper.w === -1) {
            // Swap custom width and height if needed based on orientation toggle
            var w = parseSafeFloat(editSheetWidth.text) || 0;
            var h = parseSafeFloat(editSheetHeight.text) || 0;
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
        updateNav();
    };
    editSheetWidth.onChange = function () { updateNav(); };
    editSheetHeight.onChange = function () { updateNav(); };

    function updateFoldSchemeOptions() {
        if (typeof foldSchemeDropdown === "undefined" || !foldSchemeDropdown) return;
        var impIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var prevSel = foldSchemeDropdown.selection ? foldSchemeDropdown.selection.index : 0;
        var lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "ru";
        var t = (typeof translations !== "undefined" && translations && translations[lang]) ? translations[lang] : {};

        foldSchemeDropdown.removeAll();
        if (impIdx === 0) { // Saddle Stitch
            var fSchemes = t.fold_schemes || ["Авто (2 полосы на разворот)", "8-страничная брошюра (8 полос / 2 сгиба)"];
            for (var fsIdx = 0; fsIdx < fSchemes.length; fsIdx++) {
                foldSchemeDropdown.add("item", fSchemes[fsIdx]);
            }
            foldSchemeDropdown.enabled = true;
            if (prevSel < foldSchemeDropdown.items.length) foldSchemeDropdown.selection = prevSel;
            else foldSchemeDropdown.selection = 0;
        } else if (impIdx === 1) { // Perfect Bound (КБС)
            foldSchemeDropdown.add("item", t.kbc_layout_2x1 || "2 полосы на разворот");
            foldSchemeDropdown.add("item", t.kbc_layout_1x1 || "1 полоса");
            foldSchemeDropdown.enabled = true;
            if (prevSel < foldSchemeDropdown.items.length) foldSchemeDropdown.selection = prevSel;
            else foldSchemeDropdown.selection = 0;
        } else if (impIdx === 4) { // Step & Repeat
            foldSchemeDropdown.add("item", t.opt_duplex || "4+4 (Duplex)");
            foldSchemeDropdown.enabled = false;
            foldSchemeDropdown.selection = 0;
        } else {
            foldSchemeDropdown.add("item", t.opt_duplex || "4+4 (Duplex)");
            foldSchemeDropdown.add("item", t.opt_simplex || "4+0 (Simplex)");
            foldSchemeDropdown.enabled = true;
            if (prevSel < foldSchemeDropdown.items.length) foldSchemeDropdown.selection = prevSel;
            else foldSchemeDropdown.selection = 0;
        }
    }

    function updateWorkStyleOptions() {
        if (typeof workStyleDropdown === "undefined" || !workStyleDropdown) return;
        var impIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
        var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
        var prevSel = workStyleDropdown.selection ? workStyleDropdown.selection.index : 0;
        var lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "ru";
        var t = (typeof translations !== "undefined" && translations && translations[lang]) ? translations[lang] : {};

        workStyleDropdown.removeAll();
        if (impIdx === 1 && fsIdx === 1) { // Perfect Bound (КБС) - 1 полоса
            workStyleDropdown.add("item", t.work_style_44 || "4+4 (Двусторонний)");
            workStyleDropdown.add("item", t.work_style_40 || "4+0 (Односторонний)");
            workStyleDropdown.enabled = true;
        } else {
            workStyleDropdown.add("item", t.work_style_sheetwise || "Sheetwise (Свой-чужой оборот)");
            workStyleDropdown.add("item", t.work_style_turn || "Work-and-Turn (Свой оборот)");
            workStyleDropdown.add("item", t.work_style_tumble || "Work-and-Tumble (Клапан-хвост)");
            if (impIdx === 1 || impIdx === 0) { // Perfect Bound or Saddle Stitch
                workStyleDropdown.enabled = true;
            } else {
                workStyleDropdown.enabled = false;
            }
        }

        if (prevSel < workStyleDropdown.items.length) workStyleDropdown.selection = prevSel;
        else workStyleDropdown.selection = 0;
    }

    impTypeDropdown.onChange = function () {
        if (!impTypeDropdown.selection) return;
        currentSheetIdx = 0;
        var selIdx = impTypeDropdown.selection.index;
        logPreview("impTypeDropdown.onChange selIdx=" + selIdx + " (" + impTypeDropdown.selection.text + ")");
        updateFoldSchemeOptions();
        updateWorkStyleOptions();

        if (selIdx === 0) { // Saddle Stitch
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            if (fsIdx === 1) { editCols.text = "2"; editRows.text = "2"; }
            else if (fsIdx === 2 || fsIdx === 3) { editCols.text = "4"; editRows.text = "2"; }
            else if (fsIdx === 4) { editCols.text = "4"; editRows.text = "4"; }
            else { editCols.text = "2"; editRows.text = "1"; }
            pnlGrid.enabled = false;
            editCols.enabled = false;
            editRows.enabled = false;
            editSpacingHoriz.enabled = false;
            editSpacingVert.enabled = (fsIdx > 0);
            if (typeof editPurHinge !== "undefined") editPurHinge.enabled = false;
        } else if (selIdx === 1) { // Perfect Bound (КБС)
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            if (fsIdx === 1) {
                editCols.text = "1";
                editRows.text = "1";
            } else {
                editCols.text = "2";
                editRows.text = "1";
            }
            editSpacingHoriz.text = "0";
            editSpacingVert.text = "0";
            pnlGrid.enabled = false;
            editCols.enabled = false;
            editRows.enabled = false;
            editSpacingHoriz.enabled = false;
            editSpacingVert.enabled = false;
            if (typeof editPurHinge !== "undefined") editPurHinge.enabled = true;
        } else if (selIdx === 2 || selIdx === 3 || selIdx === 4) { // N Up Consecutive, Cut Stack, Step & Repeat
            pnlGrid.enabled = true;
            editCols.enabled = true;
            editRows.enabled = true;
            editSpacingHoriz.enabled = true;
            editSpacingVert.enabled = true;
            if (typeof editPurHinge !== "undefined") {
                editPurHinge.enabled = false;
                editPurHinge.text = "0";
            }
        }
        toggleCreepPanel();
        toggleResetTrimBleed();
        var marksState = typeof chkMarksOn !== "undefined" ? chkMarksOn.value : true;
        if (typeof editMarkOffsetTB !== "undefined") editMarkOffsetTB.enabled = marksState && selIdx !== 4;
        if (typeof editMarkOffsetLR !== "undefined") editMarkOffsetLR.enabled = marksState && selIdx !== 4;
        
        if (typeof chkUseBleed !== "undefined") {
            if (selIdx === 4) {
                chkUseBleed.value = true;
                chkUseBleed.enabled = false;
                if (typeof editBleedVal !== "undefined") editBleedVal.enabled = false;
            } else {
                chkUseBleed.enabled = true;
                if (typeof editBleedVal !== "undefined") editBleedVal.enabled = !chkUseBleed.value;
            }
        }
        
        updateSheetSize();
        updateNav();
    };

    isApplyingParams = false;

    function getDecimalsForUnit(unit) {
        if (unit === "in") return 3;
        if (unit === "pt") return 1;
        return 2; // mm
    }

    function convertField(field, fromUnit, toUnit) {
        var val = parseSafeFloat(field.text);
        if (isNaN(val)) return;
        var decimals = getDecimalsForUnit(toUnit);
        field.text = convertUnits(val, fromUnit, toUnit).toFixed(decimals);
    }

    unitsDropdown.onChange = function () {
        if (isApplyingParams) return;
        var oldUnit = currentUnit;
        var newUnit = unitsDropdown.selection.text;
        if (oldUnit === newUnit) return;

        currentUnit = newUnit;

        // 1. Convert doc dimensions
        docWidth = convertUnits(docWidthPt, "pt", newUnit);
        docHeight = convertUnits(docHeightPt, "pt", newUnit);

        // 2. Convert all numeric UI fields
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
        convertField(editMarkOffsetTB, oldUnit, newUnit);
        convertField(editMarkOffsetLR, oldUnit, newUnit);
        
        

        updateCreepValues();

        // 3. Re-load paper sizes based on system
        var system = (newUnit === "in") ? "in" : "mm";
        paperSizes = loadPaperSizes(system);

        // Update dropdown options
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

    langDropdown.onChange = function () {
        if (isApplyingParams) return;
        var lang = langList[langDropdown.selection.index].code;
        applyLanguage(lang);
    };

    // Preset Action Handlers
    btnSavePreset.onClick = function () {
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

            // Refresh load dropdown list
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
        } catch (e) {
            alert((translations[currentLang].alert_err_save_preset || "Error saving preset:\n") + e);
        }
    };

    btnLoadPreset.onClick = function () {
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
                // alert removed as requested
            } catch (e) {
                alert((translations[currentLang].alert_err_load_preset || "Error loading preset:\n") + e);
            }
        }
    };

    btnDeletePreset.onClick = function () {
        var t = translations[currentLang] || translations["en"];
        if (!loadDropdown.selection) {
            alert(t.alert_preset_empty_del || "Нет сохраненных настроек для удаления.");
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
                // alert removed as requested
            } catch (e) {
                alert((t.alert_err_delete_preset || "Error deleting preset:\n") + e);
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
            enableCreep: (impTypeDropdown.selection && (impTypeDropdown.selection.index === 0 || impTypeDropdown.selection.index === 1)) && chkEnableCreep.value,
            shiftHinge: (typeof chkShiftHinge !== "undefined") ? chkShiftHinge.value : true,
            compensateThickness: chkCompensateThickness.value,
            compensateCoeff: parseSafeFloat(editCompensateCoeff.text) || 1.0,
            coverPaperIndex: coverDropdown.selection ? coverDropdown.selection.index : 0,
            blockPaperIndex: blockDropdown.selection ? blockDropdown.selection.index : 1,
            creepDirectionIndex: creepDirDropdown.selection ? creepDirDropdown.selection.index : 0,
            cols: parseInt(editCols.text, 10) || 2,
            rows: parseInt(editRows.text, 10) || 1,
            marginLeft: parseSafeFloat(editMarginLeft.text) || 0,
            marginTop: parseSafeFloat(editMarginTop.text) || 0,
            marginRight: parseSafeFloat(editMarginRight.text) || 0,
            marginBottom: parseSafeFloat(editMarginBottom.text) || 0,
            linkMargins: (typeof chkLinkMargins !== "undefined" && chkLinkMargins) ? chkLinkMargins.value : true,
            spacingHoriz: parseSafeFloat(editSpacingHoriz.text) || 0,
            spacingVert: parseSafeFloat(editSpacingVert.text) || 0,
            impWidth: parseSafeFloat(editImpAreaWidth.text) || 0,
            impHeight: parseSafeFloat(editImpAreaHeight.text) || 0,
            purHinge: parseSafeFloat(editPurHinge.text) || 0,
            resetTrimBleed: chkResetTrimBleed.value,
            addSheetBleed: chkSheetBleed.value,
            sheetBleedVal: 3,

            // Sheet
            previewThemeIdx: (typeof ddlPreviewTheme !== "undefined" && ddlPreviewTheme.selection) ? ddlPreviewTheme.selection.index : 0,
            sheetSelectionIndex: sheetDropdown.selection.index,
            orientationIndex: orientationDropdown.selection.index,
            sheetWidth: (sheetDropdown.selection && sheetDropdown.selection.index === 0) ? 0 : (parseSafeFloat(editSheetWidth.text) || 0),
            sheetHeight: (sheetDropdown.selection && sheetDropdown.selection.index === 0) ? 0 : (parseSafeFloat(editSheetHeight.text) || 0),

            // Options
            sheetsPerSig: parseInt(editSheetsPerSig.text, 10) || 0,
            creepOuter: parseSafeFloat(editCreepOuter.text) || 0,
            creepInner: parseSafeFloat(editCreepInner.text) || 0,
            useDocBleed: chkUseBleed.value,
            customBleed: parseSafeFloat(editBleedVal.text) || 0,

            // Marks
            drawMarks: chkMarksOn.value,
            drawCenterMark: chkDrawCenterMark.value,
            markLength: parseSafeFloat(editMarkLength.text) || 3.0,
            markThickness: isNaN(parseSafeFloat(editMarkThickness.text)) ? 0.25 : parseSafeFloat(editMarkThickness.text),
            markOffsetLR: parseSafeFloat(editMarkOffsetLR.text) || 3.0,
            markOffsetTB: parseSafeFloat(editMarkOffsetTB.text) || 3.0,



            // Auto-load preference
            loadLastByDefault: chkLoadLast.value,
            pdfPresetIndex: (typeof pdfExportPresetDropdown !== "undefined" && pdfExportPresetDropdown.selection) ? pdfExportPresetDropdown.selection.index : 0,
            pdfPresetName: (typeof pdfExportPresetDropdown !== "undefined" && pdfExportPresetDropdown.selection) ? pdfExportPresetDropdown.selection.text : "",
            sheetFormatName: (typeof sheetDropdown !== "undefined" && sheetDropdown.selection) ? sheetDropdown.selection.text : "Custom",
            coverPaperStr: (typeof coverDropdown !== "undefined" && coverDropdown.selection) ? coverDropdown.selection.text : "",
            blockPaperStr: (typeof blockDropdown !== "undefined" && blockDropdown.selection) ? blockDropdown.selection.text : "",
            generateJobReport: (typeof chkJobReport !== "undefined") ? chkJobReport.value : true,
            foldScheme: (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0,
            workStyle: (typeof workStyleDropdown !== "undefined" && workStyleDropdown.selection) ? workStyleDropdown.selection.index : 0
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
            if (impTypeDropdown.onChange) impTypeDropdown.onChange();
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
        if (params.shiftHinge !== undefined && typeof chkShiftHinge !== "undefined") {
            chkShiftHinge.value = params.shiftHinge;
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
        
        if (typeof chkUseBleed !== "undefined") {
            if (selIdx === 4) {
                chkUseBleed.value = true;
                chkUseBleed.enabled = false;
                if (typeof editBleedVal !== "undefined") editBleedVal.enabled = false;
            } else {
                chkUseBleed.enabled = true;
                if (typeof editBleedVal !== "undefined") editBleedVal.enabled = !chkUseBleed.value;
            }
        }

        if (selIdx === 0) { // Saddle Stitch
            if (typeof foldSchemeDropdown !== "undefined") foldSchemeDropdown.enabled = true;
            var fsIdx = (typeof foldSchemeDropdown !== "undefined" && foldSchemeDropdown.selection) ? foldSchemeDropdown.selection.index : 0;
            if (fsIdx === 1) { editCols.text = "2"; editRows.text = "2"; }
            else if (fsIdx === 2 || fsIdx === 3) { editCols.text = "4"; editRows.text = "2"; }
            else if (fsIdx === 4) { editCols.text = "4"; editRows.text = "4"; }
            else { editCols.text = "2"; editRows.text = "1"; }
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
        if (params.linkMargins !== undefined && typeof chkLinkMargins !== "undefined") {
            chkLinkMargins.value = params.linkMargins;
            if (typeof updateMarginLinking === "function") updateMarginLinking();
        }
        if (params.spacingHoriz !== undefined) editSpacingHoriz.text = params.spacingHoriz.toString();
        if (params.spacingVert !== undefined) editSpacingVert.text = params.spacingVert.toString();
        if (params.purHinge !== undefined && typeof editPurHinge !== "undefined") editPurHinge.text = params.purHinge.toString();

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
            editMarkThickness.enabled = params.drawMarks;


            var selIdx = (typeof impTypeDropdown !== "undefined" && impTypeDropdown.selection) ? impTypeDropdown.selection.index : 0;
            editMarkOffsetTB.enabled = params.drawMarks && selIdx !== 4; editMarkOffsetLR.enabled = params.drawMarks && selIdx !== 4; chkDrawCenterMark.enabled = params.drawMarks;
        }
        if (params.drawCenterMark !== undefined) {
            chkDrawCenterMark.value = params.drawCenterMark;
        }
        if (params.markLength !== undefined) editMarkLength.text = params.markLength.toString();
        if (params.markThickness !== undefined) editMarkThickness.text = params.markThickness.toString();




        if (params.markOffsetTB !== undefined) editMarkOffsetTB.text = params.markOffsetTB.toString();
        else if (params.markOffset !== undefined) editMarkOffsetTB.text = params.markOffset.toString();
        if (params.markOffsetLR !== undefined) editMarkOffsetLR.text = params.markOffsetLR.toString();
        else if (params.markOffset !== undefined) editMarkOffsetLR.text = params.markOffset.toString();
        if (typeof pdfExportPresetDropdown !== "undefined" && pdfExportPresetDropdown) {
            if (params.pdfPresetName) {
                var pFound = -1;
                for (var pIdx = 0; pIdx < pdfExportPresetDropdown.items.length; pIdx++) {
                    if (pdfExportPresetDropdown.items[pIdx].text === params.pdfPresetName) {
                        pFound = pIdx;
                        break;
                    }
                }
                if (pFound !== -1) pdfExportPresetDropdown.selection = pFound;
                else if (params.pdfPresetIndex !== undefined && params.pdfPresetIndex < pdfExportPresetDropdown.items.length) {
                    pdfExportPresetDropdown.selection = params.pdfPresetIndex;
                }
            } else if (params.pdfPresetIndex !== undefined && params.pdfPresetIndex < pdfExportPresetDropdown.items.length) {
                pdfExportPresetDropdown.selection = params.pdfPresetIndex;
            }
        }
        if (params.generateJobReport !== undefined && typeof chkJobReport !== "undefined") {
            chkJobReport.value = params.generateJobReport;
        }

        if (params.addSheetBleed !== undefined && typeof chkSheetBleed !== "undefined") {
            chkSheetBleed.value = params.addSheetBleed;
            if (typeof updateSheetSize === "function") updateSheetSize();
        }
        if (params.foldScheme !== undefined && typeof foldSchemeDropdown !== "undefined") {
            if (params.foldScheme >= 0 && params.foldScheme < foldSchemeDropdown.items.length) {
                foldSchemeDropdown.selection = params.foldScheme;
                if (foldSchemeDropdown.onChange) foldSchemeDropdown.onChange();
            }
        }
        if (params.workStyle !== undefined && typeof workStyleDropdown !== "undefined") {
            if (params.workStyle >= 0 && params.workStyle < workStyleDropdown.items.length) {
                workStyleDropdown.selection = params.workStyle;
                if (workStyleDropdown.onChange) workStyleDropdown.onChange();
            }
        }
        if (params.resetTrimBleed !== undefined && typeof chkResetTrimBleed !== "undefined") {
            chkResetTrimBleed.value = params.resetTrimBleed;
        }
        toggleResetTrimBleed();

        if (params.loadLastByDefault !== undefined) chkLoadLast.value = params.loadLastByDefault;
        if (typeof updateSheetSize === "function") updateSheetSize();
        if (typeof updateNav === "function") updateNav();
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
                content = content.replace(/^/, "");
                var parsed = eval("(" + content + ")");
                if (parsed) {
                    for (var k in parsed) {
                        if (parsed.hasOwnProperty(k)) {
                            translations[lang][k] = parsed[k];
                        }
                    }
                }
            } catch (e) { }
        }

        var t = translations[lang] || translations["en"];

        // Fill in missing translation keys from English as fallback
        var en = translations["en"];
        if (t !== en && en) {
            for (var key in en) {
                if (en.hasOwnProperty(key) && t[key] === undefined) {
                    t[key] = en[key];
                }
            }
        }

        win.text = t.title;

        // Update document info text
        var infoText = t.file + docName + " (" + docPgsCount + t.pages + ")   |   " + t.size + docWidth.toFixed(1) + " x " + docHeight.toFixed(1) + " " + unitsDropdown.selection.text + " (" + t.bleeds + bleedLeft.toFixed(1) + " " + unitsDropdown.selection.text + ")";
        txtDocInfo.text = infoText;
        // Panel titles
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
        if (typeof pnlPdfExport !== "undefined" && pnlPdfExport) pnlPdfExport.text = t.pnl_pdf_export || "PDF Export";
        if (uiLabels.pdfExportPreset) uiLabels.pdfExportPreset.text = t.lbl_pdf_preset || "PDF Preset:";

        // Labels stored in uiLabels
        uiLabels.lblLang.text = t.lbl_lang;
        if (typeof btnImportPDF !== "undefined" && btnImportPDF) btnImportPDF.text = t.btn_import_pdf || "Import PDF";
        if (typeof txtDocInfo !== "undefined" && txtDocInfo) {
            var curUnitStr = (typeof unitsDropdown !== "undefined" && unitsDropdown.selection) ? unitsDropdown.selection.text : defaultUnitStr;
            txtDocInfo.text = formatHeaderDocInfoText(docName, docPgsCount, docWidth, docHeight, curUnitStr, bleedLeft, lang);
            txtDocInfo.preferredSize = [780, 24];
        }
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
        if (uiLabels.markThickness) uiLabels.markThickness.text = t.lbl_mark_thickness || "Thickness, pt:";
        uiLabels.markOffsetTB.text = t.lbl_mark_offset_tb;
        uiLabels.markOffsetLR.text = t.lbl_mark_offset_lr;

        uiLabels.lblCover.text = t.lbl_cover;
        uiLabels.lblCreepDir.text = t.lbl_creep_dir;
        if (uiLabels.purHinge) uiLabels.purHinge.text = t.lbl_pur_hinge || "PUR (mm):";
        if (uiLabels.foldScheme) uiLabels.foldScheme.text = t.lbl_fold_scheme || "Fold Scheme:";
        if (uiLabels.workStyle) uiLabels.workStyle.text = t.lbl_work_style || "Work Style:";
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

        // Sheet Format Dropdown labels
        uiLabels.sheetFormat.text = t.lbl_sheet_format;
        uiLabels.sheetOrient.text = t.lbl_sheet_orient;

        // Checkboxes and buttons
        chkLoadLast.text = t.chk_load_last;
        uiLabels.savePreset.text = t.lbl_preset_save;
        btnSavePreset.text = t.btn_preset_save;
        uiLabels.loadPreset.text = t.lbl_preset_load;
        btnLoadPreset.text = t.btn_preset_load;
        if (typeof btnDeletePreset !== "undefined" && btnDeletePreset) {
            btnDeletePreset.helpTip = t.tip_preset_delete || "Удалить выбранный пресет";
        }
        btnExample.text = t.btn_example || "Пример";

        var activeBleedVal = convertUnits(docBleedLeft, "pt", defaultUnitStr);
        var unitLabel = defaultUnitStr;
        if (lang === "ru" && defaultUnitStr === "mm") {
            unitLabel = "мм";
        }
        var bleedStr = (Math.round(activeBleedVal * 1000) / 1000) + " " + unitLabel;
        chkUseBleed.text = t.chk_use_bleed + " (" + bleedStr + ")";
        chkMarksOn.text = t.chk_marks_on;
        chkDrawCenterMark.text = t.chk_center_mark || "Center (fold line)";
        if (typeof updateSheetSize === "function") updateSheetSize();
        updateSheetBleedLabel();
        chkRotateBacks.text = t.chk_rotate_backs;
        chkRotateBacks.preferredSize.width = 146;
        chkInfoSlug.text = t.chk_info_slug;
        chkInfoSlug.preferredSize.width = 60;
        chkInfoSlug.helpTip = t.tip_info_slug;
        editSlugFontSize.helpTip = t.tip_slug_font_size;
        chkEnableCreep.text = t.chk_enable_creep;
        if (typeof chkShiftHinge !== "undefined" && chkShiftHinge) {
            chkShiftHinge.text = t.chk_shift_hinge || "Сдвиг биговки";
        }
        chkCompensateThickness.text = t.chk_compensate_thickness || "Thickness Compensation";
        editCompensateCoeff.helpTip = t.tip_compensate_thickness || "Thickness compensation coefficient (K)";

        if (typeof chkLinkMargins !== "undefined" && chkLinkMargins) {
            chkLinkMargins.text = t.chk_link_margins || "Uniform Margins";
            if (t.tip_link_margins) chkLinkMargins.helpTip = t.tip_link_margins;
        }
        if (typeof chkJobReport !== "undefined" && chkJobReport) {
            chkJobReport.text = t.chk_job_report || "Generate Imposition Job Report (.txt)";
        }
        if (typeof lblPreviewTheme !== "undefined" && lblPreviewTheme) {
            lblPreviewTheme.text = t.lbl_preview_theme || "Preview Theme:";
        }
        if (typeof ddlPreviewTheme !== "undefined" && ddlPreviewTheme) {
            var prevThemeSel = ddlPreviewTheme.selection ? ddlPreviewTheme.selection.index : 0;
            ddlPreviewTheme.removeAll();
            ddlPreviewTheme.add("item", t.theme_dark || "Dark");
            ddlPreviewTheme.add("item", t.theme_light || "Light");
            ddlPreviewTheme.selection = (prevThemeSel < ddlPreviewTheme.items.length) ? prevThemeSel : 0;
        }

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

        // Imposition Type Dropdown
        var prevImpSel = impTypeDropdown.selection ? impTypeDropdown.selection.index : 0;
        impTypeDropdown.removeAll();
        for (var i = 0; i < t.imp_types.length; i++) {
            impTypeDropdown.add("item", t.imp_types[i]);
        }
        impTypeDropdown.selection = prevImpSel;

        // Sheet Orientation Dropdown
        var prevOrientSel = orientationDropdown.selection ? orientationDropdown.selection.index : 0;
        orientationDropdown.removeAll();
        orientationDropdown.add("item", t.orient_horiz);
        orientationDropdown.add("item", t.orient_vert);
        orientationDropdown.selection = prevOrientSel;

                // Fold Scheme Dropdown
        if (typeof updateFoldSchemeOptions === "function") {
            updateFoldSchemeOptions();
        }

                // Work Style Dropdown
        if (typeof updateWorkStyleOptions === "function") {
            updateWorkStyleOptions();
        }

        // Reload paper sizes list
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

    // Auto-load last settings if allowed
    var shouldLoadLast = getInitVal("loadLastByDefault", true);
    chkLoadLast.value = shouldLoadLast;    if (shouldLoadLast && lastParams) {
        applyParametersToUI(lastParams);
    } else {
        // Apply default languages
        applyLanguage(currentLang);
    }

    chkRotateBacks.onClick = function () { updateNav(); };

    // Initial UI calculation
    updateSheetSize();
    toggleCreepPanel();
    toggleResetTrimBleed();
    updateNav();

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

    if (win.show() === 1) {
        var userParams = collectUIParameters();

        // Auto-save settings
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
        } catch (e) { }
        if (!srcDoc.saved) {
            alert(translations[currentLang].alert_doc_not_saved || "Внимание: Для выполнения спуска и сохранения временных PDF файлов исходный документ должен быть сохранен. Пожалуйста, сохраните файл.");
            return;
        }

        // Run Imposition Execution
        executeImposition(srcDoc, userParams);
    }
}

// ----------------------------------------------------
// IMPOSITION EXECUTION ENGINE
// ----------------------------------------------------

function drawMarks(targetPage, sequence, gridWidth, gridHeight, sHoriz, sVert, mTop, mBottom, mLeft, mRight, params, sheetNum, isBack) {
    if (!params || (!params.drawMarks && !params.drawCenterMark)) return;

    var outsetTB = (params.markOffsetTB !== undefined) ? params.markOffsetTB : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var outsetLR = (params.markOffsetLR !== undefined) ? params.markOffsetLR : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var len = (params.markLength !== undefined) ? params.markLength : 3.0;
    var strokeW = params.markThickness !== undefined ? params.markThickness : 0.25;

    var regColor = null;
    try {
        regColor = targetPage.parent.parent.colors.item("Registration");
    } catch (e) { }
    if (!regColor || !regColor.isValid) {
        try { regColor = targetPage.parent.parent.colors.itemByName("Registration"); } catch (e2) { }
    }

    function drawPageLine(y1, x1, y2, x2, strokeWidth) {
        try {
            var line = targetPage.graphicLines.add();
            if (regColor) line.strokeColor = regColor;
            line.strokeWeight = strokeWidth !== undefined ? strokeWidth : strokeW;
            line.geometricBounds = [y1, x1, y2, x2];
        } catch (e) { }
    }

    var xCoords = [mLeft, mLeft + gridWidth];
    if (params.impType === 1 && sequence && sequence.pagesAcross === 1 && params.purHinge > 0) {
        xCoords = [mLeft, mLeft + params.purHinge, mLeft + gridWidth];
    }
    var yCoords = [mTop, mTop + gridHeight];

    if (params.drawMarks) {
        // Vertical crop marks (Top and Bottom)
        for (var i = 0; i < xCoords.length; i++) {
            var x = xCoords[i];
            drawPageLine(mTop - outsetTB - len, x, mTop - outsetTB, x);
            drawPageLine(mTop + gridHeight + outsetTB, x, mTop + gridHeight + outsetTB + len, x);
        }

        // Horizontal crop marks (Left and Right)
        for (var i = 0; i < yCoords.length; i++) {
            var y = yCoords[i];
            drawPageLine(y, mLeft - outsetLR - len, y, mLeft - outsetLR);
            drawPageLine(y, mLeft + gridWidth + outsetLR, y, mLeft + gridWidth + outsetLR + len);
        }
    }

    // Center fold line
    if (params.drawCenterMark) {
        var foldStrokeW = strokeW;
        var centerX = mLeft + gridWidth / 2;
        drawPageLine(mTop - outsetTB - len, centerX, mTop - outsetTB, centerX, foldStrokeW);
        drawPageLine(mTop + gridHeight + outsetTB, centerX, mTop + gridHeight + outsetTB + len, centerX, foldStrokeW);
    }
}


function draw2x2MarksAndSlug(targetPage, mLeft, mTop, W, H, bT, bB, bL, bR, sHoriz, sVert, targetSheetW, targetSheetH, params, sheetNum, isBack) {
    if (!params) return;

    var regColor = null;
    try {
        regColor = targetPage.parent.parent.colors.item("Registration");
    } catch (e) { }
    if (!regColor || !regColor.isValid) {
        try { regColor = targetPage.parent.parent.colors.itemByName("Registration"); } catch (e2) { }
    }

    var strokeW = params.markThickness !== undefined ? params.markThickness : 0.25;

    function drawPageLine(y1, x1, y2, x2, strokeWidth) {
        try {
            var minY = Math.min(y1, y2);
            var maxY = Math.max(y1, y2);
            var minX = Math.min(x1, x2);
            var maxX = Math.max(x1, x2);

            // Avoid zero-length lines
            if (Math.abs(maxY - minY) < 0.001 && Math.abs(maxX - minX) < 0.001) return;

            var line = targetPage.graphicLines.add();
            if (regColor) line.strokeColor = regColor;
            line.strokeWeight = strokeWidth !== undefined ? strokeWidth : strokeW;
            line.geometricBounds = [minY, minX, maxY, maxX];
            try { line.bringToFront(); } catch (eZ) { }
        } catch (e) { }
    }

    var trimW = 2 * W; // 420mm
    var outsetTB = (params.markOffsetTB !== undefined) ? params.markOffsetTB : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var outsetLR = (params.markOffsetLR !== undefined) ? params.markOffsetLR : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var len = (params.markLength !== undefined) ? params.markLength : 3.0;


    var bleedTop = (bT > 0) ? bT : 3.0;
    var bleedBottom = (bB > 0) ? bB : 3.0;

    // Clean Trim lines by Y
    var yT0 = mTop + bleedTop;                            // Top trim of Row 0 (3mm if addBleed=0; 6mm if addBleed=3)
    var yB0 = yT0 + H;                                    // Bottom trim of Row 0 (300mm if addBleed=0; 303mm if addBleed=3)
    var yT1 = yB0 + bleedBottom + sVert + bleedTop;       // Top trim of Row 1 (306mm if addBleed=0; 309mm if addBleed=3)
    var yB1 = yT1 + H;                                    // Bottom trim of Row 1 (603mm if addBleed=0; 606mm if addBleed=3)

    // Clean Trim lines by X
    var xL = mLeft;                  // Left trim (5mm)
    var xC = mLeft + W;              // Center spine (215mm)
    var xR = mLeft + trimW;          // Right trim (425mm)

    if (params.drawMarks) {
        // --- 1. HORIZONTAL CROP MARKS (pointing strictly to Y Trim lines) ---
        var yList = [yT0, yB0, yT1, yB1];
        for (var i = 0; i < yList.length; i++) {
            var y = yList[i];
            // Left margin horizontal mark
            drawPageLine(y, xL - outsetLR - len, y, xL - outsetLR);
            // Right margin horizontal mark
            drawPageLine(y, xR + outsetLR, y, xR + outsetLR + len);
        }

        // --- 2. VERTICAL CROP MARKS (LOCATED EXCLUSIVELY ON THE OUTSIDE) ---
        var xCols = [xL, xC, xR];

        for (var j = 0; j < xCols.length; j++) {
            var x = xCols[j];

            // A. Top Vertical Mark (Outside document)
            drawPageLine(yT0 - outsetTB - len, x, yT0 - outsetTB, x);

            // B. Bottom Vertical Mark (Outside document)
            drawPageLine(yB1 + outsetTB, x, yB1 + outsetTB + len, x);

            // Middle vertical marks - ONLY draw if sVert >= 3.0mm
            if (sVert >= 3.0) {
                var vAvail = sVert / 2;
                var vMarkLen = Math.min(len, vAvail);
                if (vMarkLen > 0) {
                    drawPageLine(yB0 + outsetTB, x, yB0 + outsetTB + vMarkLen, x);
                    drawPageLine(yT1 - outsetTB - vMarkLen, x, yT1 - outsetTB, x);
                }
            }
        }
    }

    // Center fold line (thick 1pt line at spine center)
    if (params.drawCenterMark) {
        var foldStrokeW = strokeW;
        drawPageLine(yT0 - outsetTB - len, xC, yT0 - outsetTB, xC, foldStrokeW);
        drawPageLine(yB1 + outsetTB, xC, yB1 + outsetTB + len, xC, foldStrokeW);
    }

    // Info Slug Line
    if (params.infoSlug && !params.resetTrimBleed) {
        try {
            var fontSizePt = params.slugFontSize || 7;
            var textTop = Math.max(0, yT0 - outsetTB - len); // mm
            var textLeft = xL + 2.0; // mm

            var textFrame = targetPage.textFrames.add();
            textFrame.geometricBounds = [textTop, textLeft, textTop + 3.0, textLeft + 160.0];

            var sideStr = isBack ? (params.lang === "ru" ? "Оборотная" : "Back") : (params.lang === "ru" ? "Лицевая" : "Front");
            var docName = params.docName || (targetPage.parent.parent.name ? targetPage.parent.parent.name : "Document");
            var infoText = docName + " (" + W.toFixed(1) + " x " + H.toFixed(1) + " mm) -- Лист " + sheetNum + " (" + sideStr + ") -- " + getFormattedDate() + " -- SaddleStitch 2x2";
            textFrame.contents = infoText;

            try {
                textFrame.paragraphs[0].pointSize = fontSizePt;
                if (regColor) textFrame.paragraphs[0].fillColor = regColor;
            } catch (eText) { }
            try { textFrame.bringToFront(); } catch (eZ) { }
        } catch (eSlug) { }
    }
}

function executeTwoPassEngine(srcDoc, params) {
    var totalPgs = srcDoc.pages.length;
    var singlePageW = srcDoc.documentPreferences.pageWidth;
    var singlePageH = srcDoc.documentPreferences.pageHeight;

    var pagesPerSheet = 8;
    var numSheetsInSig = 1;
    if (params.sheetsPerSig > 0) {
        numSheetsInSig = params.sheetsPerSig;
    } else {
        numSheetsInSig = Math.max(1, Math.ceil(totalPgs / pagesPerSheet));
    }

    var pagesPerSig = pagesPerSheet * numSheetsInSig;
    var paddedPages = Math.ceil(totalPgs / pagesPerSig) * pagesPerSig;
    var sigCount = Math.ceil(paddedPages / pagesPerSig);
    var totalSpreads = paddedPages / 4;

    var bT = 0, bB = 0, bL = 0, bR = 0;
    if (params.useDocBleed) {
        bT = srcDoc.documentPreferences.documentBleedTopOffset;
        bB = srcDoc.documentPreferences.documentBleedBottomOffset;
        bL = srcDoc.documentPreferences.documentBleedInsideOrLeftOffset;
        bR = srcDoc.documentPreferences.documentBleedOutsideOrRightOffset;
    } else if (params.customBleed > 0) {
        bT = params.customBleed;
        bB = params.customBleed;
        bL = params.customBleed;
        bR = params.customBleed;
    }

    var mTop = (params.marginTop !== undefined && params.marginTop > 0) ? params.marginTop : bT;
    var mBottom = (params.marginBottom !== undefined && params.marginBottom > 0) ? params.marginBottom : bB;
    var mLeft = (params.marginLeft !== undefined) ? params.marginLeft : 0;
    var mRight = (params.marginRight !== undefined) ? params.marginRight : 0;

    // STEP 1: Generate Intermediate 1x2 Saddle Stitch PDF with full document bleeds
    var p1 = {};
    for (var k in params) p1[k] = params[k];
    p1.isTwoPassIntermediate = true;
    p1.impTypeSelectionIndex = 0; // Standard Saddle Stitch
    p1.cols = 2;
    p1.rows = 1;
    p1.foldScheme = 0; // Disable fold scheme for intermediate
    p1.customSequence = null;
    p1.drawMarks = false;
    p1.infoSlug = false;
    p1.sheetWidth = 0;
    p1.sheetHeight = 0;
    p1.marginTop = bT;
    p1.marginBottom = bB;
    p1.marginLeft = bL;
    p1.marginRight = bR;

    var interDoc = executeImposition(srcDoc, p1);
    if (!interDoc) return;

    var docPath = (srcDoc && srcDoc.saved && srcDoc.filePath) ? srcDoc.filePath.absoluteURI : Folder.temp.absoluteURI;
    var docNameClean = srcDoc.name.replace(/\.pdf$/i, "").replace(/\.indd$/i, "");
    var tsStr = getHumanTimestamp();
    var pdfFolder = new Folder(docPath + "/_pdf_tmp");
    if (!pdfFolder.exists) {
        pdfFolder.create();
    }
    var tempFile = new File(pdfFolder.absoluteURI + "/tmp_" + docNameClean + "_" + tsStr + "_inter.pdf");

    params.customInterW = interDoc.documentPreferences.pageWidth;
    params.customInterH = interDoc.documentPreferences.pageHeight;
    params.docName = srcDoc.name;

    var oldPageRange = app.pdfExportPreferences.pageRange;
    var oldExportReaderSpreads = app.pdfExportPreferences.exportReaderSpreads;

    app.pdfExportPreferences.exportReaderSpreads = false;
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

    var pdfPreset = getSelectedPdfPreset(params ? params.pdfPresetName : null);

    try {
        interDoc.exportFile(ExportFormat.PDF_TYPE, tempFile, false, pdfPreset);
    } catch (e) {
        var errExpStr = (typeof translations !== "undefined" && translations[params.lang] && translations[params.lang].alert_err_export) ? translations[params.lang].alert_err_export : "Error exporting temporary PDF:\n";
        alert(errExpStr + e.message);
        try { interDoc.close(SaveOptions.NO); } catch (e2) { }
        return;
    } finally {
        app.pdfExportPreferences.pageRange = oldPageRange;
        app.pdfExportPreferences.exportReaderSpreads = oldExportReaderSpreads;
        try { interDoc.close(SaveOptions.NO); } catch (e3) { }
    }

    if (!tempFile.exists) return;

    // STEP 2: Place Spreads onto 2x2 Sheet (Exact BleedBox Placement + Sheet Bleed Support)
    var interW = params.customInterW || 0;
    var interH = params.customInterH || 0;

    var targetDoc = app.documents.add();
    targetDoc.documentPreferences.facingPages = false;
    targetDoc.documentPreferences.pagesPerDocument = 1;
    try { targetDoc.rectanglePreferences.strokeWeight = 0; } catch (e) { }
    try { targetDoc.rectanglePreferences.strokeColor = targetDoc.swatches.item("None"); } catch (e) { }
    try { targetDoc.rectanglePreferences.fillColor = targetDoc.swatches.item("None"); } catch (e) { }

    var gridCols = 2; // For 2x2 fold scheme
    var gridRows = 2;
    var physicalGridCols = 1; // Since each spread is 2 pages wide

    var sW = (interW > 0) ? interW : (2 * srcDoc.documentPreferences.pageWidth + bL + bR);
    var sH = (interH > 0) ? interH : (srcDoc.documentPreferences.pageHeight + bT + bB);

    var sVert = params.spacingVert || 0;
    var sHoriz = params.spacingHoriz || 0;

    var outsetTB = (params.markOffsetTB !== undefined) ? params.markOffsetTB : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var outsetLR = (params.markOffsetLR !== undefined) ? params.markOffsetLR : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var addBleedTB = (params.addSheetBleed || params.chkSheetBleed) ? outsetTB : 0.0;
    var addBleedLR = (params.addSheetBleed || params.chkSheetBleed) ? outsetLR : 0.0;

    var trimW = 2 * srcDoc.documentPreferences.pageWidth;
    var targetSheetW = mLeft + mRight + trimW + (addBleedLR * 2);
    var targetSheetH = gridRows * sH + (gridRows - 1) * sVert + (addBleedTB * 2);

    if (params.sheetWidth > 0 && params.sheetHeight > 0) {
        targetSheetW = params.sheetWidth;
        targetSheetH = params.sheetHeight;
    }

    targetDoc.documentPreferences.pageWidth = targetSheetW;
    targetDoc.documentPreferences.pageHeight = targetSheetH;

    var placeTop = addBleedTB;
    var placeLeft = (mLeft - bL) + addBleedLR;

    targetDoc.pages[0].marginPreferences.top = 0; targetDoc.pages[0].marginPreferences.bottom = 0;
    targetDoc.pages[0].marginPreferences.left = 0; targetDoc.pages[0].marginPreferences.right = 0;

    var currentPg = targetDoc.pages[0];
    var isFirst = true;

    app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;

    var totalSheets = sigCount * numSheetsInSig; // Number of physical 2x2 sheets
    var flatsMapping2P = [];
    var flatCount2P = 0;

    for (var sIdx = 0; sIdx < totalSheets; sIdx++) {
        var N = sIdx + 1;
        var spreadBottomStr = 2 * N - 1; // Spread 2N-1
        var spreadTopStr = 2 * N;     // Spread 2N

        var isBacks = [false, true];
        for (var b = 0; b < isBacks.length; b++) {
            var isBack = isBacks[b];
            flatCount2P++;

            if (!isFirst) {
                currentPg = targetDoc.pages.add(LocationOptions.AT_END);
                currentPg.marginPreferences.top = 0; currentPg.marginPreferences.bottom = 0;
                currentPg.marginPreferences.left = 0; currentPg.marginPreferences.right = 0;
            }
            isFirst = false;

            var topSpreadPdfPage = 0;
            var bottomSpreadPdfPage = 0;
            var rotateTop = true;

            if (!isBack) {
                // Sheet Front
                bottomSpreadPdfPage = (2 * spreadBottomStr) - 1; // Spread 2N-1 Front
                topSpreadPdfPage = (2 * spreadTopStr);           // Spread 2N Back
            } else {
                // Sheet Back
                bottomSpreadPdfPage = (2 * spreadBottomStr);     // Spread 2N-1 Back
                topSpreadPdfPage = (2 * spreadTopStr) - 1;       // Spread 2N Front
            }

            var totalPdfPages = totalSpreads * 2;

            // Bottom Row (r = 1)
            if (bottomSpreadPdfPage <= totalPdfPages && bottomSpreadPdfPage > 0) {
                app.pdfPlacePreferences.pageNumber = bottomSpreadPdfPage;
                var placeX = placeLeft;
                var placeY = placeTop + 1 * (sH + sVert);
                var rectBottom = currentPg.rectangles.add();
                rectBottom.geometricBounds = [placeY, placeX, placeY + sH, placeX + sW];
                rectBottom.place(tempFile);
                rectBottom.fit(FitOptions.CENTER_CONTENT);

                applyNoStrokeNoFill(rectBottom, targetDoc);
            }

            // Top Row (r = 0)
            if (topSpreadPdfPage <= totalPdfPages && topSpreadPdfPage > 0) {
                app.pdfPlacePreferences.pageNumber = topSpreadPdfPage;
                var placeX = placeLeft;
                var placeY = placeTop + 0 * (sH + sVert);
                var rectTop = currentPg.rectangles.add();
                rectTop.geometricBounds = [placeY, placeX, placeY + sH, placeX + sW];
                var placedTop = rectTop.place(tempFile)[0];
                rectTop.fit(FitOptions.CENTER_CONTENT);

                applyNoStrokeNoFill(rectTop, targetDoc);

                if (rotateTop) {
                    rotate180Center(placedTop);
                }
            }

            if (params.drawMarks || params.drawCenterMark || params.infoSlug) {
                var singlePageW = srcDoc.documentPreferences.pageWidth;
                var singlePageH = srcDoc.documentPreferences.pageHeight;
                var markMarginLeft = mLeft + addBleedLR;
                var markMarginTop = addBleedTB;
                draw2x2MarksAndSlug(currentPg, markMarginLeft, markMarginTop, singlePageW, singlePageH, bT, bB, bL, bR, sHoriz, sVert, targetSheetW, targetSheetH, params, sIdx + 1, isBack);
            }

            // Record 2x2 mapping for Job Report
            var sigPages = pagesPerSig;
            var sB = spreadBottomStr - 1; // 0-based spread index
            var sT = spreadTopStr - 1;    // 0-based spread index
            var pBotLeft = !isBack ? (sigPages - 2 * sB) : (2 * sB + 2);
            var pBotRight = !isBack ? (2 * sB + 1) : (sigPages - 2 * sB - 1);
            var pTopLeft = !isBack ? (sigPages - 2 * sT - 1) : (sigPages - 2 * sT);
            var pTopRight = !isBack ? (2 * sT + 2) : (2 * sT + 1);

            var totalSigSpreads = (params.sheetsPerSig > 0) ? (params.sheetsPerSig * 2) : totalSpreads;
            var sheetSigIdxB = (totalSigSpreads > 0) ? (sB % totalSigSpreads) : sB;
            var sheetSigIdxT = (totalSigSpreads > 0) ? (sT % totalSigSpreads) : sT;

            var creepValB = 0;
            var creepValT = 0;
            if (params.enableCreep) {
                var creepOuterVal = params.creepOuter || 0;
                var creepInnerVal = params.creepInner || 0;
                if (totalSigSpreads > 1) {
                    creepValB = creepOuterVal + (sheetSigIdxB / (totalSigSpreads - 1)) * (creepInnerVal - creepOuterVal);
                    creepValT = creepOuterVal + (sheetSigIdxT / (totalSigSpreads - 1)) * (creepInnerVal - creepOuterVal);
                } else {
                    creepValB = creepOuterVal;
                    creepValT = creepOuterVal;
                }
            }

            // Col 1, Row 1 (Top Left)
            flatsMapping2P.push({
                flatNum: flatCount2P,
                sheetNum: sIdx + 1,
                isBack: isBack,
                col: 1, row: 1,
                pageNum: pTopLeft <= totalPgs ? pTopLeft : 0,
                rotation: 180,
                shiftX: creepValT
            });
            // Col 2, Row 1 (Top Right)
            flatsMapping2P.push({
                flatNum: flatCount2P,
                sheetNum: sIdx + 1,
                isBack: isBack,
                col: 2, row: 1,
                pageNum: pTopRight <= totalPgs ? pTopRight : 0,
                rotation: 180,
                shiftX: -creepValT
            });
            // Col 1, Row 2 (Bottom Left)
            flatsMapping2P.push({
                flatNum: flatCount2P,
                sheetNum: sIdx + 1,
                isBack: isBack,
                col: 1, row: 2,
                pageNum: pBotLeft <= totalPgs ? pBotLeft : 0,
                rotation: 0,
                shiftX: creepValB
            });
            // Col 2, Row 2 (Bottom Right)
            flatsMapping2P.push({
                flatNum: flatCount2P,
                sheetNum: sIdx + 1,
                isBack: isBack,
                col: 2, row: 2,
                pageNum: pBotRight <= totalPgs ? pBotRight : 0,
                rotation: 0,
                shiftX: -creepValB
            });
        }
    }

    if (params.removeTempFiles) {
        try { tempFile.remove(); } catch (e) { }
    }
    var initialLang = params.lang || "ru";

    var jobReportFile = null;
    if (params.generateJobReport) {
        try {
            var srcDocPathStr2 = "";
            try {
                if (srcDoc && srcDoc.saved) {
                    srcDocPathStr2 = srcDoc.filePath.fsName + "\\" + srcDoc.name;
                }
            } catch (ePth2) { }

            var reportData2P = {
                lang: initialLang,
                srcDoc: srcDoc,
                srcDocName: srcDoc.name,
                srcDocPath: srcDocPathStr2,
                docFolder: (srcDoc && srcDoc.saved && srcDoc.filePath) ? srcDoc.filePath : Folder.temp,
                docNameClean: docNameClean,
                pdfPresetName: params.pdfPresetName || "[High Quality Print]",
                srcPgsCount: totalPgs,
                srcTrimW: singlePageW,
                srcTrimH: singlePageH,
                unitStr: "mm",
                bleedT: bT, bleedB: bB, bleedL: bL, bleedR: bR,
                pdfBoxes: {
                    trimW: 2 * singlePageW,
                    trimH: singlePageH,
                    bleedW: 2 * singlePageW + bL + bR,
                    bleedH: singlePageH + bT + bB,
                    mediaW: 2 * singlePageW + bL + bR,
                    mediaH: singlePageH + bT + bB,
                    bleedOffsetX: (bL + bR) / 2,
                    bleedOffsetY: (bT + bB) / 2
                },
                impTypeStr: "Saddle Stitch (Скрепка)",
                foldSchemeStr: "8 полос (2 сгиба - 2x2)",
                workStyleStr: "Sheetwise (Лицо и Оборот)",
                sheetFormatName: "Sheet",
                sheetW: targetSheetW,
                sheetH: targetSheetH,
                impAreaW: targetSheetW,
                impAreaH: targetSheetH,
                cols: 2, rows: 2, totalUp: 4,
                marginLeft: mLeft, marginTop: addBleedTB, marginRight: mRight, marginBottom: addBleedTB,
                spacingHoriz: sHoriz, spacingVert: sVert,
                addSheetBleed: params.addSheetBleed,
                resetTrimBleed: false,
                enableCreep: params.enableCreep,
                creepOuter: params.creepOuter,
                creepInner: params.creepInner,
                creepDirStr: (params.creepDirectionIndex === 1) ? "Outwards" : "Inwards",
                purHinge: 0,
                rotateBacks: params.rotateBacks,
                drawMarks: params.drawMarks,
                markLength: params.markLength,
                markThickness: params.markThickness,
                markOffsetTB: params.markOffsetTB,
                markOffsetLR: params.markOffsetLR,
                drawCenterMark: params.drawCenterMark,
                infoSlug: params.infoSlug,
                slugFontSize: params.slugFontSize,
                flatsCount: targetDoc.pages.length,
                isDoubleSided: true,
                flatsMapping: flatsMapping2P
            };
            jobReportFile = generateAndSaveJobReport(reportData2P);
        } catch (eRep2P) { }
    }

    if (!params.isTwoPassIntermediate) {
        var succStr = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].alert_success) ? translations[initialLang].alert_success : "Success! Total flats: ";
        if (jobReportFile && jobReportFile.exists) {
            var msgSaved = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].msg_job_report_saved) ? translations[initialLang].msg_job_report_saved : "Imposition Job Report saved to:\n";
            var msgOpen = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].msg_open_job_report) ? translations[initialLang].msg_open_job_report : "Open Job Report now?";
            var userChoice = confirm(succStr + targetDoc.pages.length + "\n\n" + msgSaved + jobReportFile.fsName + "\n\n" + msgOpen);
            if (userChoice) {
                try { jobReportFile.execute(); } catch (eExec) { }
            }
        } else {
            alert(succStr + targetDoc.pages.length);
        }
    }
}


function rotate180Center(obj) {
    try {
        var myTransform = app.transformationMatrices.add({ counterclockwiseRotationAngle: 180 });
        obj.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, AnchorPoint.CENTER_ANCHOR, myTransform);
    } catch (e) {
        try {
            var oldRef = app.activeWindow.transformReferencePoint;
            app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
            obj.rotationAngle = 180;
            app.activeWindow.transformReferencePoint = oldRef;
        } catch (e2) {
            obj.rotationAngle = 180;
        }
    }
}


function getHumanTimestamp() {
    var d = new Date();
    var pad = function (n) { return n < 10 ? '0' + n : n; };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "_" + pad(d.getHours()) + "-" + pad(d.getMinutes()) + "-" + pad(d.getSeconds());
}

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

function getReportLoc(lang) {
    var dict = {
    ru: {
        title: "QUICKIMPOSE v2.1 — ТЕХНИЧЕСКИЙ ОТЧЕТ О СПУСКЕ ПОЛОС (JOB REPORT)",
        date: "Дата/Время:      ",
        hostApp: "Приложение:      ",
        srcFile: "Исходный файл:   ",
        srcPath: "Путь к файлу:    ",
        pdfPreset: "PDF Пресет:      ",
        sec1: "[1] ГЕОМЕТРИЯ ИСХОДНОГО ДОКУМЕНТА И PDF-БОКСЫ",
        totalPages: "Всего страниц:   ",
        trimSize: "Обрезной формат: ",
        docBleeds: "Вылеты макета:   ",
        top: "Верх", bottom: "Низ", inside: "Внутри", outside: "Снаружи",
        pdfBoxMetrics: "Замеры PDF-боксов (из промежуточного PDF):",
        bleedLabel: "Вылет",
        directPdf: "Прямой импорт PDF макета",
        sec2: "[2] ПАРАМЕТРЫ СПУСКА И ПЕЧАТНОГО ЛИСТА",
        impType: "Тип спуска:      ",
        foldScheme: "Схема фальцовки: ",
        workStyle: "Тип оборота:     ",
        grid: "Сетка спуска:    ",
        cols: "Кол.", rows: "Стр.", onFlat: "на спуске",
        printSheet: "Печатный лист:   ",
        impArea: "Область спуска:  ",
        margins: "Поля листа:      ",
        left: "Левое", right: "Правое",
        gutters: "Промежутки:      ",
        horiz: "Гориз.", vert: "Верт.",
        sheetBleed: "Вылет листа:     ",
        enabled: "Включен", disabled: "Отключен",
        resetTrimBleed: "Сброс Trim+Bleed: ",
        yes: "Да", no: "Нет",
        sec3: "[3] ПОСТПРЕСС И КОМПЕНСАЦИИ",
        creep: "Сползание (Creep): ",
        direction: "  • Направление:   ",
        shifts: "  • Сдвиг (Out/In):",
        outer: "Внешний", inner: "Внутренний",
        stock: "  • Бумага:        ",
        cover: "Обложка", block: "Блок",
        spineComp: "  • Компенс. корешка:",
        purHinge: "PUR боковая проклейка: ",
        withCreaseShift: " (со сдвигом биговки)",
        rotateBacks: "Поворот оборота на 180°: ",
        sec4: "[4] МЕТКИ И СЛУЖЕБНЫЕ ЭЛЕМЕНТЫ",
        cropMarks: "Метки реза:      ",
        markLength: "Длина меток", markThickness: "Толщина",
        offsets: "Отступы (В/Н, Л/П)",
        centerMarks: "Центральные метки",
        infoSlug: "Служебная инфо (Slug): ",
        fontSize: "кегль",
        sec5: "[5] РАСКЛАДКА ПОЛОС ПО ЛИСТАМ (SIGNATURE MAPPING)",
        totalFlats: "Всего создано спусков (Flats): ",
        physSheets: "Физических печатных листов:    ",
        doubleSided: " (двусторонняя печать)",
        singleSided: " (односторонняя печать)",
        hFlat: "Спуск", hSheet: "Лист", hSide: "Сторона", hGrid: "Позиция (Кол,Стр)", hPage: "Полоса #", hRot: "Угол", hShift: "Сдвиг (Creep/PUR)",
        frontSide: "Лицо", backSide: "Оборот", pageEmpty: "— [Пусто]", pagePrefix: "Стр. ",
        autoSpread: "  (Автоматическая раскладка разворотов)"
    },
    en: {
        title: "QUICKIMPOSE v2.1 — IMPOSITION JOB REPORT",
        date: "Generated:       ",
        hostApp: "Host App:        ",
        srcFile: "Source File:     ",
        srcPath: "Source Path:     ",
        pdfPreset: "PDF Preset:      ",
        sec1: "[1] SOURCE DOCUMENT GEOMETRY & PDF BOXES",
        totalPages: "Total Pages:     ",
        trimSize: "Trim Size:       ",
        docBleeds: "Doc Bleeds:      ",
        top: "Top", bottom: "Bottom", inside: "Inside", outside: "Outside",
        pdfBoxMetrics: "PDF Box Metrics (Measured from intermediate PDF):",
        bleedLabel: "Bleed",
        directPdf: "Direct PDF layout",
        sec2: "[2] IMPOSITION & SHEET LAYOUT",
        impType: "Imposition Type: ",
        foldScheme: "Fold Scheme:     ",
        workStyle: "Work Style:      ",
        grid: "Grid Layout:     ",
        cols: "Cols", rows: "Rows", onFlat: "-Up per flat",
        printSheet: "Print Sheet:     ",
        impArea: "Imposition Area: ",
        margins: "Sheet Margins:   ",
        left: "Left", right: "Right",
        gutters: "Gutters:         ",
        horiz: "Horiz.", vert: "Vert.",
        sheetBleed: "Sheet Bleed:     ",
        enabled: "Enabled", disabled: "Disabled",
        resetTrimBleed: "Reset Trim+Bleed: ",
        yes: "Yes", no: "No",
        sec3: "[3] POSTPRESS & FINISHING COMPENSATION",
        creep: "Creep:           ",
        direction: "  • Direction:     ",
        shifts: "  • Shifts (Out/In):",
        outer: "Outer", inner: "Inner",
        stock: "  • Stock:         ",
        cover: "Cover", block: "Block",
        spineComp: "  • Thickness Comp:",
        purHinge: "PUR Side Glue:   ",
        withCreaseShift: " (with crease shift)",
        rotateBacks: "Rotate Backs 180°: ",
        sec4: "[4] MARKS & SLUG",
        cropMarks: "Crop Marks:      ",
        markLength: "Length", markThickness: "Weight",
        offsets: "Offsets (TB, LR)",
        centerMarks: "Center marks",
        infoSlug: "Info Slug:       ",
        fontSize: "font",
        sec5: "[5] PRODUCTION SUMMARY & SIGNATURE MAPPING",
        totalFlats: "Total Flats Generated: ",
        physSheets: "Physical Press Sheets: ",
        doubleSided: " (double-sided)",
        singleSided: " (single-sided)",
        hFlat: "Flat #", hSheet: "Sheet", hSide: "Side", hGrid: "Grid (Col,Row)", hPage: "Page #", hRot: "Angle", hShift: "Shift (Creep/PUR)",
        frontSide: "Front", backSide: "Back", pageEmpty: "— [Blank]", pagePrefix: "Page ",
        autoSpread: "  (Automatic spread placement)"
    },
    zh: {
        title: "QUICKIMPOSE v2.1 — 拼版作业技术报告 (JOB REPORT)",
        date: "生成日期:       ",
        hostApp: "宿主程序:       ",
        srcFile: "源文件:         ",
        srcPath: "文件路径:       ",
        pdfPreset: "PDF预设:        ",
        sec1: "[1] 源文档几何尺寸与PDF页面框 (PDF BOXES)",
        totalPages: "总页数:         ",
        trimSize: "成品尺寸:       ",
        docBleeds: "文档出血:       ",
        top: "上", bottom: "下", inside: "内", outside: "外",
        pdfBoxMetrics: "PDF框测量尺寸 (来自中间PDF):",
        bleedLabel: "出血",
        directPdf: "直接PDF拼版",
        sec2: "[2] 拼版与大版设置",
        impType: "拼版类型:       ",
        foldScheme: "折手方案:       ",
        workStyle: "印刷方式:       ",
        grid: "拼版网格:       ",
        cols: "列", rows: "行", onFlat: "拼/面",
        printSheet: "印张尺寸:       ",
        impArea: "拼版区域:       ",
        margins: "大版边距:       ",
        left: "左", right: "右",
        gutters: "间距:           ",
        horiz: "水平", vert: "垂直",
        sheetBleed: "印张出血:       ",
        enabled: "启用", disabled: "禁用",
        resetTrimBleed: "重置净边+出血:  ",
        yes: "是", no: "否",
        sec3: "[3] 印后装订与位移补偿",
        creep: "爬移 (Creep):   ",
        direction: "  • 方向:         ",
        shifts: "  • 位移量 (外/内):",
        outer: "外层", inner: "内层",
        stock: "  • 纸张:         ",
        cover: "封面", block: "内页",
        spineComp: "  • 书脊厚度补偿: ",
        purHinge: "PUR侧胶压痕:    ",
        withCreaseShift: " (含压痕位移)",
        rotateBacks: "背面旋转180°:   ",
        sec4: "[4] 印刷标记与边角说明",
        cropMarks: "裁切标记:       ",
        markLength: "长度", markThickness: "线宽",
        offsets: "偏移 (上下, 左右)",
        centerMarks: "中心折线标记",
        infoSlug: "边角说明:       ",
        fontSize: "字号",
        sec5: "[5] 印张页面排布明细 (SIGNATURE MAPPING)",
        totalFlats: "生成大版总数 (Flats): ",
        physSheets: "实际印张数量 (Sheets):  ",
        doubleSided: " (双面印刷)",
        singleSided: " (单面印刷)",
        hFlat: "大版", hSheet: "印张", hSide: "印刷面", hGrid: "网格位置 (列,行)", hPage: "页码 #", hRot: "角度", hShift: "位移量 (Creep/PUR)",
        frontSide: "正面", backSide: "背面", pageEmpty: "— [空白]", pagePrefix: "第 ",
        autoSpread: "  (自动折手跨页排布)"
    },
    de: {
        title: "QUICKIMPOSE v2.1 — AUSSCHIESSBERICHT (JOB REPORT)",
        date: "Datum/Zeit:     ",
        hostApp: "Anwendung:      ",
        srcFile: "Quelldatei:     ",
        srcPath: "Dateipfad:      ",
        pdfPreset: "PDF-Vorgabe:    ",
        sec1: "[1] QUELLDOKUMENT-GEOMETRIE & PDF-BOXEN",
        totalPages: "Seitenanzahl:   ",
        trimSize: "Endformat:      ",
        docBleeds: "Anschnitt:      ",
        top: "Oben", bottom: "Unten", inside: "Innen", outside: "Außen",
        pdfBoxMetrics: "PDF-Boxen Messwerte (aus Zwischen-PDF):",
        bleedLabel: "Anschnitt",
        directPdf: "Direkte PDF-Montage",
        sec2: "[2] AUSSCHIESS- & BOGENPARAMETER",
        impType: "Ausschießart:   ",
        foldScheme: "Falzschema:     ",
        workStyle: "Druckart:       ",
        grid: "Nutzenraster:   ",
        cols: "Spalten", rows: "Zeilen", onFlat: "-Nutzen/Form",
        printSheet: "Druckbogen:     ",
        impArea: "Nutzenfläche:   ",
        margins: "Bogenränder:    ",
        left: "Links", right: "Rechts",
        gutters: "Zwischenraum:   ",
        horiz: "Horiz.", vert: "Vert.",
        sheetBleed: "Bogenanschnitt: ",
        enabled: "Aktiviert", disabled: "Deaktiviert",
        resetTrimBleed: "Trim+Bleed Reset: ",
        yes: "Ja", no: "Nein",
        sec3: "[3] WEITERVERARBEITUNG & KOMPENSATION",
        creep: "Bundzuwachs:    ",
        direction: "  • Richtung:     ",
        shifts: "  • Versatz (A/I):",
        outer: "Außen", inner: "Innen",
        stock: "  • Papier:       ",
        cover: "Umschlag", block: "Kern",
        spineComp: "  • Rückenkomp.:  ",
        purHinge: "PUR-Seitenleimung: ",
        withCreaseShift: " (mit Rillungsversatz)",
        rotateBacks: "Rückseite 180° drehen: ",
        sec4: "[4] MARKEN & BOGENBESCHRIFTUNG",
        cropMarks: "Schnittmarken:  ",
        markLength: "Länge", markThickness: "Stärke",
        offsets: "Versatz (OU, LR)",
        centerMarks: "Falzmarken",
        infoSlug: "Druckbogen-Info: ",
        fontSize: "Schriftgröße",
        sec5: "[5] PRODUKTIONSÜBERSICHT & SEITENZUORDNUNG",
        totalFlats: "Erstellte Druckformen (Flats): ",
        physSheets: "Physische Druckbogen:          ",
        doubleSided: " (doppelseitiger Druck)",
        singleSided: " (einseitiger Druck)",
        hFlat: "Form #", hSheet: "Bogen", hSide: "Seite", hGrid: "Position (Sp,Zl)", hPage: "Seite #", hRot: "Winkel", hShift: "Versatz (Creep/PUR)",
        frontSide: "Schönseite", backSide: "Widerdruck", pageEmpty: "— [Leer]", pagePrefix: "S. ",
        autoSpread: "  (Automatische Druckbogenmontage)"
    },
    es: {
        title: "QUICKIMPOSE v2.1 — INFORME DE IMPOSICIÓN (JOB REPORT)",
        date: "Fecha/Hora:     ",
        hostApp: "Aplicación:     ",
        srcFile: "Archivo origen: ",
        srcPath: "Ruta archivo:   ",
        pdfPreset: "Ajuste PDF:     ",
        sec1: "[1] GEOMETRÍA DEL DOCUMENTO Y CAJAS PDF",
        totalPages: "Total páginas:  ",
        trimSize: "Tamaño corte:   ",
        docBleeds: "Sangrados doc:  ",
        top: "Sup.", bottom: "Inf.", inside: "Interior", outside: "Exterior",
        pdfBoxMetrics: "Medidas de cajas PDF (medidas en PDF intermedio):",
        bleedLabel: "Sangrado",
        directPdf: "Imposición PDF directa",
        sec2: "[2] PARÁMETROS DE IMPOSICIÓN Y PLIEGO",
        impType: "Tipo imposición:",
        foldScheme: "Esquema plegado:",
        workStyle: "Modo impresión: ",
        grid: "Cuadrícula:     ",
        cols: "Cols", rows: "Filas", onFlat: "-Up por cara",
        printSheet: "Pliego impresión:",
        impArea: "Área imposición:",
        margins: "Márgenes pliego:",
        left: "Izquierda", right: "Derecha",
        gutters: "Calles/Calles:  ",
        horiz: "Horiz.", vert: "Vert.",
        sheetBleed: "Sangrado pliego:",
        enabled: "Activado", disabled: "Desactivado",
        resetTrimBleed: "Reset Corte+Sangrado: ",
        yes: "Sí", no: "No",
        sec3: "[3] POSTPRENSA Y COMPENSACIONES",
        creep: "Comp. sangrado (Creep): ",
        direction: "  • Dirección:    ",
        shifts: "  • Despl. (Ext/Int):",
        outer: "Exterior", inner: "Interior",
        stock: "  • Papel:        ",
        cover: "Cubierta", block: "Interior",
        spineComp: "  • Comp. lomo:   ",
        purHinge: "Bisagra PUR cola lat.: ",
        withCreaseShift: " (con desl. hendido)",
        rotateBacks: "Girar dorso 180°: ",
        sec4: "[4] MARCAS E INFORMACIÓN TÉCNICA",
        cropMarks: "Marcas de corte:",
        markLength: "Longitud", markThickness: "Grosor",
        offsets: "Desplazamientos (SI, ID)",
        centerMarks: "Marcas centrales",
        infoSlug: "Información técnica (Slug): ",
        fontSize: "cuerpo",
        sec5: "[5] RESUMEN DE PRODUCCIÓN Y ASIGNACIÓN DE PÁGINAS",
        totalFlats: "Total caras generadas (Flats): ",
        physSheets: "Pliegos físicos de máquina:    ",
        doubleSided: " (impresión a doble cara)",
        singleSided: " (impresión a una cara)",
        hFlat: "Cara #", hSheet: "Pliego", hSide: "Lado", hGrid: "Posición (Col,Fila)", hPage: "Pág. #", hRot: "Ángulo", hShift: "Despl. (Creep/PUR)",
        frontSide: "Tiro", backSide: "Retira", pageEmpty: "— [En blanco]", pagePrefix: "Pág. ",
        autoSpread: "  (Montaje automático de pliegos)"
    },
    fr: {
        title: "QUICKIMPOSE v2.1 — RAPPORT D'IMPOSITION (JOB REPORT)",
        date: "Date/Heure :    ",
        hostApp: "Application :   ",
        srcFile: "Fichier source :",
        srcPath: "Chemin fichier :",
        pdfPreset: "Préréglage PDF :",
        sec1: "[1] GÉOMÉTRIE DU DOCUMENT ET BOÎTES PDF",
        totalPages: "Total pages :   ",
        trimSize: "Format fini :   ",
        docBleeds: "Fonds perdus :  ",
        top: "Haut", bottom: "Bas", inside: "Intérieur", outside: "Extérieur",
        pdfBoxMetrics: "Mesures des boîtes PDF (du PDF intermédiaire) :",
        bleedLabel: "Fond perdu",
        directPdf: "Imposition directe PDF",
        sec2: "[2] PARAMÈTRES D'IMPOSITION ET FEUILLE",
        impType: "Type imposition :",
        foldScheme: "Schéma pliage :  ",
        workStyle: "Mode impression :",
        grid: "Grille de pose : ",
        cols: "Colonnes", rows: "Lignes", onFlat: "-poses/forme",
        printSheet: "Feuille papier : ",
        impArea: "Surface utile :  ",
        margins: "Marges feuille : ",
        left: "Gauche", right: "Droite",
        gutters: "Gouttières :     ",
        horiz: "Horiz.", vert: "Vert.",
        sheetBleed: "Fond perdu feuille : ",
        enabled: "Activé", disabled: "Désactivé",
        resetTrimBleed: "Réinit. coupe+fond : ",
        yes: "Oui", no: "Non",
        sec3: "[3] FAÇONNAGE ET COMPENSATIONS",
        creep: "Chasse (Creep) : ",
        direction: "  • Sens :         ",
        shifts: "  • Décalage (Ext/Int) :",
        outer: "Extérieur", inner: "Intérieur",
        stock: "  • Papier :       ",
        cover: "Couverture", block: "Cahier",
        spineComp: "  • Comp. dos :    ",
        purHinge: "Rainage colle latérale PUR : ",
        withCreaseShift: " (avec décalage du pli)",
        rotateBacks: "Rotation verso 180° : ",
        sec4: "[4] REPÈRES ET INFOS TECHNIQUES",
        cropMarks: "Repères de coupe : ",
        markLength: "Longueur", markThickness: "Épaisseur",
        offsets: "Décalages (HB, GD)",
        centerMarks: "Repères de pli",
        infoSlug: "Informations techniques : ",
        fontSize: "corps",
        sec5: "[5] RÉSUMÉ DE PRODUCTION ET MAPPAGE DES CAHIERS",
        totalFlats: "Total formes générées (Flats) : ",
        physSheets: "Feuilles physiques d'impression :",
        doubleSided: " (impression recto-verso)",
        singleSided: " (impression recto seul)",
        hFlat: "Forme #", hSheet: "Feuille", hSide: "Face", hGrid: "Position (Col,Lig)", hPage: "Page #", hRot: "Angle", hShift: "Décalage (Creep/PUR)",
        frontSide: "Recto", backSide: "Verso", pageEmpty: "— [Vierge]", pagePrefix: "P. ",
        autoSpread: "  (Montage automatique de cahiers)"
    },
    it: {
        title: "QUICKIMPOSE v2.1 — REPORT DI IMPOSIZIONE (JOB REPORT)",
        date: "Data/Ora:       ",
        hostApp: "Applicazione:   ",
        srcFile: "File sorgente:  ",
        srcPath: "Percorso file:  ",
        pdfPreset: "Predefinito PDF:",
        sec1: "[1] GEOMETRIA DEL DOCUMENTO E BOX PDF",
        totalPages: "Pagine totali:  ",
        trimSize: "Formato finito: ",
        docBleeds: "Abbondanze doc: ",
        top: "Superiore", bottom: "Inferiore", inside: "Interno", outside: "Esterno",
        pdfBoxMetrics: "Misure dei box PDF (dal PDF intermedio):",
        bleedLabel: "Abbondanza",
        directPdf: "Imposizione PDF diretta",
        sec2: "[2] PARAMETRI DI IMPOSIZIONE E FOGLIO",
        impType: "Tipo imposiz.:  ",
        foldScheme: "Schema piega:   ",
        workStyle: "Stile stampa:   ",
        grid: "Griglia:        ",
        cols: "Colonne", rows: "Righe", onFlat: "-Up per segnatura",
        printSheet: "Foglio stampa:  ",
        impArea: "Area imposizione:",
        margins: "Margini foglio: ",
        left: "Sinistra", right: "Destra",
        gutters: "Spaziatori:     ",
        horiz: "Orizz.", vert: "Vert.",
        sheetBleed: "Abbondanza foglio:",
        enabled: "Attivato", disabled: "Disattivato",
        resetTrimBleed: "Azzera Trim+Bleed: ",
        yes: "Sì", no: "No",
        sec3: "[3] LEGATORIA E COMPENSAZIONI",
        creep: "Scorrimento (Creep): ",
        direction: "  • Direzione:    ",
        shifts: "  • Spostam. (Est/Int):",
        outer: "Esterno", inner: "Interno",
        stock: "  • Carta:        ",
        cover: "Copertina", block: "Interno",
        spineComp: "  • Comp. dorso:  ",
        purHinge: "Incollatura laterale PUR: ",
        withCreaseShift: " (con spessore cordone)",
        rotateBacks: "Ruota retro 180°: ",
        sec4: "[4] SEGNI E INFO TECNICHE",
        cropMarks: "Segni di taglio:",
        markLength: "Lunghezza", markThickness: "Spessore",
        offsets: "Distanza (SI, SD)",
        centerMarks: "Segni di piega centrali",
        infoSlug: "Info tecniche (Slug): ",
        fontSize: "corpo",
        sec5: "[5] RIEPILOGO PRODUZIONE E MAPPATURA SEGNATURE",
        totalFlats: "Totale segnature create (Flats): ",
        physSheets: "Fogli fisici di macchina:        ",
        doubleSided: " (stampa fronte/retro)",
        singleSided: " (stampa solo fronte)",
        hFlat: "Segn. #", hSheet: "Foglio", hSide: "Lato", hGrid: "Posizione (Col,Riga)", hPage: "Pag. #", hRot: "Angolo", hShift: "Spostam. (Creep/PUR)",
        frontSide: "Fronte", backSide: "Retro", pageEmpty: "— [Vuoto]", pagePrefix: "Pag. ",
        autoSpread: "  (Montaggio automatico segnature)"
    },
    ja: {
        title: "QUICKIMPOSE v2.1 — 面付けジョブレポート (JOB REPORT)",
        date: "作成日時:       ",
        hostApp: "アプリケーション: ",
        srcFile: "元ファイル:     ",
        srcPath: "ファイルパス:   ",
        pdfPreset: "PDFプリセット:  ",
        sec1: "[1] ソースドキュメント寸法とPDFボックス",
        totalPages: "総ページ数:     ",
        trimSize: "仕上がりサイズ: ",
        docBleeds: "裁ち落とし:     ",
        top: "天", bottom: "地", inside: "のど", outside: "小口",
        pdfBoxMetrics: "PDFボックス測定値 (中間PDFより):",
        bleedLabel: "裁ち落とし",
        directPdf: "PDF直接面付け",
        sec2: "[2] 面付けと用紙設定",
        impType: "面付けタイプ:   ",
        foldScheme: "折り方式:       ",
        workStyle: "印刷方式:       ",
        grid: "面付けグリッド: ",
        cols: "列", rows: "行", onFlat: "面付け/版",
        printSheet: "印刷用紙:       ",
        impArea: "面付け領域:     ",
        margins: "用紙マージン:   ",
        left: "左", right: "右",
        gutters: "間隔:           ",
        horiz: "水平", vert: "垂直",
        sheetBleed: "用紙裁ち落とし: ",
        enabled: "有効", disabled: "無効",
        resetTrimBleed: "仕上がり+裁ち落とし再設定: ",
        yes: "はい", no: "いいえ",
        sec3: "[3] 製本および補正設定",
        creep: "競り出し補正 (Creep): ",
        direction: "  • 方向:         ",
        shifts: "  • 移動量 (外/内):",
        outer: "外側", inner: "内側",
        stock: "  • 用紙:         ",
        cover: "表紙", block: "本文",
        spineComp: "  • 背幅補正:     ",
        purHinge: "PUR サイド糊代罫線: ",
        withCreaseShift: " (折り罫移動含む)",
        rotateBacks: "裏面180°回転:   ",
        sec4: "[4] トンボ・マークおよび情報行",
        cropMarks: "コーナートンボ: ",
        markLength: "長さ", markThickness: "線幅",
        offsets: "オフセット (天地, 左右)",
        centerMarks: "センタートンボ",
        infoSlug: "版面情報 (Slug): ",
        fontSize: "pt",
        sec5: "[5] 台割り・面付け配置詳細 (SIGNATURE MAPPING)",
        totalFlats: "生成された刷版数 (Flats): ",
        physSheets: "実印刷用紙枚数:           ",
        doubleSided: " (両面印刷)",
        singleSided: " (片面印刷)",
        hFlat: "版 #", hSheet: "用紙", hSide: "面", hGrid: "配置 (列,行)", hPage: "ページ #", hRot: "回転", hShift: "補正移動量 (Creep/PUR)",
        frontSide: "表", backSide: "裏", pageEmpty: "— [白紙]", pagePrefix: "P. ",
        autoSpread: "  (見開き自動割り付け)"
    },
    pl: {
        totalPages: "Liczba stron:    ",
        trimSize: "Format netto:    ",
        docBleeds: "Spady dokumentu: ",
        top: "Góra", bottom: "Dół", inside: "Wewnątrz", outside: "Zewnątrz",
        pdfBoxMetrics: "Wymiary ramek PDF (zmierzone z PDF tymczasowego):",
        bleedLabel: "Spad",
        directPdf: "Bezpośredni import stron PDF",
        sec2: "[2] PARAMETRY IMPOZYCJI I ARKUSZA DRUKARSKIEGO",
        impType: "Typ impozycji:   ",
        foldScheme: "Schemat falcowania:",
        workStyle: "Sposób druku:    ",
        grid: "Siatka użytków:  ",
        cols: "Kolumny", rows: "Wiersze", onFlat: "-użytków na arkusz",
        printSheet: "Arkusz druku:    ",
        impArea: "Obszar impozycji:",
        margins: "Marginesy arkusza:",
        left: "Lewy", right: "Prawy",
        gutters: "Odstępy / Spady: ",
        horiz: "Poz.", vert: "Pion.",
        sheetBleed: "Spad arkusza:    ",
        enabled: "Włączone", disabled: "Wyłączone",
        resetTrimBleed: "Resetuj Trim+Bleed: ",
        yes: "Tak", no: "Nie",
        sec3: "[3] WYKOŃCZENIE I KOMPENSACJE",
        creep: "Kompensacja wypychania (Creep): ",
        direction: "  • Kierunek:      ",
        shifts: "  • Przesunięcia (Zew/Wew):",
        outer: "Zewnętrzne", inner: "Wewnętrzne",
        stock: "  • Papier:        ",
        cover: "Okładka", block: "Wkład",
        spineComp: "  • Komp. grzbietu:",
        purHinge: "Klej boczny PUR: ",
        withCreaseShift: " (z przesunięciem bigu)",
        rotateBacks: "Obrót rewersu o 180°: ",
        sec4: "[4] ZNACZNIKI I OZNACZENIA",
        cropMarks: "Znaczniki cięcia:",
        markLength: "Długość", markThickness: "Grubość",
        offsets: "Odsunięcia (GD, LP)",
        centerMarks: "Znaczniki grzbietowe",
        infoSlug: "Opis arkusza (Slug): ",
        fontSize: "stopień",
        sec5: "[5] PODSUMOWANIE PRODUKCJI I ROZKŁAD STRON",
        totalFlats: "Łącznie form drukowych (Flats): ",
        physSheets: "Fizycznych arkuszy papieru:     ",
        doubleSided: " (druk dwustronny)",
        singleSided: " (druk jednostronny)",
        hFlat: "Forma", hSheet: "Arkusz", hSide: "Strona", hGrid: "Pozycja (Kol,Wie)", hPage: "Strona #", hRot: "Obrót", hShift: "Przes. (Creep/PUR)",
        frontSide: "Awers", backSide: "Rewers", pageEmpty: "— [Pusta]", pagePrefix: "Str. ",
        autoSpread: "  (Automatyczny montaż składek)"
    },
    pt: {
        title: "QUICKIMPOSE v2.0 — RELATÓRIO DE IMPOSIÇÃO (JOB REPORT)",
        date: "Gerado em:       ",
        hostApp: "Aplicativo:      ",
        srcFile: "Arquivo de origem:",
        srcPath: "Caminho do arquivo:",
        pdfPreset: "Predefinição PDF:",
        sec1: "[1] GEOMETRIA DO DOCUMENTO DE ORIGEM E BOXES PDF",
        totalPages: "Total de páginas:",
        trimSize: "Formato final:   ",
        docBleeds: "Sangrias do doc: ",
        top: "Topo", bottom: "Base", inside: "Interno", outside: "Externo",
        pdfBoxMetrics: "Métricas de caixas PDF (medidas no PDF intermediário):",
        bleedLabel: "Sangria",
        directPdf: "Importação direta de páginas PDF",
        sec2: "[2] PARÂMETROS DE IMPOSIÇÃO E FOLHA DE IMPRESSÃO",
        impType: "Tipo de imposição:",
        foldScheme: "Esquema de dobra:",
        workStyle: "Tipo de impressão:",
        grid: "Grade de poses:  ",
        cols: "Cols", rows: "Linhas", onFlat: "-Up por folha",
        printSheet: "Folha de impressão:",
        impArea: "Área de imposição:",
        margins: "Margens da folha:",
        left: "Esq.", right: "Dir.",
        gutters: "Medianizes / Gaps:",
        horiz: "Horiz.", vert: "Vert.",
        sheetBleed: "Sangria da folha:",
        enabled: "Ativado", disabled: "Desativado",
        resetTrimBleed: "Redefinir Trim+Bleed: ",
        yes: "Sim", no: "Não",
        sec3: "[3] ACABAMENTO E COMPENSAÇÕES",
        creep: "Compensação de avanço (Creep): ",
        direction: "  • Direção:       ",
        shifts: "  • Deslocamentos (Ext/Int):",
        outer: "Externo", inner: "Interno",
        stock: "  • Tipo de papel: ",
        cover: "Capa", block: "Miolo",
        spineComp: "  • Comp. de lombada:",
        purHinge: "Vinco lateral PUR: ",
        withCreaseShift: " (com deslocamento de vinco)",
        rotateBacks: "Girar versos 180°: ",
        sec4: "[4] MARCAS E ANOTAÇÕES",
        cropMarks: "Marcas de corte: ",
        markLength: "Comprimento", markThickness: "Espessura",
        offsets: "Deslocamentos (TB, LR)",
        centerMarks: "Marcas centrais de dobra",
        infoSlug: "Informações técnicas (Slug): ",
        fontSize: "corpo",
        sec5: "[5] RESUMO DE PRODUÇÃO E MAPEAMENTO DE CADERNOS",
        totalFlats: "Total de formas geradas (Flats): ",
        physSheets: "Folhas físicas de impressão:     ",
        doubleSided: " (impressão frente e verso)",
        singleSided: " (impressão em um lado)",
        hFlat: "Forma", hSheet: "Folha", hSide: "Lado", hGrid: "Posição (Col,Lin)", hPage: "Página #", hRot: "Rot.", hShift: "Desloc. (Creep/PUR)",
        frontSide: "Frente", backSide: "Verso", pageEmpty: "— [Vazio]", pagePrefix: "Pág. ",
        autoSpread: "  (Montagem automática de cadernos)"
    }
    };
    return (lang && dict[lang]) ? dict[lang] : dict["en"];
}

function generateAndSaveJobReport(reportData) {
    if (!reportData) return null;
    try {
        var lang = reportData.lang || "en";
        var loc = getReportLoc(lang);
        var now = new Date();
        var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };
        var dateStr = now.getFullYear() + "-" + 
            pad2(now.getMonth() + 1) + "-" + 
            pad2(now.getDate()) + " " + 
            pad2(now.getHours()) + ":" + 
            pad2(now.getMinutes()) + ":" + 
            pad2(now.getSeconds());

        var osStr = (File.fs === "Windows") ? "Windows" : "macOS";
        var idVer = (typeof app !== "undefined" && app.version) ? ("Adobe InDesign " + app.version) : "Adobe InDesign";

        var lines = [];
        var sep = "================================================================================";
        var subSep = "--------------------------------------------------------------------------------";

        lines.push(sep);
        lines.push(loc.title);
        lines.push(sep);
        lines.push(loc.date + dateStr);
        lines.push(loc.hostApp + idVer + " (" + osStr + ")");
        lines.push(loc.srcFile + (reportData.srcDocName || "Document"));
        if (reportData.srcDocPath) {
            lines.push(loc.srcPath + reportData.srcDocPath);
        }
        lines.push(loc.pdfPreset + (reportData.pdfPresetName || "[Default]"));
        lines.push(sep);
        lines.push("");

        // [1] SOURCE GEOMETRY & PDF BOXES
        lines.push(loc.sec1);
        lines.push(subSep);
        var u = reportData.unitStr || "mm";
        lines.push(loc.totalPages + (reportData.srcPgsCount || 1));
        lines.push(loc.trimSize + (reportData.srcTrimW || 0).toFixed(2) + " × " + (reportData.srcTrimH || 0).toFixed(2) + " " + u);
        lines.push(loc.docBleeds + 
            loc.top + ": " + (reportData.bleedT || 0).toFixed(2) + " " + u + " | " +
            loc.bottom + ": " + (reportData.bleedB || 0).toFixed(2) + " " + u + " | " +
            loc.inside + ": " + (reportData.bleedL || 0).toFixed(2) + " " + u + " | " +
            loc.outside + ": " + (reportData.bleedR || 0).toFixed(2) + " " + u);
        
        lines.push("");
        lines.push(loc.pdfBoxMetrics);
        if (reportData.pdfBoxes) {
            var b = reportData.pdfBoxes;
            lines.push("  • TrimBox:     " + (b.trimW || 0).toFixed(2) + " × " + (b.trimH || 0).toFixed(2) + " " + u);
            lines.push("  • BleedBox:    " + (b.bleedW || 0).toFixed(2) + " × " + (b.bleedH || 0).toFixed(2) + " " + u + " (" + loc.bleedLabel + ": +" + (b.bleedOffsetX || 0).toFixed(2) + " / +" + (b.bleedOffsetY || 0).toFixed(2) + " " + u + ")");
            lines.push("  • MediaBox:    " + (b.mediaW || 0).toFixed(2) + " × " + (b.mediaH || 0).toFixed(2) + " " + u);
        } else {
            lines.push("  • " + loc.directPdf);
        }
        lines.push("");

        // [2] IMPOSITION & SHEET LAYOUT
        lines.push(loc.sec2);
        lines.push(subSep);
        lines.push(loc.impType + (reportData.impTypeStr || ""));
        if (reportData.foldSchemeStr) {
            lines.push(loc.foldScheme + reportData.foldSchemeStr);
        }
        lines.push(loc.workStyle + (reportData.workStyleStr || "Sheetwise"));
        lines.push(loc.grid + (reportData.cols || 1) + " " + loc.cols + " × " + (reportData.rows || 1) + " " + loc.rows + " (" + (reportData.totalUp || 1) + " " + loc.onFlat + ")");
        lines.push(loc.printSheet + (reportData.sheetFormatName ? (reportData.sheetFormatName + " — ") : "") + (reportData.sheetW || 0).toFixed(2) + " × " + (reportData.sheetH || 0).toFixed(2) + " " + u);
        lines.push(loc.impArea + (reportData.impAreaW || 0).toFixed(2) + " × " + (reportData.impAreaH || 0).toFixed(2) + " " + u);
        lines.push(loc.margins + 
            loc.left + ": " + (reportData.marginLeft || 0).toFixed(2) + " " + u + " | " +
            loc.top + ": " + (reportData.marginTop || 0).toFixed(2) + " " + u + " | " +
            loc.right + ": " + (reportData.marginRight || 0).toFixed(2) + " " + u + " | " +
            loc.bottom + ": " + (reportData.marginBottom || 0).toFixed(2) + " " + u);
        lines.push(loc.gutters + 
            loc.horiz + ": " + (reportData.spacingHoriz || 0).toFixed(2) + " " + u + " | " +
            loc.vert + ": " + (reportData.spacingVert || 0).toFixed(2) + " " + u);
        lines.push(loc.sheetBleed + (reportData.addSheetBleed ? (loc.enabled + " (+3.0 " + u + ")") : loc.disabled));
        lines.push(loc.resetTrimBleed + (reportData.resetTrimBleed ? loc.yes : loc.no));
        lines.push("");

        // [3] FINISHING & MECHANICAL COMPENSATIONS
        lines.push(loc.sec3);
        lines.push(subSep);
        if (reportData.enableCreep) {
            lines.push(loc.creep + loc.enabled);
            lines.push(loc.direction + (reportData.creepDirStr || ""));
            lines.push(loc.shifts + loc.outer + ": " + (reportData.creepOuter || 0).toFixed(2) + " " + u + " | " + loc.inner + ": " + (reportData.creepInner || 0).toFixed(2) + " " + u);
            lines.push(loc.stock + loc.cover + ": " + (reportData.coverPaperStr || "—") + " | " + loc.block + ": " + (reportData.blockPaperStr || "—"));
            lines.push(loc.spineComp + (reportData.compensateThickness ? (loc.enabled + " (K = " + (reportData.compensateCoeff || 1.0).toFixed(2) + ")") : loc.disabled));
        } else {
            lines.push(loc.creep + loc.disabled);
        }
        if (reportData.purHinge > 0) {
            lines.push(loc.purHinge + (reportData.purHinge || 0).toFixed(2) + " " + u + (reportData.shiftHinge ? loc.withCreaseShift : ""));
        }
        lines.push(loc.rotateBacks + (reportData.rotateBacks ? loc.yes : loc.no));
        lines.push("");

        // [4] MARKS & ANNOTATIONS
        lines.push(loc.sec4);
        lines.push(subSep);
        lines.push(loc.cropMarks + (reportData.drawMarks ? loc.enabled : loc.disabled));
        if (reportData.drawMarks) {
            lines.push("  • " + loc.markLength + ": " + (reportData.markLength || 3).toFixed(2) + " " + u + " | " + loc.markThickness + ": " + (reportData.markThickness || 0.25) + " pt");
            lines.push("  • " + loc.offsets + ": " + (reportData.markOffsetTB || 3).toFixed(2) + " " + u + " / " + (reportData.markOffsetLR || 3).toFixed(2) + " " + u);
            lines.push("  • " + loc.centerMarks + ": " + (reportData.drawCenterMark ? loc.enabled : loc.disabled));
        }
        lines.push(loc.infoSlug + (reportData.infoSlug ? (loc.enabled + " (" + loc.fontSize + " " + (reportData.slugFontSize || 7) + " pt)") : loc.disabled));
        lines.push("");

        // [5] PRODUCTION SUMMARY & SIGNATURE MAPPING
        lines.push(loc.sec5);
        lines.push(subSep);
        var totalFlats = reportData.flatsCount || 0;
        var totalSheets = reportData.isDoubleSided ? Math.ceil(totalFlats / 2) : totalFlats;
        lines.push(loc.totalFlats + totalFlats);
        lines.push(loc.physSheets + totalSheets + (reportData.isDoubleSided ? loc.doubleSided : loc.singleSided));
        lines.push("");

        // Table formatting helper
        var padStr = function (val, len, alignRight) {
            var s = String(val);
            while (s.length < len) {
                s = alignRight ? (" " + s) : (s + " ");
            }
            return s;
        };

        lines.push(padStr(loc.hFlat, 8, false) + " | " + padStr(loc.hSheet, 10, false) + " | " + padStr(loc.hSide, 10, false) + " | " + padStr(loc.hGrid, 20, false) + " | " + padStr(loc.hPage, 14, false) + " | " + padStr(loc.hRot, 8, false) + " | " + padStr(loc.hShift, 20, false));
        lines.push(subSep);

        if (reportData.flatsMapping && reportData.flatsMapping.length > 0) {
            for (var mIdx = 0; mIdx < reportData.flatsMapping.length; mIdx++) {
                var item = reportData.flatsMapping[mIdx];
                var fNumStr = padStr("#" + item.flatNum, 8, false);
                var sNumStr = padStr(loc.hSheet + " " + item.sheetNum, 10, false);
                var isItemBack = (item.isBack !== undefined) ? item.isBack : ((item.flatNum % 2 === 0));
                var sideStr = padStr(isItemBack ? loc.backSide : loc.frontSide, 10, false);
                var gridStr = padStr("(" + item.col + ", " + item.row + ")", 20, false);
                var pNumStr = padStr((item.pageNum > 0 ? (loc.pagePrefix + item.pageNum) : loc.pageEmpty), 14, false);
                var rotStr = padStr(item.rotation + "°", 8, false);
                var shiftStr = padStr((item.shiftX !== 0 ? ((item.shiftX > 0 ? "+" : "") + item.shiftX.toFixed(2) + " " + u) : "0.00 " + u), 20, false);

                lines.push(fNumStr + " | " + sNumStr + " | " + sideStr + " | " + gridStr + " | " + pNumStr + " | " + rotStr + " | " + shiftStr);
            }
        } else {
            lines.push(loc.autoSpread);
        }

        lines.push("");
        lines.push(sep);
        lines.push("QuickImpose — Open Source Imposition Script for Adobe InDesign");
        lines.push("https://github.com/SaidAuita/QuickImpose-InDesign");
        lines.push(sep);

        var reportContent = lines.join("\r\n");

        // Determine destination file
        var reportFile = null;
        var baseFolder = null;
        try {
            if (reportData.docFolder && reportData.docFolder.exists) {
                baseFolder = reportData.docFolder;
            }
        } catch (eDF) { }

        if (!baseFolder || !baseFolder.exists) {
            try {
                if (reportData.srcDoc && reportData.srcDoc.saved) {
                    baseFolder = reportData.srcDoc.filePath;
                }
            } catch (eF) { }
        }

        if (!baseFolder || !baseFolder.exists) {
            try {
                if (reportData.selectedPdfFile && reportData.selectedPdfFile.parent) {
                    baseFolder = reportData.selectedPdfFile.parent;
                }
            } catch (eP) { }
        }

        if (!baseFolder || !baseFolder.exists) {
            baseFolder = Folder.desktop;
        }

        var docNameClean = reportData.docNameClean || "QuickImpose_Job";
        var fileName = docNameClean + "_JobReport.txt";
        reportFile = new File(baseFolder.fsName + "/" + fileName);

        reportFile.encoding = "UTF-8";
        reportFile.open("w");
        reportFile.write(reportContent);
        reportFile.close();

        return reportFile;
    } catch (eAll) {
        try { alert("Job Report Error: " + eAll.message + " (line " + eAll.line + ")"); } catch (eAlert) { }
        return null;
    }
}

function executeImposition(srcDoc, params) {

    var isTwoPass = (params.impTypeSelectionIndex === 0) && (params.foldScheme || 0) > 0;
    var sBleedTB = (params.markOffsetTB !== undefined) ? params.markOffsetTB : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);
    var sBleedLR = (params.markOffsetLR !== undefined) ? params.markOffsetLR : ((params.sheetBleedVal !== undefined) ? params.sheetBleedVal : 3.0);

    try { srcDoc.viewPreferences.zeroPoint = [0, 0]; } catch (e) { }
    try { app.transformPreferences.dimensionsIncludeStroke = false; } catch (e) { }
    logDiagToFile(srcDoc, null, "QuickImpose_v3_exec", pdfFolder);
    if (params.impTypeSelectionIndex === 0 && params.foldScheme > 0 && !params.isTwoPassIntermediate) {
        executeTwoPassEngine(srcDoc, params);
        return;
    }


    var initialLang = params.lang || "ru";

    // 1. Save original ruler settings
    var savedUnitsH = srcDoc.viewPreferences.horizontalMeasurementUnits;
    var savedUnitsV = srcDoc.viewPreferences.verticalMeasurementUnits;
    var savedRuler = srcDoc.viewPreferences.rulerOrigin;

    // 2. Set targetUnits based on params
    var targetUnits = MeasurementUnits.MILLIMETERS;
    if (params.unitStr === "pt") targetUnits = MeasurementUnits.POINTS;
    else if (params.unitStr === "in") targetUnits = MeasurementUnits.INCHES;

    // Force source document to use the selected units (e.g. Millimeters) for all calculations
    srcDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    srcDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    var docName = srcDoc.name;
    var docWidth = srcDoc.documentPreferences.pageWidth;
    var docHeight = srcDoc.documentPreferences.pageHeight;
    var docNameClean = cleanFileName(srcDoc.name).replace(/\.[a-zA-Z0-9]+$/, "");

    var docBleedTop = 0, docBleedBottom = 0, docBleedLeft = 0, docBleedRight = 0;
    try {
        if (srcDoc && srcDoc.documentPreferences) {
            docBleedTop = srcDoc.documentPreferences.documentBleedTopOffset || 0;
            docBleedBottom = srcDoc.documentPreferences.documentBleedBottomOffset || 0;
            docBleedLeft = srcDoc.documentPreferences.documentBleedInsideOrLeftOffset || 0;
            docBleedRight = srcDoc.documentPreferences.documentBleedOutsideOrRightOffset || 0;
        }
    } catch (eDocBleed) { }

    // 3. Export source document to temporary PDF in _pdf_tmp folder of document directory
    var docFolder = srcDoc.saved ? srcDoc.filePath : Folder.temp;
    var pdfFolder = new Folder(docFolder + "/_pdf_tmp");
    if (!pdfFolder.exists) {
        pdfFolder.create();
    }
    var docNameWithoutExt = docNameClean;
    var tsStr = typeof getHumanTimestamp === "function" ? getHumanTimestamp() : new Date().getTime().toString();
    var tempPDF = new File(pdfFolder.absoluteURI + "/tmp_" + docNameWithoutExt + "_" + tsStr + ".pdf");

    // Turn on bleed and configure high-quality PDF preferences in export
    var savedBleedWithPDF = app.pdfExportPreferences.useDocumentBleedWithPDF;
    var savedExportBleedTop = app.pdfExportPreferences.bleedTop;
    var savedExportBleedBottom = app.pdfExportPreferences.bleedBottom;
    var savedExportBleedInside = app.pdfExportPreferences.bleedInside;
    var savedExportBleedOutside = app.pdfExportPreferences.bleedOutside;
    var savedExportReaderSpreads = app.pdfExportPreferences.exportReaderSpreads;
    var savedAcrobatCompatibility = app.pdfExportPreferences.acrobatCompatibility;
    
    // Save image compression preferences
    var savedColorComp = app.pdfExportPreferences.colorBitmapCompression;
    var savedColorSamp = app.pdfExportPreferences.colorBitmapSampling;
    var savedGrayComp = app.pdfExportPreferences.grayscaleBitmapCompression;
    var savedGraySamp = app.pdfExportPreferences.grayscaleBitmapSampling;
    var savedMonoComp = app.pdfExportPreferences.monochromeBitmapCompression;
    var savedMonoSamp = app.pdfExportPreferences.monochromeBitmapSampling;

    // Apply selected PDF preset properties if available
    var selectedPreset = getSelectedPdfPreset(params ? params.pdfPresetName : null);
    if (selectedPreset && selectedPreset.isValid) {
        var presetProps = [
            "acrobatCompatibility", "colorBitmapCompression", "colorBitmapQuality",
            "colorBitmapSampling", "colorBitmapSamplingDPI", "compressTextAndLineArt",
            "cropImagesToFrames", "exportGuidesAndGrids", "exportLayers",
            "exportNonprintingObjects", "generateThumbnails", "grayscaleBitmapCompression",
            "grayscaleBitmapQuality", "grayscaleBitmapSampling", "grayscaleBitmapSamplingDPI",
            "includeBookmarks", "includeHyperlinks", "includeICCProfiles",
            "monochromeBitmapCompression", "monochromeBitmapSampling", "monochromeBitmapSamplingDPI",
            "pdfColorSpace", "pdfDestinationProfile", "pdfXProfile", "standardsCompliance"
        ];
        for (var prIdx = 0; prIdx < presetProps.length; prIdx++) {
            var prKey = presetProps[prIdx];
            try {
                if (typeof selectedPreset[prKey] !== "undefined") {
                    app.pdfExportPreferences[prKey] = selectedPreset[prKey];
                }
            } catch (ePrp) { }
        }
    }

    // Explicitly enforce imposition-critical rules: document bleeds, single pages, lossless quality
    app.pdfExportPreferences.useDocumentBleedWithPDF = params.useDocBleed;
    if (!params.useDocBleed) {
        app.pdfExportPreferences.bleedTop = params.customBleed;
        app.pdfExportPreferences.bleedBottom = params.customBleed;
        app.pdfExportPreferences.bleedInside = params.customBleed;
        app.pdfExportPreferences.bleedOutside = params.customBleed;
    }

    try { app.pdfExportPreferences.exportReaderSpreads = false; } catch (e) { }
    try {
        if (!selectedPreset || !selectedPreset.isValid) {
            app.pdfExportPreferences.acrobatCompatibility = AcrobatCompatibility.ACROBAT_5;
        }
    } catch (e) { }

    // Apply Lossless No-Downsampling settings for Temporary PDF (prevents compression artifacts on placed flats)
    try {
        app.pdfExportPreferences.colorBitmapSampling = Sampling.NONE;
        app.pdfExportPreferences.colorBitmapCompression = BitmapCompression.ZIP;
        app.pdfExportPreferences.grayscaleBitmapSampling = Sampling.NONE;
        app.pdfExportPreferences.grayscaleBitmapCompression = BitmapCompression.ZIP;
        app.pdfExportPreferences.monochromeBitmapSampling = Sampling.NONE;
        app.pdfExportPreferences.monochromeBitmapCompression = BitmapCompression.ZIP;
    } catch(e) {}

    // Export without interactive dialogs, using active preferences (which guarantee document bleeds and lossless compression)
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
    try {
        srcDoc.exportFile(ExportFormat.PDF_TYPE, tempPDF, false);
    } catch (e) {
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
        alert(translations[initialLang].alert_err_export + e);
        return;
    }
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

    // Restore PDF export preferences
    app.pdfExportPreferences.useDocumentBleedWithPDF = savedBleedWithPDF;
    app.pdfExportPreferences.bleedTop = savedExportBleedTop;
    app.pdfExportPreferences.bleedBottom = savedExportBleedBottom;
    app.pdfExportPreferences.bleedInside = savedExportBleedInside;
    app.pdfExportPreferences.bleedOutside = savedExportBleedOutside;
    app.pdfExportPreferences.exportReaderSpreads = savedExportReaderSpreads;
    app.pdfExportPreferences.acrobatCompatibility = savedAcrobatCompatibility;
    
    // Restore image compression preferences
    try {
        app.pdfExportPreferences.colorBitmapCompression = savedColorComp;
        app.pdfExportPreferences.colorBitmapSampling = savedColorSamp;
        app.pdfExportPreferences.grayscaleBitmapCompression = savedGrayComp;
        app.pdfExportPreferences.grayscaleBitmapSampling = savedGraySamp;
        app.pdfExportPreferences.monochromeBitmapCompression = savedMonoComp;
        app.pdfExportPreferences.monochromeBitmapSampling = savedMonoSamp;
    } catch(e) {}

    // 2. Load PDF Page Info (Trim and Bleed bounds)
    var testDoc = app.documents.add(false); // invisible test doc
    testDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    testDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    testDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    app.pdfPlacePreferences.pageNumber = 1;
    app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_TRIM;
    var placedTrim = testDoc.pages.item(0).place(tempPDF, [0, 0])[0];
    var trimBounds = placedTrim.parent.geometricBounds; // [T, L, B, R]
    placedTrim.parent.remove();

    app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;
    var placedBleed = testDoc.pages.item(0).place(tempPDF, [0, 0])[0];
    var bleedBounds = placedBleed.parent.geometricBounds; // [T, L, B, R]
    placedBleed.parent.remove();

    var mediaBounds = bleedBounds;
    try {
        app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_MEDIA;
        var placedMedia = testDoc.pages.item(0).place(tempPDF, [0, 0])[0];
        mediaBounds = placedMedia.parent.geometricBounds;
        placedMedia.parent.remove();
    } catch (eMed) { }

    testDoc.close(SaveOptions.NO);

    // Calculate concentric bleed offsets (TrimBox and BleedBox share the same center)
    var bleedHeight = bleedBounds[2] - bleedBounds[0];
    var trimHeight = trimBounds[2] - trimBounds[0];
    var bleedWidth = bleedBounds[3] - bleedBounds[1];
    var trimWidth = trimBounds[3] - trimBounds[1];
    var mediaHeight = mediaBounds[2] - mediaBounds[0];
    var mediaWidth = mediaBounds[3] - mediaBounds[1];

    var pdfBleedY = (bleedHeight - trimHeight) / 2;
    var pdfBleedX = (bleedWidth - trimWidth) / 2;

    // Fallback: If InDesign fails to read a difference between TrimBox and BleedBox (e.g. PDF lacks TrimBox),
    // but the user has "Use Document Bleed" checked, we fall back to the sheet bleed value.
    if (pdfBleedX <= 0 && params.useDocBleed) {
        pdfBleedX = params.sheetBleedVal || 3.0;
    }
    if (pdfBleedY <= 0 && params.useDocBleed) {
        pdfBleedY = params.sheetBleedVal || 3.0;
    }

    // Removed incorrect override of sBleedLR and sBleedTB with document bleeds.

    var expandSheet = params.addSheetBleed || (!params.resetTrimBleed && params.drawMarks);
    if (expandSheet && !params.isTwoPassIntermediate && !isTwoPass) {
        var extraX = 0;
        var extraY = 0;
        if (params.addSheetBleed) {
            extraX += Math.max(sBleedLR, pdfBleedX);
            extraY += Math.max(sBleedTB, pdfBleedY);
        }
        if (!params.resetTrimBleed && params.drawMarks) {
            var lenVal = params.markLength || 3;
            extraX += lenVal;
            extraY += lenVal;
        }
        if (params.sheetWidth > 0) params.sheetWidth += extraX * 2;
        if (params.sheetHeight > 0) params.sheetHeight += extraY * 2;
    }

    // Total pages in source PDF
    var totalPgs = srcDoc.pages.length;

    // Page dimensions
    var W = srcDoc.documentPreferences.pageWidth;
    var H = srcDoc.documentPreferences.pageHeight;

    // Imposition Type Index
    var impIdx = params.impTypeSelectionIndex;

    // Margins, spacing, and creep
    var mLeft = (params.marginLeft !== undefined) ? params.marginLeft : 0;
    var mTop = (params.marginTop !== undefined) ? params.marginTop : 0;
    var mRight = (params.marginRight !== undefined) ? params.marginRight : 0;
    var mBottom = (params.marginBottom !== undefined) ? params.marginBottom : 0;
    var sHoriz = params.spacingHoriz;
    var sVert = params.spacingVert;

    var bTop = pdfBleedY;
    var bBottom = pdfBleedY;
    var bLeft = pdfBleedX;
    var bRight = pdfBleedX;

    if (params.resetTrimBleed) {
        // If the user checked "Reset Trim + Bleed", we force the grid size to match the PDF's exact TrimBox
        W = trimWidth;
        H = trimHeight;
    }

    // For non-booklet modes, the user specifies the visual gap between the placed PDFs.
    // Since the PDFs include bleed, we must inflate the TrimBox spacing by the bleeds so they don't overlap inside the gap.
    if (impIdx !== 0 && impIdx !== 1) {
        sHoriz += (pdfBleedX * 2);
        sVert += (pdfBleedY * 2);
    }

    var creepOuterVal = params.enableCreep ? params.creepOuter : 0.0;
    var creepInnerVal = params.enableCreep ? params.creepInner : 0.0;

    // Build Imposition Sequence
    var sequence = params.customSequence ? params.customSequence : null;
    if (!sequence) {
        if (impIdx === 0 || impIdx === 1) {
            var foldScheme = params.foldScheme || 0;
            sequence = generateFoldSchemeSequence(totalPgs, params.sheetsPerSig, foldScheme, params.workStyle || 0, (impIdx === 0));
        } else if (impIdx === 2) {
            sequence = generateConsecutiveSequence(totalPgs, params.cols, params.rows, params.foldScheme === 1);
        } else if (impIdx === 3) {
            sequence = generateCutStackSequence(totalPgs, params.cols, params.rows, params.foldScheme === 1);
        } else if (impIdx === 4) {
            sequence = generateStepAndRepeatSequence(totalPgs, params.cols, params.rows, params.foldScheme === 1);
        } else {
            // Fallback
            sequence = generateConsecutiveSequence(totalPgs, params.cols, params.rows, false);
        }
    }

    // Filter out completely empty sheets (where all cells pageNum <= 0)
    var activeSheets = [];
    for (var i = 0; i < sequence.sheets.length; i++) {
        var sh = sequence.sheets[i];
        var grid = sh.isBack ? (sh.back || sh.front) : (sh.front || sh.back);
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

    // 3. Create target Document
    var purHingeVal = (impIdx === 1) ? (params.purHinge || 0) : 0;
    var purHingeAdd = (impIdx === 1) ? (sequence.pagesAcross === 1 ? purHingeVal : purHingeVal * 2) : 0;
    var isBookletMode = (impIdx === 0 || impIdx === 1);
    
    var gapsBeforeTotalSheet = isBookletMode ? Math.floor((sequence.pagesAcross - 1) / 2) : (sequence.pagesAcross - 1);
    var targetSheetW = sequence.pagesAcross * W + gapsBeforeTotalSheet * sHoriz + purHingeAdd;
    var targetSheetH = sequence.pagesDown * H + (sequence.pagesDown - 1) * sVert;
    var bleedOffsetX = 0;
    var bleedOffsetY = 0;
    
    if (!isBookletMode || !params.resetTrimBleed) {
        targetSheetW += mLeft + mRight;
        targetSheetH += mTop + mBottom;
        bleedOffsetX += mLeft;
        bleedOffsetY += mTop;
    }
    var isTwoPass = (params.impTypeSelectionIndex === 0) && (params.foldScheme || 0) > 0;
    var expandSheet2 = params.addSheetBleed || (!params.resetTrimBleed && params.drawMarks);
    if (expandSheet2 && !params.isTwoPassIntermediate && !isTwoPass) {
        var extraX = 0;
        var extraY = 0;
        if (params.addSheetBleed) {
            extraX += Math.max(sBleedLR, pdfBleedX);
            extraY += Math.max(sBleedTB, pdfBleedY);
        }
        if (!params.resetTrimBleed && params.drawMarks) {
            var lenVal = params.markLength || 3;
            extraX += lenVal;
            extraY += lenVal;
        }

        if (params.sheetWidth <= 0) {
            targetSheetW += (extraX * 2);
            bleedOffsetX += extraX;
        }
        if (params.sheetHeight <= 0) {
            targetSheetH += (extraY * 2);
            bleedOffsetY += extraY;
        }
    }

    var showingWindow = false; // fast execution
    var targetDoc = app.documents.add(showingWindow);
    try { targetDoc.rectanglePreferences.strokeWeight = 0; } catch (e) { }
    try { targetDoc.rectanglePreferences.strokeColor = targetDoc.swatches.item("None"); } catch (e) { }
    try { targetDoc.rectanglePreferences.fillColor = targetDoc.swatches.item("None"); } catch (e) { }

    targetDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

    targetDoc.documentPreferences.facingPages = false;
    targetDoc.documentPreferences.pageWidth = targetSheetW;
    targetDoc.documentPreferences.pageHeight = targetSheetH;
    
    // Set InDesign document bleeds according to the Imposition Margins
    targetDoc.documentPreferences.documentBleedUniformSize = false;
    targetDoc.documentPreferences.documentBleedTopOffset = mTop;
    targetDoc.documentPreferences.documentBleedBottomOffset = mBottom;
    targetDoc.documentPreferences.documentBleedInsideOrLeftOffset = mLeft;
    targetDoc.documentPreferences.documentBleedOutsideOrRightOffset = mRight;

    // Zero out margins for all pages in target document
    for (var p = 0; p < targetDoc.pages.length; p++) {
        var pg = targetDoc.pages.item(p);
        pg.marginPreferences.top = 0;
        pg.marginPreferences.bottom = 0;
        pg.marginPreferences.left = 0;
        pg.marginPreferences.right = 0;
    }

    // Process each sheet side
    var totalFlats = sequence.sheets.length;
    var flatsMapping = [];
    for (var fIdx = 0; fIdx < totalFlats; fIdx++) {
        var sheetObj = sequence.sheets[fIdx];
        var markItems = [];

        // Add pages to target doc if needed
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

        // Apply front or back grid
        var grid = sheetObj.front || sheetObj.back;
        var isBack = false;
        if (sheetObj.isBack) {
            grid = sheetObj.back || sheetObj.front;
            isBack = true;
        }

        var getShiftForCol = function (col) {
            if (!params.enableCreep || impIdx !== 1) return 0;
            var curShObj = sequence.sheets[fIdx];
            var isDoubleSided = (curShObj && curShObj.workStyle === 0);
            var rawIdx = (curShObj && curShObj.sheetIndex !== undefined) ? curShObj.sheetIndex : fIdx;
            var sheetIdx = isDoubleSided ? Math.floor(fIdx / 2) : rawIdx;
            var totalPhysSheets = isDoubleSided ? Math.ceil(sequence.sheets.length / 2) : sequence.sheets.length;
            var sigSize = (sequence.sheetsPerSignature > 0) ? sequence.sheetsPerSignature : totalPhysSheets;
            var sheetInSig = (sigSize > 0) ? (sheetIdx % sigSize) : sheetIdx;
            var outerVal = (params.creepOuter || 0);

            if (sequence.pagesAcross === 1) {
                var step = (outerVal !== 0 && sigSize > 1) ? (outerVal / (sigSize - 1)) : 0;
                return sheetInSig * step;
            } else if (sequence.pagesAcross === 2) {
                var pagesPerSig = sigSize * 4;
                var pNum = grid[0] && grid[0][col] ? grid[0][col].pageNum : 1;
                if (pNum <= 0) pNum = 1;
                var relPNum = ((pNum - 1) % pagesPerSig) + 1;
                var maxUnits = (2 * sigSize - 1);
                var step = (outerVal !== 0 && maxUnits > 0) ? (outerVal / maxUnits) : 0;
                var resetMode = params.resetTrimBleed;
                return (col % 2 === 0) ? -(((relPNum - 2) / 2) * step) : (resetMode ? (((relPNum - 1) / 2) * step) : -(((relPNum - 1) / 2) * step));
            }
            return 0;
        };
        // Calculate creep for this sheet
        var totalSigSheets = sequence.sheetsPerSignature;
        var sheetSigIdx = sheetObj.sheetIndex; // 0-based within signature
        var creepVal = 0;
        if (totalSigSheets > 1) {
            creepVal = creepOuterVal + (sheetSigIdx / (totalSigSheets - 1)) * (creepInnerVal - creepOuterVal);
        } else {
            creepVal = creepOuterVal;
        }

        // Place cells
        for (var r = 0; r < sequence.pagesDown; r++) {
            for (var c = 0; c < sequence.pagesAcross; c++) {
                var cell = grid[r][c];
                if (!cell || cell.pageNum <= 0 || cell.pageNum > totalPgs) continue;

                var purHingeVal = (impIdx === 1) ? (params.purHinge || 0) : 0;
                var spinesBefore = Math.floor(c / 2) + ((c % 2 === 1) ? 1 : 0);
                var extraShiftX = 0;
                if (impIdx === 1) {
                    if (sequence.pagesAcross === 1) extraShiftX = (typeof isBack !== "undefined" && isBack) ? 0 : purHingeVal;
                    else {
                        var spinesBefore = Math.floor(c / 2) + ((c % 2 === 1) ? 1 : 0);
                        extraShiftX = spinesBefore * 2 * purHingeVal;
                    }
                }
                var gapsBefore = (impIdx === 0 || impIdx === 1) ? Math.floor(c / 2) : c;

                var X = c * W + gapsBefore * sHoriz + extraShiftX + bleedOffsetX;
                var Y = r * H + r * sVert + bleedOffsetY;

                // Creep shift horizontal
                var shiftX = 0;
                if (params.enableCreep) {
                    var isOutward = (params.creepDirectionIndex === 1);
                    if (impIdx === 1) {
                        var curShObj = sequence.sheets[fIdx];
                        var isDoubleSided = (curShObj && curShObj.workStyle === 0);
                        var sheetIdx = (curShObj && curShObj.sheetIndex !== undefined) ? curShObj.sheetIndex : fIdx;
                        var totalPhysSheets = (sequence.sheets && sequence.sheets.length > 0) ? (isDoubleSided ? Math.ceil(sequence.sheets.length / 2) : sequence.sheets.length) : 1;
                        var sigSize = (sequence.sheetsPerSignature > 0) ? sequence.sheetsPerSignature : totalPhysSheets;
                        var sheetInSig = (sigSize > 0) ? (sheetIdx % sigSize) : sheetIdx;
                        var outerVal = (params.creepOuter || 0);

                        if (sequence.pagesAcross === 1) {
                            var step = (outerVal !== 0 && sigSize > 1) ? (outerVal / (sigSize - 1)) : 0;
                            shiftX = sheetInSig * step;
                            if (typeof isBack !== "undefined" && isBack) shiftX = -shiftX;
                        } else if (sequence.pagesAcross === 2) {
                            var pagesPerSig = sigSize * 4;
                            var pNum = curShObj.isBack ? curShObj.back[r][c].pageNum : curShObj.front[r][c].pageNum;
                            if (pNum <= 0) pNum = 1;
                            var relPNum = ((pNum - 1) % pagesPerSig) + 1;
                            var maxUnits = (2 * sigSize - 1);
                            var step = (outerVal !== 0 && maxUnits > 0) ? (outerVal / maxUnits) : 0;
                            var resetMode = params.resetTrimBleed;
                            if (c % 2 === 0) { // left page
                                shiftX = -((relPNum - 2) / 2) * step;
                            } else { // right page
                                shiftX = ((relPNum - 1) / 2) * step;
                            }
                            if (!isOutward) shiftX = -shiftX;
                        }
                    } else if (impIdx === 0 && sequence.pagesAcross === 2) {
                        if (c % 2 === 0) {
                            shiftX = creepVal;
                        } else {
                            shiftX = -creepVal;
                        }
                    }
                }

                // Record mapping for Job Report
                var isCurDoubleSided = (sheetObj && sheetObj.workStyle === 0);
                var curSheetNum = isCurDoubleSided ? (Math.floor(fIdx / 2) + 1) : (fIdx + 1);
                var curSideStr = isBack ? (initialLang === "ru" ? "Оборот" : "Back") : (initialLang === "ru" ? "Лицо" : "Front");
                flatsMapping.push({
                    flatNum: fIdx + 1,
                    sheetNum: curSheetNum,
                    isBack: isBack,
                    sideStr: curSideStr,
                    col: c + 1,
                    row: r + 1,
                    pageNum: cell.pageNum,
                    rotation: (cell.rotation || 0) + (isBack && params.rotateBacks ? 180 : 0),
                    shiftX: shiftX
                });
                var actualBleedX = pdfBleedX;
                var actualBleedY = pdfBleedY;
                var frameTop = Y - actualBleedY;
                var frameBottom = Y + H + actualBleedY;
                var frameLeft = X - actualBleedX + shiftX;
                var frameRight = X + W + actualBleedX + shiftX;

                var clipLeft = frameLeft;
                var clipRight = frameRight;
                if (impIdx === 0 && sequence.pagesAcross >= 2) { // Saddle Stitch clips at spine
                    if (c % 2 === 0) {
                        clipRight = Math.min(clipRight, X + W);
                    } else {
                        clipLeft = Math.max(clipLeft, X);
                    }
                } else if (impIdx === 1 && sequence.pagesAcross >= 2) { // Perfect Bound keeps 216mm full page frame (with 3mm inner bleed)
                    clipLeft = frameLeft;
                    clipRight = frameRight;
                }
                var maxClipTop = Math.max(mTop, actualBleedY);
                var maxClipBottom = Math.max(mBottom, actualBleedY);
                var maxClipLeft = Math.max(mLeft, actualBleedX);
                var maxClipRight = Math.max(mRight, actualBleedX);

                var clipTop = Math.max(frameTop, -maxClipTop);
                var clipBottom = Math.min(frameBottom, targetSheetH + maxClipBottom);
                clipLeft = Math.max(clipLeft, -maxClipLeft);
                clipRight = Math.min(clipRight, targetSheetW + maxClipRight);

                var frame = targetPage.rectangles.add();
                // 1. Create the frame with the CLIPPED bounds directly.
                frame.geometricBounds = [clipTop, clipLeft, clipBottom, clipRight];
                
                // Disable autoFit so it doesn't try to fight us when we move the content
                frame.frameFittingOptions.autoFit = false;

                // Make the frame background and stroke completely transparent/empty
                applyNoStrokeNoFill(frame, targetDoc);

                // 2. Place PDF page inside the frame
                app.pdfPlacePreferences.pageNumber = cell.pageNum;
                app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;

                var placedPDF = frame.place(tempPDF)[0];
                
                // 3. Bulletproof explicit positioning:
                // Regardless of where InDesign put it initially, we measure its current bounds
                // and nudge it EXACTLY to [frameLeft, frameTop]
                var currentBounds = placedPDF.geometricBounds;
                var dy = frameTop - currentBounds[0];
                var dx = frameLeft - currentBounds[1];
                
                if (dx !== 0 || dy !== 0) {
                    placedPDF.move(undefined, [dx, dy]);
                }

                if (cell.rotated) {
                    rotate180Center(placedPDF);
                }
            }
        }

        // For Perfect Bound 1-page mode, add empty PUR hinge bounding frame so total spread group includes the PUR area
        var purHingeVal = (impIdx === 1) ? (params.purHinge || 0) : 0;
        if (impIdx === 1 && sequence.pagesAcross === 1 && purHingeVal > 0) {
            var isBackPage = (typeof isBack !== "undefined" && isBack);
            var purLeft, purRight;
            if (isBackPage) {
                // Spine / PUR is on the RIGHT of page artwork
                purLeft = bleedOffsetX + W;
                purRight = bleedOffsetX + W + purHingeVal;
            } else {
                // Spine / PUR is on the LEFT of page artwork
                purLeft = bleedOffsetX;
                purRight = bleedOffsetX + purHingeVal;
            }
            var purTop = bleedOffsetY;
            var purBottom = bleedOffsetY + H;

            var purFrameLeft = purLeft - (isBackPage ? 0 : mLeft);
            var purFrameRight = purRight + (isBackPage ? mRight : 0);
            var purFrameTop = purTop - mTop;
            var purFrameBottom = purBottom + mBottom;

            var purFrame = targetPage.rectangles.add();
            purFrame.geometricBounds = [purFrameTop, purFrameLeft, purFrameBottom, purFrameRight];
            applyNoStrokeNoFill(purFrame, targetDoc);
        }

        if (params.drawMarks) {
            var gapsBeforeTotalMarks = (impIdx === 0 || impIdx === 1) ? Math.floor((sequence.pagesAcross - 1) / 2) : (sequence.pagesAcross - 1);
            var gridWidth = sequence.pagesAcross * W + gapsBeforeTotalMarks * sHoriz + purHingeAdd;
            var gridHeight = sequence.pagesDown * H + (sequence.pagesDown - 1) * sVert;
            var outsetTB = Math.max(sBleedTB, pdfBleedY);
            var outsetLR = Math.max(sBleedLR, pdfBleedX);
            var len = params.markLength;

            var xCoords, yCoords;

            var isBooklet = (impIdx === 0 || impIdx === 1);
            if (isBooklet) {
                if (impIdx === 1 && purHingeVal > 0 && sequence.pagesAcross === 1) {
                    var hingeX = bleedOffsetX + ((typeof isBack !== "undefined" && isBack) ? W : purHingeVal);
                    if (params.shiftHinge !== false && typeof shiftX !== "undefined") hingeX += shiftX;
                    var outerLeftMark = bleedOffsetX;
                    var outerRightMark = bleedOffsetX + ((typeof isBack !== "undefined" && isBack) ? W + purHingeVal : purHingeVal + W);
                    xCoords = [outerLeftMark, hingeX, outerRightMark];

                } else if (impIdx === 1 && purHingeVal > 0 && sequence.pagesAcross >= 2) {
                    // Perfect Bound with PUR: crop marks at outer margins AND at each page spine trim line
                    xCoords = [];
                    for (var c = 0; c < sequence.pagesAcross; c++) {
                        var spinesB = Math.floor(c / 2) + ((c % 2 === 1) ? 1 : 0);
                        var extraX = spinesB * 2 * purHingeVal;
                        var gapsB = Math.floor(c / 2);
                        var cellTrimL = bleedOffsetX + c * W + gapsB * sHoriz + extraX;
                        var cellTrimR = cellTrimL + W;

                        if (c === 0) {
                            xCoords.push(cellTrimL); // Outer left, fixed
                        }

                        if (c % 2 === 0) { // Left page
                            var hingeLeft = cellTrimR;
                            var hingeRight = cellTrimL + W + (purHingeVal * 2);
                            if (params.shiftHinge !== false) {
                                var isOut = (params.creepDirectionIndex === 1);
                                var shiftLeftMag = getShiftForCol(c);
                                var shiftRightMag = getShiftForCol(c + 1);
                                var shiftLeft = isOut ? -shiftLeftMag : shiftLeftMag;
                                var shiftRight = isOut ? shiftRightMag : -shiftRightMag;
                                hingeLeft += shiftLeft;
                                hingeRight += shiftRight;
                            }
                            xCoords.push(hingeLeft);
                            xCoords.push(hingeRight);
                        } else { // Right page
                            xCoords.push(cellTrimR); // Outer right, fixed
                        }
                    }
                } else {
                    // Saddle Stitch or no PUR: crop marks only on outer perimeter of the sheet
                    xCoords = [bleedOffsetX, gridWidth + bleedOffsetX];
                }
                yCoords = [bleedOffsetY, gridHeight + bleedOffsetY];
            } else {
                // Non-booklet (Step & Repeat, Consecutive, etc.): crop marks at every column/row boundary
                xCoords = [bleedOffsetX];
                for (var c = 0; c < sequence.pagesAcross; c++) {
                    var xL = bleedOffsetX + c * (W + sHoriz);
                    var xR = xL + W;
                    if (c > 0 && sHoriz > 0) {
                        xCoords.push(xL);
                    }
                    xCoords.push(xR);
                }

                yCoords = [bleedOffsetY];
                for (var r = 0; r < sequence.pagesDown; r++) {
                    var yT = bleedOffsetY + r * (H + sVert);
                    var yB = yT + H;
                    if (r > 0 && sVert > 0) {
                        yCoords.push(yT);
                    }
                    yCoords.push(yB);
                }
            }

            var regColor = targetPage.parent.parent.colors.item("Registration");
            var strokeW = params.markThickness !== undefined ? params.markThickness : 0.25; // thin registration line in points

            function drawPageLine(y1, x1, y2, x2, strokeWidth) {
                var line = targetPage.graphicLines.add();
                line.strokeColor = regColor;
                line.strokeWeight = strokeWidth !== undefined ? strokeWidth : strokeW;
                line.geometricBounds = [y1, x1, y2, x2];
                markItems.push(line);
            }

            var baseTop = bleedOffsetY;
            var baseLeft = bleedOffsetX;

            // Draw vertical marks in top and bottom margins
            for (var i = 0; i < xCoords.length; i++) {
                var x = xCoords[i];
                drawPageLine(baseTop - outsetTB - len, x, baseTop - outsetTB, x);
                drawPageLine(baseTop + gridHeight + outsetTB, x, baseTop + gridHeight + outsetTB + len, x);
            }

            // Draw horizontal marks in left and right margins
            for (var i = 0; i < yCoords.length; i++) {
                var y = yCoords[i];
                drawPageLine(y, baseLeft - outsetLR - len, y, baseLeft - outsetLR);
                drawPageLine(y, baseLeft + gridWidth + outsetLR, y, baseLeft + gridWidth + outsetLR + len);
            }

            // Draw crop marks inside gaps between columns if space allows
            if (!isBooklet && sHoriz > 2 * outsetLR) {
                var hAvail = (sHoriz - 2 * outsetLR) / 2;
                var hMarkLen = Math.min(len, hAvail);
                if (hMarkLen > 0) {
                    for (var c = 0; c < sequence.pagesAcross - 1; c++) {
                        var xR = baseLeft + c * (W + sHoriz) + W;
                        var xL = xR + sHoriz;

                        for (var r = 0; r < sequence.pagesDown; r++) {
                            var yT = baseTop + r * (H + sVert);
                            var yB = yT + H;

                            drawPageLine(yT, xR + outsetLR, yT, xR + outsetLR + hMarkLen);
                            drawPageLine(yT, xL - outsetLR - hMarkLen, yT, xL - outsetLR);

                            drawPageLine(yB, xR + outsetLR, yB, xR + outsetLR + hMarkLen);
                            drawPageLine(yB, xL - outsetLR - hMarkLen, yB, xL - outsetLR);
                        }
                    }
                }
            }

            // Draw crop marks inside gaps between rows if space allows
            if (!isBooklet && sVert > 2 * outsetTB) {
                var vAvail = (sVert - 2 * outsetTB) / 2;
                var vMarkLen = Math.min(len, vAvail);
                if (vMarkLen > 0) {
                    for (var r = 0; r < sequence.pagesDown - 1; r++) {
                        var yB = baseTop + r * (H + sVert) + H;
                        var yT = yB + sVert;

                        for (var c = 0; c < sequence.pagesAcross; c++) {
                            var xL = baseLeft + c * (W + sHoriz);
                            var xR = xL + W;

                            drawPageLine(yB + outsetTB, xL, yB + outsetTB + vMarkLen, xL);
                            drawPageLine(yT - outsetTB - vMarkLen, xL, yT - outsetTB, xL);

                            drawPageLine(yB + outsetTB, xR, yB + outsetTB + vMarkLen, xR);
                            drawPageLine(yT - outsetTB - vMarkLen, xR, yT - outsetTB, xR);
                        }
                    }
                }
            }

            // Draw center fold lines if checked
            if (params.drawCenterMark) {
                var foldStrokeW = strokeW; // same thickness as crop marks
                if (isBooklet) {
                    var centerX = baseLeft + gridWidth / 2;
                    drawPageLine(baseTop - outsetTB - len, centerX, baseTop - outsetTB, centerX, foldStrokeW);
                    drawPageLine(baseTop + gridHeight + outsetTB, centerX, baseTop + gridHeight + outsetTB + len, centerX, foldStrokeW);
                } else {
                    for (var c = 0; c < sequence.pagesAcross; c++) {
                        var xCenter = baseLeft + c * (W + sHoriz) + W / 2;
                        drawPageLine(baseTop - outsetTB - len, xCenter, baseTop - outsetTB, xCenter, foldStrokeW);
                        drawPageLine(baseTop + gridHeight + outsetTB, xCenter, baseTop + gridHeight + outsetTB + len, xCenter, foldStrokeW);
                    }
                }
            }
        }

        // Add invisible bounding box covering the entire Bleed Box BEFORE grouping
        // This ensures the grouped items always have identical max dimensions regardless of content shifts
        var maxClipTopB = Math.max(mTop, pdfBleedY);
        var maxClipBottomB = Math.max(mBottom, pdfBleedY);
        var maxClipLeftB = Math.max(mLeft, pdfBleedX);
        var maxClipRightB = Math.max(mRight, pdfBleedX);

        var bboxFrame = targetPage.rectangles.add();
        bboxFrame.geometricBounds = [-maxClipTopB, -maxClipLeftB, targetSheetH + maxClipBottomB, targetSheetW + maxClipRightB];
        applyNoStrokeNoFill(bboxFrame, targetDoc);

        // Group all items on targetPage to make it easy to center them on the final sheet later
        var rawItems = targetPage.pageItems.everyItem().getElements();
        var pageItems = [];
        var itemMap = {};
        for (var pi = 0; pi < rawItems.length; pi++) {
            var itm = rawItems[pi];
            if (itm && itm.isValid && !itemMap[itm.id]) {
                itemMap[itm.id] = true;
                pageItems.push(itm);
            }
        }

        var targetItemOrGroup = null;
        if (pageItems.length >= 2) {
            try {
                targetItemOrGroup = targetPage.groups.add(pageItems);
            } catch (eGroup) {
                if (pageItems.length > 0) targetItemOrGroup = pageItems[0];
            }
        } else if (pageItems.length === 1) {
            targetItemOrGroup = pageItems[0];
        }

        if (targetItemOrGroup && params.rotateBacks && sheetObj.isBack) {
            try {
                if (typeof rotate180Center === "function") {
                    rotate180Center(targetItemOrGroup);
                } else {
                    targetItemOrGroup.rotationAngle = (targetItemOrGroup.rotationAngle + 180) % 360;
                }
            } catch (eRot) { }
        }
    }

    if (params.isTwoPassIntermediate) {
        // Keep intermediate doc exactly at calculated spread size
    } else if (params.resetTrimBleed) {
        // Reset Trim + Bleed option
        targetDoc.documentPreferences.pageWidth = targetSheetW;
        targetDoc.documentPreferences.pageHeight = targetSheetH;
    } else {
        // Standard centering on sheet size
        targetDoc.documentPreferences.pageWidth = params.sheetWidth > 0 ? params.sheetWidth : targetSheetW;
        targetDoc.documentPreferences.pageHeight = params.sheetHeight > 0 ? params.sheetHeight : targetSheetH;
    }

    // Set targetDoc margins, center the group, and ungroup for all pages
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
        var spreadGroups = pg.parent.groups.everyItem().getElements();
        var grp = null;
        if (groups.length > 0) {
            grp = groups[0];
        } else if (spreadGroups.length > 0) {
            grp = spreadGroups[0];
        } else {
            var allPgItems = pg.pageItems.everyItem().getElements();
            if (allPgItems.length > 0) {
                if (allPgItems.length >= 2) {
                    try { grp = pg.groups.add(allPgItems); } catch (eG) { grp = allPgItems[0]; }
                } else {
                    grp = allPgItems[0];
                }
            }
        }

        if (grp) {
            var grpBounds = grp.geometricBounds; // [T, L, B, R]
            var grpW = grpBounds[3] - grpBounds[1];
            var grpH = grpBounds[2] - grpBounds[0];
            var grpCenterX = grpBounds[1] + grpW / 2;
            var grpCenterY = grpBounds[0] + grpH / 2;

            moveX = (targetDoc.documentPreferences.pageWidth / 2) - grpCenterX;
            moveY = (targetDoc.documentPreferences.pageHeight / 2) - grpCenterY;

            grp.move(undefined, [moveX, moveY]);
            postBounds = grp.geometricBounds;
        }

        // Add Slug Info line if requested
        if (params.infoSlug && !params.resetTrimBleed) {
            var fontSizePt = params.slugFontSize || 7;
            var offsetTop, offsetLeft, hFrame, wFrame;

            hFrame = convertUnits(3.0, "mm", params.unitStr); // exactly 3mm height

            var halfSheetW = targetDoc.documentPreferences.pageWidth / 2;
            var max180mm = convertUnits(180, "mm", params.unitStr);
            wFrame = Math.min(halfSheetW, max180mm);

            var shift2mm = convertUnits(2, "mm", params.unitStr);
            var outsetValTB = convertUnits(params.drawMarks ? (params.addSheetBleed ? (params.sheetBleedValTB !== undefined ? params.sheetBleedValTB : (params.sheetBleedVal || 3)) : (params.markOffsetTB !== undefined ? params.markOffsetTB : (params.markOffset || 3))) : 0, "mm", params.unitStr);
            var lenVal = convertUnits(params.drawMarks ? (params.markLength || 3) : 0, "mm", params.unitStr);

            if (params.resetTrimBleed) {
                offsetLeft = shift2mm;
                offsetTop = -outsetValTB - lenVal - hFrame;
            } else if (postBounds) {
                // "верхний левый угол блока" (Bleed Block) имеет абсолютные координаты:
                // Y: bleedOffsetY + moveY - pdfBleedY
                // X: bleedOffsetX + moveX - pdfBleedX
                var bleedBlockTop = bleedOffsetY + moveY - pdfBleedY;
                
                // Верхний край текста на 3 мм выше синего блока
                offsetTop = bleedBlockTop - convertUnits(3, "mm", params.unitStr);
                
                // левый bleed + 2 вправо от угла синего блока
                // Это эквивалентно Trim X + 2мм
                offsetLeft = bleedOffsetX + moveX + convertUnits(2, "mm", params.unitStr);
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
            } catch (e) {
                try {
                    textPara.appliedFont = app.fonts.item("Minion Pro");
                } catch (e2) { }
            }
            textFrame.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;

            // If Perfect Bound 1x1 mode with Creep, also output the big/creep number at the bottom (3mm to the right of the big)
            if (impIdx === 1 && sequence.pagesAcross === 1) {
                try {
                    var curSheetObj = (sequence.sheets && p < sequence.sheets.length) ? sequence.sheets[p] : null;
                    var isPageBack = curSheetObj ? curSheetObj.isBack : (p % 2 === 1);
                    var isDoubleSided = (sequence.sheets && sequence.sheets.length > 0 && sequence.sheets[0].workStyle === 0);
                    var sheetIdx = isDoubleSided ? Math.floor(p / 2) : p;
                    var totalPhysSheets = (sequence.sheets && sequence.sheets.length > 0) ? (isDoubleSided ? Math.ceil(sequence.sheets.length / 2) : sequence.sheets.length) : 1;
                    var sigSize = (sequence.sheetsPerSignature > 0) ? sequence.sheetsPerSignature : totalPhysSheets;
                    var sheetInSig = (sigSize > 0) ? (sheetIdx % sigSize) : sheetIdx;
                    var outerVal = (params.creepOuter || 0);
                    var step = (outerVal !== 0 && sigSize > 1) ? (outerVal / (sigSize - 1)) : 0;
                    var curShiftVal = sheetInSig * step;
                    if (isPageBack) curShiftVal = -curShiftVal;

                    var curPurHinge = params.purHinge || 0;
                    var bigBaseX = bleedOffsetX + (isPageBack ? W : (curPurHinge > 0 ? curPurHinge : 0));
                    if (params.shiftHinge !== false) {
                        bigBaseX += curShiftVal;
                    }
                    var bigSheetX = bigBaseX + moveX;
                    var bLeft = bigSheetX + convertUnits(3, "mm", params.unitStr);
                    var bWidth = convertUnits(20, "mm", params.unitStr);
                    var bHeight = convertUnits(3.0, "mm", params.unitStr);

                    var bleedBlockBottom = postBounds ? (bleedOffsetY + moveY + H + pdfBleedY) : (bleedOffsetY + H);
                    var bTop = bleedBlockBottom + convertUnits(0.5, "mm", params.unitStr);

                    var creepNumText = Math.abs(curShiftVal).toFixed(2);

                    var bigTextFrame = pg.textFrames.add();
                    bigTextFrame.geometricBounds = [bTop, bLeft, bTop + bHeight, bLeft + bWidth];
                    bigTextFrame.contents = creepNumText;
                    var bPara = bigTextFrame.parentStory.paragraphs.item(0);
                    bPara.pointSize = fontSizePt;
                    try {
                        bPara.appliedFont = app.fonts.item("Arial");
                    } catch (eF1) {
                        try { bPara.appliedFont = app.fonts.item("Minion Pro"); } catch (eF2) { }
                    }
                    bigTextFrame.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
                } catch (eBigNum) { }
            }
        }
    }

    // Restore original ruler settings on source document
    srcDoc.viewPreferences.horizontalMeasurementUnits = savedUnitsH;
    srcDoc.viewPreferences.verticalMeasurementUnits = savedUnitsV;
    srcDoc.viewPreferences.rulerOrigin = savedRuler;

    // Open layout window to make visible
    targetDoc.windows.add();

    // Set active window transform reference point to Center (квадрат с точками)
    try {
        app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
    } catch (e) { }

    var jobReportFile = null;
    if (params.generateJobReport) {
        try {
            var impNames = (translations[initialLang] && translations[initialLang].imp_types) ? translations[initialLang].imp_types : [];
            var curImpStr = (impIdx >= 0 && impIdx < impNames.length) ? impNames[impIdx] : ("Type " + impIdx);
            var wsNames = (translations[initialLang] && translations[initialLang].work_styles) ? translations[initialLang].work_styles : ["Sheetwise", "Work & Turn", "Work & Tumble", "Simplex"];
            var curWsStr = (params.workStyle >= 0 && params.workStyle < wsNames.length) ? wsNames[params.workStyle] : "Sheetwise";

            var srcDocPathStr = "";
            try {
                if (srcDoc && srcDoc.saved) {
                    srcDocPathStr = srcDoc.filePath.fsName + "\\" + srcDoc.name;
                }
            } catch (ePth) { }

            var reportData = {
                lang: initialLang,
                srcDoc: srcDoc,
                srcDocName: (srcDoc && srcDoc.name) ? srcDoc.name : "Document",
                srcDocPath: srcDocPathStr,
                docFolder: docFolder,
                docNameClean: docNameClean,
                pdfPresetName: params.pdfPresetName || "[High Quality Print]",
                srcPgsCount: totalPgs,
                srcTrimW: docWidth,
                srcTrimH: docHeight,
                unitStr: params.unitStr || "mm",
                bleedT: docBleedTop,
                bleedB: docBleedBottom,
                bleedL: docBleedLeft,
                bleedR: docBleedRight,
                pdfBoxes: {
                    trimW: typeof trimWidth !== "undefined" ? trimWidth : docWidth,
                    trimH: typeof trimHeight !== "undefined" ? trimHeight : docHeight,
                    bleedW: typeof bleedWidth !== "undefined" ? bleedWidth : (docWidth + docBleedLeft + docBleedRight),
                    bleedH: typeof bleedHeight !== "undefined" ? bleedHeight : (docHeight + docBleedTop + docBleedBottom),
                    mediaW: typeof mediaWidth !== "undefined" ? mediaWidth : (docWidth + docBleedLeft + docBleedRight),
                    mediaH: typeof mediaHeight !== "undefined" ? mediaHeight : (docHeight + docBleedTop + docBleedBottom),
                    bleedOffsetX: typeof pdfBleedX !== "undefined" ? pdfBleedX : docBleedLeft,
                    bleedOffsetY: typeof pdfBleedY !== "undefined" ? pdfBleedY : docBleedTop
                },
                impTypeStr: curImpStr,
                foldSchemeStr: (impIdx === 0 && params.foldScheme > 0) ? "8 pages (2x2)" : null,
                workStyleStr: curWsStr,
                sheetFormatName: params.sheetFormatName || "Custom",
                sheetW: typeof targetSheetW !== "undefined" ? targetSheetW : (params.sheetWidth || docWidth),
                sheetH: typeof targetSheetH !== "undefined" ? targetSheetH : (params.sheetHeight || docHeight),
                impAreaW: (sequence && typeof W !== "undefined") ? (sequence.pagesAcross * W + (sHoriz || 0) * (sequence.pagesAcross - 1)) : (params.impWidth || docWidth),
                impAreaH: (sequence && typeof H !== "undefined") ? (sequence.pagesDown * H + (sVert || 0) * (sequence.pagesDown - 1)) : (params.impHeight || docHeight),
                cols: (sequence && sequence.pagesAcross) ? sequence.pagesAcross : (params.cols || 1),
                rows: (sequence && sequence.pagesDown) ? sequence.pagesDown : (params.rows || 1),
                totalUp: (sequence && sequence.pagesAcross && sequence.pagesDown) ? (sequence.pagesAcross * sequence.pagesDown) : ((params.cols || 1) * (params.rows || 1)),
                marginLeft: mLeft,
                marginTop: mTop,
                marginRight: mRight,
                marginBottom: mBottom,
                spacingHoriz: sHoriz,
                spacingVert: sVert,
                addSheetBleed: params.addSheetBleed,
                resetTrimBleed: params.resetTrimBleed,
                enableCreep: params.enableCreep,
                creepOuter: params.creepOuter,
                creepInner: params.creepInner,
                creepDirStr: (params.creepDirectionIndex === 1) ? "Outwards" : "Inwards",
                coverPaperStr: params.coverPaperStr || "",
                blockPaperStr: params.blockPaperStr || "",
                compensateThickness: params.compensateThickness,
                compensateCoeff: params.compensateCoeff,
                purHinge: params.purHinge,
                shiftHinge: params.shiftHinge,
                rotateBacks: params.rotateBacks,
                drawMarks: params.drawMarks,
                markLength: params.markLength,
                markThickness: params.markThickness,
                markOffsetTB: params.markOffsetTB,
                markOffsetLR: params.markOffsetLR,
                drawCenterMark: params.drawCenterMark,
                infoSlug: params.infoSlug,
                slugFontSize: params.slugFontSize,
                flatsCount: totalFlats,
                isDoubleSided: (sequence && sequence.sheets && sequence.sheets.length > 0 && sequence.sheets[0].workStyle === 0),
                flatsMapping: (typeof flatsMapping !== "undefined" && flatsMapping) ? flatsMapping : []
            };
            jobReportFile = generateAndSaveJobReport(reportData);
        } catch (eRep) {
            try { alert("Report Data Error: " + eRep.message + " (line " + eRep.line + ")"); } catch (eAlert2) { }
        }
    }

    if (!params.isTwoPassIntermediate) {
        var succStr = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].alert_success) ? translations[initialLang].alert_success : "Success! Total flats: ";
        if (jobReportFile && jobReportFile.exists) {
            var msgSaved = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].msg_job_report_saved) ? translations[initialLang].msg_job_report_saved : "Imposition Job Report saved to:\n";
            var msgOpen = (typeof translations !== "undefined" && translations[initialLang] && translations[initialLang].msg_open_job_report) ? translations[initialLang].msg_open_job_report : "Open Job Report now?";
            var userChoice = confirm(succStr + totalFlats + "\n\n" + msgSaved + jobReportFile.fsName + "\n\n" + msgOpen);
            if (userChoice) {
                try { jobReportFile.execute(); } catch (eExec) { }
            }
        } else {
            alert(translations[initialLang].alert_success + totalFlats);
        }
    }
    return targetDoc;
}

// ----------------------------------------------------
// DYNAMIC SEQUENCE GENERATION ALGORITHMS
// ----------------------------------------------------


function generateSaddleStitchSequence(totalPages, sheetsPerSig, workStyleIdx) {
    // Pad total pages to multiple of 4
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

            // Sheet Front
            seq.sheets.push({
                sheetIndex: s,
                isBack: false,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                front: [[
                    { pageNum: leftFront, rotated: false },
                    { pageNum: rightFront, rotated: false }
                ]]
            });

            // Sheet Back
            var backGrid = [[
                { pageNum: leftBack, rotated: false },
                { pageNum: rightBack, rotated: false }
            ]];

            if (workStyleIdx === 1) { // Work-and-Turn (Horizontal flip)
                var tmp = backGrid[0][0];
                backGrid[0][0] = backGrid[0][1];
                backGrid[0][1] = tmp;
            } else if (workStyleIdx === 2) { // Work-and-Tumble (Vertical flip)
                backGrid[0][0].rotated = true;
                backGrid[0][1].rotated = true;
            }

            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

var FOLD_MATRICES = {
    8: {
        cols: 2, rows: 2,
        front: [
            [{ p: 5, r: true }, { p: 4, r: true }],
            [{ p: 8, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 3, r: true }, { p: 6, r: true }],
            [{ p: 2, r: false }, { p: 7, r: false }]
        ]
    },
    163: {
        cols: 4, rows: 2,
        front: [
            [{ p: 5, r: true }, { p: 12, r: true }, { p: 9, r: true }, { p: 8, r: true }],
            [{ p: 4, r: false }, { p: 13, r: false }, { p: 16, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 7, r: true }, { p: 10, r: true }, { p: 11, r: true }, { p: 6, r: true }],
            [{ p: 2, r: false }, { p: 15, r: false }, { p: 14, r: false }, { p: 3, r: false }]
        ]
    },
    164: {
        cols: 4, rows: 2,
        front: [
            [{ p: 4, r: true }, { p: 13, r: true }, { p: 16, r: true }, { p: 1, r: true }],
            [{ p: 5, r: false }, { p: 12, r: false }, { p: 9, r: false }, { p: 8, r: false }]
        ],
        back: [
            [{ p: 2, r: true }, { p: 15, r: true }, { p: 14, r: true }, { p: 3, r: true }],
            [{ p: 7, r: false }, { p: 10, r: false }, { p: 11, r: false }, { p: 6, r: false }]
        ]
    },
    32: {
        cols: 4, rows: 4,
        front: [
            [{ p: 13, r: true }, { p: 20, r: true }, { p: 17, r: true }, { p: 16, r: true }],
            [{ p: 12, r: false }, { p: 21, r: false }, { p: 28, r: false }, { p: 5, r: false }],
            [{ p: 9, r: true }, { p: 24, r: true }, { p: 25, r: true }, { p: 8, r: true }],
            [{ p: 4, r: false }, { p: 29, r: false }, { p: 32, r: false }, { p: 1, r: false }]
        ],
        back: [
            [{ p: 15, r: true }, { p: 18, r: true }, { p: 19, r: true }, { p: 14, r: true }],
            [{ p: 6, r: false }, { p: 27, r: false }, { p: 22, r: false }, { p: 11, r: false }],
            [{ p: 7, r: true }, { p: 26, r: true }, { p: 23, r: true }, { p: 10, r: true }],
            [{ p: 2, r: false }, { p: 31, r: false }, { p: 30, r: false }, { p: 3, r: false }]
        ]
    }
};




function generateConsecutiveSequence(totalPages, cols, rows, isSimplex) {
    var perPageSide = cols * rows;
    var perSheet = isSimplex ? perPageSide : (perPageSide * 2);
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
        var startBack = isSimplex ? 0 : (s * perSheet + perPageSide + 1);

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: startFront + r * cols + c, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid (Horizontally mirrored column c -> cols - 1 - c)
            for (var r = 0; r < rows; r++) {
                var rowCells = [];
                for (var c = 0; c < cols; c++) {
                    var mirroredCol = cols - 1 - c;
                    rowCells.push({ pageNum: startBack + r * cols + mirroredCol, rotated: false });
                }
                backGrid.push(rowCells);
            }
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

function generateCutStackSequence(totalPages, cols, rows, isSimplex) {
    var perPageSide = cols * rows;
    var perSheet = isSimplex ? perPageSide : (perPageSide * 2);
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

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                var pileIdx = r * cols + c;
                var pageNum = pileIdx * (isSimplex ? totalSheets : (2 * totalSheets)) + (isSimplex ? (s + 1) : (2 * s + 1));
                rowCells.push({ pageNum: pageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid (Horizontally mirrored column c -> cols - 1 - c)
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
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

function generateStepAndRepeatSequence(totalPages, cols, rows, isSimplex) {
    var perSheet = isSimplex ? 1 : 2;
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
        var frontPageNum = isSimplex ? (s + 1) : (s * 2 + 1);
        var backPageNum = isSimplex ? 0 : (s * 2 + 2);

        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: frontPageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }

        if (!isSimplex) {
            // Back Grid
            for (var r = 0; r < rows; r++) {
                var rowCells = [];
                for (var c = 0; c < cols; c++) {
                    var actualPage = (backPageNum <= totalPages) ? backPageNum : 0;
                    rowCells.push({ pageNum: actualPage, rotated: false });
                }
                backGrid.push(rowCells);
            }
        }

        seq.sheets.push({
            sheetIndex: s,
            isBack: false,
            workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
            front: frontGrid,
            back: isSimplex ? null : backGrid
        });

        if (!isSimplex) {
            seq.sheets.push({
                sheetIndex: s,
                isBack: true,
                workStyle: (typeof workStyleIdx !== "undefined" ? workStyleIdx : 0),
                back: backGrid
            });
        }
    }
    return seq;
}

// ----------------------------------------------------
// UNIT CONVERSION & DRAW HELPERS


function logDiagToFile(srcDoc, targetDoc, tag, extraTempDir) {
    try {
        var paths = [];
        try {
            if (srcDoc && srcDoc.saved && srcDoc.filePath) {
                paths.push(srcDoc.filePath.absoluteURI + "/quickimpose_diag.txt");
            }
        } catch (e1) { }
        try {
            if (extraTempDir && extraTempDir.exists) {
                paths.push(extraTempDir.absoluteURI + "/quickimpose_diag.txt");
            }
        } catch (e1b) { }
        try {
            var scriptFile = new File($.fileName);
            if (scriptFile && scriptFile.parent) {
                paths.push(scriptFile.parent.absoluteURI + "/quickimpose_diag.txt");
            }
        } catch (e2) { }
        try { paths.push(Folder.desktop.absoluteURI + "/quickimpose_diag.txt"); } catch (e3) { }
        try { paths.push(Folder.temp.absoluteURI + "/quickimpose_diag.txt"); } catch (e4) { }

        var text = "========================================\n" +
            "Timestamp: " + (new Date()).toString() + "\n" +
            "Tag: " + (tag || "QuickImpose_v3") + "\n" +
            "srcDoc Name: " + (srcDoc ? srcDoc.name : "N/A") + "\n" +
            "srcDoc Path: " + (srcDoc && srcDoc.saved ? srcDoc.filePath.fsName : "UNSAVED") + "\n" +
            "srcDoc Units H: " + (srcDoc ? srcDoc.viewPreferences.horizontalMeasurementUnits : "N/A") + "\n" +
            "srcDoc Units V: " + (srcDoc ? srcDoc.viewPreferences.verticalMeasurementUnits : "N/A") + "\n" +
            "srcDoc ZeroPoint: " + (srcDoc && srcDoc.viewPreferences.zeroPoint ? (srcDoc.viewPreferences.zeroPoint[0] + ", " + srcDoc.viewPreferences.zeroPoint[1]) : "N/A") + "\n" +
            "srcDoc RulerOrigin: " + (srcDoc ? srcDoc.viewPreferences.rulerOrigin : "N/A") + "\n" +
            "srcDoc Page[0] Bounds: " + (srcDoc && srcDoc.pages.item(0) ? (srcDoc.pages.item(0).bounds[0] + ", " + srcDoc.pages.item(0).bounds[1] + ", " + srcDoc.pages.item(0).bounds[2] + ", " + srcDoc.pages.item(0).bounds[3]) : "N/A") + "\n" +
            "targetDoc Units H: " + (targetDoc ? targetDoc.viewPreferences.horizontalMeasurementUnits : "N/A") + "\n" +
            "targetDoc Units V: " + (targetDoc ? targetDoc.viewPreferences.verticalMeasurementUnits : "N/A") + "\n" +
            "targetDoc ZeroPoint: " + (targetDoc && targetDoc.viewPreferences.zeroPoint ? (targetDoc.viewPreferences.zeroPoint[0] + ", " + targetDoc.viewPreferences.zeroPoint[1]) : "N/A") + "\n" +
            "targetDoc RulerOrigin: " + (targetDoc ? targetDoc.viewPreferences.rulerOrigin : "N/A") + "\n" +
            "targetDoc Page[0] Bounds: " + (targetDoc && targetDoc.pages.item(0) ? (targetDoc.pages.item(0).bounds[0] + ", " + targetDoc.pages.item(0).bounds[1] + ", " + targetDoc.pages.item(0).bounds[2] + ", " + targetDoc.pages.item(0).bounds[3]) : "N/A") + "\n" +
            "========================================\n\n";

        for (var i = 0; i < paths.length; i++) {
            try {
                var f = new File(paths[i]);
                f.encoding = "UTF-8";
                var isNew = !f.exists;
                if (f.open("a")) {
                    if (isNew || f.length === 0) {
                        f.write("");
                    }
                    f.write(text);
                    f.close();
                }
            } catch (err) { }
        }
    } catch (e) { }
}


function applyNoStrokeNoFill(frame, doc) {
    if (!frame) return;
    try { frame.strokeWeight = 0; } catch (e) { }
    try {
        if (doc && doc.swatches) {
            var noneSwatch = doc.swatches.item("None");
            if (noneSwatch && noneSwatch.isValid) {
                frame.strokeColor = noneSwatch;
                frame.fillColor = noneSwatch;
            }
        }
    } catch (e) { }
    try {
        if (doc && doc.objectStyles && doc.objectStyles.length > 0) {
            frame.appliedObjectStyle = doc.objectStyles[0];
        }
    } catch (e) {
        try { frame.appliedObjectStyle = doc.objectStyles.item("[None]"); } catch (e2) { }
    }
    try { frame.strokeWeight = 0; } catch (e) { }
    try {
        if (doc && doc.swatches) {
            var noneSwatch2 = doc.swatches.item("None");
            if (noneSwatch2 && noneSwatch2.isValid) {
                frame.strokeColor = noneSwatch2;
                frame.fillColor = noneSwatch2;
            }
        }
    } catch (e) { }
}
// v2 build 08:26

