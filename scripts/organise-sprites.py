from PIL import Image
import os, json

map: dict = json.loads(open('internalid-to-sprite-filename.json', 'r').read())

if not os.path.exists('sprites'):
    os.mkdir('sprites')

def isTransparent(image: Image.Image) -> bool:
    if image.mode != 'RGBA':
        return False

    alpha = image.split()[-1]
    return all(pixel_alpha < 5 for pixel_alpha in list(alpha.getdata())) # type: ignore

def trimTransparentTop(img: Image.Image) -> Image.Image:
    for y in range(img.height):
        row = img.crop((0, y, img.width, y + 1))
        if not isTransparent(row):
            return img.crop((0, y, img.width, img.height))
    return img

def cropSprite(img: Image.Image) -> Image.Image:
    img = trimTransparentTop(img)
    if img.height <= 16:
        return img
    else:
        topCrop = img.crop((0, 0, img.width, 16))
        if not isTransparent(topCrop):
            return topCrop
        else:
            return img.crop((0, img.height - 16, img.width, img.height))

for key in map.keys():
    fn = map[key]
    img: Image.Image = Image.open(f'raw-sprites/{fn}').convert('RGBA')
    cropped = cropSprite(img.crop((0, 0, 16, 32)))
    cropped.save(f'sprites/{key}.png')