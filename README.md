# 🧮 Bot Đếm Số cho Discord

Một bot đếm số đơn giản cho Discord! Các thành viên thay phiên nhau đếm trong một kênh. Nếu ai đó đếm sai số hoặc lặp người, bot sẽ tự xoá tin nhắn sai và tiếp tục chuỗi đếm.

## 🚀 Tính Năng

- ✅ Đếm đúng thứ tự không được bỏ số  
- ❌ Tự động xoá tin nhắn sai  
- 🔁 Tiếp tục đếm sau khi có lỗi (không reset về 1)  
- 🔒 Một người không được đếm liên tiếp (nếu bật)  
- 🔕 Hiện chưa có bảng xếp hạng  
- 📦 Toàn bộ bot nằm trong 1 file duy nhất (`index.js`)

## 🛠️ Cài Đặt

Bạn có thể tự chạy bot theo các bước sau:

### 1. Tải mã nguồn

```bash
git clone https://github.com/iamprmgvyt/counting-bot.git
cd counting-bot

Hoặc giải nén thư mục bạn tải.

2. Cài đặt thư viện

npm install

3. Tạo file .env

Tạo file .env chứa token của bot:

TOKEN=token_bot_cua_ban

> Không cần ghi PREFIX vì nó được định nghĩa trực tiếp trong file index.js.



4. Chạy bot

node index.js

⚙️ Cách Sử Dụng

Gõ !help (hoặc prefix bạn đã đặt trong index.js) để xem hướng dẫn.

Đếm số theo thứ tự trong một kênh cố định.

Sai số hoặc đếm trùng người sẽ bị xoá tin nhắn.

Bot không có cơ sở dữ liệu hay bảng xếp hạng.


📁 Cấu Trúc Dự Án

.
├── index.js                #File chính duy nhất
├── package.json        #Danhsách thư viện
├── .env                    #Token bot (do bạn tạo)
└── README.md

💡 Ví Dụ

Người A: 1  
Người B: 2  
Người B: 3 ❌ (sai, trùng người – bị xoá)  
Người C: 3 ✅

📜 Giấy Phép

Mã nguồn mở theo giấy phép MIT License.

💬 Hỗ Trợ

> 🧠 Tham gia server hỗ trợ tại: https://discord.gg/ra4JkDk42C


