package com.trungkien.foodrescueapp

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.trungkien.foodrescueapp.data.RetrofitAPI.RetrofitClient
import com.trungkien.foodrescueapp.repository.UserRepository
import com.trungkien.foodrescueapp.ui.theme.FoodRescueAppTheme
import com.trungkien.foodrescueapp.ui.view.screen.LoginScreen
import com.trungkien.foodrescueapp.viewmodel.AuthViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val apiService = RetrofitClient.apiService
        val repository = UserRepository(apiService)
        val viewModel = AuthViewModel(repository)
        setContent {
            @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
            FoodRescueAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) {
                         innerPadding ->
                    LoginScreen(viewModel)
                }
            }
        }
    }
}



@SuppressLint("ViewModelConstructorInComposable")
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    val apiService = RetrofitClient.apiService
    val repository = UserRepository(apiService)
    val viewModel = AuthViewModel(repository)
    FoodRescueAppTheme {
        LoginScreen(viewModel)
    }
}