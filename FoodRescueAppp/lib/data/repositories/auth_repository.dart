import '../remote/api_service.dart';
import '../models/user_model.dart';

class AuthRepository{
  final ApiService _apiService = ApiService();

  // Đồng bộ user với Backend Node.js
  Future<bool> syncUserWithBackend(UserModel user) async{// Future<bool> là hàm bất đồng bộ trả về giá trị bool để biết được việc đồng bộ thành công hay không
    try {
      final response = await _apiService.dio.post(// witgest await đợi kết quả trả về từ hàm bất đồng bộ
        'auth/sync-user',
        data: user.toJson(),
      );
      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      print('Error syncing user with backend: $e');
      return false;
    }
  }
}