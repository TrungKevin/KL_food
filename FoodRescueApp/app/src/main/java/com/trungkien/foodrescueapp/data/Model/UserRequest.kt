package com.trungkien.foodrescueapp.data.Model

import java.io.Serializable

class UserRequest(uid: String, email1: String, name: String) {
    data class Request(
        val id: String? = null,
        val fullName: String,
        val email: String,
        val password: String? = null,
        val role: String = "buyer",
        val phone: String? = null,
        val status: String = "active"
    ) : Serializable
}