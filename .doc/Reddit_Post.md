# Reddit Post & Publication Guide for QuickImpose v1.2

## 🎯 Recommended Subreddits

1. **[r/indesign](https://www.reddit.com/r/indesign/)** (*Primary Target Audience*)
   - **Flair:** `Resource`, `Script`, or `Tool`
   - **Why:** Most active community for InDesign users, layout designers, and prepress operators.

2. **[r/CommercialPrinting](https://www.reddit.com/r/CommercialPrinting/)** (*Prepress & Printing*)
   - **Why:** Professional print operators, prepress engineers, and binderies.

3. **[r/printing](https://www.reddit.com/r/printing/)** (*Print & Prepress*)
   - **Why:** General print community.

4. **[r/GraphicDesign](https://www.reddit.com/r/GraphicDesign/)** (*Broader audience*)
   - **Why:** Focus on saving time for designers preparing booklets/cards for print.

---

## 📝 Reddit Post Template (English)

### **Title:**
Free Open-Source InDesign & PDF Imposition Script with Live Canvas Preview — QuickImpose v1.2

### **Post Body:**

Hi everyone! 👋

I wanted to share **QuickImpose v1.2** — a free, open-source ExtendScript for Adobe InDesign (and standalone PDFs) designed to handle sheet imposition directly inside InDesign without needing expensive third-party imposition software.

### 🌟 What's New in v1.2:
* **Interactive Live Scheme Canvas:** Real-time visual preview showing sheets, imposition bounds, margins, gaps, page numbering, and vector orientation marks.
* **Dual UI Options:** Choose between the full live preview interface (`QuickImpose.jsx`) or a compact mode (`QuickImpose_min.jsx`) for smaller screens/laptops.
* **Direct PDF Imposition:** Dedicated PDF import scripts (`PDF_QuickImpose.jsx`) to impose multi-page PDF files straight into InDesign layouts.
* **Preset Management:** Save custom setups and easily delete old presets.

### 🛠 Key Imposition Modes:
1. **Saddle Stitch (Booklets):** Auto-gathers reader spreads, handles multi-signature setups, creep compensation, and spine bleed clipping.
2. **Perfect Bound (КБС):** Splits documents into signatures of custom sheet counts (e.g., 16/32 pages) without creep shift.
3. **N-Up Consecutive:** Grid layout (columns × rows) sequentially ordered.
4. **Cut Stack:** Designed for stack-and-cut production runs.
5. **Step & Repeat:** Repeats artwork/cards with automatic double-bleed padding for clean cutting.

### 📐 Prepress Features:
* Automatic Bleed & Trim math (bleeds touch without overlapping in grid/repeat modes).
* **Creep & Thickness Compensation:** Built-in paper weight database with dynamic cover shift calculations.
* **"Reset Trim + Bleed" Option:** Automatically resizes imposition sheets to trim size and transfers original bleeds.
* Automatic crop marks, fold lines, and pasteboard job info slugs.
* **10 Languages supported** (English, German, French, Spanish, Japanese, Chinese, Russian, etc.).

### 💰 100% Free & Open Source (MIT License)
You can download the script, view the source code, or contribute on GitHub:
👉 **[[Link to GitHub Repository](https://github.com/SaidAuita/QuickImpose-InDesign)]** 

Feel free to test it out and let me know if you have any feedback or feature requests!

---

## 💡 Publishing Tips

1. **Attach Images:** Attach `images/QuickImpose.png` or a screen recording GIF when submitting the post on Reddit. Posts with images/videos get significantly higher engagement.
2. **Replace Links:** Make sure to replace `[Link to GitHub Repository]` with your actual GitHub repository URL.
3. **Engage with Comments:** Respond to feedback, bug reports, or questions in the comments section to boost post visibility.
