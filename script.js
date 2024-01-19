// server connection and get post method testing 
// public/frontend.js
// public/frontend.js



  // end of the server code here
///-----------------------------------------/////////////////////////------------------------------------

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


//scroll thing to make it look cool
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

// scroll code here >>>>>>>>>
/*
const observer = new IntersectionObserver((entries )=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});
const hiddenelement = document.querySelectorAll('.contains');
hiddenelement.forEach((el)=> observer.observe(el));
*/
//------------------------------------------------------------------------------------------------//
/* scroll to top button logic  */
document.addEventListener('DOMContentLoaded', function() {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
    window.addEventListener('scroll', function() {
      // Show the button when the user scrolls down 200 pixels or more
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
  
    // Scroll to top smoothly when the button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      // Use window.scrollTo with behavior: 'smooth'
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
 //-----------------------------------------------------------------------------------------------// 
// the project section code starts from her
function expandProject(project) {
  project.classList.add('expanded');
  project.classList.add('expanded-project');
  document.body.style.overflow = 'hidden'; // Disable scrolling when a project is expanded
  createBackButton();
}

function createBackButton() {
  const backButton = document.createElement('div');
  backButton.className = 'back-button';
  backButton.innerHTML = '&lt; Back';
  backButton.onclick = function() {
    const expandedProject = document.querySelector('.expanded-project');
    expandedProject.classList.remove('expanded-project');
    document.body.style.overflow = 'auto'; // Enable scrolling after closing the expanded project
    backButton.remove();
  };
  document.body.appendChild(backButton);
}