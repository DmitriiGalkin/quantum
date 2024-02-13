const { S3Client } = require('@aws-sdk/client-s3')

const REGION = 'ru-central1' //e.g. "us-east-1"
const accessKeyId = 'YCAJE0gpw_QPWjpIEImaJZl4c'
const secretAccessKey = 'YCPR8x-SjENLD_AvwPU0w0lkbRdxB3pN1uI0tArr'

const s3Client = new S3Client({
  region: REGION,
  endpoint: 'https://storage.yandexcloud.net/',
  credentials: {
    accessKeyId, // берем ключ из переменной окружения
    secretAccessKey, // берем секрет из переменной окружения
  },
})

export default s3Client
