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
var password = document.getElementById("password"),
	confirm_password = document.getElementById("confirm_password");

function validatePassword() {
	if (password.value != confirm_password.value) {
		confirm_password.setCustomValidity("Passwords Don't Match");
	} else {
		confirm_password.setCustomValidity('');
	}
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
//alert(localStorage.token);
function new_user() {
	/*$("#creat_new_user")
		.submit(function() {*/
	//alert('test');
	$user_email = $('.user_email')
		.val();
	$user_pass = $('.user_pass')
		.val();
	$user_re_pass = $('.user_re_pass')
		.val();
	$user_mobile = $('.user_mobile')
		.val();
	if (($user_pass != "") && ($user_re_pass != "") && ($user_pass == $user_re_pass)) {
		$('.preloader')
			.fadeIn();
		var url = "https://janatech.sa/api/?new_user=true&user_email=" + $user_email + "&user_pass=" + $user_pass + "&user_mobile=" + $user_mobile + "&user_token=" + localStorage.token;
		console.log(url);
		$.getJSON(url, function(new_user) {
			console.log(new_user);
			$('#new_user_holder form')
				.fadeOut();
			$("#new_user_holder")
				.html("<div class='alert alert-success'>تم تسجيل المستخدم بنجاح .</div>");
			/*$.each(slides, function(i, slide) {
				if ($num_is == 0) {
					$(".carousel-inner")
						.append('<div class="carousel-item active"><img src="' + slide.slide + '" /></div>');
				} else {
					$(".carousel-inner")
						.append('<div class="carousel-item"><img src="' + slide.slide + '" /></div>');
				}*/
		});
		$('.preloader')
			.fadeOut();
	}
	/*});*/
}
/*// Get Products */
function get_user_prdcts(storedID) {
	var dataProducts = "get_products=true&user=" + storedID;
	var url_user_prdct = "https://janatech.sa/api/?" + dataProducts;
	console.log(url_user_prdct);
	$.getJSON(url_user_prdct, function(u_prdct) {
		console.log(u_prdct);
		$(".logged_in .products .table-responsive")
			.html("");
		$.each(u_prdct, function(i, tr) {
			//alert(tr.pr_sn);
			$(".logged_in .products .table-responsive")
				.append('<table class="table table-striped"><tr><td>product</td><td>' + tr.c_product + '</td></tr><tr><td>Serial No.</td><td>' + tr.pr_sn + '</td></tr><tr><td>Buy Date</td><td>' + tr.b_date + '</td></tr><table>');
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
		$(".logged_in .tickets table")
			.html("");
		$.each(u_ticks, function(i, tr) {
			$(".logged_in .tickets table")
				.append('<tr>' + tr.tr + '</tr>');
		});
	});
}

function new_product() {
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$prd_model = $('.jt_model')
		.val();
	$pr_sn = $('.pr_sn')
		.val();
	$b_date = $('.b_date')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://janatech.sa/api/?add_product=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&prd_model=" + $prd_model + "&pr_sn=" + $pr_sn + "&b_date=" + $b_date;
	//console.log(url);
	$.getJSON(url, function(add_product) {
		//console.log(add_product);
		get_user_prdcts($author_id);
		$('.close_forms')
			.click();
		//alert($author_id);
		get_user_prdcts($author_id);
		$(".preloader")
			.fadeOut();
	});
};

function new_ticket() {
	//alert("new");
	$author_id = localStorage.getItem('u_id');
	$author_pass = localStorage.getItem('pass_is');
	$author_username = localStorage.getItem('login_is');
	$prd_model = $('.jt_model')
		.val();
	$pr_sn = $('.t_pr_sn')
		.val();
	$b_date = $('.b_date')
		.val();
	$u_address = $('.u_address')
		.val();
	$u_notes = $('.u_notes')
		.val();
	$('.preloader')
		.fadeIn();
	var url = "https://janatech.sa/api/?add_ticket=true&user_name=" + $author_username + "&pass_is=" + $author_pass + "&author_id=" + $author_id + "&prd_model=" + $prd_model + "&pr_sn=" + $pr_sn + "&b_date=" + $b_date + "&u_address=" + $u_address + "&u_notes=" + $u_notes;
	//console.log(url);
	$.getJSON(url, function(add_ticket) {
		console.log(add_ticket);
		//get_user_tickets($author_id);
		$('.close_forms')
			.click();
		//alert($author_id);
		get_user_tickets($author_id);
		$(".preloader")
			.fadeOut();
	});
};
$('.close_forms')
	.click(function() {
		$(".new_forms")
			.animate({
				"top": "100%"
			});
	});
$('.add_prdct')
	.click(function() {
		$('.new_forms > form')
			.hide();
		$('.new_product')
			.show();
		$(".new_forms")
			.animate({
				"top": "10%",
				"opacity": "0.92"
			});
	});
$('.add_ticket')
	.click(function() {
		$('.new_forms > form')
			.hide();
		$('.new_ticket')
			.show();
		$(".new_forms")
			.animate({
				"top": "10%",
				"opacity": "0.92"
			});
	});
$(document)
	.ready(function() {
		/*Check of user logged in before and stored by webstorage*/
		$storedName = localStorage.getItem('login_is');
		$storedPw = localStorage.getItem('pass_is');
		$storedID = localStorage.getItem('u_id');
		//alert($storedName + $storedPw + $storedID);
		if ((($storedName !== "") && ($storedPw !== "")) && (($storedName !== null) && ($storedPw !== null))) {
			$('.slide')
				.hide();
			$('.new_user_home')
				.hide();
			$(".login_success")
				.html("مرحباً بعودتك / " + $storedName);
			$(".login_success")
				.fadeIn("1000");
			$(".login_form")
				.hide();
			$(".logged_in")
				.show();
			$("#logout")
				.removeClass('hidden');
			$(".login_link")
				.addClass('hidden');
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
					.addClass('hidden');
				localStorage.login_is = "";
				localStorage.pass_is = "";
				localStorage.u_id = "";
				window.location.href = "index.html";
			});

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
						.removeClass("hidden");
					$(".login_link")
						.addClass('hidden');
					/*-----------------*/
					//alert($u_id);
					$('.slide')
						.hide();
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
		$(".show_pr")
			.click(function() {
				$(".page")
					.slideUp();
				$(".product_is")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".order_pr")
			.click(function() {
				$(".order_form")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
			});
		$(".new_user")
			.click(function() {
				$(".splash")
					.animate({
						"right": "-100%"
					});
				$(".page")
					.slideUp();
				$("#new_user")
					.stop()
					.slideToggle();
				$(".posts")
					.html("");
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