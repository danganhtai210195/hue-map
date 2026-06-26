// Test đơn giản KHÔNG phụ thuộc Internet map tiles
document.getElementById("map").innerHTML =
  "<div style='padding:20px;font-family:Arial'>"
  + "✅ Website đã chạy thành công trên Vercel<br><br>"
  + "❗ Lỗi hiện tại: bị chặn bản đồ nền (map tiles)<br><br>"
  + "👉 Điều này là do mạng hoặc ISP chặn OpenStreetMap<br><br>"
  + "📌 Bước tiếp theo: chuyển sang Google Maps API (ổn định hơn)"
  + "</div>";
