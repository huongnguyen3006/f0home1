import React, { useState, useEffect } from "react"

export default function Menu() {

    return (
        <div>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">PMS</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/">Trang chủ</a></li>
                        <li><a href="/product">Sản phảm</a></li>
                        <li><a href="/f0">F0</a></li>
                        <li><a href="/doctor">Bác sĩ</a></li>
                        <li><a href="/volunteer">Tình nguyện viện</a></li>
                        <li><a href="/user">Người dùng</a></li>
                        <li><a href="/church">Nhà thờ</a></li>
                        <li><a href="/lecture">Bài giảng</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}