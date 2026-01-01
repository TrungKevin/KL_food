package com.trungkien.foodrescueapp.ui.view.screen

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.trungkien.foodrescueapp.ui.view.component.account.Register
import com.trungkien.foodrescueapp.viewmodel.AuthViewModel

@Composable
fun LoginScreen(viewModel: AuthViewModel) {
    Column (
        modifier = Modifier// để chỉnh sửa giao diện người dùng
            .fillMaxSize()// Chiếm toàn bộ không gian có sẵn theo cả chiều rộng và chiều cao
            .padding(16.dp) // Thêm khoảng đệm 16dp xung quanh cột
    ){
        if(viewModel.isLoading){
            CircularProgressIndicator()// Hiển thị chỉ báo tiến trình tròn khi đang tải
        }
        Register(viewModel)
    }
}