
$(".mobile_nav").click(()=> {

    let mm = $(".mobile_menu"),
        mn = $(".mobile_nav"),
      a = "active";
    
    if (mm.hasClass(a) && mn.hasClass(a)) {
      mm.removeClass(a).fadeOut(200);
      mn.removeClass(a);
      $('.mobile_menu li').each(()=>{
        $(this).removeClass('slide');
      });
    } else {
      mm.addClass(a).fadeIn(200);
      mn.addClass(a);
      $('.mobile_menu li').each((i) =>{
      var t = $(this);
      setTimeout(() => { t.addClass('slide'); }, (i+1) * 100);
    });
    }
    
  });
  