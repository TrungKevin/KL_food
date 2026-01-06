import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../data/repositories/auth_repository.dart';
import '../data/models/user_model.dart';

class AuthViewModel extends ChangeNotifier{ // ChangeNotifier là lớp cơ sở để tạo các lớp ViewModel trong Flutter, cho phép thông báo cho các widget lắng nghe khi có thay đổi trạng thái
  final AuthRepository _authRepository = AuthRepository();// khởi tạo đối tượng AuthRepository để sử dụng các phương thức trong đó
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;// khởi tạo đối tượng FirebaseAuth để sử dụng các phương thức trong đó

  bool _isLoading = false;// biến private để theo dõi trạng thái tải
  bool get isLoading => _isLoading;// getter để truy cập biến private

  String? _errorMessage ; // biến private để theo dõi trạng thái tải
  String? get errorMessage => _errorMessage;

  Future<bool> registerAndSync (String email, String password, String name) async{
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try{
      // 1. Đăng ký trên Firebase
      UserCredential credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      // 2. Nếu Firebase OK, đồng bộ sang PostgreSQL qua Backend
      if (credential.user != null) {
        UserModel newUser = UserModel(
          uid: credential.user!.uid,
          email: email,
          fullname: name,
        );
        
        bool isSynced = await _authRepository.syncUserWithBackend(newUser);// đồng bộ user với backend
        if(isSynced){// nếu đồng bộ thành công thì trả về true
          _isLoading = false;
          notifyListeners();// thông báo cho các widget lắng nghe thay đổi
          return true;
        }
      }
    } on FirebaseAuthException catch (e) {
      _errorMessage = e.message;
      
    }catch (e){
      _errorMessage = "Lỗi hệ thống .Please try again.$e";
    }

    _isLoading = false;// đặt lại trạng thái tải về false
    notifyListeners();// thông báo cho các widget lắng nghe thay đổi
    return false;
  }

  // Hàm đăng nhập
  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      // Gọi Firebase Auth để đăng nhập
      await _firebaseAuth.signInWithEmailAndPassword(
        email: email, 
        password: password
      );
      
      _isLoading = false;
      notifyListeners();
      return true;
    } on FirebaseAuthException catch (e) {
      _errorMessage = e.message;
    } catch (e) {
      _errorMessage = "Lỗi: ${e.toString()}";
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }
}