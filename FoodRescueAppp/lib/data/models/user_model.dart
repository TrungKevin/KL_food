import 'dart:ffi';

class UserModel {
  final Int? id;
  final String uid;
  final String email;
  final String? fullname;

  UserModel({ // dùng để khởi tạo đối tượng cho UserModel
    this.id,
    required this.uid,// dấu ? là có thể null, không, required là bắt buộc phải có giá trị
    required this.email,
    this.fullname,
  });

  //chuyển từ JSON của nodejs sang đối tượng UserModel object
  factory UserModel.fromJson(Map<String, dynamic> json) // factory là một constructor đặc biệt dùng để tạo đối tượng từ một nguồn dữ liệu khác
  {
    return UserModel(// dùng để khởi tạo đối tượng UserModel từ JSON
      id: json['id'],
      uid: json['uid'],
      email: json['email'],
      fullname: json['fullname'],
    );
  }

  Map<String, dynamic> toJson() //chuyển từ đối tượng UserModel object sang JSON để gửi lên API
  {// dyamic là kiểu dữ liệu động, có thể chứa bất kỳ kiểu dữ liệu nào
    return {
      'id': id,
      'uid': uid,
      'email': email,
      'fullname': fullname,
    };
  }

}