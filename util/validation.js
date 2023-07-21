// Hàm kiểm tra 

function kiemTraRong(value, selectorError, name) {

    // .trim() : loại bỏ khoảng trống
    if (value.trim() === '') {

        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ! ';
        return false;
    }

    document.querySelector(selectorError).innerHTML = '';
    return true;

}


function kiemTraTatCaKyTu(value, selectorError, name) {

    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
    return false;

}

function kiemTraTatCaLaSo(value, selectorError, name) {

    var regexAllNumber = /^[0-9]+$/;
    if (regexAllNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số!';
    return false;
}

function kiemTraEmail(value, selectorError, name) {

    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không hợp lệ!';
    return false;
}

function kiemTraMatKhau(value, selectorError, name) {

    // PassWord phải có số và chữ, ít nhất 1 kí tự viết hoa
    var regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexPass.test(value)) {

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = name + 'phải có số và chữ, ít nhất 1 ký tự viết hoa và 1 ký tự đặc biệt, từ 6 đến 32 ký tự';
    return false;
}

function kiemTraDoDai(value,selectorError,name,minLength, maxLength){
     if(value.length > value.maxLength || value.length < value.minLength){

        document.querySelector(selectorError).innerHTML = name + ' độ dài từ ' + minLength + ' đến ' + maxLength;
        return false;
     }

     document.querySelector(selectorError).innerHTML = '';
     return true;
}

// kiểm tra giá trị min - max

function kiemTraValue (value,selectorError,name,minValue, maxValue){

    if(Number(value) < minValue || Number(value) > maxValue){

        document.querySelector(selectorError).innerHTML = name + ' giá trị từ ' + minValue + ' đến ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
     return true;
}

// Kiểm tra Ngày - Tháng - Năm

function kiemTraNgayThangNam (value,selectorError,name){

    // yyyy-mm-dd
    var regexDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if(regexDate.test(value)){

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = name + ' phải có định dạng yyyy-mm-dd';
    return false;
}
