import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:foodrescueappp/view_models/auth_view_model.dart';
import 'register_screen.dart'; // Để điều hướng

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>{
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context){
    //lắng nghe trạng thái từ ViewModel
    final authVM = context.watch<AuthViewModel>();

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              //logo or icon ứng dụng
              const Icon(Icons.fastfood_outlined, size: 80.0, color: Color(0xFF4CAF50)),
              const SizedBox(height: 20.0),
              const Text("Chào mừng bạn đến với Food Rescue",
                  style: TextStyle(
                      fontSize: 28.0,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF4CAF50)
                  )
              ),
              const SizedBox(height: 10.0),
              const Text("Đăng nhập để bắt đầu chia sẻ và cứu trợ thực phẩm",
                  style: TextStyle(
                      fontSize: 16.0,
                      color: Colors.grey
                  )
              ),
              const SizedBox(height: 40.0),

              _buildTextField(_emailController,"Email", Icons.email_outlined),
              const SizedBox(height: 15.0),

              _buildTextField(_passwordController,"Mật khẩu", Icons.lock_outlined, isObscure: true),
              const SizedBox(height: 15.0),
              if(authVM.errorMessage != null)
                Text(
                  authVM.errorMessage!,
                  style: const TextStyle(color: Colors.red, fontSize: 13.0),
                ),

                const SizedBox(height: 30.0),

              SizedBox(
                width: double.infinity,
                height: 55.0,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4CAF50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0)
                    ),
                    elevation: 0,
                  ),
                  onPressed: authVM.isLoading ? null : () async {
                    // Gọi phương thức đăng nhập từ ViewModel
                   bool success = await authVM.login(
                      _emailController.text,
                      _passwordController.text
                    );
                    if(success){

                    }
                  },
                  child: authVM.isLoading
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text("Đăng nhập", style: TextStyle(fontSize: 18.0,color: Colors.white, fontWeight: FontWeight.bold)),
                  
                ),
              ),

              const SizedBox(height: 20.0),

              //điều sang register screen
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Chưa có tài khoản?", style: TextStyle(color: Colors.grey)),
                  GestureDetector(// GestureDetector để phát hiện sự kiện chạm vào văn bản
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) =>  RegisterScreen())),
                      child: const Text(" Đăng ký ngay",
                        style: TextStyle(
                          color: Color(0xFF4CAF50),
                          fontWeight: FontWeight.bold
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),  
      ),
    );
  }

  // Widget dùng chung cho TextField
  Widget _buildTextField(TextEditingController controller, String label, IconData icon, {bool isObscure = false}) {
    return TextField(
      controller: controller,
      obscureText: isObscure,
      decoration: InputDecoration(
        prefixIcon: Icon(icon, color: const Color(0xFF4CAF50)),
        labelText: label,
        filled: true,
        fillColor: Colors.grey[100],
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(15), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
          borderSide: const BorderSide(color: Color(0xFF4CAF50), width: 1),
        ),
      ),
    );
  }
}