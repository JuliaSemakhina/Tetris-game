const navSlide = ()=> {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav__links');
	const prime = document.querySelector('.prime');
	const navLinks = document.querySelectorAll('.nav__links li');

	//Toggle Navbar
	burger.addEventListener('click', ()=> {
		nav.classList.toggle('nav-active');
		prime.classList.toggle('hidden');

	//Animate Links
		navLinks.forEach((link, index) => {
			if(link.style.animation){
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade .5s ease forwards ${index/7 + 1}s`;
			}

		})

		//Animation of the burger

		burger.classList.toggle('toggle');

		});

	
}

navSlide();


