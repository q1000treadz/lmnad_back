import { extname } from "path";

export const fileName = (req, file, callback) => {
    console.log('fileName ', file)

    const name = file.originalname.split('.')[0];
    const ext = extname(file.originalname);
    const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 8).toString(8))
    .join('');
    callback(null, `${randomName}${ext}`)
}

export const fileFilter = (req, file, callback) => {
    console.log('fileFilter ', file)
    if(!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
        return callback( new Error('Only jpg|jpeg|png|pdf files are allowed!'), false);
    }
    callback(null, true);
}