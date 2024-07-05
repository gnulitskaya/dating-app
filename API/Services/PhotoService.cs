using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> settings)
        {
            var acc = new Account(
                settings.Value.CloudName,
                settings.Value.ApiKey,
                settings.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {

            // var uploadResult = new ImageUploadResult();

            // if (file.Length > 0)
            // {
            //     using (var ms = new MemoryStream())
            //     {
            //         await file.CopyToAsync(ms);
            //         var imageBytes = ms.ToArray();
            //         var base64String = Convert.ToBase64String(imageBytes);

            //         // var photo = new Photo
            //         // {
            //         //     ImageData = base64String
            //         // };

            //         // Save the photo to the database or any other necessary operations

            //         uploadResult.SecureUrl = new Uri("data:image/jpeg;base64," + base64String);
            //     }
            // }

            // return uploadResult;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                var absolutePath = Path.Combine(Directory.GetCurrentDirectory(), "Media", fileName);

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                
                uploadResult.SecureUrl = new Uri(absolutePath);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var delParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(delParams);

            return result;
        }
    }
}