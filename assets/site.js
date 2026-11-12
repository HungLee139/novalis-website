// Form liên hệ: web tĩnh không có máy chủ, nên bấm Gửi sẽ mở ứng dụng email
// của khách với nội dung điền sẵn, gửi tới địa chỉ trong data-email.
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  // Đi từ nút "Trở thành đối tác" (?topic=partner) thì chọn sẵn mục Hợp tác / Nhà cung cấp
  var want = new URLSearchParams(window.location.search).get('topic');
  if (want) {
    var pre = form.querySelector('input[name="topic"][data-key="' + want.replace(/[^a-z]/g, '') + '"]');
    if (pre) pre.checked = true;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var lines = [];
    form.querySelectorAll('input[data-label], textarea[data-label]').forEach(function (el) {
      if (el.value.trim()) lines.push(el.dataset.label + ': ' + el.value.trim());
    });
    var topic = form.querySelector('input[name="topic"]:checked');
    var topicLabel = document.getElementById('topicL');
    if (topic) lines.splice(Math.min(lines.length, 4), 0, topicLabel.dataset.label + ': ' + topic.value);
    var href = 'mailto:' + form.dataset.email +
      '?subject=' + encodeURIComponent(form.dataset.subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
    document.getElementById('formCard').classList.add('sent');
  });
})();
