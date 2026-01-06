import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: "http://10.0.2.2:3000/api/", // Địa chỉ API của bạn
      connectTimeout: const Duration(seconds: 5),
    ),
  );

  Dio get dio => _dio;
}