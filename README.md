# Tóm tắt chi tiết repo: CS105.P22---Final-Project-Computer-Graphic

## 1. Chủ đề & Ý tưởng

- **Tên dự án:** 3D Art Gallery – Phòng tranh nghệ thuật 3D trên nền tảng web.
- **Ý tưởng:** Mô phỏng một phòng trưng bày tranh và tượng nghệ thuật dưới dạng không gian 3D, cho phép người dùng tự do di chuyển, tương tác và khám phá các tác phẩm nổi tiếng trên thế giới.
- **Mục tiêu:** Kết hợp công nghệ đồ họa máy tính (WebGL/Three.js) với khả năng tương tác, mang trải nghiệm bảo tàng ảo đến gần hơn với mọi người.

## 2. Tính năng nổi bật

- **Khám phá phòng tranh 3D:**  
  Tự do di chuyển trong không gian 3D (WASD, chuột như game góc nhìn thứ nhất).
- **Hiển thị thông tin tranh/tượng:**  
  Khi lại gần từng bức tranh hoặc tượng, tự động hiện chi tiết (tên, tác giả, mô tả, năm sáng tác...) và có thể nghe hướng dẫn âm thanh (audio guide).
- **Tượng & đèn trần 3D:**  
  Có tượng nghệ thuật và đèn trần với hiệu ứng ánh sáng động, tạo sự chân thực.
- **Giao diện trực quan:**  
  Panel hướng dẫn phím tắt, menu chính, bảng About, có thể bật/tắt các panel.
- **Tối ưu trải nghiệm:**  
  Tự động khóa/giải phóng chuột khi vào/thoát gallery.
  Thông tin chỉ hiện khi đến gần để tránh rối giao diện.
  Đèn và tượng có animation, hiệu ứng ánh sáng động.
- **Audio guide:**  
  Có thể bật/tắt hướng dẫn âm thanh khi tiếp cận tác phẩm.

## 3. Công nghệ & Thư viện sử dụng (Chi tiết)

- **Three.js**  
  - Dựng mô hình, ánh sáng, camera, vật thể 3D, tương tác người dùng.
  - Sử dụng các thành phần như: Scene, PerspectiveCamera, Mesh, Material, Light, Group, OrbitControls/PointerLockControls...
- **GLTFLoader (Three.js Addon)**  
  - Tải mô hình 3D chuẩn glTF/glb (cho đèn, tượng).
  - Hỗ trợ đổ bóng, ánh sáng động, nạp texture map.
- **WebGL (qua Three.js)**  
  - Render đồ họa 3D hiệu suất cao trên trình duyệt.
- **Dat.GUI**  
  - Tạo giao diện điều chỉnh tham số ánh sáng (intensity, angle, màu...), debug nhanh trực tiếp trong lúc chạy.
- **HTML5, CSS3, JavaScript (ES6 modules)**  
  - HTML: Xây dựng bố cục, overlay, panel, menu, các vùng hiển thị thông tin.
  - CSS: Style cho painting info, info panel, responsive layout, animation giao diện.
  - JS: Quản lý logic di chuyển, tương tác, kiểm tra va chạm, hiển thị thông tin, sự kiện bàn phím/chuột, animation.
- **Audio API (HTML5 Audio hoặc Web Audio API)**  
  - Phát audio guide khi lại gần tranh/tượng (nếu có file âm thanh).
- **Pointer Lock API**  
  - Khoá con trỏ chuột khi tham quan gallery, điều khiển chuyển động góc nhìn mượt mà.
- **Các thư viện phụ trợ**  
  - Có thể sử dụng thêm các thư viện xử lý sự kiện, kiểm tra va chạm, hoặc custom control.

## 4. Cấu trúc thư mục & module

- **index.html:**  
  Giao diện chính, nhúng renderer 3D, overlay, panel, menu, hướng dẫn sử dụng.
- **modules/:**  
  - `paintings.js`: Danh sách tranh, vị trí, metadata.
  - `statue.js`: Tượng nghệ thuật, hiệu ứng quay, kiểm tra khoảng cách.
  - `ceilingLamp.js`, `lighting.js`: Đèn trần, hiệu ứng ánh sáng, spotlight, GUI chỉnh đèn.
  - `rendering.js`: Thiết lập vòng lặp render, gọi animate cho từng vật thể.
  - `eventListeners.js`: Lắng nghe thao tác phím, chuột, điều khiển panel/menu/pointer lock.
  - `paintingInfo.js`: Hiển thị/ẩn thông tin tranh.
  - `boundingBox.js`: Tạo bounding box cho vật thể để kiểm tra khoảng cách/va chạm.
- **css/:**  
  Style cho overlay, panel, bảng info, responsive UI.
- **public/models/**  
  Chứa các mô hình 3D (đèn trần, tượng .glb).
- **artworks/**  
  Lưu ảnh các tranh nghệ thuật nổi tiếng.

## 5. Quy trình hoạt động tổng thể

1. **Mở website:** Người dùng thấy menu, chọn “Explore Art” vào phòng tranh 3D.
2. **Tham quan:**  
   - Dùng WASD, chuột để di chuyển/xoay góc nhìn.
   - Khi lại gần tranh/tượng sẽ hiện thông tin chi tiết, có thể nghe audio guide.
   - Có thể bật/tắt panel hướng dẫn, xem About.
   - Đèn và tượng có animation, hiệu ứng ánh sáng động.
3. **Tương tác:**  
   - Các phím tắt: G/P bật/tắt audio guide, M về menu, Space khoá/giải phóng chuột, R reload...
   - Khi lại gần sẽ hiện thông tin động, tránh lộ thông tin quá nhiều cùng lúc.

## 6. Ý nghĩa & ứng dụng thực tiễn

- **Trình diễn công nghệ WebGL/Three.js**: Ứng dụng thực tế của đồ họa máy tính.
- **Mô phỏng bảo tàng/trưng bày tranh ảo**: Học tập, tham khảo, marketing, triển lãm trực tuyến.
- **Tăng tiếp cận nghệ thuật**: Mọi người đều có thể tham quan mọi lúc mọi nơi.
- **Nền tảng mở rộng**: Có thể nâng cấp thêm VR, multiuser, thêm nhiều loại tương tác...

---
