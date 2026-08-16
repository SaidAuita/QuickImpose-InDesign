Комментарий к скрипту на реддите:

Thanks for releasing this. I am evaluating it as an isolated imposition stage after a deterministic InDesign export. I saw that the intermediate PDF is intentionally forced to [High Quality Print] so custom marks/bleed cannot change its geometry. For production use, have you considered shipping a dedicated versioned .joboptions preset and recording the resulting MediaBox/TrimBox/BleedBox values in a job report? That would keep the geometry controlled while avoiding dependence on a mutable local preset. I would also be interested in any regression fixtures you use for 4/0 vs 4/4 cut stack, PUR hinge/creep and front/back orientation.

Я не очень понял о каких приспособлениях идет речь. Можешь пояснить?


***************

В комментарии на Reddit автор использует термин из программирования и автоматизации — «fixtures» (тестовые фикстуры / тестовые наборы данных), а не физические приспособления.

В разработке ПО и допечатной подготовке Regression Fixtures — это эталонный набор тестовых файлов (PDF/InDesign) и проверочных сценариев, на которых тестируется скрипт при внесении любых изменений (чтобы убедиться, что старый функционал не сломался — т.е. не возникло регрессии).

Подробный разбор того, о чем пишет пользователь:
1. «Regression fixtures» для сложных сценариев спуска:
Автор спрашивает, есть ли у вас тестовые макеты для автоматической/ручной проверки следующих полиграфических случаев:

4/0 vs 4/4 cut stack — спуск полос стопой на подрезку (Cut & Stack, когда стопки после одного разреза сразу ложатся по порядку номеров страниц). Для односторонней (4/0) и двухсторонней (4/4) печати там разная логика оборота.
PUR hinge — боковая проклейка / петля раскрытия при КБС (PUR-клей). Обычно требует отступа/компенсации 5–7 мм от корешка для первой и последней полосы блока или обложки.
Creep — компенсация набега/сползания полос при скреплении на скобу (когда внутренние тетради/страницы выдавливаются наружу из-за толщины бумаги).
Front/Back orientation — проверка ориентации «лицо/оборот» (голова к голове, переворот через бок или через клапан/голову «tumble», альбомная ориентация).
О чем остальная часть его комментария (для полной картины):
2. Замечание про [High Quality Print] и .joboptions:
В чем суть: скрипт сейчас принудительно экспортирует промежуточный PDF с дефолтным пресетом [High Quality Print].
Проблема: пресет [High Quality Print] у конкретного пользователя в InDesign может быть локально изменен (кто-то мог в настройках включить метки реза или поменять параметры вылетов), из-за чего геометрия промежуточного PDF поплывет.
Что предлагают: поставлять вместе со скриптом отдельный файл настроек (например, QuickImpose.joboptions) и загружать именно его, либо программно жестко задавать все параметры экспорта.
3. «Job report» с размерами MediaBox / TrimBox / BleedBox:
Предлагают после генерации спуска выводить лог или отчет (Job Report), где зафиксированы точные размеры границ PDF (TrimBox, BleedBox, MediaBox), чтобы оператор препресса мог мгновенно убедиться, что геометрия не исказилась.


1. Где физически находятся пресеты
Пресеты настроек QuickImpose (параметры спуска, сетки, вылетов и т.д.): Они сохраняются в виде JSON-файлов в подпапку RESOURCES/Data/Presets/ относительно места запуска скрипта: C:\Users\said\AppData\Roaming\Adobe\InDesign\Version 21.0\en_US\Scripts\Scripts Panel\QuickImpose-InDesign\RESOURCES\Data\Presets\[ИмяПreseта].json

Пресеты экспорта Adobe PDF (.joboptions): Если вы создаете или настраиваете пресеты экспорта PDF в самом InDesign (File → Adobe PDF Presets → Define...), они хранятся в стандартной системной папке Adobe: C:\Users\said\AppData\Roaming\Adobe\Adobe PDF\Settings\

2. Почему не формировался текстовый отчет (Job Report)
В блоке сбора данных отчета возникала скрытая ошибка при попытке прочесть путь документа через srcDoc.fullName (в InDesign DOM это свойство работает иначе, чем srcDoc.filePath), а также имя файла (docNameClean), из-за чего блок отчета тихо прерывался, и файл на диск не записывался.


*******************

Да, абсолютно! Выбор любого PDF-пресета в выпадающем списке полностью работает и сохраняется.

Как это теперь устроено:
Настройки из выбранного пресета применяются в полном объеме:
Цветовые профили и конверсия цвета (pdfColorSpace, pdfDestinationProfile, includeICCProfiles)
Совместимость и стандарт PDF (acrobatCompatibility, standardsCompliance — например PDF/X-1a, PDF/X-4 и т.д.)
Внедрение шрифтов и компрессия текста/вектора
Автоматическая адаптация для идеального спуска (Imposition Overrides):
Вылеты (Bleed): Скрипт принудительно включает вылеты документа (useDocumentBleedWithPDF = true), даже если в самом пресете стояло 0 мм. Это гарантирует, что страницы не будут обрезаны.
Постраничный экспорт: Принудительно выключается экспорт разворотами (exportReaderSpreads = false), чтобы спуск получал отдельные полосы.
Качество без потерь: Для промежуточного PDF включается сжатие ZIP без даунсэмплинга (Sampling.NONE), чтобы растровые и векторные элементы не деградировали перед финальной раскладкой.
Отчет:
Имя выбранного пресета фиксируется в [1] разделе Job Report.


Подними версию до 2.1 (в заголовке программы)
Добавь в описание изменения в версии. Распиши особенности создания PDF, выбора профиля.
Тестовый файл для проверки спусков:
C:\_CODE\indesign\QuickImpose-InDesign\test_idml\210x210_24.idml 

Когда все будет готово - выложи на гитхаб правки.

C:\_CODE\indesign\QuickImpose-InDesign\Settings\QuickImpose.joboptions 