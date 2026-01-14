// js/main.js
// noConflict対策＆DOM準備後に実行
jQuery(function($){
  var $slides = $('.fv-slides img');
  if ($slides.length < 2) {
    // 画像が1枚以下なら何もしない
    $slides.show();
    return;
  }

  var current = 0;
  var DURATION = 5000; // 表示時間
  var SPEED    = 800;  // フェード時間
  var timer = null;

  // 初期表示
  $slides.hide().eq(current).show().attr('aria-hidden','false');
  $slides.not(':eq(' + current + ')').attr('aria-hidden','true');

  function showNext(){
    var next = (current + 1) % $slides.length;
    $slides.eq(current).stop(true,true).fadeOut(SPEED).attr('aria-hidden','true');
    $slides.eq(next).stop(true,true).fadeIn(SPEED).attr('aria-hidden','false');
    current = next;
  }

  function start(){ if (!timer) timer = setInterval(showNext, DURATION); }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }

  start();

  // 任意：ホバー停止（不要なら削除OK）
  $('.fv').on('mouseenter', stop).on('mouseleave', start);
});
