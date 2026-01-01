package com.trungkien.foodrescueapp.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.trungkien.foodrescueapp.repository.UserRepository
import kotlinx.coroutines.launch

class AuthViewModel (private val repository: UserRepository) : ViewModel() // ViewModel để quản lý trạng thái xác thực người dùng và tương tác với UserRepository
{
    var isLoading by mutableStateOf(false)// Trạng thái tải dữ liệu
    var message by mutableStateOf("")// Thông điệp phản hồi từ quá trình đồng bộ người dùng

    fun syncUser(uid: String, email: String, name: String)// Hàm để đồng bộ người dùng với cơ sở dữ liệu Postgres
    {
        viewModelScope.launch { // Sử dụng viewModelScope để khởi chạy coroutine
            isLoading = true// Đặt trạng thái tải dữ liệu thành true để hiển thị tiến trình
            val result = repository.syncUserWithPostgres(uid, email, name)// Gọi hàm đồng bộ người dùng từ UserRepository

            result.onSuccess {// Xử lý kết quả thành công
                message = "Đồng bộ người dùng thành công"
            }.onFailure { error ->
                message = "Lỗi đồng bộ người dùng: ${error.message}"
            }
            isLoading = false // Đặt trạng thái tải dữ liệu thành false sau khi hoàn thành để ẩn tiến trình của người dùng
        }
    }
}