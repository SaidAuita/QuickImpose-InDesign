param(
    [string]$ResourcesDir = ""
)

Add-Type -AssemblyName System.Drawing

if ($ResourcesDir -eq "") {
    $ResourcesDir = $PSScriptRoot
}

$exampleDir = Join-Path $ResourcesDir "Example"
$previewDir = Join-Path $ResourcesDir "Example_Preview"

if (!(Test-Path $exampleDir)) { exit }

$files = Get-ChildItem -Recurse -Path (Join-Path $exampleDir "*") -Include *.png,*.jpg,*.jpeg
foreach ($f in $files) {
    $relPath = $f.FullName.Substring($exampleDir.Length)
    $outFile = Join-Path $previewDir $relPath
    $outFile = [System.IO.Path]::ChangeExtension($outFile, ".jpg")
    
    $outParent = [System.IO.Path]::GetDirectoryName($outFile)
    if (!(Test-Path $outParent)) {
        New-Item -ItemType Directory -Path $outParent -Force | Out-Null
    }
    
    if (!(Test-Path $outFile) -or ($f.LastWriteTime -gt (Get-Item $outFile).LastWriteTime)) {
        try {
            $bmp = [System.Drawing.Image]::FromFile($f.FullName)
            $targetSize = 550
            $target = New-Object System.Drawing.Bitmap($targetSize, $targetSize)
            $g = [System.Drawing.Graphics]::FromImage($target)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.Clear([System.Drawing.Color]::FromArgb(50, 50, 50))
            
            $scale = [Math]::Min($targetSize / $bmp.Width, $targetSize / $bmp.Height)
            $newW = [int]($bmp.Width * $scale)
            $newH = [int]($bmp.Height * $scale)
            $posX = [int](($targetSize - $newW) / 2)
            $posY = [int](($targetSize - $newH) / 2)
            
            $g.DrawImage($bmp, $posX, $posY, $newW, $newH)
            $target.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            
            $g.Dispose()
            $target.Dispose()
            $bmp.Dispose()
            Write-Host "Scaled: $outFile"
        } catch {
            Write-Host "Error scaling $($f.FullName): $_"
        }
    }
}
