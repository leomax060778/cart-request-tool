$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataImage = mapper.getDataImage();
var ErrorLib = mapper.getErrors();

function getImageById(imageId){
    if(!imageId)
        throw ErrorLib.getErrors().BadRequest("The Parameter imageId is not found","newsService/handleGet/getImageById",imageId);
    return dataImage.getImageById(imageId);
}

function getImageByIdManual(imageId){
    if(!imageId)
        throw ErrorLib.getErrors().BadRequest("The Parameter imageId is not found","newsService/handleGet/getImageByIdManual",imageId);
    return dataImage.getImageByIdManual(imageId);
}

function existImage(imageId, userId) {
    return getImageByIdManual(imageId, userId).length > 0;
}

function updateImage(objImage, userId){
    var result;
    if(validateUpdateImage(objImage, userId)){
        try{
            if(objImage.IMAGE_ID !== 1){
                if(!existImage(objImage.IMAGE_ID, userId)){
                    throw ErrorLib.getErrors().CustomError("",
                        "newsService/handlePut/updateImage",
                        "The Image with the id " + objImage.IMAGE_ID + " does not exist");
                }
                else{
                    result = dataImage.updateImage(objImage, userId);
                }
            }else{
                result = dataImage.insertImage(objImage, userId);
            }
            dbHelper.commit();
        }
        catch(e){
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", e.toString(),"updateImage");
        }
        finally{
            dbHelper.closeConnection();
        }
        return result;
    }
}

function updateDefaultImage(objImage, userId){
    var result;
    if(validateUpdateImage(objImage, userId)){
        try{
            if(!existImage(objImage.IMAGE_ID, userId)){
                throw ErrorLib.getErrors().CustomError("",
                    "newsService/handlePut/updateImage",
                    "The Image with the id " + objImage.IMAGE_ID + " does not exist");
            }
            else{
                result = dataImage.updateImage(objImage, userId);
            }
            dbHelper.commit();
        }
        catch(e){
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", e.toString(),"updateImage");
        }
        finally{
            dbHelper.closeConnection();
        }
        return result;
    }
}


function deleteImage(imageId, userId){
    if(!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found","newsService/handleDelete/deleteImage",userId);
    if(!imageId)
        throw ErrorLib.getErrors().BadRequest("The Parameter imageId is not found","newsService/handleDelete/deleteImage",imageId);
    if(imageId === 1)
        return 0;
    try{
        if(!existImage(imageId, userId)){
            throw ErrorLib.getErrors().CustomError("",
                "newsService/handleDelete/deleteImage",
                "The Image with the id " + imageId + " does not exist");
        }
        else{
            var result = dataImage.deleteImage(imageId, userId);
        }
    }
    catch(e){
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteImage");
    }
    finally{
        dbHelper.closeConnection();
    }
    return result;
}

function validateUpdateImage(objImage, userId){
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handlePost/updateImage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IMAGE_ID',
        'IMAGE_URL',
        'NAME',
        'DESCRIPTION'];

    if(!objImage)
        throw ErrorLib.getErrors().CustomError("","newsService/handlePut/UpdateImage","The object Image is not found");

    try {
        keys.forEach(function(key) {
            if (objImage[key] === null || objImage[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateTypeForImage(key, objImage[key])
                if (!isValid) {
                    errors[key] = objImage[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/UpdateImage", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/UpdateImage",JSON.stringify(errors));
    }
    return isValid;
}

//Check data types
function validateTypeForImage(key, value) {
    var valid = true;
    switch (key) {
        case 'IMAGE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'IMAGE_URL':
            valid = value.length > 0 && value.length <= 500;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 500;
            break;
    }
    return valid;
}
