Add-Type -AssemblyName System.Drawing

$src = "c:\Users\DELL\Documents\React\john-wedding\public\images\pencil-sketch.jpg"
$dest = "c:\Users\DELL\Documents\React\john-wedding\public\images\pencil-sketch-og.jpg"

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
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)

$bmp.Save($dest, $jpegCodec, $ep)
$bmp.Dispose()

Write-Host "Pencil sketch OG image compressed successfully!"
