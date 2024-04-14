<?php
header('Content-Type: application/json');

class Entry_SlipModel
{
    private $conn;
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function LayDanhSachPhieuNhap()
    {
        $sql = "SELECT phieunhap.MaPN, phieunhap.NgayNhap, nhacungcap.TenNCC, nhacungcap.DiaChi AS DCNCC, nhacungcap.DienThoai AS DTNCC, nhanvien.Ho, nhanvien.Ten, nhanvien.GioiTinh, nhanvien.DiaChi AS DCNV, nhanvien.Email, nhanvien.Luong, 
                SUM(chitietphieunhap.GiaNhap * chitietphieunhap.SoLuong) AS TongTien
                FROM phieunhap 
                INNER JOIN nhanvien ON phieunhap.MaNV = nhanvien.MaNV
                INNER JOIN nhacungcap ON phieunhap.MaNCC = nhacungcap.MaNCC
                INNER JOIN chitietphieunhap ON phieunhap.MaPN = chitietphieunhap.MaPN
                GROUP BY phieunhap.MaPN, phieunhap.NgayNhap, nhacungcap.TenNCC, nhacungcap.DiaChi, nhacungcap.DienThoai, nhanvien.Ho, nhanvien.Ten, nhanvien.GioiTinh, nhanvien.DiaChi, nhanvien.Email, nhanvien.Luong";

        $result = $this->conn->query($sql);
        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $phieunhap = array(
                    'MaPN' => $row['MaPN'],
                    'NgayNhap' => $row['NgayNhap'],
                    'TongTien' => $row['TongTien'],
                    'MaNV' => array(
                        'Ho' => $row['Ho'],
                        'Ten' => $row['Ten'],
                        'GioiTinh' => $row['GioiTinh'],
                        'DiaChi' => $row['DCNV'],
                        'Email' => $row['Email'],
                        'Luong' => $row['Luong']
                    ),
                    'MaNCC' => array(
                        'TenNCC' => $row['TenNCC'],
                        'DiaChi' => $row['DCNCC'],
                        'DienThoai' => $row['DTNCC']
                    )
                );
                $data[] = $phieunhap;
            }
        }
        return $data;
    }
    public function GiaTriSanPham($id)
    {
        $sql = " SELECT *
         FROM giay
         INNER JOIN loai ON giay.MaLoai = loai.MaLoai
         INNER JOIN mausac ON giay.MaMau = mausac.MaMau
         INNER JOIN xuatxu ON giay.MaXX = xuatxu.MaXX
         INNER JOIN size ON giay.MaSize = size.MaSize
         INNER JOIN thuonghieu ON giay.MaThuongHieu = thuonghieu.MaThuongHieu WHERE giay.MaGiay = '$id'";
        $sql5 = "SELECT *FROM nhacungcap";
        $result = $this->conn->query($sql);

        $result5 = $this->conn->query($sql5);

        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $xuatxu = array(
                    'MaXX' => $row['MaXX'],
                    'TenNuoc' => $row['TenNuoc'],
                );
                $size = array(
                    'MaSize' => $row['MaSize'],
                    'KichThuoc' => $row['KichThuoc'],
                );
                $thuonghieu = array(
                    'MaThuongHieu' => $row['MaThuongHieu'],
                    'TenThuongHieu' => $row['TenThuongHieu'],
                );
                $loai = array(
                    'MaLoai' => $row['MaLoai'],
                    'TenLoai' => $row['TenLoai'],
                );
                $mausac = array(
                    'MaMau' => $row['MaMau'],
                    'TenMau' => $row['TenMau'],
                );


                $giay = array(
                    'MaGiay' => $row['MaGiay'],
                    'Tengia' => $row['Tengia'],
                    'SoLuong' => $row['SoLuong'],
                    'DonGia' => $row['DonGia'],
                    'DoiTuongSuDung' => $row['DoiTuongSuDung'],
                    'ChatLieu' => $row['ChatLieu'],
                    'HinhAnh' => $row['HinhAnh'],
                    'XuatXu' => $xuatxu,
                    'ThuongHieu' => $thuonghieu,
                    'Loai' => $loai,
                    'Size' => $size,
                    'MauSac' => $mausac,


                );

                $data['giay'] = $giay;
            }
        }
        $sql1 = "SELECT chitietphieunhap.MaPN, chitietphieunhap.SoLuong
        FROM chitietphieunhap
        INNER JOIN giay ON chitietphieunhap.MaGiay = giay.MaGiay
        WHERE chitietphieunhap.MaGiay = '$id'";
        $result1 = $this->conn->query($sql1);
        if ($result1->num_rows > 0) {
            while ($row = $result1->fetch_assoc()) {
                $chitiet = array(
                    'MaPN' => $row['MaPN'],
                    'SoLuong' => $row['SoLuong'],
                );
            }
            $data['chitiet'] = $chitiet;
        }
        if ($result5->num_rows > 0) {
            while ($row = $result5->fetch_assoc()) {
                $item5[] = $row;
                $data['nhacungcap'] = $item5;
            }
        }
        return $data;
    }

    public function get4table()
    { // 'TenLoai' => $row['TenLoai'],
        // 'MaXX' => $row['MaXX'],
        // 'TenNuoc' => $row['TenNuoc'],
        $sql = "SELECT * FROM loai";
        $sql1 = "SELECT * FROM xuatxu";
        $sql2 = "SELECT * FROM size";
        $sql3 = "SELECT * FROM thuonghieu";
        $sql4 = "SELECT * FROM mausac";
        $sql5 = "SELECT *FROM nhacungcap";
        $result = $this->conn->query($sql);
        $result1 = $this->conn->query($sql1);
        $result2 = $this->conn->query($sql2);
        $result3 = $this->conn->query($sql3);
        $result4 = $this->conn->query($sql4);
        $result5 = $this->conn->query($sql5);
        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $item[] = array(
                    'MaLoai' => $row['MaLoai'],
                    'TenLoai' => $row['TenLoai']
                );
                $data['loai'] = $item;
            }
        }
        if ($result1->num_rows > 0) {
            while ($row = $result1->fetch_assoc()) {
                $item1[] = array(
                    'MaXX' => $row['MaXX'],
                    'TenNuoc' => $row['TenNuoc'],
                );
                $data['xuatxu'] = $item1;
            }
        }
        if ($result2->num_rows > 0) {
            while ($row = $result2->fetch_assoc()) {
                $item2[] = array(
                    'MaSize' => $row['MaSize'],
                    'KichThuoc' => $row['KichThuoc'],
                );
                $data['size'] = $item2;
            }
        }
        if ($result3->num_rows > 0) {
            while ($row = $result3->fetch_assoc()) {
                $item3[] = array(
                    'MaThuongHieu' => $row['MaThuongHieu'],
                    'TenThuongHieu' => $row['TenThuongHieu'],
                    'DiaChi' => $row['DiaChi'],
                    'Email' => $row['Email']
                );
                $data['thuonghieu'] = $item3;
            }
        }
        if ($result4->num_rows > 0) {
            while ($row = $result4->fetch_assoc()) {
                $item4[] = array(
                    'MaMau' => $row['MaMau'],
                    'TenMau' => $row['TenMau'],
                );
                $data['mausac'] = $item4;
            }
        }
        if ($result5->num_rows > 0) {
            while ($row = $result5->fetch_assoc()) {
                $item5[] = $row;
                $data['nhacungcap'] = $item5;
            }
        }
        return $data;
    }

    public function ChiTietPhieuNhap($id)
    {
        $sql = "SELECT * 
                FROM chitietphieunhap 
                INNER JOIN phieunhap ON phieunhap.MaPN = chitietphieunhap.MaPN 
                WHERE chitietphieunhap.MaPN = '$id'";
        $result = $this->conn->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $dataitem = array(
                    'MaGiay' => $row['MaGiay'],
                    'MaPN' => $row['MaPN'],
                    'SoLuong' => $row['SoLuong'],
                    'GiaNhap' => $row['GiaNhap']
                );
                $data[] = $dataitem;
            }
        }
        return $data;
    }
    public function themmoisanpham($data)
    {
        try {
            // Lấy dữ liệu từ $data
            $MaGiay = $data['ma_giay'];
            $Tengia = $data['ten_giay'];
            $GiaNhap = $data['gia_nhap'];
            $SoLuong = $data['so_luong'];
            $MaLoai = $data['loai'];
            $MaThuongHieu = $data['thuong_hieu'];
            $MaMau = $data['mausac'];
            $MaSize = $data['size'];
            $ChatLieu = $data['chat_lieu'];
            $NaNCC = $data['nhacungcap'];
            $MaNV = $data['Manv'];
            $HinhAnh = $data['hinh_anh'];
            $MaPN = isset($data['ma_pn']) ? $data['ma_pn'] : null;

            // Bắt đầu giao dịch
            $this->conn->begin_transaction();

            // Kiểm tra xem sản phẩm đã tồn tại trong bảng giay chưa
            $sql_check_giay = "SELECT * FROM giay WHERE MaGiay = '$MaGiay'";
            $result_check_giay = $this->conn->query($sql_check_giay);

            if ($result_check_giay->num_rows > 0) {
                // Sản phẩm đã tồn tại, cập nhật thông tin và số lượng
                $row = $result_check_giay->fetch_assoc();
                $SoLuongCu = $row['SoLuong'];
                $SoLuongMoi = $SoLuongCu + $SoLuong;
                $GiaNhapCu = isset($row['DonGia']) ? $row['DonGia'] : 0;
                $GiaNhapMoi = $GiaNhap;

                // Cập nhật thông tin sản phẩm
                $sql_update_giay = "UPDATE giay SET SoLuong = '$SoLuongMoi', DonGia = '$GiaNhapMoi' WHERE MaGiay = '$MaGiay'";
                $this->conn->query($sql_update_giay);
            } else {
                // Sản phẩm chưa tồn tại, thêm mới vào bảng giay
                $sql_them_sanpham = "INSERT INTO giay (MaGiay, Tengia, DonGia, SoLuong, MaLoai, MaThuongHieu, MaMau, MaSize, ChatLieu,HinhAnh) VALUES ('$MaGiay', '$Tengia', '$GiaNhap', '$SoLuong', '$MaLoai', '$MaThuongHieu', '$MaMau', '$MaSize', '$ChatLieu','$HinhAnh')";
                $this->conn->query($sql_them_sanpham);
            }

            // Kiểm tra xem có MaPN được cung cấp không
            if ($MaPN) {
                // Thêm chi tiết phiếu nhập vào phiếu nhập có sẵn
                $sql_them_chitietphieunhap = "INSERT INTO chitietphieunhap (MaPN, MaGiay, SoLuong,GiaNhap) VALUES ('$MaPN', '$MaGiay', '$SoLuong','$GiaNhap')";
                $this->conn->query($sql_them_chitietphieunhap);
            } else {
                // Tạo phiếu nhập mới
                $sql_them_phieunhap = "INSERT INTO phieunhap (NgayNhap, MaNCC, MaNV) VALUES (NOW(), '$NaNCC', '$MaNV')";
                $this->conn->query($sql_them_phieunhap);
                $MaPN = $this->conn->insert_id;

                // Thêm chi tiết phiếu nhập vào phiếu nhập mới
                $sql_them_chitietphieunhap = "INSERT INTO chitietphieunhap (MaPN, MaGiay, SoLuong,GiaNhap) VALUES ('$MaPN', '$MaGiay', '$SoLuong','$GiaNhap')";
                $this->conn->query($sql_them_chitietphieunhap);
            }

            // Tính tổng tiền của phiếu nhập và cập nhật
            $sql_tong_gia_nhap = "SELECT SUM(GiaNhap * SoLuong) AS TongTien FROM chitietphieunhap WHERE MaPN = '$MaPN'";
            $result_tong_gia_nhap = $this->conn->query($sql_tong_gia_nhap);
            $row_tong_gia_nhap = $result_tong_gia_nhap->fetch_assoc();
            $tong_tien = $row_tong_gia_nhap['TongTien'];
            $sql_cap_nhat_tong_tien = "UPDATE phieunhap SET TongTien = '$tong_tien' WHERE MaPN = '$MaPN'";
            $this->conn->query($sql_cap_nhat_tong_tien);

            // Kết thúc giao dịch
            $this->conn->commit();

            // Trả về kết quả thành công
            $response = array(
                'EM' => "Thêm mới sản phẩm và chi tiết phiếu nhập thành công",
                'EC' => "0",
                'DT' => ""
            );
            return json_encode($response);
        } catch (\Exception $e) {
            // Rollback giao dịch nếu có lỗi
            $this->conn->rollback();

            // Trả về thông báo lỗi
            $response = array(
                'EM' => "Lỗi từ máy chủ: " . $e->getMessage(),
                'EC' => "-1",
                'DT' => ""
            );
            return json_encode($response);
        }
    }
}
