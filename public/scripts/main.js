;(function(){
			// Menu settings
			$('#menuToggle, .menu-close').on('click', function(){
				$('#menuToggle').toggleClass('active');
				$('body').toggleClass('body-push-toleft');
				$('#theMenu').toggleClass('menu-open');
			});
			$('form').on('submit', function(event) {
				event.preventDefault();
				$('.form-control').val('');
			})

})(jQuery)