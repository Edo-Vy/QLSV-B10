// MVC - Mô hình quản lý project
// M - Models

// Bài tập quản lý sinh viên

var mangSinhVien = [];// [sv1, sv2 ] -> [{maSV: 01, tenSV: nguyen van a, },{maSV: 02, tenSV: nguyen van b, }]
//input : thông tin sinh viên : SinhVien

document.querySelector('#btnThemSV').onclick = function(){

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

}

function renderTableSinhVien(arrSinhVien){ // input :arrSinhVien [{},{},..]


    //output html = <tr><td></td>.....</tr>
    var htmlContent = '';
    // Duyệt qua các object của mảng sinh viên
    for (var index = 0; index < arrSinhVien.length; index++) {

        var sv = arrSinhVien[index]; // Mỗi lần duyệt qua lấy ra 1 object thứ index của arrSinhVien [{0}, {1}]

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
                    <button class ="btn btn-primary"> Sửa </button>
                </td>
             </tr>
            `;
        // Mỗi lần tạo xong thẻ tr sẽ + vào output

        htmlContent += tr;

    }
    document.querySelector('#tblSinhVien').innerHTML = htmlContent;


}

function xoaSinhVien(index){
     
    mangSinhVien.splice(index,1);

    // Sau khi xóa 1 sinh viên thì tạo lại bảng
    renderTableSinhVien(mangSinhVien);
}