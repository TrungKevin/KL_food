package com.trungkien.foodrescueapp.data.RetrofitAPI

import com.trungkien.foodrescueapp.data.Model.UserRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST ("api/admin/sync-user") // đường dẫn api đến Node.js
    suspend fun syncUser(@Body request: UserRequest): Response<Unit>
}