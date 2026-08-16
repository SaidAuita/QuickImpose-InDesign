# QuickImpose v2.1

**QuickImpose** is a professional, fast, and feature-rich ExtendScript script for sheet imposition in Adobe InDesign and PDF documents. It supports modern versions of InDesign (tested on version 2026).

![QuickImpose Saddle Stitch 2x1](images/Saddle_Stitch_2x1.png)

*Figure 1: Full Interface with Interactive Live Imposition Scheme (`QuickImpose_v2.jsx`)*

![PDF Import](images/PDF_Import.png)

*Figure 2: Dedicated PDF Import Interface (`PDF_Import.jsx`)*

---

## 🚀 What's New in v2.1

* **Adobe PDF Export Preset Selection (`.joboptions`)**: Choose any PDF export preset installed in Adobe InDesign (e.g. `[High Quality Print]`, `[Press Quality]`, `PDF/X-4`, `QuickImpose`, etc.) directly from the imposition UI.
* **Pre-Configured Prepress Preset Included (`Settings/QuickImpose.joboptions`)**: Comes with an optimized export preset tailored for prepress imposition.
* **Smart Imposition PDF Overrides**: While color spaces, ICC profiles, PDF/X compliance, and transparency flattener rules are inherited from the chosen preset, QuickImpose intelligently enforces rules critical for prepress:
  * **Guaranteed Bleed Preservation**: Automatically forces `useDocumentBleedWithPDF = true` (or custom user bleed) to prevent accidental cropping even if the selected preset has 0 mm bleed.
  * **Lossless Intermediate Quality**: Disables lossy downsampling (`Sampling.NONE`, `ZIP` compression) for intermediate PDF pages to eliminate raster/vector compression artifacts.
  * **Single Page Stream**: Enforces `exportReaderSpreads = false` so individual pages are accurately placed on flats.
* **Production Job Report (.txt) in 10 Languages**: Automatically produces a comprehensive production audit report saved alongside the imposed document. It includes:
  * PDF Box metrics (`TrimBox`, `BleedBox`, `MediaBox` measurements)
  * Sheet dimensions, layout grid, margins, and gutters
  * Postpress parameters (Creep direction, outer/inner shifts, paper stock, PUR hinge)
  * Complete **Signature Mapping** table listing flat number, physical sheet, Front/Back side, grid coordinates, page numbers, rotation angles, and exact individual creep/hinge shifts.
* **KBC / Perfect Bound 1x1 Creep Indicator**: When the Info Slug option is enabled in 1-page Perfect Bound mode, the exact crease/big shift value (in mm) is printed at the bottom margin 3 mm to the right of the crease mark, facilitating quick machine setup.
* **Two-Pass 2x2 Saddle Stitch Creep Mapping**: Full signature mapping with exact first-pass creep values tracked and documented for all 8 pages of each signature.
* **Included Test File**: Ready-to-use template `test_idml/210x210_24.idml` included in the repository for testing and validating all imposition modes.

---

## 🚀 Key Features (English)

### 1. Imposition Modes

#### Saddle Stitch (2x1 and 2x2)
Imposition for booklets bound with staples. Automatically gathers reader spreads, supports multi-signature setups, and handles bleed.
![Saddle Stitch 2x2](images/Saddle_Stitch_2x2.png)

#### Perfect Bound (PUR)
Imposition for adhesive binding or screw post binding. Splits the document into signatures of a specified sheet count, forming spreads with support for creep shifts and hinge mark offsets. 
Supports varying configurations, including 1 and 2 pages per spread. For 1-page mode, supports 4+0 and 4+4 printing.
![Perfect Bound 2 Pages](images/PerfectBound_2pages.png)
![Perfect Bound 4x4](images/PerfectBound44.png)

#### Step & Repeat (Repeat) / N-Up Consecutive
Repeats the same layout (e.g., business cards or labels) on a sheet. Spacings are automatically padded with bleed sizes to facilitate double cuts. Convenient to use as a 2nd step after Saddle Stitch or Perfect Bound imposition using the "Reset Trim + Bleed" option.
![Step and Repeat](images/Step_and_repeat.png)

#### Cut Stack
Lays out pages in stack order. Designed for print runs that are cut in blocks and stacked on top of each other in correct numerical order.
![Cut Stack 4+0](images/Cut%20Stack%204+0.png)

### 2. Smart Spacing & Bleeds (Bleed & Spacing Math)
* Automatically imports bleed sizes from the source document.
* In Grid and Repeat modes, the script dynamically adds the total bleed to the column/row spacing (e.g., for a `180×50` mm card with `2` mm bleed, the vertical placement step is set to exactly `54` mm), ensuring bleeds touch without overlapping.
* In Saddle Stitch and Perfect Bound booklet modes, the inner bleed at the spine is automatically clipped to `0 mm` for a correct fold.

### 3. Creep & Thickness Compensation
* Automatically calculates sheet creep shifts based on paper thickness and signature size.
* Embedded paper presets database (`PaperWeights.txt`) with custom editing support.
* **Thickness Compensation** option: automatically shifts the cover page outwards by `OffsetMax = (Thickness / 2) * K`, where `K` is a customizable coefficient (default `1.0`), ensuring the cover is perfectly centered.

### 4. "Reset Trim + Bleed" Option
* Available in Saddle Stitch mode.
* Automatically resizes the imposition sheet to the trim size of the booklet and writes the source document's bleed parameters into the page layout bleed settings.
* Automatically centers all items (including pasteboard marks and crop lines) geometrically.

### 5. Crop & Fold Marks
* **Crop Marks**: Drawn with a thin 0.25 pt stroke using the `Registration` color. Booklets receive outer boundary marks only (no spine cuts), while grids get double crop marks inside the bleed gaps.
* **Fold Lines**: Specially thickened lines (1.0 pt) drawn at the spine or page centers to assist fold operations.

### 6. Info Slug & Crease Guides
* Automatically generates a job info line in the top margin (File name, size, surface index, imposition type, date/time).
* For Perfect Bound 1x1 schemes, prints the numeric crease offset (e.g. `0.00`, `0.35`, `0.70`) at the bottom margin 3 mm right of the crease mark.

### 7. Localization, Presets & Job Reports
* Native support for **10 languages** (Russian, English, Deutsch, Français, Español, Italiano, Português, Polski, 中文, 日本語).
* Automatic English fallback for missing localization keys.
* Saves session options automatically and supports custom named presets.
* Generates localized Imposition Job Reports (.txt).

### 8. Recommended PDF Export Preset (`Settings/QuickImpose.joboptions`)

A dedicated prepress export preset is provided in the repository: `Settings/QuickImpose.joboptions`.

#### How to Install the Preset in InDesign:
* **Option A (Via InDesign Menu)**:
  1. In Adobe InDesign, go to **File → Adobe PDF Presets → Define...**
  2. Click **Load...** and select `Settings/QuickImpose.joboptions`.
* **Option B (Direct System Folder)**:
  * Copy `QuickImpose.joboptions` into the standard Adobe PDF settings directory:
    * **Windows**: `C:\Users\<Username>\AppData\Roaming\Adobe\Adobe PDF\Settings\`
    * **macOS**: `/Users/<Username>/Library/Application Support/Adobe/Adobe PDF/Settings/`

Once installed, **QuickImpose** will be selectable in the PDF Export Preset dropdown within the script.

---

## 🛠 Installation & Usage

1. Copy the `.jsx` scripts (`QuickImpose_v2.jsx` and `PDF_Import.jsx`), the `RESOURCES` directory, and the `Settings` directory to your Adobe InDesign scripts panel directory:
   * **Windows**: `C:\Users\<Username>\AppData\Roaming\Adobe\InDesign\Version <Version>\ru_RU\Scripts\Scripts Panel\`
   * **macOS**: `/Users/<Username>/Library/Preferences/Adobe InDesign/Version <Version>/ru_RU/Scripts/Scripts Panel/`
2. Open the document you want to impose in Adobe InDesign (or use the test document `test_idml/210x210_24.idml`).
3. Open the **Scripts** panel (Window -> Utilities -> Scripts).
4. Double-click `QuickImpose_v2.jsx` (or run `PDF_Import.jsx` to load an external PDF).
5. Configure your layout, choose your PDF export preset, and click **Impose** / **Import**.

---

## 🛠️ Other Projects

**[ComfyUI Photoshop Plugin (PH-CU-S)](https://github.com/SaidAuita/ComfyUI_PH-CU-S)**
* A powerful Photoshop plugin powered by ComfyUI, providing direct integration with local generative models without any clouds, subscriptions, or recurring fees.

---

## 🇷🇺 Описание на русском языке (Russian)

**QuickImpose** — это профессиональный, быстрый и многофункциональный ExtendScript-скрипт для автоматизации спуска полос (imposition) в Adobe InDesign.

### 🚀 Что нового в v2.1

* **Выбор пресета экспорта Adobe PDF (.joboptions)**: Выбор любого установленного пресета экспорта PDF (по умолчанию `[High Quality Print]` или пользовательские пресеты `QuickImpose`) прямо в окне спуска.
* **Готовый полиграфический пресет (`Settings/QuickImpose.joboptions`)**: В проект включен оптимизированный `.joboptions` файл для надежного экспорта.
* **Умная оптимизация и гарантия вылетов для спуска (Imposition Overrides)**: При использовании пресета параметры цветовых профилей, PDF/X стандартов и настроек прозрачности берутся из выбранного профиля, но скрипт принудительно включает:
  * **Гарантированные вылеты**: Принудительно включает `useDocumentBleedWithPDF = true` (или пользовательские вылеты), исключая обрезку макета, даже если в пресете задан 0 мм вылет.
  * **Качество без потерь**: Отключает даунсэмплинг (`Sampling.NONE`, сжатие `ZIP`) для промежуточного PDF, предотвращая потерю качества растра и векторов.
  * **Постраничный экспорт**: Принудительно отключает экспорт разворотами (`exportReaderSpreads = false`).
* **Технический отчет о спуске (Job Report) на 10 языках**: Автоматическое создание подробного текстового отчета (.txt) в папке спуска с фиксацией:
  * Метрик PDF-боксов (`TrimBox`, `BleedBox`, `MediaBox`)
  * Размеров печатного листа, полей, распорок и общего числа спусков
  * Параметров постпресса (направление Creep, сдвиги, бумага, PUR)
  * Таблицы **Signature Mapping** с разбивкой полос по спускам, сторонам (Лицо/Оборот), углам поворота и точным сдвигам Creep/PUR.
* **Индикация смещения биговки в КБС 1x1**: При включенной опции «Инфо» внизу листа рядом с линией биговки (на 3 мм правее) выводится числовое значение смещения в миллиметрах для быстрой перенастройки биговального оборудования.
* **Поддержка 2x2 Saddle Stitch**: Полный расчет раскладки тетрадей по 8 полос с точной фиксацией сдвигов первого прохода в отчете.
* **Тестовый файл**: В репозиторий добавлен тестовый макет `test_idml/210x210_24.idml` для проверки всех типов спусков.

### 🚀 Основные возможности

#### 1. Режимы спуска

**Saddle Stitch (Скрепка 2х1 и 2х2)**
Спуск под буклет скреплением на скобу. Автоматически собирает развороты, учитывает разбиение на тетради и поддерживает вылеты.
![Saddle Stitch 2x2](images/Saddle_Stitch_2x2.png)

**Perfect Bound (КБС)**
Спуск под клеевое бесшвейное скрепление или крепление на болты. Разбивает документ на тетради заданного объема, формируя развороты с возможностью сдвигов сползания и сползанием линии биговки. Поддерживает различные конфигурации, включая 1 и 2 полосы на разворот. Для режима 1 полосы — 4+0 и 4+4.
![Perfect Bound 2 Pages](images/PerfectBound_2pages.png)
![Perfect Bound 4x4](images/PerfectBound44.png)

**Step & Repeat (Повтор) / N-Up Consecutive (Сетка)**
Повторение одного и того же макета на листе. Зазоры автоматически увеличиваются на величину вылетов для удобной двойной резки. Удобно использовать как 2 шаг после спуска на скобу или КБС с использованием опции (Сбросить Trim + Bleed).
![Step and Repeat](images/Step_and_repeat.png)

**Cut Stack (Порезка стопой)**
Раскладка страниц стопами. Удобно для тиражей, которые режутся блоками и складываются стопкой друг на друга в правильном порядке.

#### 2. Умное управление зазорами и вылетами
* Автоматически импортирует размеры вылетов из исходного документа.
* В режимах сетки и повтора автоматически добавляет размер вылета к шагу размещения макетов, исключая наложение графики.
* В режиме книги («Скрепка» / КБС) вылеты по корешку автоматически обрезаются (`0 мм`).

#### 3. Компенсация сползания и центрирование (Creep & Thickness Compensation)
* Автоматический расчет сползания страниц с учетом толщины бумаги.
* Предустановленная база плотности бумаги (`PaperWeights.txt`) с возможностью редактирования.
* Функция **Thickness Compensation** (Компенсация толщины блока): гарантирует центрирование обложки по корешку книги при печати плотными блоками.

#### 4. Опция «Reset Trim + Bleed» (Сбросить Trim + Bleed)
* Позволяет автоматически уменьшить формат листа готового спуска до обрезного формата книги и перенести вылеты исходного макета в параметры страницы Flat-документа.

#### 5. Метки реза и сгиба (Crop & Fold Marks)
* **Обрезные линии**: Отрисовываются тонким штрихом цветом `Registration`.
* **Линии сгиба**: Специальные утолщенные линии по центру разворотов/корешка для удобства фальцовки.

#### 6. Служебная информация (Info Slug) и Направляющие биговки
* Автоматический вывод информационной строки в верхнем поле листа.
* Для КБС 1x1 выводит точное смещение бига внизу листа (на 3 мм правее биговки).

#### 7. Локализация, Пресеты и Отчеты
* Поддержка **10 языков** (Русский, English, Deutsch, Français, Español, Italiano, Português, Polski, 中文, 日本語).
* Сохранение параметров сессии и поддержка именованных пресетов.
* Генерация детальных Job Report отчетов о спуске.

#### 8. Рекомендуемый пресет экспорта PDF (`Settings/QuickImpose.joboptions`)

В комплект поставки скрипта входит готовый пресет экспорта Adobe PDF: `Settings/QuickImpose.joboptions`, специально настроенный для надежного и качественного спуска полос в полиграфии.

#### Как установить пресет в Adobe InDesign:
* **Способ 1 (Через меню InDesign)**:
  1. В верхнем меню InDesign выберите: **Файл → Пресеты Adobe PDF → Определить...** (File → Adobe PDF Presets → Define...)
  2. Нажмите **Загрузить...** (Load...) и выберите файл `Settings/QuickImpose.joboptions`.
* **Способ 2 (Копирование в системную папку)**:
  * Скопируйте файл `QuickImpose.joboptions` в стандартную папку настроек Adobe PDF:
    * **Windows**: `C:\Users\<Username>\AppData\Roaming\Adobe\Adobe PDF\Settings\`
    * **macOS**: `/Users/<Username>/Library/Application Support/Adobe/Adobe PDF/Settings/`

После установки пресет **QuickImpose** появится в списке пресетов InDesign и станет доступен в выпадающем списке интерфейса скрипта.

---

## 📄 Лицензия (License)
Проект распространяется по свободной лицензии MIT. Вы можете использовать, дорабатывать и изменять данный скрипт без ограничений.

---

## 🛠️ Мои проекты

**[ComfyUI Photoshop Plugin (PH-CU-S)](https://github.com/SaidAuita/ComfyUI_PH-CU-S)**
* Мощный плагин для Photoshop на базе ComfyUI, обеспечивающий прямую интеграцию с локальными генеративными моделями без облаков, подписок и регулярных платежей.