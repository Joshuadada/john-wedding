Add-Type -AssemblyName System.Drawing

$src = "c:\Users\DELL\Documents\React\john-wedding\public\og-image.jpg"
$dest = "c:\Users\DELL\Documents\React\john-wedding\public\og-image-compressed.jpg"

$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap 800, 450
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 800, 450)
$img.Dispose()

$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $null
foreach ($c in $codecs) {
    if ($c.MimeType -eq "image/jpeg") {
        $jpegCodec = $c
        break
    }
}

$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 70L)

$bmp.Save($dest, $jpegCodec, $ep)
$bmp.Dispose()

Move-Item -Force $dest $src
Write-Host "Compression completed successfully!"
