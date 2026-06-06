# Genera los iconos PWA de Mi Mercado (fondo #030213 + M blanca)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\icons"
$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)

function New-Icon([int]$size, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'

  # Fondo: color primary del tema (#030213)
  $bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 3, 2, 19))
  $g.FillRectangle($bg, 0, 0, $size, $size)

  # Letra M blanca centrada
  $fontSize = [int]($size * 0.5)
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = 'Center'
  $fmt.LineAlignment = 'Center'
  $rect = New-Object System.Drawing.RectangleF(0, ($size * 0.02), $size, $size)
  $g.DrawString("M", $font, [System.Drawing.Brushes]::White, $rect, $fmt)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

foreach ($s in $sizes) {
  New-Icon $s (Join-Path $outDir "icon-${s}x${s}.png")
}

# Favicon
New-Icon 48 (Join-Path $root "src\assets\icon\favicon.png")

Get-ChildItem $outDir | Select-Object Name, Length
