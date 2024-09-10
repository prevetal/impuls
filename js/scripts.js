WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true
		})
	}


	// Product slider
	let productSlider = document.querySelector('.product_info .slider.swiper')

	if (productSlider) {
		new Swiper('.product_info .slider.swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			slidesPerView: 1,
			lazy: true
		})
	}


	// Cookie
	$('.cookie_info').addClass('show')

	$('.cookie_info .btn').click(function(e) {
		e.preventDefault()

		$('.cookie_info').removeClass('show')
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('header .mob_menu_btn, .mob_menu .close_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	$('.mob_menu .menu .menu_item > a.sub_link').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Select file
	const fileInputs = document.querySelectorAll('form input[type=file]'),
		fileSelected = document.querySelectorAll('form .file .selected')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => {
				let file = el.closest('.file')

				// Set file name
				file.querySelector('.selected span').innerText = el.files[0].name

				// Hide btn
				file.querySelector('.btn').style.display = 'none'

				// Show selected
				file.querySelector('.selected').style.display = 'flex'
			})
		})
	}

	if (fileSelected) {
		fileSelected.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let file = el.closest('.file')

				// Set file name
				file.querySelector('.selected span').innerText = ''

				// Hide selected
				file.querySelector('.selected').style.display = 'none'

				// Show btn
				file.querySelector('.btn').style.display = 'block'
			})
		})
	}


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Form submit
	$('form').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById('success_modal'),
			type: 'inline'
		}])
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Animation
	const boxes = document.querySelectorAll('.animate, .animate2')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated') && !entry.target.classList.contains('animate2')) {
				entry.target.classList.add('animated')
			}

			if (entry.intersectionRatio >= 1.0 && entry.target.classList.contains('animate2')) {
				entry.target.classList.add('animated')
			} else {
				entry.target.classList.remove('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})