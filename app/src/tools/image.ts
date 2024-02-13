/**
 * Определяем ширину и высоту изображения,
 * которое будем хранить на сервере
 */
const getNewSize = (image: HTMLImageElement): [number, number] => {
  let width = image.width
  let height = image.height
  const maxWidth = 500
  const maxHeight = 500

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height *= maxWidth / width))
      width = maxWidth
    }
  } else if (height > maxHeight) {
    width = Math.round((width *= maxHeight / height))
    height = maxHeight
  }
  return [width, height]
}

/**
 * Асинхронная функция, дарующая нам сжатый файл от файла
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const compress = (file: File, callback: (m: File) => void) => {
  const reader = new FileReader()

  reader.addEventListener('load', (e) => {
    const originalImage = new Image()
    originalImage.src = e.target?.result as string

    const canvas = document.createElement('canvas')
    const img = document.createElement('img')

    img.addEventListener('load', () => {
      const [width, height] = getNewSize(img)
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      context?.drawImage(img, 0, 0, width, height)
      canvas.toDataURL('image/jpeg', 1)
      canvas.toBlob((blob) => {
        const file = new File([blob] as BlobPart[], 'fileName.jpg', { type: 'image/jpeg' })
        callback(file)
      }, 'image/jpeg')
    })

    img.src = originalImage.src
  })

  reader.readAsDataURL(file)
}
