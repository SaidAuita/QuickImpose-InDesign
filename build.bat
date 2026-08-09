@echo off
echo Building QuickImpose...
if not exist "Build" mkdir "Build"
copy /Y "QuickImpose_v2.jsx" "Build\QuickImpose_v2.jsx"
copy /Y "PDF_Import.jsx" "Build\PDF_Import.jsx"
xcopy /E /I /Y "RESOURCES" "Build\RESOURCES"
echo Build complete!
