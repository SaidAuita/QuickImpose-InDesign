// #target indesign
// QuickImpose.jsx
// An open-source imposition script for Adobe InDesign.
// Replaces expired IDImposer plugins on modern InDesign versions.

var uiLabels = {};

var translations = {
    ru: {
        title: "QuickImpose v1.10 — Спуск полос",
        file: "Файл: ",
        pages: " стр.",
        size: "Размер: ",
        bleeds: "Вылеты: ",
        about_title: "О программе QuickImpose",
        about_text: "QuickImpose v1.10\n\nОткрытая замена для плагина IDImposer.\nПоддерживает современные версии Adobe InDesign.\n\nАвтор: Said & Antigravity.",
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
        alert_no_doc: "Пожалуйста, откройте документ InDesign перед запуском скрипта.",
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
        chk_reset_trim_bleed: "Сбросить Trim + Bleed"
    },
    en: {
        title: "QuickImpose v1.10 — Imposition",
        file: "File: ",
        pages: " pages",
        size: "Size: ",
        bleeds: "Bleeds: ",
        about_title: "About QuickImpose",
        about_text: "QuickImpose v1.10\n\nOpen-source replacement for IDImposer plugin.\nSupports modern versions of Adobe InDesign.\n\nAuthor: Said & Antigravity.",
        btn_about: "?",
        pnl_type_units: "Imposition & Units",
        lbl_imp_type: "Imposition:",
        lbl_units: "Units:",
        lbl_lang: "Language / Язык:",
        pnl_grid: "Grid Parameters",
        lbl_cols: "Cols (Across):",
        lbl_rows: "Rows (Down):",
        pnl_margins: "Margins of Imp. Area",
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
        pnl_presets: "Settings & Presets",
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
        alert_no_doc: "Please open an InDesign document before running the script.",
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
        chk_reset_trim_bleed: "Reset Trim + Bleed"
    }
};

function runQuickImpose() {
    var initialLang = "en";
    try {
        if (app.locale == Locale.RUSSIAN_LOCALE) {
            initialLang = "ru";
        }
    } catch(e) {}

    if (app.documents.length === 0) {
        alert(translations[initialLang].alert_no_doc);
        return;
    }

    var srcDoc = app.activeDocument;
    var docName = srcDoc.name;
    var docPgsCount = srcDoc.pages.length;
    
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
        settingsFile.open("r");
        var content = settingsFile.read();
        settingsFile.close();
        try {
            lastParams = eval(content);
        } catch(e) {}
    }
    
    function getInitVal(prop, fallback) {
        if (lastParams && lastParams[prop] !== undefined) {
            return lastParams[prop];
        }
        return fallback;
    }

    var currentLang = getInitVal("lang", initialLang);
    var currentUnit = getInitVal("unitStr", defaultUnitStr);

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
            // Fallback formats
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

    var presetsDir = new Folder(resourcesDir + "/Data/Presets");
    if (!presetsDir.exists) {
        presetsDir.create();
    }
    var presetFiles = presetsDir.getFiles("*.txt");
    var presetNames = [];
    for (var pIdx = 0; pIdx < presetFiles.length; pIdx++) {
        var pName = presetFiles[pIdx].name.replace(/\.[a-zA-Z0-9]+$/, "");
        presetNames.push(pName);
    }

    // ----------------------------------------------------
    // BUILD USER INTERFACE (ScriptUI)
    // ----------------------------------------------------
    uiLabels = {};

    var win = new Window("dialog", translations[currentLang].title);
    win.alignChildren = "fill";
    
    // Header Group (Document Info, Language)
    var headerGroup = win.add("group");
    headerGroup.orientation = "row";
    headerGroup.alignChildren = ["fill", "center"];
    
    var infoText = translations[currentLang].file + docName + " (" + docPgsCount + translations[currentLang].pages + ")   |   " + translations[currentLang].size + docWidth.toFixed(1) + " x " + docHeight.toFixed(1) + " " + defaultUnitStr + " (" + translations[currentLang].bleeds + bleedLeft.toFixed(1) + ")";
    var txtDocInfo = headerGroup.add("statictext", undefined, infoText);
    txtDocInfo.alignment = ["left", "center"];
    
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
    var mainGroup = win.add("group");
    mainGroup.orientation = "row";
    mainGroup.alignChildren = ["fill", "top"];
    mainGroup.spacing = 15;
    
    // Left Column
    var leftCol = mainGroup.add("group");
    leftCol.orientation = "column";
    leftCol.alignChildren = "fill";
    leftCol.spacing = 10;
    leftCol.preferredSize.width = 330;
    
    // Right Column
    var rightCol = mainGroup.add("group");
    rightCol.orientation = "column";
    rightCol.alignChildren = "fill";
    rightCol.spacing = 10;
    rightCol.preferredSize.width = 330;

    // --- LEFT COLUMN PANELS ---
    var pnlTypeUnits = leftCol.add("panel", undefined, translations[currentLang].pnl_type_units);
    pnlTypeUnits.alignChildren = "fill";
    
    var grpImpType = pnlTypeUnits.add("group");
    uiLabels.impType = grpImpType.add("statictext", undefined, translations[currentLang].lbl_imp_type);
    uiLabels.impType.characters = 10;
    var impTypeDropdown = grpImpType.add("dropdownlist", undefined, translations[currentLang].imp_types);
    impTypeDropdown.preferredSize.width = 190;
    impTypeDropdown.selection = 0;
    
    var grpUnits = pnlTypeUnits.add("group");
    uiLabels.units = grpUnits.add("statictext", undefined, translations[currentLang].lbl_units);
    uiLabels.units.characters = 8;
    var unitsDropdown = grpUnits.add("dropdownlist", undefined, ["mm", "pt", "in"]);
    unitsDropdown.preferredSize.width = 60;
    var defaultUnitsIndex = (currentUnit === "pt" ? 1 : (currentUnit === "in" ? 2 : 0));
    unitsDropdown.selection = defaultUnitsIndex;
    
    var chkRotateBacks = grpUnits.add("checkbox", undefined, translations[currentLang].chk_rotate_backs);
    chkRotateBacks.value = false;
    
    var chkInfoSlug = grpUnits.add("checkbox", undefined, translations[currentLang].chk_info_slug);
    chkInfoSlug.value = true;
    chkInfoSlug.helpTip = translations[currentLang].tip_info_slug;
    
    var editSlugFontSize = grpUnits.add("edittext", undefined, "7");
    editSlugFontSize.preferredSize.width = 22;
    editSlugFontSize.helpTip = translations[currentLang].tip_slug_font_size;
    
    var pnlGrid = leftCol.add("panel", undefined, translations[currentLang].pnl_grid);
    pnlGrid.alignChildren = "fill";
    
    var editCols = addLabelAndEdit(pnlGrid, translations[currentLang].lbl_cols, "2", 5, "cols");
    var editRows = addLabelAndEdit(pnlGrid, translations[currentLang].lbl_rows, "1", 5, "rows");
    editCols.enabled = false;
    editRows.enabled = false;
    
    var pnlMargins = leftCol.add("panel", undefined, translations[currentLang].pnl_margins);
    pnlMargins.alignChildren = "fill";
    var grpMarg1 = pnlMargins.add("group");
    var editMarginLeft = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_left, bleedLeft.toFixed(1), 5, "marginLeft");
    var editMarginTop = addLabelAndEditInline(grpMarg1, translations[currentLang].lbl_margin_top, bleedTop.toFixed(1), 5, "marginTop");
    var grpMarg2 = pnlMargins.add("group");
    var editMarginRight = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_right, bleedRight.toFixed(1), 5, "marginRight");
    var editMarginBottom = addLabelAndEditInline(grpMarg2, translations[currentLang].lbl_margin_bottom, bleedBottom.toFixed(1), 5, "marginBottom");
    
    var pnlSpacing = leftCol.add("panel", undefined, translations[currentLang].pnl_spacing);
    pnlSpacing.alignChildren = "fill";
    var grpSpc = pnlSpacing.add("group");
    var editSpacingHoriz = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_horiz, "0.0", 5, "spacingHoriz");
    var editSpacingVert = addLabelAndEditInline(grpSpc, translations[currentLang].lbl_spacing_vert, "0.0", 5, "spacingVert");
    
    // Imposition Area size
    var pnlImpArea = leftCol.add("panel", undefined, translations[currentLang].pnl_imp_area);
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
    
    // Target sheet size
    var pnlSheet = leftCol.add("panel", undefined, translations[currentLang].pnl_sheet);
    pnlSheet.alignChildren = "fill";
    
    var grpSheetDropdown = pnlSheet.add("group");
    grpSheetDropdown.spacing = 5;
    uiLabels.sheetFormat = grpSheetDropdown.add("statictext", undefined, translations[currentLang].lbl_sheet_format);
    var sheetDropdown = grpSheetDropdown.add("dropdownlist", undefined, paperNames);
    sheetDropdown.selection = 0;
    sheetDropdown.preferredSize.width = 110;
    
    var btnEditPaperSizes = grpSheetDropdown.add("button", undefined, "\uD83D\uDCC4"); // 📄 icon
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
    orientationDropdown.preferredSize.width = 80;
    orientationDropdown.enabled = false;
    
    var grpSheetCustom = pnlSheet.add("group");
    var editSheetWidth = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_width, "0", 5, "sheetWidth");
    var editSheetHeight = addLabelAndEditInline(grpSheetCustom, translations[currentLang].lbl_sheet_height, "0", 5, "sheetHeight");
    editSheetWidth.enabled = false;
    editSheetHeight.enabled = false;

    // --- RIGHT COLUMN PANELS ---
    // Presets Panel
    var pnlPresets = rightCol.add("panel", undefined, translations[currentLang].pnl_presets);
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
    loadDropdown.preferredSize.width = 130;
    if (presetNames.length > 0) loadDropdown.selection = 0;
    var btnLoadPreset = grpLoadPreset.add("button", undefined, translations[currentLang].btn_preset_load);
    btnLoadPreset.preferredSize.width = 80;

    // Creep Panel
    var pnlCreep = rightCol.add("panel", undefined, translations[currentLang].pnl_creep);
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
    creepDirDropdown.selection = 0; // Inwards default
    creepDirDropdown.preferredSize.width = 150;
    
    var grpCreepVals = pnlCreep.add("group");
    var editCreepOuter = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_outer, "0.0", 5, "creepOuter");
    var editCreepInner = addLabelAndEditInline(grpCreepVals, translations[currentLang].lbl_creep_inner, "0.6", 5, "creepInner");
    
    // Bleed Panel
    var pnlBleedOpts = rightCol.add("panel", undefined, translations[currentLang].pnl_bleed_opts);
    pnlBleedOpts.alignChildren = "fill";
    var chkUseBleed = pnlBleedOpts.add("checkbox", undefined, translations[currentLang].chk_use_bleed);
    chkUseBleed.value = true;
    
    var grpBleeds = pnlBleedOpts.add("group");
    var editBleedVal = addLabelAndEditInline(grpBleeds, translations[currentLang].lbl_custom_bleed, bleedLeft.toFixed(1), 5, "customBleed");
    editBleedVal.enabled = false;
    
    chkUseBleed.onClick = function() {
        editBleedVal.enabled = !chkUseBleed.value;
        updateSheetSize();
    };
    editBleedVal.onChange = updateSheetSize;
    
    // Crop Marks Panel
    var pnlMarks = rightCol.add("panel", undefined, translations[currentLang].pnl_marks);
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

    // Hyperlink helper
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
        link.justify = "left";
        link.onDraw = function() {
            var g = this.graphics;
            var textPen = g.newPen(g.PenType.SOLID_COLOR, [0.85, 0.55, 0, 1], 1);
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
    
    // Bottom Footer Group (Links on the left, Buttons on the right)
    var footerGroup = win.add("group");
    footerGroup.orientation = "row";
    footerGroup.alignment = ["fill", "bottom"];
    footerGroup.alignChildren = ["fill", "bottom"];
    
    var leftFooter = footerGroup.add("group");
    leftFooter.orientation = "column";
    leftFooter.alignment = ["left", "bottom"];
    leftFooter.alignChildren = ["left", "bottom"];
    leftFooter.spacing = 2;
    
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
        
        // Calculate bleed values in active unit
        var bL = 0, bR = 0, bT = 0, bB = 0;
        if (chkUseBleed.value) {
            var activeUnit = unitsDropdown.selection.text;
            bL = convertUnits(docBleedLeft, "pt", activeUnit);
            bR = convertUnits(docBleedRight, "pt", activeUnit);
            bT = convertUnits(docBleedTop, "pt", activeUnit);
            bB = convertUnits(docBleedBottom, "pt", activeUnit);
        } else {
            var val = parseFloat(editBleedVal.text) || 0;
            bL = val;
            bR = val;
            bT = val;
            bB = val;
        }
        
        // For non-booklet modes, we add bleed to the spacing dynamically
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
        
        // Update Sheet size if "Область спуска" is active
        if (sheetDropdown.selection && sheetDropdown.selection.index === 0) {
            editSheetWidth.text = impW.toFixed(2);
            editSheetHeight.text = impH.toFixed(2);
        }
        
        // Update Reset Trim + Bleed preview text
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
        
        // Sheets per signature is enabled for Saddle Stitch (if creep checked) OR Perfect Bound (always)
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
    
    // Hook layout changes
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
        
        if (paper.w === 0) { // "Область спуска" / "Imposition Area"
            editSheetWidth.text = editImpAreaWidth.text;
            editSheetHeight.text = editImpAreaHeight.text;
            editSheetWidth.enabled = false;
            editSheetHeight.enabled = false;
            orientationDropdown.enabled = false;
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
    }
    
    sheetDropdown.onChange = updateFinalSheetSizeFromSelection;
    orientationDropdown.onChange = function() {
        var idx = sheetDropdown.selection.index;
        var paper = paperSizes[idx];
        if (paper.w === -1) {
            // Swap custom width and height if needed based on orientation toggle
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
        if (selIdx === 0 || selIdx === 1) { // Saddle Stitch, Perfect Bound
            editCols.text = "2";
            editRows.text = "1";
            editCols.enabled = false;
            editRows.enabled = false;
        } else if (selIdx === 2 || selIdx === 3 || selIdx === 4) { // N Up Consecutive, Cut Stack, Step & Repeat
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
        return 2; // mm
    }

    function convertField(field, fromUnit, toUnit) {
        var val = parseFloat(field.text);
        if (isNaN(val)) return;
        var decimals = getDecimalsForUnit(toUnit);
        field.text = convertUnits(val, fromUnit, toUnit).toFixed(decimals);
    }

    unitsDropdown.onChange = function() {
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
        convertField(editMarkOffset, oldUnit, newUnit);
        
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

    langDropdown.onChange = function() {
        if (isApplyingParams) return;
        var lang = langList[langDropdown.selection.index].code;
        applyLanguage(lang);
    };
    
    // Preset Action Handlers
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
            pFile.open("w");
            pFile.write(currentParams.toSource());
            pFile.close();
            
            // Refresh load dropdown list
            loadDropdown.removeAll();
            var files = presetsDir.getFiles("*.txt");
            var selectIdx = 0;
            for (var k = 0; k < files.length; k++) {
                var fName = files[k].name.replace(/\.[a-zA-Z0-9]+$/, "");
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
        var pFile = new File(presetsDir + "/" + pName + ".txt");
        if (pFile.exists) {
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
            
            // Sheet
            sheetSelectionIndex: sheetDropdown.selection.index,
            orientationIndex: orientationDropdown.selection.index,
            sheetWidth: parseFloat(editSheetWidth.text) || 0,
            sheetHeight: parseFloat(editSheetHeight.text) || 0,
            
            // Options
            sheetsPerSig: parseInt(editSheetsPerSig.text, 10) || 0,
            creepOuter: parseFloat(editCreepOuter.text) || 0,
            creepInner: parseFloat(editCreepInner.text) || 0,
            useDocBleed: chkUseBleed.value,
            customBleed: parseFloat(editBleedVal.text) || 0,
            
            // Marks
            drawMarks: chkMarksOn.value,
            drawCenterMark: chkDrawCenterMark.value,
            markLength: parseFloat(editMarkLength.text) || 3.0,
            markOffset: parseFloat(editMarkOffset.text) || 3.0,
            
            // Auto-load preference
            loadLastByDefault: chkLoadLast.value
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
        if (selIdx === 0 || selIdx === 1) { // Saddle Stitch, Perfect Bound
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
        
        // Lazy load translation file if not already in cache
        if (!translations[lang]) {
            var locFile = new File(resourcesDir + "/Localization/" + lang + ".json");
            if (locFile.exists) {
                locFile.open("r");
                var content = locFile.read();
                locFile.close();
                try {
                    content = content.replace(/^\uFEFF/, "");
                    translations[lang] = eval("(" + content + ")");
                } catch(e) {
                    translations[lang] = translations["en"];
                }
            } else {
                translations[lang] = translations["en"];
            }
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
        
        // Labels stored in uiLabels
        uiLabels.lblLang.text = t.lbl_lang;
        uiLabels.impType.text = t.lbl_imp_type;
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
        
        // Sheet Format Dropdown labels
        uiLabels.sheetFormat.text = t.lbl_sheet_format;
        uiLabels.sheetOrient.text = t.lbl_sheet_orient;
        
        // Checkboxes and buttons
        chkLoadLast.text = t.chk_load_last;
        uiLabels.savePreset.text = t.lbl_preset_save;
        btnSavePreset.text = t.btn_preset_save;
        uiLabels.loadPreset.text = t.lbl_preset_load;
        btnLoadPreset.text = t.btn_preset_load;
        
        var activeBleedVal = convertUnits(docBleedLeft, "pt", defaultUnitStr);
        var unitLabel = defaultUnitStr;
        if (lang === "ru" && defaultUnitStr === "mm") {
            unitLabel = "мм";
        }
        var bleedStr = (Math.round(activeBleedVal * 1000) / 1000) + " " + unitLabel;
        chkUseBleed.text = t.chk_use_bleed + " (" + bleedStr + ")";
        chkMarksOn.text = t.chk_marks_on;
        chkDrawCenterMark.text = t.chk_center_mark || "Center (fold line)";
        chkResetTrimBleed.text = t.chk_reset_trim_bleed || "Reset Trim + Bleed";
        chkRotateBacks.text = t.chk_rotate_backs;
        chkInfoSlug.text = t.chk_info_slug;
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
    chkLoadLast.value = shouldLoadLast;
    if (shouldLoadLast && lastParams) {
        applyParametersToUI(lastParams);
    } else {
        // Apply default languages
        applyLanguage(currentLang);
    }

    // Initial UI calculation
    updateSheetSize();
    toggleCreepPanel();
    toggleResetTrimBleed();

    if (win.show() === 1) {
        var userParams = collectUIParameters();
        
        // Auto-save settings
        try {
            var settingsFolder = new Folder(resourcesDir + "/Data");
            if (!settingsFolder.exists) {
                settingsFolder.create();
            }
            var sFile = new File(settingsFolder + "/Settings.txt");
            sFile.open("w");
            sFile.write(userParams.toSource());
            sFile.close();
        } catch(e) {}
        
        // Run Imposition Execution
        executeImposition(srcDoc, userParams);
    }
}

// ----------------------------------------------------
// IMPOSITION EXECUTION ENGINE
// ----------------------------------------------------
function executeImposition(srcDoc, params) {
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

    // 3. Export source document to temporary PDF in _pdf_tmp folder of document directory
    var docFolder = srcDoc.saved ? srcDoc.filePath : Folder.temp;
    var pdfFolder = new Folder(docFolder + "/_pdf_tmp");
    if (!pdfFolder.exists) {
        pdfFolder.create();
    }
    var docNameWithoutExt = srcDoc.name.replace(/\.[a-zA-Z0-9]+$/, "");
    var tempPDF = new File(pdfFolder + "/" + docNameWithoutExt + ".pdf");
    
    // Turn on bleed and configure high-quality PDF preferences in export
    var savedBleedWithPDF = app.pdfExportPreferences.useDocumentBleedWithPDF;
    var savedExportBleedTop = app.pdfExportPreferences.bleedTop;
    var savedExportBleedBottom = app.pdfExportPreferences.bleedBottom;
    var savedExportBleedInside = app.pdfExportPreferences.bleedInside;
    var savedExportBleedOutside = app.pdfExportPreferences.bleedOutside;
    var savedExportReaderSpreads = app.pdfExportPreferences.exportReaderSpreads;
    var savedAcrobatCompatibility = app.pdfExportPreferences.acrobatCompatibility;
    
    app.pdfExportPreferences.useDocumentBleedWithPDF = params.useDocBleed;
    if (!params.useDocBleed) {
        app.pdfExportPreferences.bleedTop = params.customBleed;
        app.pdfExportPreferences.bleedBottom = params.customBleed;
        app.pdfExportPreferences.bleedInside = params.customBleed;
        app.pdfExportPreferences.bleedOutside = params.customBleed;
    }
    
    try { app.pdfExportPreferences.exportReaderSpreads = false; } catch(e){}
    try { app.pdfExportPreferences.acrobatCompatibility = AcrobatCompatibility.ACROBAT_5; } catch(e){}
    
    // Export without interactive dialogs, using active preferences (no preset passed)
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
    try {
        srcDoc.exportFile(ExportFormat.PDF_TYPE, tempPDF, false);
    } catch(e) {
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
    testDoc.close(SaveOptions.NO);
    
    // Calculate concentric bleed offsets (TrimBox and BleedBox share the same center)
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
    
    // Total pages in source PDF
    var totalPgs = srcDoc.pages.length;
    
    // Page dimensions
    var W = srcDoc.documentPreferences.pageWidth;
    var H = srcDoc.documentPreferences.pageHeight;
    
    // Imposition Type Index
    var impIdx = params.impTypeSelectionIndex;
    
    // Margins, spacing, and creep
    var mLeft = params.marginLeft;
    var mTop = params.marginTop;
    var mRight = params.marginRight;
    var mBottom = params.marginBottom;
    var sHoriz = params.spacingHoriz;
    var sVert = params.spacingVert;
    
    // For non-booklet modes, we add bleed to the spacing to prevent bleed overlap and ensure correct cuts
    if (impIdx !== 0 && impIdx !== 1) {
        sHoriz += (bLeft + bRight);
        sVert += (bTop + bBottom);
    }
    
    var creepOuterVal = params.enableCreep ? params.creepOuter : 0.0;
    var creepInnerVal = params.enableCreep ? params.creepInner : 0.0;
    
    // Build Imposition Sequence
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
        // Fallback
        sequence = generateConsecutiveSequence(totalPgs, params.cols, params.rows);
    }
    
    // Filter out completely empty sheets (where all cells pageNum <= 0)
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
    
    // 3. Create target Document
    var targetSheetW = mLeft + mRight + sequence.pagesAcross * W + (sequence.pagesAcross - 1) * sHoriz;
    var targetSheetH = mTop + mBottom + sequence.pagesDown * H + (sequence.pagesDown - 1) * sVert;
    
    var showingWindow = false; // fast execution
    var targetDoc = app.documents.add(showingWindow);
    
    targetDoc.viewPreferences.horizontalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.verticalMeasurementUnits = targetUnits;
    targetDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    
    targetDoc.documentPreferences.facingPages = false;
    targetDoc.documentPreferences.pageWidth = targetSheetW;
    targetDoc.documentPreferences.pageHeight = targetSheetH;
    
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
        var grid = sheetObj.front;
        var isBack = false;
        if (sheetObj.isBack) {
            grid = sheetObj.back;
            isBack = true;
        }
        
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
                
                // Coordinates of cell trim on sheet
                var X = mLeft + c * (W + sHoriz);
                var Y = mTop + r * (H + sVert);
                
                // Creep shift horizontal
                var shiftX = 0;
                if ((impIdx === 0 || impIdx === 1) && sequence.pagesAcross === 2) {
                    if (c === 0) {
                        // Left page: creep shifts content right (towards spine)
                        shiftX = creepVal;
                    } else if (c === 1) {
                        // Right page: creep shifts content left (towards spine)
                        shiftX = -creepVal;
                    }
                }
                
                // 1. Create a rectangle frame on the page
                var frame = targetPage.rectangles.add();
                
                // 2. Set frame bounds to the full bleed size initially (symmetrical)
                var frameTop = Y - bTop;
                var frameBottom = Y + H + bBottom;
                var frameLeft = X - bLeft + shiftX;
                var frameRight = X + W + bRight + shiftX;
                
                frame.geometricBounds = [frameTop, frameLeft, frameBottom, frameRight];
                
                // Make the frame background and stroke completely transparent/empty
                frame.strokeWeight = 0;
                frame.strokeColor = "None";
                frame.fillColor = "None";
                
                // 3. Place PDF page inside the frame
                app.pdfPlacePreferences.pageNumber = cell.pageNum;
                app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_BLEED;
                
                var placedPDF = frame.place(tempPDF)[0];
                
                // 4. Center content inside the frame to align TrimBox perfectly
                try {
                    frame.fit(FitOptions.CENTER_CONTENT);
                } catch(e) {}
                
                // Force PDF content to align exactly to the expected Bleed box coordinates
                try {
                    placedPDF.geometricBounds = [frameTop, frameLeft, frameBottom, frameRight];
                } catch(e) {}
                
                // Rotate PDF content if required (using 180 degrees)
                if (cell.rotated) {
                    placedPDF.rotationAngle = 180;
                }
                
                // 5. Now clip the frame (outer edges keep bleed, inner edge clips at spine)
                var clipLeft = frameLeft;
                var clipRight = frameRight;
                if ((impIdx === 0 || impIdx === 1) && sequence.pagesAcross === 2) {
                    if (c === 0) {
                        // Left page: Spine is on the right. Clip right edge exactly at X + W
                        clipRight = X + W;
                    } else if (c === 1) {
                        // Right page: Spine is on the left. Clip left edge exactly at X
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
                // Booklet: crop marks only on outer perimeter of the sheet (no middle cuts)
                xCoords = [mLeft, mLeft + gridWidth];
                yCoords = [mTop, mTop + gridHeight];
            } else {
                // Non-booklet (Step & Repeat, Consecutive, etc.): crop marks at every column/row boundary
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
            var strokeW = 0.25; // thin registration line in points
            
            function drawPageLine(p1, p2) {
                var line = targetPage.graphicLines.add();
                line.strokeColor = regColor;
                line.strokeWeight = strokeW;
                line.paths.item(0).pathPoints.item(0).anchor = p1;
                line.paths.item(0).pathPoints.item(1).anchor = p2;
                markItems.push(line);
            }
            
            // Draw vertical marks in top and bottom margins
            for (var i = 0; i < xCoords.length; i++) {
                var x = xCoords[i];
                drawPageLine([x, mTop - outset], [x, mTop - outset - len]);
                drawPageLine([x, mTop + gridHeight + outset], [x, mTop + gridHeight + outset + len]);
            }
            
            // Draw horizontal marks in left and right margins
            for (var i = 0; i < yCoords.length; i++) {
                var y = yCoords[i];
                drawPageLine([mLeft - outset, y], [mLeft - outset - len, y]);
                drawPageLine([mLeft + gridWidth + outset, y], [mLeft + gridWidth + outset + len, y]);
            }
            
            // Draw center fold lines if checked
            if (params.drawCenterMark) {
                var foldStrokeW = 1.0; // thicker fold line in points (1 pt)
                if (isBooklet) {
                    // Booklet: fold is at the spine (sheet center)
                    var centerX = mLeft + gridWidth / 2;
                    var topFold = targetPage.graphicLines.add();
                    topFold.strokeColor = regColor;
                    topFold.strokeWeight = foldStrokeW;
                    topFold.paths.item(0).pathPoints.item(0).anchor = [centerX, mTop - outset];
                    topFold.paths.item(0).pathPoints.item(1).anchor = [centerX, mTop - outset - len];
                    markItems.push(topFold);
                    
                    var bottomFold = targetPage.graphicLines.add();
                    bottomFold.strokeColor = regColor;
                    bottomFold.strokeWeight = foldStrokeW;
                    bottomFold.paths.item(0).pathPoints.item(0).anchor = [centerX, mTop + gridHeight + outset];
                    bottomFold.paths.item(0).pathPoints.item(1).anchor = [centerX, mTop + gridHeight + outset + len];
                    markItems.push(bottomFold);
                } else {
                    // Non-booklet: fold is in the center of each column (spine of each spread element)
                    for (var c = 0; c < sequence.pagesAcross; c++) {
                        var xCenter = mLeft + c * (W + sHoriz) + W / 2;
                        
                        var topFold = targetPage.graphicLines.add();
                        topFold.strokeColor = regColor;
                        topFold.strokeWeight = foldStrokeW;
                        topFold.paths.item(0).pathPoints.item(0).anchor = [xCenter, mTop - outset];
                        topFold.paths.item(0).pathPoints.item(1).anchor = [xCenter, mTop - outset - len];
                        markItems.push(topFold);
                        
                        var bottomFold = targetPage.graphicLines.add();
                        bottomFold.strokeColor = regColor;
                        bottomFold.strokeWeight = foldStrokeW;
                        bottomFold.paths.item(0).pathPoints.item(0).anchor = [xCenter, mTop + gridHeight + outset];
                        bottomFold.paths.item(0).pathPoints.item(1).anchor = [xCenter, mTop + gridHeight + outset + len];
                        markItems.push(bottomFold);
                    }
                }
            }
        }
        
        // Group all items on targetPage to make it easy to center them on the final sheet later
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
        // Reset Trim + Bleed option
        targetDoc.documentPreferences.pageWidth = targetSheetW - (bLeft + bRight);
        targetDoc.documentPreferences.pageHeight = targetSheetH - (bTop + bBottom);
        
        targetDoc.documentPreferences.documentBleedTopOffset = bTop;
        targetDoc.documentPreferences.documentBleedBottomOffset = bBottom;
        targetDoc.documentPreferences.documentBleedInsideOrLeftOffset = bLeft;
        targetDoc.documentPreferences.documentBleedOutsideOrRightOffset = bRight;
    } else {
        // Standard centering on sheet size
        targetDoc.documentPreferences.pageWidth = params.sheetWidth;
        targetDoc.documentPreferences.pageHeight = params.sheetHeight;
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
        var groups = pg.groups.everyItem().getElements();
        if (groups.length > 0) {
            var grp = groups[0];
            var grpBounds = grp.geometricBounds; // [T, L, B, R]
            var grpW = grpBounds[3] - grpBounds[1];
            var grpH = grpBounds[2] - grpBounds[0];
            var grpCenterX = grpBounds[1] + grpW / 2;
            var grpCenterY = grpBounds[0] + grpH / 2;
            
            moveX = (targetDoc.documentPreferences.pageWidth / 2) - grpCenterX;
            moveY = (targetDoc.documentPreferences.pageHeight / 2) - grpCenterY;
            
            grp.move(undefined, [moveX, moveY]);
        }
        
        // Add Slug Info line if requested
        if (params.infoSlug) {
            var fontSizePt = params.slugFontSize || 7;
            var offsetTop, offsetLeft, hFrame, wFrame;
            
            hFrame = convertUnits(fontSizePt + 5, "pt", params.unitStr);
            wFrame = targetDoc.documentPreferences.pageWidth - convertUnits(10, "mm", params.unitStr);
            
            if (params.resetTrimBleed) {
                // Place on pasteboard above the trim area (top of trim is Y=0)
                var y2 = convertUnits(-0.5, "mm", params.unitStr);
                offsetTop = y2 - hFrame;
                offsetLeft = convertUnits(2, "mm", params.unitStr);
            } else {
                // Place at the top-left corner of the print sheet
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
    
    // Restore original ruler settings on source document
    srcDoc.viewPreferences.horizontalMeasurementUnits = savedUnitsH;
    srcDoc.viewPreferences.verticalMeasurementUnits = savedUnitsV;
    srcDoc.viewPreferences.rulerOrigin = savedRuler;
    
    // Open layout window to make visible
    targetDoc.windows.add();
    
    // Set active window transform reference point to Center (квадрат с точками)
    try {
        app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
    } catch(e) {}
    
    alert(translations[initialLang].alert_success + totalFlats);
}

// ----------------------------------------------------
// DYNAMIC SEQUENCE GENERATION ALGORITHMS
// ----------------------------------------------------
function generateSaddleStitchSequence(totalPages, sheetsPerSig) {
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
                front: [[
                    { pageNum: leftFront, rotated: false },
                    { pageNum: rightFront, rotated: false }
                ]]
            });
            
            // Sheet Back
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
    var perSheet = perPageSide * 2; // double-sided
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
        
        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: startFront + r * cols + c, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
        // Back Grid (Horizontally mirrored column c -> cols - 1 - c)
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
    var perSheet = perPageSide * 2; // double-sided
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
                var pageNum = pileIdx * (2 * totalSheets) + 2 * s + 1;
                rowCells.push({ pageNum: pageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
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
    var perSheet = 2; // front and back
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
        
        // Front Grid
        for (var r = 0; r < rows; r++) {
            var rowCells = [];
            for (var c = 0; c < cols; c++) {
                rowCells.push({ pageNum: frontPageNum, rotated: false });
            }
            frontGrid.push(rowCells);
        }
        
        // Back Grid
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
    var lbl = grp.add("statictext", undefined, labelText);
    lbl.characters = 20;
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
