// Thanh trượt slide có thể kéo được ở phần feature_items
const slider = document.querySelector('.pro__feature-items');
const slider2 = document.querySelector('.pro__service');
const slider3 = document.querySelector('.pro__article');

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


// Thanh trượt slide có thể kéo được ở phần service
slider2.addEventListener('mousedown', (e) => {
  isDown = true;
  slider2.classList.add('dragging');
  startX = e.pageX - slider2.offsetLeft;
  scrollLeft = slider2.scrollLeft;
});
slider2.addEventListener('mouseleave', () => {
  isDown = false;
  slider2.classList.remove('dragging');
});
slider2.addEventListener('mouseup', () => {
  isDown = false;
  slider2.classList.remove('dragging');
});
slider2.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider2.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider2.scrollLeft = scrollLeft - walk;
});


// Thanh trượt slide có thể kéo được ở phần article
slider3.addEventListener('mousedown', (e) => {
  isDown = true;
  slider3.classList.add('dragging');
  startX = e.pageX - slider3.offsetLeft;
  scrollLeft = slider3.scrollLeft;
});
slider3.addEventListener('mouseleave', () => {
  isDown = false;
  slider3.classList.remove('dragging');
});
slider3.addEventListener('mouseup', () => {
  isDown = false;
  slider3.classList.remove('dragging');
});
slider3.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider3.offsetLeft;
  const walk = (x - startX) * 1.5; // tốc độ kéo
  slider3.scrollLeft = scrollLeft - walk;
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

updateCountdown();
const interval = setInterval(updateCountdown, 1000); // cập nhật mỗi giây


// Khởi tạo Swiper cho phần thanh trượt product
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  freeMode: true,
  spaceBetween: 0,
  
});
// Swiper cho phần review
const customSwiper = new Swiper(".custom-swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
  el: '.swiper-pagination',
  clickable: true,
  }
});

// Chọn từ option
const dots = document.querySelectorAll('.dot');
const image1 = document.getElementById('product-image1');

dots.forEach(dot => {
  const img = dot.getAttribute('data-img');

  // Hover vào thì đổi ảnh tạm
  dot.addEventListener('mouseenter', () => {
    image1.src = img;
  });

  dot.addEventListener('mouseleave', () => {
    image1.src = selectedImage;
  });
  dot.addEventListener('click', function () {
    dots.forEach(d => d.classList.remove('active'));
    this.classList.add('active');
    const newImg = this.getAttribute('data-img');
    image1.src = newImg;
  });
});


// Phần câu hỏi
const faqItems = document.querySelectorAll('.pro__question-item');

faqItems.forEach(item => {
  const question = item.querySelector('.pro__question-question');
  const icon = item.querySelector('.icon');

  question.addEventListener('click', () => {
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
        i.querySelector('.icon').textContent = '+';
      }
    });

    const isActive = item.classList.contains('active');
    item.classList.toggle('active');
    icon.textContent = isActive ? '+' : '−';
  });
});


//Detail color section
const items = document.querySelectorAll('.color-item');
const nameDisplay = document.getElementById('colorName');
const imageBig = document.getElementById('big-image');

items.forEach(item => {
  const imgBig = item.getAttribute('data-img');

  // Hover vào thì đổi ảnh tạm
  item.addEventListener('mouseenter', () => {
    imageBig.src = imgBig;
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    imageBig.src = selectedImage;
  });

  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    nameDisplay.textContent = item.getAttribute('data-name');
    const newImgBig = this.getAttribute('data-img');
    imageBig.src = newImgBig;
  });
});

// Di chuột vào phần ảnh sản phẩm để hiện ảnh lớn
const thumbs = document.querySelectorAll('.mini');

thumbs.forEach(item => {
  const imgBig = item.getAttribute('data-img');

  item.addEventListener('mouseenter', () => {
    imageBig.src = imgBig;
    thumbs.forEach(i => i.classList.remove('active1'));
    item.classList.add('active1');
  });

  item.addEventListener('mouseleave', () => {
    imageBig.src = selectedImage;
  });

  item.addEventListener('click', () => {
    thumbs.forEach(i => i.classList.remove('active1'));
    item.classList.add('active1');
    const newImgBig = this.getAttribute('data-img');
    imageBig.src = newImgBig;
  });
});




// Phần câu hỏi trong phần detail
const faqItems2 = document.querySelectorAll('.pro__ques-item');

faqItems2.forEach(item => {
  const question2 = item.querySelector('.pro__ques-question');
  const icon2 = item.querySelector('.icon');

  question2.addEventListener('click', () => {
    faqItems2.forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
        i.querySelector('.icon').textContent = '+';
      }
    });

    const isActive = item.classList.contains('active');
    item.classList.toggle('active');
    icon2.textContent = isActive ? '+' : '−';
  });
});