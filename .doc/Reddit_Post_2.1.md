# QuickImpose v2.1 — Reddit Post & Comment Reply Guide

**Thread Link:** [https://www.reddit.com/r/indesign/comments/1v8ranc/comment/p3rgevp/](https://www.reddit.com/r/indesign/comments/1v8ranc/comment/p3rgevp/)

---

## 💬 Part 1: Direct Reply to the Reddit Comment (English)

> **Context:** Replying to the user who suggested shipping `.joboptions`, generating a Job Report with MediaBox/TrimBox/BleedBox dimensions, and providing regression fixtures.

### **Reply Text (Copy & Paste):**

Hi! Thank you so much for this thoughtful and insightful feedback! 🙌

We took your suggestions directly to heart and just released **QuickImpose v2.1**, which addresses all of these points:

### 1. Dedicated `.joboptions` Preset & Custom Preset Selection
* We now ship a pre-configured, versioned preset: **`Settings/QuickImpose.joboptions`** directly inside the GitHub repository. It can be loaded into InDesign via *File → Adobe PDF Presets → Define... → Load...* or placed into the OS Adobe PDF Settings directory.
* The UI now includes a **PDF Preset dropdown**, allowing you to pick any installed preset (or default to `[High Quality Print]` / `QuickImpose`).
* **Imposition Overrides:** Regardless of what preset is chosen, the engine programmatically enforces prepress-critical safety rules:
  * Forces `useDocumentBleedWithPDF = true` (or custom user bleed) so bleeds are never stripped even if the chosen preset has 0 mm bleed.
  * Disables lossy downsampling (`Sampling.NONE`, `ZIP` compression) for the intermediate PDF to preserve 100% vector/raster sharpness.
  * Forces `exportReaderSpreads = false` (single pages).

### 2. Comprehensive Job Report (`.txt`) with PDF Box Metrics
After running an imposition, QuickImpose now generates a detailed production report (in 10 languages, matching your UI language) saved directly in the destination folder. It includes:
* **[1] Source Geometry & PDF Box Metrics:** Exact measurements of **`TrimBox`**, **`BleedBox`** (with calculated bleed offsets), and **`MediaBox`** measured directly from the intermediate PDF to verify geometry didn't shift.
* **[2] Imposition & Sheet Layout:** Sheet dimensions, active imposition area, margins, gutters, and total flat count.
* **[3] Postpress & Finishing:** Creep direction/shifts, paper weights (cover & block), and PUR glue hinge offsets.
* **[4] Marks & Slugs:** Crop mark weights, lengths, offsets, and slug parameters.
* **[5] Signature Mapping Table:** A full cell-by-cell matrix listing:
  * Flat # and physical Sheet #
  * Side (`Front` / `Back`)
  * Grid Position `(Col, Row)`
  * Page number placed
  * Rotation angle (`0°` / `180°`)
  * Exact individual **Creep / PUR shift** applied to that specific cell (in mm).

### 3. Test Fixture (IDML Template)
* We included a ready-to-test multi-page template in the repo: **`test_idml/210x210_24.idml`**.
* It can be used to immediately verify:
  * **4/0 vs 4/4 Cut Stack** and **Consecutive N-Up** workstyles.
  * **Saddle Stitch (2x1 and 2x2 two-pass)** creep calculations.
  * **Perfect Bound (PUR) 1x1 and 2-page** layouts with side-glue hinge offsets and automatic bottom creep indicators.
  * Correct **Front/Back head-to-head & tumble orientations**.

The updated release is live on GitHub:
👉 **[https://github.com/SaidAuita/QuickImpose-InDesign](https://github.com/SaidAuita/QuickImpose-InDesign)**

Thanks again for the excellent suggestions — feel free to test v2.1 and let us know your thoughts! 🚀

---

## 📢 Part 2: QuickImpose v2.1 Release Announcement Post (English)

### **Title:**
[Update] QuickImpose v2.1 — Free InDesign Imposition Script: Added PDF Export Presets (.joboptions), Prepress Job Reports (Trim/Bleed/MediaBox), & Enhanced Creep Tracking

### **Post Body:**

Hi everyone! 👋

Following the great feedback from our initial release, we've just published **QuickImpose v2.1** — a major update to our free, open-source ExtendScript for sheet imposition directly inside Adobe InDesign.

### 🌟 What's New in v2.1:

1. **Adobe PDF Export Preset Selection (`.joboptions`):**
   * Select any installed PDF preset directly from the UI dropdown.
   * Includes an optimized **`Settings/QuickImpose.joboptions`** file in the repository.
   * **Smart Prepress Overrides:** Inherits color profiles and PDF/X standards from your preset, but programmatically enforces bleed inclusion (`useDocumentBleedWithPDF = true`), single-page streams, and lossless ZIP compression (no downsampling) for intermediate PDF placement.

2. **Automated Production Job Report (.txt):**
   * Generates a comprehensive audit log saved next to your imposed file (available in 10 languages).
   * Records exact **`TrimBox`**, **`BleedBox`**, and **`MediaBox`** dimensions measured from the placed PDF.
   * Includes a complete **Signature Mapping** table showing flat numbers, sheet numbers, front/back sides, grid coordinates, rotation angles, and exact individual creep/hinge shifts per page.

3. **Perfect Bound 1x1 Crease Guide:**
   * When Info Slug is enabled, prints the exact crease offset number (e.g. `0.00`, `0.35`, `0.70` mm) at the bottom margin 3 mm to the right of the crease mark for quick machine setup.

4. **Two-Pass 2x2 Saddle Stitch Improvements:**
   * Full 8-page signature calculation with accurate first-pass creep tracking recorded in the Job Report.

5. **Test Fixtures Included:**
   * Added `test_idml/210x210_24.idml` for instant testing of all 5 imposition modes (Saddle Stitch, Perfect Bound, Consecutive N-Up, Cut Stack, Step & Repeat).

### 💰 100% Free & Open Source (MIT License)
Download the latest script and `.joboptions` preset on GitHub:
👉 **[https://github.com/SaidAuita/QuickImpose-InDesign](https://github.com/SaidAuita/QuickImpose-InDesign)**

Feedback, feature requests, and pull requests are always welcome! 🚀

---

## 🇷🇺 Часть 3: Русский перевод для справки (Russian Reference)

### Ответ на комментарий на Reddit:
> Привет! Большое спасибо за ценный и профессиональный отзыв!
> Мы учли все ваши предложения и выпустили **QuickImpose v2.1**:
> 1. **Пресет `.joboptions`**: Добавлен файл `Settings/QuickImpose.joboptions` и выбор любого пресета InDesign в интерфейсе с гарантией вылетов (useDocumentBleed) и сжатием без потерь (ZIP/Sampling.NONE).
> 2. **Job Report с замерами боксов**: Автоматически генерируется подробный отчет (.txt) с точными размерами `TrimBox`, `BleedBox`, `MediaBox` и таблицей `Signature Mapping` со всеми сдвигами Creep/PUR.
> 3. **Тестовый макет (Fixtures)**: Добавлен тестовый файл `test_idml/210x210_24.idml` для проверки 4/0 vs 4/4 Cut Stack, PUR hinge/creep и ориентации Лицо/Оборот.
