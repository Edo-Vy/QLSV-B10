// MVC - Mô hình quản lý project
// M - Models

// Bài tập quản lý sinh viên

var mangSinhVien = [];// [sv1, sv2 ] -> [{maSV: 01, tenSV: nguyen van a, },{maSV: 02, tenSV: nguyen van b, }]
//input : thông tin sinh viên : SinhVien

document.querySelector('#btnThemSV').onclick = function () {

    // var mangSinhVien = []; // [sv1, sv2 ] -> [{maSV: 01, tenSV: nguyen van a, },{maSV: 02, tenSV: nguyen van b, }]
    //input : thông tin sinh viên : SinhVien
    var sv = new SinhVien();
    // Lấy thông tin từ giao diện đưa vào input sv
    sv.maSV = document.querySelector('#maSV').value;
    sv['tenSV'] = document.querySelector('#tenSV').value;
    sv.emailSV = document.querySelector('#emailSV').value;
    sv.matKhau = document.querySelector('#matKhau').value;

    // Ngày Sinh -> format client
    var ngaySinh = new Date(document.querySelector('#ngaySinh').value);
    sv.ngaySinh = ngaySinh.toLocaleDateString();

    sv.khoaHoc = document.querySelector('#khoaHoc').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;

    console.log(sv);
    //output : html  String <tr></tr>



    // Bắt lỗi khi người dùng nhập không hợp lệ
    // .trim() : Loại bỏ khoảng trống đầu và cuối của 1 chuỗi => VD :     abc     => abc
    // if (sv.maSV.trim() === ''){

    //     alert('Mã sinh viên không hợp lệ');
    //     return;
    // }
    // Kiểm tra rỗng
    var valid = true;
    valid &= kiemTraRong(sv.maSV,'#required__err__ma', 'Mã Sinh Viên') & kiemTraRong(sv.tenSV,'#required__err__ten', 'Tên Sinh Viên');

    valid &= kiemTraTatCaKyTu(sv.tenSV,'#all__letter', 'Tên Sinh Viên');
    // Kiểm tra biến cờ

    if(!valid){
        return;
    }
    // Cách 1: Tạo html = createElement
    {
        // // - Bước 1: Tạo ra thẻ tr
        // var trSinhVien = document.createElement('tr');
        // // Tạo ra td mã sinh viên
        // var tdMaSinhVien = document.createElement('td');
        // tdMaSinhVien.innerHTML = sv.maSV;

        // var tdTenSinhVien = document.createElement('td');
        // tdTenSinhVien.innerHTML = sv.tenSV;

        // var tdEmailSinhVien = document.createElement('td');
        // tdEmailSinhVien.innerHTML = sv.emailSV;

        // var tdNgaySinhSinhVien = document.createElement('td');
        // tdNgaySinhSinhVien.innerHTML = sv.ngaySinh;

        // var tdKhoaHoc = document.createElement('td');
        // tdKhoaHoc.innerHTML = sv.khoaHoc;

        // var tdDTB = document.createElement('td');
        // tdDTB.innerHTML = sv.tinhDiemTrungBinh();

        // // Td chức năng
        // var btnXoa = document.createElement('button');
        // btnXoa.innerHTML = 'Xóa';
        // btnXoa.className = 'btn btn-danger';
        // btnXoa.onclick = function(){

        //     // từ thẻ con dom ra thẻ cha .td -> .tr
        //     // var trParent = btnXoa.parentElement.parentElement;
        //    // closest : dom đến selector gần nhất chứa nó
        //     var trParent = btnXoa.closest('tr');
        //     // tdParent.remove();
        //     trParent.remove();
        // }

        // var tdChucNang = document.createElement('td');
        // tdChucNang.appendChild(btnXoa);


        // // Thêm nội dung td vào tr
        // trSinhVien.appendChild(tdMaSinhVien);
        // trSinhVien.appendChild(tdTenSinhVien);
        // trSinhVien.appendChild(tdEmailSinhVien);
        // trSinhVien.appendChild(tdNgaySinhSinhVien);
        // trSinhVien.appendChild(tdKhoaHoc);
        // trSinhVien.appendChild(tdDTB);
        // //Thêm td chức năng
        // trSinhVien.appendChild(tdChucNang);

        // // Thêm nội dung tr vào giao diện
        // var tBody = document.querySelector('#tblSinhVien');
        // tBody.appendChild(trSinhVien);
    }

    // Cách 2: Chuỗi innerhtlm

    mangSinhVien.push(sv);

    console.log('Mảng Sinh Viên', mangSinhVien);
    // Sau khi thêm 1 sinh viên => mảng sinh viên [{},{},...]
    renderTableSinhVien(mangSinhVien);


    // Sau khi thêm sinh viên thành công => lưu mảng sinh viên vào localStorage
    var sSinhVien = JSON.stringify(mangSinhVien);
    luulocalStorage('mangSinhVien', sSinhVien);

}

function renderTableSinhVien(arrSinhVien) { // input :arrSinhVien [{},{},..]


    //output html = <tr><td></td>.....</tr>
    var htmlContent = '';
    // Duyệt qua các object của mảng sinh viên
    for (var index = 0; index < arrSinhVien.length; index++) {

        var sv = arrSinhVien[index]; // Mỗi lần duyệt qua lấy ra 1 object thứ index của arrSinhVien [{0}, {1}]

        // Nếu bấm từ nút thêm ( được new từ SinhVien => nên sẽ có tinhDiemTrungBinh)
        // Nếu lấy từ localStorage thì bị mất phương thức tínhDiemTrungBinh
        // hasOwnProperty('ten_thuoc_tinh') : Nếu có tên thuộc tính đó trong object thì trả về giá trị true, không có trả về false
        if (!sv.hasOwnProperty('tinhDiemTrungBinh')) {

            sv.__proto__.tinhDiemTrungBinh = function () {
                //.__proto__. : mở rộng thuộc tính của object
                var diemTB = 0;
                diemTB = (Number(sv.diemToan) + Number(sv.diemHoa) + Number(sv.diemLy)) / 3;
                return diemTB;
            }
        }
        // Từ object tạo ra thẻ tr
        //  `` -> String template : gõ xuống dòng 

        var tr = `
             <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.emailSV}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>
                    <button class ="btn btn-danger" onclick ="xoaSinhVien('${index}')">  Xóa </button>
                    <button class ="btn btn-primary" onclick ="suaSinhVien('${sv.maSV}')"> Sửa </button>
                    <button class ="btn btn-danger ml-2" onclick ="xoaMaSinhVien('${sv.maSV}')">  Xóa Mã Sinh Viên </button>
                   
                </td>
             </tr>
            `;
        // Mỗi lần tạo xong thẻ tr sẽ + vào output

        htmlContent += tr;

    }
    document.querySelector('#tblSinhVien').innerHTML = htmlContent;


}

function xoaSinhVien(index) {

    mangSinhVien.splice(index, 1);

    // Sau khi xóa 1 sinh viên thì tạo lại bảng
    renderTableSinhVien(mangSinhVien);
}
// Xóa 1 sinh viên
// function xoaMaSinhVien(maSinhVien) {

//     var viTriXoa = -1;
//     for (var index = 0; index < mangSinhVien.length; index++) {
//         // Mỗi lần duyệt lấy ra 1 sinh viên
//         var sv = mangSinhVien[index];
//         if (sv.maSV == maSinhVien) { // Nếu obj sinh viên trong mảng == mã sinh viên được click thì lấy ra vị trí

//             viTriXoa = index;
//             break;
//         }

//     }
//     mangSinhVien.splice(viTriXoa, 1);

//     // Sau khi xóa tạo lại table mới
//     renderTableSinhVien(mangSinhVien);
// }

// Xóa  mã sinh viên bị trùng

function xoaMaSinhVien(maSinhVien) {

    var viTriXoa = -1;
    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        // Mỗi lần duyệt lấy ra 1 sinh viên
        var sv = mangSinhVien[index];
        if (sv.maSV == maSinhVien) { // Nếu obj sinh viên trong mảng == mã sinh viên được click thì lấy ra vị trí

            mangSinhVien.splice(viTriXoa, 1);
        }

    }


    // Sau khi xóa tạo lại table mới
    renderTableSinhVien(mangSinhVien);
}

// Lưu thông tin localStorage
function luulocalStorage(key, value) {

    localStorage.setItem(key, value);
}

// Lấy dữ liệu từ localStorage

function laylocalStorage(key) {
    // Kiểm tra xem localStorage có key đó ko
    if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
    }
    return undefined;
}

// Định nghĩa sự kiện khi trang load xong html
window.onload = function () {

    var value = laylocalStorage('mangSinhVien');
    if (value !== undefined) {
        // Biển đổi value thành mảng lại
        mangSinhVien = JSON.parse(value);
        // Gọi hàm từ mảng để tạo ra table
        renderTableSinhVien(mangSinhVien);
    }
}


//======== Mở rộng thuộc tính của Prototype ==================

// SinhVien.prototype.tenThuocTinhMoRong = 'abc';
// SinhVien.prototype.tenThuocTinhMoRongFunc = function(){

//     console.log('abc');
// };

// var sv = new SinhVien();
// console.log(sv.tenThuocTinhMoRong);
// sv.tenThuocTinhMoRongFunc();

// Sửa thông tin sinh viên
function suaSinhVien(maSinhVienClick) {

    for (var index = 0; index < mangSinhVien.length; index++) {
        // Mỗi lần duyệt lấy ra 1 sinh viên object
        var sinhVien = mangSinhVien[index];
        // Đem mã sinhvienClick so sánh với thằng object sinh viên lấy ra
        if (maSinhVienClick == sinhVien.maSV) {
            // Tìm thấy
            // Gán các giá trị từ object lên các thẻ input

            document.querySelector('#maSV').value = sinhVien.maSV;
            document.querySelector('#tenSV').value = sinhVien['tenSV'];
            document.querySelector('#emailSV').value = sinhVien.emailSV;
            document.querySelector('#matKhau').value = sinhVien.matKhau;

            var value = moment(sinhVien.ngaySinh).format('YYYY-MM-DD');
            document.querySelector('#ngaySinh').value = value;

            document.querySelector('#khoaHoc').value = sinhVien.khoaHoc;
            document.querySelector('#diemToan').value = sinhVien.diemToan;
            document.querySelector('#diemLy').value = sinhVien.diemLy;
            document.querySelector('#diemHoa').value = sinhVien.diemHoa;


            break;
        }
    }
}

// Cập nhật


document.querySelector('#btnCapNhatSV').onclick = function () {
    // Lấy dữ liệu từ người dùng nhập vào sau khi chỉnh sửa

    var svCapNhat = new SinhVien();
    // Lấy thông tin từ giao diện đưa vào input sv
    svCapNhat.maSV = document.querySelector('#maSV').value;
    svCapNhat['tenSV'] = document.querySelector('#tenSV').value;
    svCapNhat.emailSV = document.querySelector('#emailSV').value;
    svCapNhat.matKhau = document.querySelector('#matKhau').value;

    // Ngày Sinh -> format client
    var ngaySinh = new Date(document.querySelector('#ngaySinh').value);
    svCapNhat.ngaySinh = ngaySinh.toLocaleDateString();

    svCapNhat.khoaHoc = document.querySelector('#khoaHoc').value;
    svCapNhat.diemToan = document.querySelector('#diemToan').value;
    svCapNhat.diemLy = document.querySelector('#diemLy').value;
    svCapNhat.diemHoa = document.querySelector('#diemHoa').value;

    // Duyệt qua mảng tìm ra object sinhvien cần cập nhật
    for (var index = 0; index < mangSinhVien.length; index++) {

        // Mỗi lần duyệt lấy ra 1 sv trong mảng
        var svMang = mangSinhVien[index];
        if (svMang.maSV === svCapNhat.maSV) {
            // Đem dữ liệu trong mảng sửa thành dữ liệu người dùng thay đổi
            svMang.tenSV = svCapNhat.tenSV;
            svMang.emailSV = svCapNhat.emailSV;
            svMang.matKhau = svCapNhat.matKhau;
            svMang.ngaySinh = svCapNhat.ngaySinh;
            svMang.khoaHoc = svCapNhat.khoaHoc;
            svMang.diemToan = svCapNhat.diemToan;
            svMang.diemHoa = svCapNhat.diemHoa;
            svMang.diemLy = svCapNhat.diemLy;
            // Sau khi cập nhật sinh viên trong mảng thì gọi hàm render lại table
            renderTableSinhVien(mangSinhVien);
            break;
        }
    }

}