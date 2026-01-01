package com.trungkien.foodrescueapp.repository

import com.trungkien.foodrescueapp.data.Model.UserRequest
import com.trungkien.foodrescueapp.data.RetrofitAPI.ApiService

class UserRepository(private val apiService: ApiService)// Lớp Repository để quản lý dữ liệu người dùng và tương tác với API
{
    suspend fun syncUserWithPostgres(uid: String, email: String, name: String): Result<Unit> // Hàm đồng bộ người dùng với cơ sở dữ liệu Postgres thông qua API
    {
        return try // Thử thực hiện yêu cầu API
        {
            val response = apiService.syncUser(UserRequest(uid, email, name)) // Gọi API để đồng bộ người dùng
            if (response.isSuccessful) Result.success(Unit)// Nếu yêu cầu thành công, trả về kết quả thành công
            else Result.failure(Exception("Lỗi Server: ${response.code()}"))
        } catch (e: Exception) {
            Result.failure(e)// Nếu có lỗi xảy ra, trả về kết quả thất bại với ngoại lệ
        }
    }
}