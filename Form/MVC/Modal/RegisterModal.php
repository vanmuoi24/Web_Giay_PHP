<?php
class RegisterModal
{
    private $conn;
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function Register($data)

    {
        $hoten = $data["fullnameValue"];
        $sdt = $data["phoneValue"];
        $email = $data["emailValue"];
        $diachi = $data["addressValue"];
        $tendn = $data["usernameValue"];
        $xacnhanmk = $data["confirmPasswordValue"];
        $hoten = explode(" ", $hoten);
        $ho = $hoten[0];
        $ten = "";
        for ($i = 1; $i < count($hoten); $i++)
            $ten .= $hoten[$i] . " ";
        // $sql_khachhang = "INSERT INTO khachhang (MaKH,Ho,Ten,DiaChi,Email,SDT) VALUES (?,?,?,?,?,?)  ";
        // $stmt = $this->conn->prepare($sql_khachhang);
        // $stmt->bind_param('ssssss', $tendn, $ho, $ten, $diachi, $email,$sdt);

        // $sql_check_tendn = "SELECT COUNT(*) AS total FROM taikhoan WHERE TenDN = ?";
        // $stmt_check_tendn = $this->conn->prepare($sql_check_tendn);
        // $stmt_check_tendn->bind_param('s', $tendn);
        // $stmt_check_tendn->execute();
        // $result_check_tendn = $stmt_check_tendn->get_result();
        // $row_check_tendn = $result_check_tendn->fetch_assoc();


        $sql_check = "SELECT * FROM taikhoan 
      WHERE  taikhoan.TenDN = '$tendn'";
        $rsCheck = $this->conn->query($sql_check);
        if ($rsCheck->num_rows > 0)
            return array(
                'EM' => "Tên Đăng Nhập Đã Tồn Tại",
                'EC' => "0",
                'DT' => ""
            );


        $sql_khachhang = "INSERT INTO khachhang (MaKH, Ho, Ten, DiaChi, Email, SDT) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt_khachhang = $this->conn->prepare($sql_khachhang);
        $stmt_khachhang->bind_param('ssssss', $tendn, $ho, $ten, $diachi, $email, $sdt);
        $stmt_khachhang->execute();

        if ($stmt_khachhang->error) {
            return "Lỗi khi thêm thông tin khách hàng: " . $stmt_khachhang->error;
        }

        $sql_taikhoan = "INSERT INTO taikhoan ( TenDN, MatKhau, NgayTao, nhomquyen) VALUES ( ?, ?, NOW(), 24)";
        $stmt_taikhoan = $this->conn->prepare($sql_taikhoan);
        $stmt_taikhoan->bind_param('ss', $tendn, $xacnhanmk);
        $stmt_taikhoan->execute();


        return (array(
            'EM' => "Tạo Tài Khoàn Thành Công",
            'EC' => "1",
            'DT' => $data
        ));
    }
}
