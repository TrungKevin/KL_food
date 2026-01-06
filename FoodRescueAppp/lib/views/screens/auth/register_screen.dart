import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:foodrescueappp/view_models/auth_view_model.dart';

class RegisterScreen extends StatelessWidget{// StatelessWidget dùng để tạo một màn hình
    final TextEditingController nameController = TextEditingController(); // Tạo các controller để quản lý dữ liệu nhập từ người dùng 
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();

    @override
    Widget build(BuildContext context){
        final authVM = context.watch<AuthViewModel>(); // Lấy AuthViewModel từ Provider để quản lý trạng thái xác thực
        
        return Scaffold( // Scaffold cung cấp cấu trúc cơ bản cho màn hình
            backgroundColor: Colors.white,
            body: SingleChildScrollView(// SingleChildScollView cho phép cuon nội dung khi vượt quá kích thước)
                
                padding: const EdgeInsets// EdgeInsets dùng để tạo khoảng cách bên trong
                .symmetric(//.symmetric tạo khoảng cách đối xứng
                    horizontal: 30.0, 
                    vertical: 60.0
                ),

                child: Column(//child là con của SingleChildScrollView, Column dùng để sắp xếp các phần tử con theo chiều dọc
                    crossAxisAlignment: CrossAxisAlignment.start, // Căn chỉnh các phần tử con theo chiều ngang
                    children: [//childeren là danh sách các phần tử con của Column
                        const Text("Tạo tài khoản",
                            style: TextStyle(
                                fontSize: 28.0,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF4CAF50)
                            )
                        ), 
                        const SizedBox(height: 10.0), // Tạo khoảng cách dọc giữa các phần tử
                        const Text("Tham gia cứu trợ thực phẩm ngay hôm nay!",
                            style: TextStyle(
                                fontSize: 16.0,
                                color: Colors.grey
                            )
                        ),
                        const SizedBox(height: 40.0),
                    
                        _buildTextField(nameController,"Họ và tên", Icons.person_outlined),
                        const SizedBox(height: 20.0),
                        _buildTextField(emailController,"Email", Icons.email_outlined),
                        const SizedBox(height: 20.0),
                        _buildTextField(passwordController,"Mật khẩu", Icons.lock_outlined, isObscure: true),

                        const SizedBox(height: 40.0),

                        if(authVM.errorMessage != null)
                            Text(
                                authVM.errorMessage!,
                                style: const TextStyle(color: Colors.red),
                            ),

                        SizedBox(// Nút đăng ký là một SizedBox để đặt kích thước cụ thể
                            width: double.infinity,
                            height: 55.0,
                            child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF4CAF50),
                                    shape: RoundedRectangleBorder(// Bo góc cho nút
                                        borderRadius: BorderRadius.circular(15.0),
                                    )
                                ),
                                onPressed: authVM.isLoading ? null : () async{// Vô hiệu hóa nút khi đang tải
                                    bool success =await authVM.registerAndSync(// Gọi hàm đăng ký và đồng bộ dữ liệu
                                        nameController.text,
                                        emailController.text,
                                        passwordController.text,
                                    );
                                    if(success)
                                        Navigator.pop(context); // Quay lại màn hình login sau khi đăng ký thành công
                                },
                                child: authVM.isLoading // Hiển thị chỉ báo tiến trình nếu đang tải
                                    ? const CircularProgressIndicator(color: Colors.white)// ? : nếu đúng
                                    : const Text("Đăng ký", style: TextStyle(fontSize: 18.0,color: Colors.white)),
                            ),
                        ),

                    ],
                ),
            ),
        );
   
    }

    Widget _buildTextField(TextEditingController controller, String label, IconData icon, {bool isObscure =false}){// Hàm xây dựng trường văn bản với các tham số tùy chỉnh
        return TextField(// Trả về một widget TextField
            controller: controller,//   Gán controller để quản lý dữ liệu nhập
            obscureText: isObscure,// Ẩn văn bản nếu là mật khẩu
            decoration: InputDecoration(// Tùy chỉnh giao diện của trường văn bản
                labelText: label,
                prefixIcon: Icon(icon, color: const Color(0xFF4CAF50)),
                filled: true,
                fillColor: Colors.grey[100],
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15.0),
                    borderSide: BorderSide.none,
                ),
            ),
        );
    }

}