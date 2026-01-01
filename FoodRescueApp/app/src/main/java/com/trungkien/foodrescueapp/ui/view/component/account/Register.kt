package com.trungkien.foodrescueapp.ui.view.component.account

import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.trungkien.foodrescueapp.viewmodel.AuthViewModel

@Composable
fun Register(viewModel: AuthViewModel) {
    Text(text = viewModel.message)
    Button(onClick = {
        // Giả lập sau khi Firebase trả về thông tin
        viewModel.syncUser("ABC_123", "test@gmail.com", "Người dùng Android")
    }) {
        Text("Đăng ký & Đồng bộ")
    }
}