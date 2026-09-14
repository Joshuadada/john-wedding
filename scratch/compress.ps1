Add-Type -AssemblyName System.Drawing

$src = "c:\Users\DELL\Documents\React\john-wedding\public\images\pencil-sketch.jpg"
$dest = "c:\Users\DELL\Documents\React\john-wedding\public\images\pencil-sketch-og.jpg"

$img = [System.Drawing.Image]::FromFile($src)
$width = 1000
$height = 562
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $width, $height)
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
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80L)

$bmp.Save($dest, $jpegCodec, $ep)
$bmp.Dispose()

Write-Host "Pencil sketch artwork compressed successfully to pencil-sketch-og.jpg!"
