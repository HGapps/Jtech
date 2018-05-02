/*------------------------------------*/
function notify(T_id_is) {
	//console.log(T_id_is); debugger; alert("clicked"); $(".ticket_link").on("click", notify); alert('test'); alert(T_id_is);
	$fav_is = pad(T_id_is, 7);
	//alert($fav_is);
	if ($fav_is !== "") {
		$(".preloader")
			.fadeIn();
		$t_id = $fav_is;
		var url = "https://janatech.sa/api/?Ticket_id=" + $t_id;
		$.getJSON(url, function(tick) {
			$("#main_page .posts")
				.html("");
			$("#main_page .posts")
				.append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
			$.each(tick['comment'], function(i, comment) {
				$("#main_page .posts")
					.append('<div class="col-xs-12 comment"><h2>' + comment.c_date + '</h2><p>' + comment.content + '</p></div>');
			});
			$("#main_page .posts")
				.append('<div class="col-xs-12 main_ticket"><p>' + tick['ticket'].content + '</p></div>');
			$(".preloader")
				.fadeOut();
		});
	}
}
$(document)
	.ready(function() {
		/*Check of user logged in before and stored by webstorage*/
		$storedName = localStorage.getItem('login_is');
		$storedPw = localStorage.getItem('pass_is');
		$storedID = localStorage.getItem('u_id');
		//alert($storedName + $storedPw + $storedID);
		if ((($storedName !== "") && ($storedPw !== "")) && (($storedName !== null) && ($storedPw !== null))) {
			$(".login_success")
				.html("مرحباً بعودتك / " + $storedName);
			$(".login_success")
				.fadeIn("1000");
			$(".login_form")
				.hide();
			$(".logged_in")
				.show();
			$("#logout")
				.show();
			$(".login_link")
				.hide();
			get_user_prdcts($storedID);
			get_user_tickets($storedID);
		}
		/*///////////////// Get Slides /////////////////////////*/
		var url = "https://janatech.sa/api/?slides_is=show";
		//alert(url);
		$(".favs table tbody")
			.html("");
		$.getJSON(url, function(slides) {
			//alert(slides);
			console.log(slides);
			$num_is = 0;
			$.each(slides, function(i, slide) {
				if ($num_is == 0) {
					$(".carousel-inner")
						.append('<div class="carousel-item active"><img src="' + slide.slide + '" /></div>');
				} else {
					$(".carousel-inner")
						.append('<div class="carousel-item"><img src="' + slide.slide + '" /></div>');
				}
				$num_is++;
			});
		});
		/*///////////// Login Form //////////////////////*/
		$("#logout")
			.click(function() {
				$("#logout")
					.hide();
				localStorage.login_is = "";
				localStorage.pass_is = "";
				localStorage.u_id = "";
				window.location.href = "index.html";
			});
		/*// Get Products */
		function get_user_prdcts(storedID) {
			var dataProducts = "get_products=true&user=" + storedID;
			var url_user_prdct = "https://janatech.sa/api/?" + dataProducts;
			$.getJSON(url_user_prdct, function(u_prdct) {
				console.log(u_prdct);
				$.each(u_prdct, function(i, tr) {
					//alert(tr.pr_sn);
					$(".logged_in .products")
						.append('<div><span>product</span><span>' + tr.c_product + '</span>');
				});
			});
		}
		/*// Get Tickets*/
		function get_user_tickets(storedID) {
			var dataTickets = "get_tickets=true&user=" + storedID;
			var url_user_tickets = "https://janatech.sa/api/?" + dataTickets;
			$.getJSON(url_user_tickets, function(u_ticks) {
				//alert('get_products');
				console.log(u_ticks);
				$.each(u_ticks, function(i, tr) {
					$(".logged_in .tickets")
						.append(tr.tr);
				});
			});
		}

		function get_history() {
			$get_favs_array = localStorage.getItem("favs");
			if ($get_favs_array !== "" || $get_favs_array !== null) {
				$new_favs = $.parseJSON($get_favs_array);
				if ($new_favs !== null) {
					$.each($new_favs, function(i, fav) {
						//alert(fav);
						var url = "https://janatech.sa/api/?Ticket_id=" + fav;
						//alert(url);
						$(".favs table tbody")
							.html("");
						$.getJSON(url, function(tick) {
							//alert("test"); console.log(result); $u_fake_id = $storedID * 2; alert($u_fake_id);  alert(fav); $fav_is = fav;
							$(".favs table tbody")
								.append('<tr><td><a href="#" data-link="' + fav + '" id="ticket_link" class="ticket_link" onclick="notify(' + fav + ')">' + tick['ticket'].title + '</a></td><td><span class = "btn btn-warning" > ' + tick['ticket'].status + '</span></td></tr> ');
						});
					});
				}
			}
		}

		function do_login() {
			$("#login")
				.html('جار التحقق ...');
			var user = $(".user")
				.val();
			/*--- convert letters to lower case ----*/
			user = user.toLowerCase();
			var pass = $(".pass")
				.val();
			//alert(user); var dataString = "user=" + user + "&pass=" + pass + "&login=";
			var dataString = "user=" + user + "&pass=" + pass;
			var url2 = "https://janatech.sa/api/?" + dataString;
			$.getJSON(url2, function(login) {
				$login_status = login.status;
				$u_id = login.u_id;
				if ($login_status == true) {
					// REFRENCE : https://www.w3schools.com/html/html5_webstorage.asp https://www.w3schools.com/jsref/prop_win_localstorage.asp
					localStorage.login_is = user;
					localStorage.pass_is = pass;
					localStorage.u_id = $u_id;
					//alert("Login Success");
					$(".login_form")
						.stop()
						.slideToggle();
					$(".login_success")
						.fadeIn("1000");
					$("#logout")
						.slideDown("1000");
					/*-----------------*/
					get_user_prdcts($u_id);
					get_user_tickets($u_id);
					$(".logged_in")
						.fadeIn("1000");
					//$(".login_success").fadeOut("3000");
				} else if ($login_status == false) {
					$("#login")
						.html('تسجيل الدخول');
				}
			});
		}
		$("#login")
			.click(function() {
				do_login();
			});
		/*------------ menu clicks -------------------*/
		$(".main_menu a i")
			.click(function() {
				$(".main_menu a i")
					.css({
						"color": "#888888"
					});
				$(this)
					.css({
						"color": "#FFBD54"
					});
			});
		$(".skip_to_home")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
			});
		$(".skip_to_home_icon")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
			});
		$(".bottom_buttons a")
			.click(function() {
				$(".bottom_buttons")
					.animate({
						"left": "-100%"
					});
			});
		$(".login_link")
			.click(function() {
				$(".page")
					.slideUp();
				$(".login_form")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".user_index")
			.click(function() {
				$(".page")
					.slideUp();
				$("#user_index")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".search_link")
			.click(function() {
				$(".page")
					.slideUp();
				$(".check_ticket_by_number")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".show_about")
			.click(function() {
				$(".page")
					.slideUp();
				$(".about")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".show_favorites")
			.click(function() {
				$(".page")
					.slideUp();
				$(".favs")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
				get_history();
			});
	});