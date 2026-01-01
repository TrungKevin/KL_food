package com.trungkien.foodrescueapp.data.RetrofitAPI

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:3000/"// IP máy ảo localhost của Android Emulator

    val apiService: ApiService by lazy { // Tạo một instance của ApiService sử dụng Retrofit để gọi API
        Retrofit.Builder()// Xây dựng Retrofit với URL cơ sở và bộ chuyển đổi Gson
            .baseUrl(BASE_URL)// Đặt URL cơ sở cho các yêu cầu API
            .addConverterFactory(GsonConverterFactory.create())// Thêm bộ chuyển đổi Gson để tự động chuyển đổi JSON sang đối tượng Kotlin
            .build()// Xây dựng đối tượng Retrofit
            .create(ApiService::class.java)// Tạo một instance của ApiService từ Retrofit
    }
}