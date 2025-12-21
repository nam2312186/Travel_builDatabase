// Auto logout sau 15 phút không hoạt động

const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 phút = 15 * 60 * 1000 ms

let timeoutId = null;

export const setupAutoLogout = (logoutCallback) => {
  // Reset timeout mỗi khi có hoạt động
  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Chỉ set timeout nếu user đã đăng nhập
    const user = localStorage.getItem('user');
    if (user) {
      timeoutId = setTimeout(() => {
        logoutCallback();
      }, TIMEOUT_DURATION);
    }
  };

  // Các sự kiện cần theo dõi
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

  events.forEach((event) => {
    document.addEventListener(event, resetTimeout);
  });

  // Khởi tạo timeout ban đầu
  resetTimeout();

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    events.forEach((event) => {
      document.removeEventListener(event, resetTimeout);
    });
  };
};
