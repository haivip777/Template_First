// Thanh trượt slide có thể kéo được ở phần feature_items
const slider = document.querySelector('.pro__feature-items');
const slider2 = document.querySelector('.pro__service');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('dragging');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('dragging');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('dragging');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // tốc độ kéo
  slider.scrollLeft = scrollLeft - walk;
});

// Mốc thời gian đếm ngược: 30 ngày kể từ bây giờ
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<h2 style='color:white;'>Đã đến hạn!</h2>";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

updateCountdown(); // gọi ngay lập tức
const interval = setInterval(updateCountdown, 1000); // cập nhật mỗi giây


// Khởi tạo Swiper cho phần thanh trượt product
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  freeMode: true,
  spaceBetween: 0,
  // breakpoints: {
  //   0: {
  //     slidesPerView: 1
  //   },
  //   480: {
  //     slidesPerView: 1.5
  //   },
  //   768: {
  //     slidesPerView: 2
  //   },
  //   1024: {
  //     slidesPerView: 4
  //   },
  //   1200: {
  //     slidesPerView: 4
  //   }
  // }
});

// Chọn từ option
const dots = document.querySelectorAll('.dot');
const image1 = document.getElementById('product-image1');
const image4 = document.getElementById('product-image4');

dots.forEach(dot => {
  const img = dot.getAttribute('data-img');

  // Hover vào thì đổi ảnh tạm
  dot.addEventListener('mouseenter', () => {
    image1.src = img;
    image4.src = img;
  });

  // Rời chuột thì quay lại ảnh đã chọn (nếu chưa click)
  dot.addEventListener('mouseleave', () => {
    image1.src = selectedImage;
  });
  dot.addEventListener('click', function () {
    // Xoá active ở tất cả
    dots.forEach(d => d.classList.remove('active'));
    // Thêm active cho cái được click
    this.classList.add('active');
    // Đổi ảnh
    const newImg = this.getAttribute('data-img');
    image1.src = newImg;
  });
});

const faqItems = document.querySelectorAll('.pro__question-item');

faqItems.forEach(item => {
  const question = item.querySelector('.pro__question-question');
  const icon = item.querySelector('.icon');

  question.addEventListener('click', () => {
    // Đóng tất cả
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
        i.querySelector('.icon').textContent = '+';
      }
    });

    // Toggle câu hiện tại
    const isActive = item.classList.contains('active');
    item.classList.toggle('active');
    icon.textContent = isActive ? '+' : '−';
  });
});