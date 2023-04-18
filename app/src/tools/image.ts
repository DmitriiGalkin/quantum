/**
 * Определяем ширину и высоту изображения,
 * которое будем хранить на сервере
 */
const getNewSize = (image: HTMLImageElement): [number, number] => {
    let width = image.width
    let height = image.height
    const maxWidth = 500
    const maxHeight = 500

    if (width>height) {
        if(width>maxWidth) {
            height=Math.round(height*=maxWidth/width)
            width=maxWidth
        }
    } else {
        if(height>maxHeight) {
            width=Math.round(width*=maxHeight/height)
            height=maxHeight
        }
    }
    return [width, height]
}

/**
 * Асинхронная функция, дарующая нам сжатый файл от файла
 */
export const compress = (file: File, cb: (m: File) => void) => {
    const reader = new FileReader()

    reader.onload = function(e) {
        const originalImage = new Image()
        originalImage.src = e.target?.result as string

        const canvas = document.createElement('canvas')
        const img = document.createElement('img')

        img.onload = function () {
            const [width, height] = getNewSize(img)
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, width, height)
            canvas.toDataURL('image/jpeg', 1)
            canvas.toBlob((blob) => {
                const file = new File([blob] as BlobPart[], "fileName.jpg", { type: "image/jpeg" })
                cb(file)
            }, 'image/jpeg');
        }

        img.src = originalImage.src
    }

    reader.readAsDataURL(file)

}