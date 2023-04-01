import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { UPLOAD } from '../constant';
import { RequestUser } from '../interfaces';
import { FileUtils } from '../utils/file.utils';

export function PetAvatarUploadInterceptor() {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor([{ name: 'avatar' }], {
        fileFilter: (_req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) cb(null, true);
          else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'avatar'), false);
          }
        },
        limits: { fileSize: FileUtils.genMBToBytes(UPLOAD.maxFileAvatarSize) },
        storage: diskStorage({
          destination: (_req, _file, cb) => {
            FileUtils.checkExistFolder(UPLOAD.dirPetAvatar);
            cb(null, UPLOAD.dirPetAvatar);
          },
          filename: (req: RequestUser, file, cb) => {
            const filename = `${req?.user?.id}-${req.params.id}-${Date.now()}`;
            cb(null, FileUtils.genFilename(file.originalname, filename));
          }
        })
      })
    )
  );
}

export function PetCoverUploadInterceptor() {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor([{ name: 'cover' }], {
        fileFilter: (_req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) cb(null, true);
          else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'cover'), false);
          }
        },
        limits: { fileSize: FileUtils.genMBToBytes(UPLOAD.maxFileAvatarSize) },
        storage: diskStorage({
          destination: (_req, _file, cb) => {
            FileUtils.checkExistFolder(UPLOAD.dirPetCover);
            cb(null, UPLOAD.dirPetCover);
          },
          filename: (req: RequestUser, file, cb) => {
            const filename = `${req?.user?.id}-${req.params.id}-${Date.now()}`;
            cb(null, FileUtils.genFilename(file.originalname, filename));
          }
        })
      })
    )
  );
}
