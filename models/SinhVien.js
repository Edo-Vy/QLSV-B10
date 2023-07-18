// Khai báo  đối tượng
function SinhVien(){

    this.maSV = 0;
    this.tenSV = '';
    this.emailSV = '';
    this.ngaySinh = '';
    this.matKhau = '';
    this.khoaHoc = '';
    this.diemToan = 0;
    this.diemLy = 0 ;
    this.diemHoa = 0;

    // phương thức
    this.tinhDiemTrungBinh = function(){

        var diemTB = 0;
        diemTB = (Number(this.diemToan) + Number( this.diemHoa) + Number(this.diemLy))/3;
        return diemTB;
    };
    this.xepLoai = function(){

    }

}