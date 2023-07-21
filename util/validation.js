// Hàm kiểm tra 

function kiemTraRong(value,selectorError, name){

    // .trim() : loại bỏ khoảng trống
    if(value.trim() === ''){

        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ! ';
        return false;
    }

    document.querySelector(selectorError).innerHTML = '';
    return true;

}


function kiemTraTatCaKyTu(value,selectorError, name){

    var regexLetter = /^[A-Z a-z]+$/;
    if ( regexLetter.test(value)){

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
    return false;

}