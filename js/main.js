$(document).ready(function(){
	$("nav a,a[href='#top'],a[rel='m_PageScroll2id'],a.PageScroll2id").mPageScroll2id({
	    highlightSelector:"nav a"
	});

	//Фокус поиска

	$('.input-field input').on('focus',function(e){
		$(e.target).parent().addClass('focus');
		$(e.target).parent().addClass('red');
		$(this).on('blur',function(){
			$(this).parent().removeClass('focus');
			$(this).parent().removeClass('red');
		});
	});

	//Выпадение

	var inputTarget;

	$('.input-field input').on('click',function(e){
		
		if(inputTarget){
			inputTarget.siblings('.drop-menu').addClass('hide-show');
		}
		if($(e.target).siblings('.drop-menu').hasClass('hide-show')){
			$(e.target).siblings('.drop-menu').removeClass('hide-show');
		}
		inputTarget = $(e.target);

		$('.drop-menu p').on('click',function(e){
			var paragraphTarget = $(e.target).text();
			inputTarget.val(paragraphTarget);
			inputTarget.siblings('.drop-menu').addClass('hide-show');
		});
		
	});
	$(document).on('mouseup',function (e) {
    var container = $(".input-field input");
    if (container.has(e.target).length === 0){
        container.siblings('.drop-menu').addClass('hide-show');
    }
	});

	//При наведении на info__location элементы

	$('.info__location div div img').on('mouseenter',function(e){
		if(e.target.tagName == 'IMG'){
			$(e.target).after('<div class="hint arr">' + $(e.target).attr('alt') + '</div>');
		}
		$(this).on('mouseleave',function(){
			$('.hint').remove();
		});
	});

	//Увеличение картинок

	$('.images img').on('click',function(e){
		if($(window).width() > 720){
			var imgSrc = e.target.src;
			$('body').append($('<div class="fon"><img class="big" src=" ' + imgSrc + '"></div>'));
			$('.fon').on('click',function(e){
				$(this).remove();
			});
		}
		
	});
	// В вашем примере есть один нюанс. container.has(e.target) - 
// вернет пустой массив, если нажатие произойдет по самому диву, 
// а не его дочерним элементам. Нужна доп. проверка 
// $(document).click(function(e){ 
// 	var elem = $("YOUR CONTAINER SELECTOR"); 
// 	if(e.target!=elem[0]&&!elem.has(e.target).length){ 
// 		elem.hide(); 
// 	} 
// });
// можно в if написать только это: container.contains(target)

$("#message-form").validate({
		rules: {
			name: { required: true },
			email: { required: true, email: true },
			// skype:  { required: true },
			// phone:  { required: true },
			message: { required: true }
		},
		messages: {
			name: "Пожалуйста, введите свое имя",
			email: {
				required: "Пожалуйста, введите свой email",
				email: "Email адрес должен быть в формате name@domain.com . Возможно вы ввели email с ошибкой."
			},
			message: "Пожалуйста, введите текст сообщения"
		},
		submitHandler: function(form) {
		  ajaxFormSubmit();
		}
	});
	// Функция AJAX запрса на сервер
	function ajaxFormSubmit(){
		var string = $("#message-form").serialize(); // Соханяем данные введенные в форму в строку. 
		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string
			// Функция если все прошло успешно
			success: function(html){
				// $("#message-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false; 
	}
});



