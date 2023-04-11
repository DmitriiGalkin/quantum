// import EasyYandexS3 from 'easy-yandex-s3';
import AWS from 'aws-sdk';

// Подключаем модуль
//let EasyYandexS3 = require('easy-yandex-s3').default;

const accessKeyId = 'YCAJE0gpw_QPWjpIEImaJZl4c'
const secretAccessKey = 'YCPR8x-SjENLD_AvwPU0w0lkbRdxB3pN1uI0tArr'
const AWS_BUCKET_NAME = 'quantum-education'

// // Инициализация
// let s3 = new EasyYandexS3({
//     auth: {
//         accessKeyId,
//         secretAccessKey,
//     },
//     Bucket: AWS_BUCKET_NAME, // например, "my-storage",
//     debug: true, // Дебаг в консоли, потом можете удалить в релизе
// });
//
// export default s3



AWS.config.update({ region: 'ru-central1', accessKeyId, secretAccessKey });
// export default AWS;

const client = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
});


export const getSignedUrl = async (): Promise<any> => {
    const action = 'putObject';
    //let objectKey = cuid();

    let params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `23`,
        // ContentType: type,
        // Expires: Number(SIGN_URL_EXPIRES),
        // ACL: 'public-read',
    };

    const signedURL: string = await new Promise((resolve, reject) => {
        client.getSignedUrl(action, params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        });
    });

    return { signedURL, objectURL: `https://${AWS_BUCKET_NAME}.storage.yandexcloud.net/${params.Key}` };
};

