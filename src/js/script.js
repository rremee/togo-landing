import "/src/sass/style.scss";
import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", () => {

    // Audio
    const canvas = document.querySelector('canvas'),
          audio = document.querySelector('#audio');

    let settings = {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        midY: canvas.offsetHeight / 2,
        points: 80,
        stretch: 8,
        sinHeight: 0,
        speed: -0.04,
        strokeColor: '#EEE7E7',
        strokeWidth: 2,
        power: false
    }

    canvas.width = settings.width * 2;
    canvas.height = settings.height * 2;
    canvas.style.width = settings.width + 'px';
    canvas.style.height = settings.height + 'px';

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);

    ctx.strokeStyle = settings.strokeColor;
    ctx.lineWidth = settings.strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let time = 0;

    const render = () => {
        window.requestAnimationFrame(render);
        ctx.clearRect(0, 0, settings.width, settings.height);
        time+=1;
        ctx.beginPath();
        let increment = 0;
        for (let i = 0; i < settings.points; i++) {
            if (i < settings.points / 2) {
                increment += 0.12;
            } else {
                increment -= 0.12;
            }

            const x = (settings.width / settings.points) * i;
            const y = settings.midY + Math.sin(time * settings.speed + i / settings.stretch) * settings.sinHeight * increment;
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    render();

    canvas.addEventListener('click', () => {
        settings.power = !settings.power;
        
        if(settings.power) {
            audio.play();
            gsap.to(settings, {
                duration: 1,
                sinHeight: 3,
                stretch: 6,
                ease: "power2.inOut"
            })
        } else {
            audio.pause();
            gsap.to(settings,{
                duration: 1,
                sinHeight: 0,
                stretch: 10,
                ease: "power3.out"
            })
        }
    })
});